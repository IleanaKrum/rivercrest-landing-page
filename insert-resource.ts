import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { resources } from "./drizzle/schema";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL not set");
  process.exit(1);
}

async function main() {
  try {
    const db = drizzle(DATABASE_URL);
    
    const result = await db.insert(resources).values({
      title: "The Book of Discipline — Kitabu cha Maongozi",
      description: "Free Methodist Church Book of Discipline - Bilingual presentation (English & Swahili)",
      category: "book" as any,
      language: "Bilingual",
      fileUrl: "https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/TheBookofDiscipline—KitabuchaMaongozi_d9406f75",
      fileName: "TheBookofDiscipline—KitabuchaMaongozi.pptx",
      fileSize: 6875016,
      author: "Free Methodist Church",
      publishDate: new Date(),
      isPublished: 1,
      displayOrder: 1,
    });
    
    console.log("✅ Book of Discipline added successfully!");
    console.log("Resource ID:", result.insertId);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
