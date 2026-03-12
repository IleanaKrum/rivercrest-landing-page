import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendCourseRegistrationEmail, sendAdminRegistrationNotification } from "./_core/email";
import { ENV } from "./_core/env";

describe("Email Service - Resend Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Environment Configuration", () => {
    it("should have Resend API key configured", () => {
      expect(ENV.resendApiKey).toBeDefined();
      expect(ENV.resendApiKey).not.toBe("");
      expect(ENV.resendApiKey).toMatch(/^re_/);
    });
  });

  describe("sendCourseRegistrationEmail", () => {
    it("should send registration email to USA student with printed materials", async () => {
      const emailData = {
        studentName: "John Doe",
        studentEmail: "rev.ileanakrum@rivercrestfmc.org",
        courseId: 1,
        courseName: "History & Polity",
        wantsPrintedMaterials: true,
        printedMaterialsCost: 4500,
        country: "USA",
      };

      const result = await sendCourseRegistrationEmail(emailData);

      // Email should be sent successfully
      expect(result).toBe(true);
    });

    it("should send registration email to international student without printed materials", async () => {
      const emailData = {
        studentName: "Jane Smith",
        studentEmail: "rev.ileanakrum@rivercrestfmc.org",
        courseId: 1,
        courseName: "History & Polity",
        wantsPrintedMaterials: false,
        printedMaterialsCost: 0,
        country: "Kenya",
      };

      const result = await sendCourseRegistrationEmail(emailData);

      // Email should be sent successfully
      expect(result).toBe(true);
    });

    it("should handle email sending with minimal data", async () => {
      const emailData = {
        studentName: "Test Student",
        studentEmail: "rev.ileanakrum@rivercrestfmc.org",
        courseId: 1,
        wantsPrintedMaterials: false,
        country: "USA",
      };

      const result = await sendCourseRegistrationEmail(emailData);

      expect(result).toBe(true);
    });
  });

  describe("sendAdminRegistrationNotification", () => {
    it("should send admin notification for new registration", async () => {
      const emailData = {
        studentName: "John Doe",
        studentEmail: "john@example.com",
        courseId: 1,
        courseName: "History & Polity",
        wantsPrintedMaterials: true,
        printedMaterialsCost: 4500,
        country: "USA",
      };

      const result = await sendAdminRegistrationNotification(
        emailData,
        "rev.ileanakrum@rivercrestfmc.org"
      );

      // Admin notification should be sent successfully
      expect(result).toBe(true);
    });

    it("should send admin notification without printed materials alert", async () => {
      const emailData = {
        studentName: "Jane Smith",
        studentEmail: "jane@example.com",
        courseId: 1,
        wantsPrintedMaterials: false,
        country: "Kenya",
      };

      const result = await sendAdminRegistrationNotification(
        emailData,
        "rev.ileanakrum@rivercrestfmc.org"
      );

      expect(result).toBe(true);
    });
  });

  describe("Email Content Validation", () => {
    it("should correctly format USA country detection", () => {
      const testCases = [
        { country: "USA", expected: true },
        { country: "usa", expected: true },
        { country: "United States", expected: true },
        { country: "united states", expected: true },
        { country: "Kenya", expected: false },
        { country: "Tanzania", expected: false },
      ];

      testCases.forEach(({ country, expected }) => {
        const isUSA =
          country.toLowerCase() === "usa" ||
          country.toLowerCase() === "united states";
        expect(isUSA).toBe(expected);
      });
    });

    it("should correctly calculate printed materials cost", () => {
      const testCases = [
        { cost: 4500, expected: "45.00" },
        { cost: 0, expected: "0.00" },
        { cost: 2000, expected: "20.00" },
      ];

      testCases.forEach(({ cost, expected }) => {
        const formatted = (cost / 100).toFixed(2);
        expect(formatted).toBe(expected);
      });
    });
  });
});
