import Stripe from "stripe";
import { ENV } from "./env";

/**
 * Stripe Payment Configuration
 * Handles all Stripe API interactions and payment processing
 */

// Lazy initialize Stripe to avoid errors when API key is not configured
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!ENV.stripeSecretKey) {
      throw new Error("Stripe API key is not configured. Please set STRIPE_SECRET_KEY environment variable.");
    }
    _stripe = new Stripe(ENV.stripeSecretKey);
  }
  return _stripe;
}

/**
 * Product definitions for printed course materials
 * Define prices and products for consistency across the application
 */
export const STRIPE_PRODUCTS = {
  printedMaterials: {
    name: "Printed Course Materials",
    description: "Printed course workbook, supplementary readings, and shipping within the United States",
    priceUsd: 4500, // $45.00 in cents
    currency: "usd",
  },
};

/**
 * Create a Stripe Checkout Session for printed materials payment
 * @param userId - The user's database ID
 * @param userEmail - The user's email address
 * @param userName - The user's full name
 * @param courseId - The course ID being registered for
 * @param courseName - The course name
 * @param successUrl - URL to redirect to on successful payment
 * @param cancelUrl - URL to redirect to if payment is cancelled
 * @returns Stripe Checkout Session with URL
 */
export async function createPrintedMaterialsCheckoutSession(
  userId: number,
  userEmail: string,
  userName: string,
  courseId: number,
  courseName: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: userEmail,
      client_reference_id: userId.toString(),
      metadata: {
        user_id: userId.toString(),
        course_id: courseId.toString(),
        customer_email: userEmail,
        customer_name: userName,
      },
      line_items: [
        {
          price_data: {
            currency: STRIPE_PRODUCTS.printedMaterials.currency,
            product_data: {
              name: STRIPE_PRODUCTS.printedMaterials.name,
              description: STRIPE_PRODUCTS.printedMaterials.description,
            },
            unit_amount: STRIPE_PRODUCTS.printedMaterials.priceUsd,
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      allow_promotion_codes: true,
    });

    return session;
  } catch (error) {
    console.error("[Stripe] Error creating checkout session:", error);
    throw error;
  }
}

/**
 * Verify Stripe webhook signature
 * @param body - Raw request body
 * @param signature - Stripe signature from headers
 * @returns Parsed Stripe event
 */
export function verifyWebhookSignature(body: string, signature: string) {
  try {
    const stripe = getStripe();
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      ENV.stripeWebhookSecret
    );
    return event;
  } catch (error) {
    console.error("[Stripe] Webhook signature verification failed:", error);
    throw error;
  }
}

/**
 * Retrieve payment intent details
 * @param paymentIntentId - The Stripe Payment Intent ID
 * @returns Payment Intent object with full details
 */
export async function getPaymentIntent(paymentIntentId: string) {
  try {
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    return paymentIntent;
  } catch (error) {
    console.error("[Stripe] Error retrieving payment intent:", error);
    throw error;
  }
}

/**
 * Retrieve checkout session details
 * @param sessionId - The Stripe Checkout Session ID
 * @returns Checkout Session object with payment details
 */
export async function getCheckoutSession(sessionId: string) {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
  } catch (error) {
    console.error("[Stripe] Error retrieving checkout session:", error);
    throw error;
  }
}

/**
 * Format price for display (cents to dollars)
 * @param priceInCents - Price in cents
 * @returns Formatted price string (e.g., "$45.00")
 */
export function formatPrice(priceInCents: number): string {
  const dollars = (priceInCents / 100).toFixed(2);
  return `$${dollars}`;
}

/**
 * Extract user and course info from Stripe event metadata
 * @param metadata - Metadata object from Stripe event
 * @returns Parsed metadata with type safety
 */
export function parseEventMetadata(metadata: Record<string, string> | null) {
  if (!metadata) return null;

  return {
    userId: metadata.user_id ? parseInt(metadata.user_id) : null,
    courseId: metadata.course_id ? parseInt(metadata.course_id) : null,
    customerEmail: metadata.customer_email,
    customerName: metadata.customer_name,
  };
}

/**
 * Log Stripe event for audit purposes
 * @param eventType - Type of Stripe event
 * @param eventId - Stripe event ID
 * @param metadata - Event metadata
 */
export function logStripeEvent(
  eventType: string,
  eventId: string,
  metadata?: Record<string, any>
) {
  console.log(`[Stripe Event] ${eventType} - ${eventId}`, metadata || "");
}
