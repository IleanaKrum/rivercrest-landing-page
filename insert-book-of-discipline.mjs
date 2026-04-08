import { getDb } from './server/db.ts';
import { resources } from './drizzle/schema.ts';

async function insertBookOfDiscipline() {
  try {
    const db = await getDb();
    if (!db) {
      console.error("❌ Database not available");
      process.exit(1);
    }

    const result = await db.insert(resources).values({
      title: "The Book of Discipline — Kitabu cha Maongozi",
      description: "Free Methodist Church Book of Discipline - Bilingual presentation (English & Swahili)",
      category: "book",
      language: "Bilingual",
      fileUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/TheBookofDiscipline—KitabuchaMaongozi_d9406f75",
      fileName: "TheBookofDiscipline—KitabuchaMaongozi.pptx",
      fileSize: 6875016,
      author: "Free Methodist Church",
      publishDate: new Date(),
      isPublished: 1,
      displayOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✅ Book of Discipline successfully added to resources!");
    console.log("Insert result:", result);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding resource:", error);
    process.exit(1);
  }
}

insertBookOfDiscipline();
