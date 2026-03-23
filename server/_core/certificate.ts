import PDFDocument from "pdfkit";
import { Readable } from "stream";

/**
 * Generate a professional PDF certificate for module completion
 * @param studentName - Name of the student
 * @param moduleName - Name of the completed module
 * @param completionDate - Date of completion (ISO string or Date)
 * @returns Buffer containing the PDF data
 */
export async function generateCertificatePDF(
  studentName: string,
  moduleName: string,
  completionDate: Date | string
): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new (PDFDocument as any)({
      size: "A4",
      margin: 50,
      bufferPages: true,
    });

    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(chunks));
    });

    doc.on("error", (error: Error) => {
      reject(error);
    });

    // Format completion date
    const date = typeof completionDate === "string" ? new Date(completionDate) : completionDate;
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Page dimensions
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Background - Gradient effect with colored borders
    doc.rect(0, 0, pageWidth, pageHeight).fill("#f5f3f0"); // Light cream background

    // Top decorative border
    doc.rect(0, 0, pageWidth, 8).fill("#1a3a3a"); // Deep navy

    // Bottom decorative border
    doc.rect(0, pageHeight - 8, pageWidth, 8).fill("#1a3a3a");

    // Left decorative border
    doc.rect(0, 0, 8, pageHeight).fill("#8b4513"); // Saddle brown

    // Right decorative border
    doc.rect(pageWidth - 8, 0, 8, pageHeight).fill("#8b4513");

    // Inner frame
    const frameMargin = 30;
    doc
      .rect(frameMargin, frameMargin, pageWidth - frameMargin * 2, pageHeight - frameMargin * 2)
      .stroke("#1a3a3a");

    // Certificate title
    doc.font("Helvetica-Bold", 48).fill("#1a3a3a").moveTo(0, 100).text("Certificate of Completion", {
      align: "center",
    });

    // Decorative line under title
    const titleY = 160;
    doc.moveTo(100, titleY).lineTo(pageWidth - 100, titleY).stroke("#8b4513");

    // Subtitle
    doc
      .font("Helvetica", 14)
      .fill("#666666")
      .moveTo(0, 180)
      .text("Free Methodist Way Independent Study", {
        align: "center",
      });

    // Main text
    doc
      .font("Helvetica", 12)
      .fill("#333333")
      .moveTo(0, 240)
      .text("This is to certify that", {
        align: "center",
      });

     // Student name - centered
    doc
      .font("Helvetica-Bold", 24)
      .fill("#1a3a3a")
      .moveTo(0, 270)
      .text(studentName, {
        align: "center",
      });

    // Completion statement
    doc
      .font("Helvetica", 12)
      .fill("#333333")
      .moveTo(0, 320)
      .text("has successfully completed the study module", {
        align: "center",
      });

    // Module name - highlighted
    doc
      .font("Helvetica-Bold", 16)
      .fill("#8b4513")
      .moveTo(0, 350)
      .text(moduleName, {
        align: "center",
      });

    // Completion date
    doc
      .font("Helvetica", 11)
      .fill("#666666")
      .moveTo(0, 420)
      .text(`Completed on ${formattedDate}`, {
        align: "center",
      });

    // Signature line
    const signatureY = 500;
    doc.moveTo(150, signatureY).lineTo(350, signatureY).stroke("#333333");
    doc
      .font("Helvetica", 10)
      .fill("#666666")
      .moveTo(0, signatureY + 10)
      .text("Director", {
        align: "center",
      });

    // Church name and branding
    doc
      .font("Helvetica-Bold", 14)
      .fill("#1a3a3a")
      .moveTo(0, 580)
      .text("Rivercrest Free Methodist Church", {
        align: "center",
      });

    doc
      .font("Helvetica", 10)
      .fill("#666666")
      .moveTo(0, 600)
      .text("Center of Studies", {
        align: "center",
      });

    // Certificate ID (for tracking)
    const certificateId = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    doc
      .font("Helvetica", 8)
      .fill("#999999")
      .moveTo(0, pageHeight - 40)
      .text(`Certificate ID: ${certificateId}`, {
        align: "center",
      });

    // Finalize PDF
    (doc as any).end();
  });
}

/**
 * Generate a certificate filename
 * @param studentName - Name of the student
 * @param moduleName - Name of the module
 * @returns Filename for the certificate
 */
export function generateCertificateFilename(studentName: string, moduleName: string): string {
  const sanitizedName = studentName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const sanitizedModule = moduleName.replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const timestamp = new Date().toISOString().split("T")[0];
  return `certificate_${sanitizedName}_${sanitizedModule}_${timestamp}.pdf`;
}
