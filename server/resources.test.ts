import { describe, it, expect, beforeAll } from "vitest";
import * as db from "./db";

/**
 * Resources API Tests
 * Tests for resource management functionality
 */
describe("Resources API", () => {
  let createdResourceId: number;

  describe("Resource Creation", () => {
    it("should create a new resource", async () => {
      const result = await db.createResource({
        title: "Test Book of Discipline",
        description: "Test description for the Book of Discipline",
        category: "book",
        language: "English",
        fileUrl: "https://example.com/test-book.pdf",
        fileName: "test-book.pdf",
        fileSize: 2000000,
        author: "Free Methodist Church",
        isPublished: 1,
      });

      expect(result).toBeDefined();
    });

    it("should create a resource in Swahili", async () => {
      const result = await db.createResource({
        title: "Kitabu cha Maongozi - Book of Discipline (Swahili)",
        description: "The Free Methodist Church Book of Discipline in Swahili",
        category: "book",
        language: "Swahili",
        fileUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/2023-Kitabu-cha-Maongozi-FMCUSA-Book-of-Discipline-Swahili-537fqh_e6a8dd3f.pdf",
        fileName: "2023-Kitabu-cha-Maongozi-FMCUSA-Book-of-Discipline-Swahili.pdf",
        fileSize: 2078715,
        author: "Free Methodist Church USA",
        isPublished: 1,
      });

      expect(result).toBeDefined();
    });
  });

  describe("Resource Retrieval", () => {
    it("should retrieve all published resources", async () => {
      const resources = await db.getAllResources();
      expect(Array.isArray(resources)).toBe(true);
      expect(resources.length).toBeGreaterThan(0);
    });

    it("should retrieve resources by category", async () => {
      const bookResources = await db.getResourcesByCategory("book");
      expect(Array.isArray(bookResources)).toBe(true);
      
      // All returned resources should be books
      bookResources.forEach((resource) => {
        expect(resource.category).toBe("book");
      });
    });

    it("should retrieve resources with correct language field", async () => {
      const resources = await db.getAllResources();
      const swahiliBooks = resources.filter((r) => r.language === "Swahili");
      
      expect(swahiliBooks.length).toBeGreaterThan(0);
      swahiliBooks.forEach((resource) => {
        expect(resource.language).toBe("Swahili");
      });
    });

    it("should retrieve resource by ID", async () => {
      const resources = await db.getAllResources();
      if (resources.length > 0) {
        const firstResource = resources[0];
        const retrieved = await db.getResourceById(firstResource.id);
        
        expect(retrieved).toBeDefined();
        expect(retrieved?.id).toBe(firstResource.id);
        expect(retrieved?.title).toBe(firstResource.title);
      }
    });
  });

  describe("Resource Filtering", () => {
    it("should only return published resources", async () => {
      const resources = await db.getAllResources();
      
      resources.forEach((resource) => {
        expect(resource.isPublished).toBe(1);
      });
    });

    it("should filter resources by category correctly", async () => {
      const syllabusResources = await db.getResourcesByCategory("syllabus");
      
      syllabusResources.forEach((resource) => {
        expect(resource.category).toBe("syllabus");
        expect(resource.isPublished).toBe(1);
      });
    });
  });

  describe("Resource Metadata", () => {
    it("should include file information in resources", async () => {
      const resources = await db.getAllResources();
      
      resources.forEach((resource) => {
        expect(resource.fileUrl).toBeDefined();
        expect(resource.fileName).toBeDefined();
        expect(resource.fileUrl).toMatch(/^https:\/\//);
      });
    });

    it("should include author information when available", async () => {
      const resources = await db.getAllResources();
      const withAuthor = resources.filter((r) => r.author);
      
      expect(withAuthor.length).toBeGreaterThan(0);
      withAuthor.forEach((resource) => {
        expect(typeof resource.author).toBe("string");
      });
    });

    it("should have correct file size for Swahili Book of Discipline", async () => {
      const resources = await db.getAllResources();
      const swahiliBook = resources.find((r) => r.language === "Swahili" && r.category === "book");
      
      if (swahiliBook) {
        expect(swahiliBook.fileSize).toBe(2078715);
      }
    });
  });

  describe("Resource Update", () => {
    it("should update resource information", async () => {
      const resources = await db.getAllResources();
      if (resources.length > 0) {
        const resource = resources[0];
        
        await db.updateResource(resource.id, {
          description: "Updated description",
        });
        
        const updated = await db.getResourceById(resource.id);
        expect(updated?.description).toBe("Updated description");
      }
    });
  });

  describe("Resource Categories", () => {
    it("should support all resource categories", async () => {
      const categories = ["book", "syllabus", "guideline", "article", "other"];
      
      for (const category of categories) {
        const resources = await db.getResourcesByCategory(category);
        // Category should exist in database schema
        expect(Array.isArray(resources)).toBe(true);
      }
    });
  });
});
