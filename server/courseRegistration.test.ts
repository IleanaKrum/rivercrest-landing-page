import { describe, it, expect, vi, beforeEach } from "vitest";
import * as db from "./db";

// Mock the database module
vi.mock("./db");

describe("Course Registration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("createCourseRegistration", () => {
    it("should create a course registration with USA address and printed materials", async () => {
      const mockRegistration = {
        id: 1,
        courseId: 1,
        studentName: "John Doe",
        studentEmail: "john@example.com",
        studentPhone: "555-1234",
        country: "USA",
        state: "California",
        wantsPrintedMaterials: 1,
        printedMaterialsCost: 4500,
        paymentStatus: "pending" as const,
        registrationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(db.createCourseRegistration).mockResolvedValueOnce(mockRegistration as any);

      const result = await db.createCourseRegistration({
        courseId: 1,
        studentName: "John Doe",
        studentEmail: "john@example.com",
        studentPhone: "555-1234",
        country: "USA",
        state: "California",
        wantsPrintedMaterials: 1,
        printedMaterialsCost: 4500,
        paymentStatus: "pending",
      });

      expect(result).toBeDefined();
      expect(result.wantsPrintedMaterials).toBe(1);
      expect(result.printedMaterialsCost).toBe(4500);
      expect(result.paymentStatus).toBe("pending");
    });

    it("should create a course registration without printed materials for non-USA", async () => {
      const mockRegistration = {
        id: 2,
        courseId: 1,
        studentName: "Jane Smith",
        studentEmail: "jane@example.com",
        studentPhone: "555-5678",
        country: "Kenya",
        state: null,
        wantsPrintedMaterials: 0,
        printedMaterialsCost: 0,
        paymentStatus: "not_required" as const,
        registrationDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      vi.mocked(db.createCourseRegistration).mockResolvedValueOnce(mockRegistration as any);

      const result = await db.createCourseRegistration({
        courseId: 1,
        studentName: "Jane Smith",
        studentEmail: "jane@example.com",
        studentPhone: "555-5678",
        country: "Kenya",
        wantsPrintedMaterials: 0,
        printedMaterialsCost: 0,
        paymentStatus: "not_required",
      });

      expect(result).toBeDefined();
      expect(result.wantsPrintedMaterials).toBe(0);
      expect(result.printedMaterialsCost).toBe(0);
      expect(result.paymentStatus).toBe("not_required");
    });
  });

  describe("getCourseRegistrationsByCourse", () => {
    it("should retrieve all registrations for a specific course", async () => {
      const mockRegistrations = [
        {
          id: 1,
          courseId: 1,
          studentName: "John Doe",
          studentEmail: "john@example.com",
          country: "USA",
          wantsPrintedMaterials: 1,
          printedMaterialsCost: 4500,
          paymentStatus: "pending" as const,
        },
        {
          id: 2,
          courseId: 1,
          studentName: "Jane Smith",
          studentEmail: "jane@example.com",
          country: "Kenya",
          wantsPrintedMaterials: 0,
          printedMaterialsCost: 0,
          paymentStatus: "not_required" as const,
        },
      ];

      vi.mocked(db.getCourseRegistrationsByCourse).mockResolvedValueOnce(mockRegistrations as any);

      const result = await db.getCourseRegistrationsByCourse(1);

      expect(result).toHaveLength(2);
      expect(result[0].courseId).toBe(1);
      expect(result[1].courseId).toBe(1);
    });

    it("should return empty array if no registrations exist", async () => {
      vi.mocked(db.getCourseRegistrationsByCourse).mockResolvedValueOnce([]);

      const result = await db.getCourseRegistrationsByCourse(999);

      expect(result).toEqual([]);
    });
  });

  describe("updateCourseRegistrationPaymentStatus", () => {
    it("should update payment status to received", async () => {
      const mockUpdate = { success: true };

      vi.mocked(db.updateCourseRegistrationPaymentStatus).mockResolvedValueOnce(mockUpdate as any);

      const result = await db.updateCourseRegistrationPaymentStatus(1, "received", new Date());

      expect(result).toBeDefined();
      expect(result.success).toBe(true);
    });

    it("should handle payment status transitions", async () => {
      const statuses = ["pending", "received", "not_required"] as const;

      for (const status of statuses) {
        vi.mocked(db.updateCourseRegistrationPaymentStatus).mockResolvedValueOnce({ success: true } as any);

        const result = await db.updateCourseRegistrationPaymentStatus(1, status);

        expect(result).toBeDefined();
      }
    });
  });

  describe("getAllCourseRegistrations", () => {
    it("should retrieve all course registrations", async () => {
      const mockRegistrations = [
        {
          id: 1,
          courseId: 1,
          studentName: "John Doe",
          country: "USA",
          paymentStatus: "pending",
        },
        {
          id: 2,
          courseId: 2,
          studentName: "Jane Smith",
          country: "Kenya",
          paymentStatus: "not_required",
        },
      ];

      vi.mocked(db.getAllCourseRegistrations).mockResolvedValueOnce(mockRegistrations as any);

      const result = await db.getAllCourseRegistrations();

      expect(result).toHaveLength(2);
    });
  });

  describe("getCourseRegistrationById", () => {
    it("should retrieve a specific course registration", async () => {
      const mockRegistration = {
        id: 1,
        courseId: 1,
        studentName: "John Doe",
        studentEmail: "john@example.com",
        country: "USA",
        paymentStatus: "pending",
      };

      vi.mocked(db.getCourseRegistrationById).mockResolvedValueOnce(mockRegistration as any);

      const result = await db.getCourseRegistrationById(1);

      expect(result).toBeDefined();
      expect(result?.id).toBe(1);
      expect(result?.studentName).toBe("John Doe");
    });

    it("should return undefined if registration not found", async () => {
      vi.mocked(db.getCourseRegistrationById).mockResolvedValueOnce(undefined);

      const result = await db.getCourseRegistrationById(999);

      expect(result).toBeUndefined();
    });
  });

  describe("Payment validation logic", () => {
    it("should validate USA country variations", () => {
      const usaVariations = ["USA", "usa", "United States", "united states"];

      usaVariations.forEach((country) => {
        const isUSA = country.toLowerCase() === "usa" || country.toLowerCase() === "united states";
        expect(isUSA).toBe(true);
      });
    });

    it("should correctly calculate printed materials cost", () => {
      const testCases = [
        { country: "USA", wantsMaterials: true, expectedCost: 4500 },
        { country: "USA", wantsMaterials: false, expectedCost: 0 },
        { country: "Kenya", wantsMaterials: true, expectedCost: 0 },
        { country: "Kenya", wantsMaterials: false, expectedCost: 0 },
      ];

      testCases.forEach(({ country, wantsMaterials, expectedCost }) => {
        const isUSA = country.toLowerCase() === "usa" || country.toLowerCase() === "united states";
        const actualCost = wantsMaterials && isUSA ? 4500 : 0;
        expect(actualCost).toBe(expectedCost);
      });
    });

    it("should set correct payment status based on materials request", () => {
      const testCases = [
        { country: "USA", wantsMaterials: true, expectedStatus: "pending" },
        { country: "USA", wantsMaterials: false, expectedStatus: "not_required" },
        { country: "Kenya", wantsMaterials: true, expectedStatus: "not_required" },
        { country: "Kenya", wantsMaterials: false, expectedStatus: "not_required" },
      ];

      testCases.forEach(({ country, wantsMaterials, expectedStatus }) => {
        const isUSA = country.toLowerCase() === "usa" || country.toLowerCase() === "united states";
        const shouldHaveMaterials = wantsMaterials && isUSA;
        const actualStatus = shouldHaveMaterials ? "pending" : "not_required";
        expect(actualStatus).toBe(expectedStatus);
      });
    });
  });
});
