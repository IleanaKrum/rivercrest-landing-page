import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { courses, courseSessions } from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

async function addHistoryPolityCourse() {
  console.log("[Seed] Starting History & Polity course integration...");

  // Create connection
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  try {
    // Get all training tracks
    const { trainingTracks } = await import("./drizzle/schema.ts");
    const allTracks = await db.select().from(trainingTracks);

    if (allTracks.length === 0) {
      throw new Error("No training tracks found in database");
    }

    console.log(`[Seed] Found ${allTracks.length} training tracks`);

    // Course content based on the PDF
    const courseData = {
      title: "FMC History & Polity",
      description:
        "A comprehensive course designed for Swahili-speaking leaders in training. This course simplifies complex academic language while maintaining rigorous Wesleyan theology and missional foundations required for deacons and ministerial candidates in the Free Methodist Church (FMC) USA.",
      syllabus: `SECTION ONE: OUR HISTORY (FM History)
Module 1: The Origins of the Free Methodist Church
- Understanding B.T. Roberts and the founding vision
- The 19th-century context and why the movement started
- Core values of the Free Methodist founders

Module 2: The Story of Our Founders
- B.T. and Ellen Roberts: Life and Legacy
- The first Free Methodists and their commitment to holiness
- How the movement grew and spread

Module 3: Church Renewal and Growth
- Learning from "Fire Among the Stubble"
- Understanding church renewal principles
- Applying historical lessons to contemporary ministry

SECTION TWO: OUR RULES AND LIFE (FM Polity)
Module 4: Articles of Religion - What We Believe
- Core theological beliefs of the Free Methodist Church
- Understanding our Holiness tradition
- The biblical foundation of our faith

Module 5: The Role of the Pastor
- Pastoral responsibilities and authority
- Leadership in the local church
- Spiritual care and discipleship

Module 6: Church Organization and Structure
- How the Free Methodist Church is organized
- Roles and responsibilities at different levels
- Understanding the Book of Discipline

Module 7: Practical Church Leadership
- Leading according to the Book of Discipline
- Managing church resources with integrity
- Biblical justice and compassion in community

Module 8: Missional Leadership
- Understanding our missional foundations
- Leading with vision and purpose
- Connecting history to contemporary ministry`,
      sessionsCount: 15,
      commitmentHours: 30,
    };

    // Add the course to each training track
    const insertedCourses = [];
    for (const track of allTracks) {
      console.log(`[Seed] Adding History & Polity course to ${track.name}...`);
      const result = await db.insert(courses).values({
        trackId: track.id,
        title: courseData.title,
        description: courseData.description,
        syllabus: courseData.syllabus,
        sessionsCount: courseData.sessionsCount,
        commitmentHours: courseData.commitmentHours,
      });
      insertedCourses.push({ trackId: track.id, trackName: track.name });
    }

    console.log(`[Seed] Added History & Polity course to ${insertedCourses.length} tracks`);

    // Get the newly inserted courses
    const newCourses = await db
      .select()
      .from(courses)
      .where(eq(courses.title, courseData.title));

    console.log(`[Seed] Found ${newCourses.length} newly inserted courses`);

    // Create sessions for each course
    const sessionsToInsert = [];
    for (const course of newCourses) {
      for (let i = 1; i <= course.sessionsCount; i++) {
        sessionsToInsert.push({
          courseId: course.id,
          sessionNumber: i,
          title: `FMC History & Polity - Session ${i}`,
          description: `Session ${i} of the FMC History & Polity course. This session covers key concepts from the Free Methodist Church's history and organizational structure.`,
          topics: JSON.stringify([
            "Core concepts",
            "Practical application",
            "Discussion and reflection",
            "Connection to ministry",
          ]),
          assignments: JSON.stringify([
            "Reading from Book of Discipline",
            "Reflection on historical lessons",
            "Group discussion",
            "Application to local church context",
          ]),
        });
      }
    }

    await db.insert(courseSessions).values(sessionsToInsert);
    console.log(`[Seed] Created ${sessionsToInsert.length} course sessions`);

    console.log("[Seed] ✅ History & Polity course integration completed successfully!");
    console.log(`[Seed] Summary:`);
    console.log(`  - Training Tracks Updated: ${insertedCourses.length}`);
    console.log(`  - Courses Added: ${newCourses.length}`);
    console.log(`  - Course Sessions Created: ${sessionsToInsert.length}`);
    console.log(`\n[Seed] The History & Polity course has been added to:`);
    for (const course of insertedCourses) {
      console.log(`  ✓ ${course.trackName}`);
    }
  } catch (error) {
    console.error("[Seed] Error:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

addHistoryPolityCourse().catch((error) => {
  console.error("Script failed:", error);
  process.exit(1);
});
