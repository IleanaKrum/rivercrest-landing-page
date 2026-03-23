import { Resend } from "resend";
import { ENV } from "./env";

let resendClient: Resend | null = null;

/**
 * Get or initialize the Resend email client
 */
function getResendClient(): Resend | null {
  if (!ENV.resendApiKey) {
    console.warn("[Email] Resend API key not configured");
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(ENV.resendApiKey);
  }

  return resendClient;
}

export interface CourseRegistrationEmailData {
  studentName: string;
  studentEmail: string;
  courseId: number;
  courseName?: string;
  wantsPrintedMaterials: boolean;
  printedMaterialsCost?: number;
  country: string;
}

/**
 * Send course registration confirmation email to student
 */
export async function sendCourseRegistrationEmail(
  data: CourseRegistrationEmailData
): Promise<boolean> {
  const client = getResendClient();
  if (!client) {
    console.warn("[Email] Resend client not available, skipping email");
    return false;
  }

  try {
    const materialsCost = data.wantsPrintedMaterials ? (data.printedMaterialsCost || 4500) / 100 : 0;
    const isUSA = data.country.toLowerCase() === "usa" || data.country.toLowerCase() === "united states";
    const hasMaterials = data.wantsPrintedMaterials && isUSA;

    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: #333;
        background-color: #f9fafb;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }
      .header {
        border-bottom: 3px solid #1a4d5c;
        padding-bottom: 20px;
        margin-bottom: 30px;
      }
      .header h1 {
        color: #1a4d5c;
        margin: 0;
        font-size: 28px;
        font-family: 'Crimson Text', serif;
      }
      .header p {
        color: #6b7280;
        margin: 5px 0 0 0;
        font-size: 14px;
      }
      .content {
        margin-bottom: 30px;
      }
      .content p {
        margin: 0 0 15px 0;
      }
      .details-box {
        background-color: #f0f9fc;
        border-left: 4px solid #1a4d5c;
        padding: 20px;
        margin: 20px 0;
        border-radius: 4px;
      }
      .details-box h3 {
        color: #1a4d5c;
        margin: 0 0 10px 0;
        font-size: 16px;
      }
      .details-box p {
        margin: 8px 0;
        font-size: 14px;
      }
      .payment-box {
        background-color: #fef3c7;
        border-left: 4px solid #f59e0b;
        padding: 20px;
        margin: 20px 0;
        border-radius: 4px;
      }
      .payment-box h3 {
        color: #92400e;
        margin: 0 0 10px 0;
        font-size: 16px;
      }
      .payment-box p {
        margin: 8px 0;
        font-size: 14px;
        color: #78350f;
      }
      .cta-button {
        display: inline-block;
        background-color: #1a4d5c;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        margin-top: 20px;
      }
      .cta-button:hover {
        background-color: #0f3a47;
      }
      .footer {
        border-top: 1px solid #e5e7eb;
        padding-top: 20px;
        margin-top: 30px;
        font-size: 12px;
        color: #6b7280;
        text-align: center;
      }
      .footer p {
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Registration Confirmed!</h1>
        <p>Rivercrest Free Methodist Church - Center of Studies</p>
      </div>

      <div class="content">
        <p>Dear <strong>${data.studentName}</strong>,</p>

        <p>Thank you for registering for our pastoral and leadership training program! We are excited to have you join our Swahili-speaking community of faith leaders.</p>

        <div class="details-box">
          <h3>Registration Details</h3>
          <p><strong>Course ID:</strong> #${data.courseId}</p>
          ${data.courseName ? `<p><strong>Course Name:</strong> ${data.courseName}</p>` : ""}
          <p><strong>Student Name:</strong> ${data.studentName}</p>
          <p><strong>Email:</strong> ${data.studentEmail}</p>
          <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
        </div>

        ${
          hasMaterials
            ? `
        <div class="payment-box">
          <h3>Printed Materials - Payment Required</h3>
          <p>You requested printed course materials for <strong>$${materialsCost.toFixed(2)}</strong>.</p>
          <p><strong>What's Included:</strong></p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>High-quality printed syllabus</li>
            <li>Study guides and workbooks</li>
            <li>Reference materials</li>
            <li>Leadership development resources</li>
          </ul>
          <p><strong>Next Steps:</strong> Our team will contact you within 24 hours with payment instructions. We accept bank transfers, checks, and PayPal.</p>
        </div>
        `
            : `
        <div class="details-box">
          <h3>Digital Materials</h3>
          <p>All students receive digital course materials, video lessons, and access to assignments through our student portal.</p>
        </div>
        `
        }

        <p>You will receive an email shortly with your login credentials and access to the student dashboard, where you can:</p>
        <ul style="margin: 15px 0; padding-left: 20px;">
          <li>Access course materials and syllabuses</li>
          <li>View session schedules and assignments</li>
          <li>Track your progress through the program</li>
          <li>Submit assignments and receive feedback</li>
          <li>Connect with fellow students and instructors</li>
        </ul>

        <p>If you have any questions or need assistance, please don't hesitate to contact us at <strong>info@rivercrest.org</strong> or call <strong>(555) 123-4567</strong>.</p>

        <p>Blessings on your journey of faith and leadership!</p>

        <p>
          In Christ,<br />
          <strong>Rivercrest Free Methodist Church</strong><br />
          Center of Studies
        </p>
      </div>

      <div class="footer">
        <p>This is an automated confirmation email. Please do not reply to this message.</p>
        <p>&copy; 2026 Rivercrest Free Methodist Church. All rights reserved.</p>
        <p><a href="https://rivercrest.org" style="color: #1a4d5c; text-decoration: none;">Visit our website</a></p>
      </div>
    </div>
  </body>
</html>
    `;

    const response = await client.emails.send({
      from: "Rivercrest FMC <onboarding@resend.dev>",
      to: data.studentEmail,
      subject: "Course Registration Confirmation - Rivercrest Center of Studies",
      html: htmlContent,
    });

    if (response.error) {
      console.error("[Email] Failed to send registration email:", JSON.stringify(response.error, null, 2));
      return false;
    }

    console.log("[Email] Registration confirmation sent to", data.studentEmail);
    return true;
  } catch (error) {
    console.error("[Email] Error sending registration email:", error);
    return false;
  }
}

/**
 * Send admin notification about new course registration
 */
export async function sendAdminRegistrationNotification(
  data: CourseRegistrationEmailData,
  adminEmail: string
): Promise<boolean> {
  const client = getResendClient();
  if (!client) {
    console.warn("[Email] Resend client not available, skipping admin email");
    return false;
  }

  try {
    const materialsCost = data.wantsPrintedMaterials ? (data.printedMaterialsCost || 4500) / 100 : 0;
    const isUSA = data.country.toLowerCase() === "usa" || data.country.toLowerCase() === "united states";
    const hasMaterials = data.wantsPrintedMaterials && isUSA;

    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #f9fafb;
        padding: 20px;
      }
      .card {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 15px;
        border: 1px solid #e5e7eb;
      }
      .header {
        background-color: #1a4d5c;
        color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
      }
      .header h2 {
        margin: 0;
        font-size: 20px;
      }
      .field {
        margin: 10px 0;
        font-size: 14px;
      }
      .field strong {
        color: #1a4d5c;
      }
      .payment-alert {
        background-color: #fef3c7;
        border-left: 4px solid #f59e0b;
        padding: 15px;
        border-radius: 4px;
        margin: 15px 0;
      }
      .payment-alert strong {
        color: #92400e;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>New Course Registration</h2>
      </div>

      <div class="card">
        <h3 style="margin-top: 0; color: #1a4d5c;">Student Information</h3>
        <div class="field"><strong>Name:</strong> ${data.studentName}</div>
        <div class="field"><strong>Email:</strong> ${data.studentEmail}</div>
        <div class="field"><strong>Country:</strong> ${data.country}</div>
        <div class="field"><strong>Course ID:</strong> #${data.courseId}</div>
        <div class="field"><strong>Registration Time:</strong> ${new Date().toLocaleString()}</div>
      </div>

      ${
        hasMaterials
          ? `
      <div class="payment-alert">
        <strong>⚠️ Payment Required</strong>
        <p style="margin: 10px 0 0 0;">Student requested printed materials for <strong>$${materialsCost.toFixed(2)}</strong>. Follow up with payment instructions.</p>
      </div>
      `
          : ""
      }

      <div class="card">
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          This is an automated notification. Log in to your admin dashboard to manage this registration.
        </p>
      </div>
    </div>
  </body>
</html>
    `;

    const response = await client.emails.send({
      from: "Rivercrest FMC <onboarding@resend.dev>",
      to: adminEmail,
      subject: `New Course Registration: ${data.studentName}`,
      html: htmlContent,
    });

    if (response.error) {
      console.error("[Email] Failed to send admin notification:", JSON.stringify(response.error, null, 2));
      return false;
    }

    console.log("[Email] Admin notification sent to", adminEmail);
    return true;
  } catch (error) {
    console.error("[Email] Error sending admin notification:", error);
    return false;
  }
}


/**
 * Send certificate completion email with PDF attachment
 */
export async function sendCertificateEmail(
  studentName: string,
  studentEmail: string,
  moduleName: string,
  pdfBuffer: Buffer,
  certificateId: string
): Promise<boolean> {
  const client = getResendClient();
  if (!client) {
    console.warn("[Email] Resend client not available, skipping certificate email");
    return false;
  }

  try {
    const completionDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: 'Crimson Text', 'Georgia', serif;
        line-height: 1.6;
        color: #1a3a3f;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #f5f1ed;
        padding: 40px 20px;
      }
      .card {
        background-color: #ffffff;
        padding: 40px;
        border-radius: 8px;
        border: 2px solid #1a4d5c;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        margin-bottom: 30px;
        border-bottom: 3px solid #8b6f47;
        padding-bottom: 20px;
      }
      .header h1 {
        color: #1a4d5c;
        margin: 0;
        font-size: 28px;
        font-weight: 600;
      }
      .header p {
        color: #8b6f47;
        margin: 10px 0 0 0;
        font-size: 14px;
      }
      .content {
        text-align: center;
        margin: 30px 0;
      }
      .content p {
        margin: 15px 0;
        font-size: 16px;
        line-height: 1.8;
      }
      .module-name {
        color: #1a4d5c;
        font-weight: 600;
        font-size: 18px;
      }
      .certificate-id {
        background-color: #f0f4f5;
        padding: 15px;
        border-radius: 6px;
        margin: 20px 0;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #666;
      }
      .certificate-id label {
        display: block;
        font-size: 12px;
        color: #999;
        margin-bottom: 5px;
      }
      .cta-button {
        display: inline-block;
        background-color: #1a4d5c;
        color: #ffffff;
        padding: 12px 24px;
        text-decoration: none;
        border-radius: 6px;
        font-weight: 600;
        margin-top: 20px;
        font-family: 'Inter', sans-serif;
      }
      .cta-button:hover {
        background-color: #0f3a47;
      }
      .footer {
        border-top: 1px solid #e5e7eb;
        padding-top: 20px;
        margin-top: 30px;
        font-size: 12px;
        color: #6b7280;
        text-align: center;
      }
      .footer p {
        margin: 5px 0;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="card">
        <div class="header">
          <h1>🎓 Congratulations!</h1>
          <p>Module Completion Certificate</p>
        </div>

        <div class="content">
          <p>Dear <strong>${studentName}</strong>,</p>

          <p>We are delighted to inform you that you have successfully completed the independent study module:</p>

          <p class="module-name">${moduleName}</p>

          <p>Your certificate of completion is attached to this email. This certificate recognizes your commitment to deepening your understanding of Free Methodist doctrine and leadership principles through our Center of Studies program.</p>

          <div class="certificate-id">
            <label>Certificate ID:</label>
            <strong>${certificateId}</strong>
          </div>

          <p><strong>Completion Date:</strong> ${completionDate}</p>

          <p>You can download and print your certificate, or save it digitally for your records. Your certificate is also available in your student dashboard under "My Certificates."</p>

          <p>We encourage you to continue your studies with our other modules. Each completed module strengthens your foundation in Free Methodist theology and leadership development.</p>

          <p>
            <a href="https://rivercrest.org/student-dashboard" class="cta-button">View Your Dashboard</a>
          </p>

          <p>If you have any questions about your certificate or would like to enroll in additional modules, please contact us at <strong>info@rivercrest.org</strong>.</p>

          <p>
            Blessings on your continued journey of faith and learning!<br />
            <strong>Rivercrest Free Methodist Church</strong><br />
            Center of Studies
          </p>
        </div>

        <div class="footer">
          <p>This is an automated email. Please do not reply to this message.</p>
          <p>&copy; 2026 Rivercrest Free Methodist Church. All rights reserved.</p>
        </div>
      </div>
    </div>
  </body>
</html>
    `;

    // Convert buffer to base64 for Resend API
    const pdfBase64 = pdfBuffer.toString("base64");

    const response = await client.emails.send({
      from: "Rivercrest FMC <onboarding@resend.dev>",
      to: studentEmail,
      subject: `Certificate of Completion - ${moduleName}`,
      html: htmlContent,
      attachments: [
        {
          filename: `Certificate-${certificateId}.pdf`,
          content: pdfBase64,
        },
      ],
    });

    if (response.error) {
      console.error("[Email] Failed to send certificate email:", JSON.stringify(response.error, null, 2));
      return false;
    }

    console.log("[Email] Certificate email sent to", studentEmail);
    return true;
  } catch (error) {
    console.error("[Email] Error sending certificate email:", error);
    return false;
  }
}
