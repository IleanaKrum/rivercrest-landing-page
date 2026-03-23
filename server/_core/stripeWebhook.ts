import { Request, Response } from "express";
import { stripe, verifyWebhookSignature, parseEventMetadata, logStripeEvent } from "./stripe";
import { getDb } from "../db";
import { payments, courseRegistrations } from "../../drizzle/schema";
import { eq, and } from "drizzle-orm";
import { sendCourseRegistrationEmail } from "./email";

/**
 * Stripe Webhook Handler
 * Processes payment events from Stripe and updates registration status
 */

/**
 * Handle Stripe checkout.session.completed event
 * This fires when a customer completes payment
 */
async function handleCheckoutSessionCompleted(event: any) {
  const session = event.data.object;
  
  logStripeEvent("checkout.session.completed", event.id, {
    sessionId: session.id,
    customerId: session.customer,
    clientReferenceId: session.client_reference_id,
  });

  try {
    // Extract metadata
    const metadata = parseEventMetadata(session.metadata);
    if (!metadata || !metadata.userId || !metadata.courseId) {
      console.error("[Webhook] Missing required metadata in session:", session.id);
      return;
    }

    const { userId, courseId, customerEmail, customerName } = metadata;

    // Find the registration
    const db = await getDb();
    if (!db) {
      console.error("[Webhook] Database not available");
      return;
    }

    const registration = await db
      .select()
      .from(courseRegistrations)
      .where(
        and(
          eq(courseRegistrations.courseId, courseId),
          eq(courseRegistrations.studentEmail, customerEmail)
        )
      )
      .limit(1);

    if (!registration || registration.length === 0) {
      console.error("[Webhook] Registration not found for:", { courseId, customerEmail });
      return;
    }

    const reg = registration[0];

    // Create payment record
    const paymentRecord = await db.insert(payments).values({
      registrationId: reg.id,
      userId: userId,
      courseId: courseId,
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
      stripeCustomerId: session.customer,
      amount: session.amount_total, // Already in cents
      currency: session.currency,
      status: "completed",
      paymentMethod: session.payment_method_types?.[0] || "card",
      description: `Printed Materials - Course ${courseId}`,
      metadata: JSON.stringify(metadata),
      paidAt: new Date(),
      receiptUrl: session.url,
    });

    console.log("[Webhook] Payment record created:", paymentRecord);

    // Update registration payment status
    await db
      .update(courseRegistrations)
      .set({
        paymentStatus: "received",
        paymentDate: new Date(),
      })
      .where(eq(courseRegistrations.id, reg.id));

    console.log("[Webhook] Registration payment status updated:", reg.id);

    // Send confirmation email to student
    try {
      await sendCourseRegistrationEmail({
        studentName: customerName || reg.studentName,
        studentEmail: customerEmail,
        courseId: courseId,
        courseName: `Course ${courseId}`,
        wantsPrintedMaterials: reg.wantsPrintedMaterials === 1,
        printedMaterialsCost: reg.printedMaterialsCost || undefined,
        country: reg.country,
      });
      console.log("[Webhook] Payment confirmation email sent to:", customerEmail);
    } catch (emailError) {
      console.error("[Webhook] Failed to send confirmation email:", emailError);
      // Don't fail the webhook if email fails
    }

  } catch (error) {
    console.error("[Webhook] Error handling checkout.session.completed:", error);
    throw error;
  }
}

/**
 * Handle Stripe payment_intent.payment_failed event
 * This fires when a payment attempt fails
 */
async function handlePaymentIntentFailed(event: any) {
  const paymentIntent = event.data.object;

  logStripeEvent("payment_intent.payment_failed", event.id, {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
  });

  try {
    // Find existing payment record by payment intent ID
    const db = await getDb();
    if (!db) {
      console.error("[Webhook] Database not available");
      return;
    }

    const existingPayments = await db
      .select()
      .from(payments)
      .where(eq(payments.stripePaymentIntentId, paymentIntent.id));

    if (existingPayments.length > 0) {
      const payment = existingPayments[0];

      // Update payment status to failed
      await db
        .update(payments)
        .set({
          status: "failed",
          failureReason: paymentIntent.last_payment_error?.message || "Payment failed",
        })
        .where(eq(payments.id, payment.id));

      console.log("[Webhook] Payment marked as failed:", payment.id);

      // Update registration payment status back to pending
      await db
        .update(courseRegistrations)
        .set({
          paymentStatus: "pending",
        })
        .where(eq(courseRegistrations.id, payment.registrationId));

      console.log("[Webhook] Registration payment status reset to pending");
    }
  } catch (error) {
    console.error("[Webhook] Error handling payment_intent.payment_failed:", error);
    throw error;
  }
}

/**
 * Main webhook handler
 * Verifies signature and routes to appropriate handler
 */
export async function handleStripeWebhook(req: Request, res: Response) {
  // Note: This handler expects raw body, not parsed JSON
  // Make sure Express is configured with express.raw() for this route
  const signature = req.headers["stripe-signature"];
  if (typeof signature !== "string") {
    console.error("[Webhook] Invalid signature type");
    return res.status(400).json({ error: "Invalid signature" });
  }

  if (!signature) {
    console.error("[Webhook] Missing Stripe signature");
    return res.status(400).json({ error: "Missing signature" });
  }

  try {
    // Verify webhook signature
    const event = verifyWebhookSignature(JSON.stringify(req.body), signature);

    // Handle test events (for development/testing)
    if (event.id.startsWith("evt_test_")) {
      console.log("[Webhook] Test event detected, returning verification response");
      return res.json({ verified: true });
    }

    console.log(`[Webhook] Processing event: ${event.type} (${event.id})`);

    // Route to appropriate handler based on event type
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(event);
        break;

      case "payment_intent.payment_failed":
        await handlePaymentIntentFailed(event);
        break;

      case "payment_intent.succeeded":
        // Additional handling if needed
        logStripeEvent("payment_intent.succeeded", event.id);
        break;

      default:
        console.log(`[Webhook] Unhandled event type: ${event.type}`);
    }

    // Always return 200 to acknowledge receipt
    return res.json({ received: true });
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error);
    // Return 400 for signature verification failures
    if (error instanceof Error && error.message.includes("signature")) {
      return res.status(400).json({ error: "Invalid signature" });
    }
    // Return 500 for other errors
    return res.status(500).json({ error: "Webhook processing failed" });
  }
}
