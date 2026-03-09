import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./drizzle/schema.ts";
import { eq } from "drizzle-orm";

async function integrateChecklist() {
  // Create connection with SSL
  const connection = await mysql.createConnection({
    uri: process.env.DATABASE_URL,
    ssl: "amazon",
  });

  const db = drizzle(connection, { schema });

  try {
    console.log("Fetching History & Polity courses...");

    // Get all History & Polity courses
    const courses = await db
      .select()
      .from(schema.courses)
      .where(eq(schema.courses.title, "FMC History & Polity"));

    if (courses.length === 0) {
      console.log("No History & Polity courses found");
      return;
    }

    console.log(`Found ${courses.length} History & Polity courses`);

    // Define the 8-week milestones data
    const milestonesData = [
      {
        weekNumber: 1,
        phase: "Phase 1: FM History (Weeks 1–3)",
        title: "Week 1: Begin Reading",
        description: "Start foundational reading materials",
        milestones: [
          "Begin reading B.T. and Ellen Roberts and the First Free Methodists",
          "Begin reading Fire Among the Stubble",
          "Review course syllabus and requirements",
        ],
        assignments: [],
        readingMaterials: [
          "B.T. and Ellen Roberts and the First Free Methodists",
          "Fire Among the Stubble",
        ],
      },
      {
        weekNumber: 2,
        phase: "Phase 1: FM History (Weeks 1–3)",
        title: "Week 2: FM History Lessons",
        description: "Complete three lessons focused on FM History",
        milestones: [
          "Complete Lesson 1: Foundations of Free Methodism",
          "Complete Lesson 2: B.T. Roberts and Early Leadership",
          "Complete Lesson 3: Growth and Development of the Movement",
        ],
        assignments: [],
        readingMaterials: [
          "Course Module 1: FM History Overview",
          "Course Module 2: Founding Principles",
          "Course Module 3: Historical Development",
        ],
      },
      {
        weekNumber: 3,
        phase: "Phase 1: FM History (Weeks 1–3)",
        title: "Week 3: History Submissions",
        description: "Submit all history section work",
        milestones: [
          "Complete Celebrations of Learning (Quizzes/Tests) for Section One",
          "Submit Practical Application Essay regarding history",
          "Submit Narrated PowerPoint presentation",
        ],
        assignments: [
          "Quiz/Test: FM History Celebrations of Learning",
          "Essay: Practical Application of FM History",
          "Project: Narrated PowerPoint Presentation",
        ],
        readingMaterials: [],
      },
      {
        weekNumber: 4,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 4: Begin Polity Study",
        description: "Start working through polity lessons",
        milestones: [
          "Begin Lesson 1: Introduction to FM Polity",
          "Begin Lesson 2: Church Structure and Governance",
          "Study 2019 Book of Discipline (Chapters 1-3)",
        ],
        assignments: [],
        readingMaterials: [
          "2019 Book of Discipline (Chapters 1-3)",
          "Pastors and Church Leaders Manual (Introduction)",
        ],
      },
      {
        weekNumber: 5,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 5: Continue Polity Study",
        description: "Continue through polity lessons and materials",
        milestones: [
          "Complete Lessons 3-6: Core Polity Principles",
          "Study 2019 Book of Discipline (Chapters 4-6)",
          "Review Pastors and Church Leaders Manual (Sections 1-2)",
        ],
        assignments: [],
        readingMaterials: [
          "2019 Book of Discipline (Chapters 4-6)",
          "Pastors and Church Leaders Manual (Sections 1-2)",
        ],
      },
      {
        weekNumber: 6,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 6: Complete Polity Lessons",
        description: "Finish all polity lessons",
        milestones: [
          "Complete Lessons 7-12: Advanced Polity Topics",
          "Study 2019 Book of Discipline (Chapters 7-9)",
          "Review Pastors and Church Leaders Manual (Sections 3-4)",
        ],
        assignments: [],
        readingMaterials: [
          "2019 Book of Discipline (Chapters 7-9)",
          "Pastors and Church Leaders Manual (Sections 3-4)",
          "First Lessons on Money",
        ],
      },
      {
        weekNumber: 7,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 7: Polity Submissions",
        description: "Submit polity section work",
        milestones: [
          "Complete Celebrations of Learning for Section Two",
          "Submit Practical Application Essays for polity section",
          "Review all submitted work for completeness",
        ],
        assignments: [
          "Quiz/Test: FM Polity Celebrations of Learning",
          "Essays: Practical Application of FM Polity",
        ],
        readingMaterials: [],
      },
      {
        weekNumber: 8,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 8: Final Requirements",
        description: "Complete final requirements and reflection",
        milestones: [
          "Perform self-evaluation of calling to FMC ministry",
          "Submit Final Project",
          "Verify all assignments meet grading requirements (73% minimum)",
          "Confirm integrity of all submitted work",
        ],
        assignments: [
          "Self-Evaluation: Calling and Commitment",
          "Final Project: Comprehensive Ministry Application",
        ],
        readingMaterials: [],
      },
    ];

    // For each History & Polity course, create a checklist with milestones
    for (const course of courses) {
      console.log(`Processing course ${course.id} for track ${course.trackId}...`);

      // Create checklist for this course
      const checklistResult = await db.insert(schema.courseChecklists).values({
        courseId: course.id,
        title: "8-Week Intensive Checklist",
        description:
          "Complete guide for the intensive 8-week History & Polity course with weekly milestones and assignments",
        totalWeeks: 8,
      });

      const checklistId = checklistResult[0].insertId;
      console.log(`Created checklist ${checklistId} for course ${course.id}`);

      // Insert all weekly milestones for this checklist
      for (const milestone of milestonesData) {
        await db.insert(schema.weeklyMilestones).values({
          checklistId: checklistId,
          weekNumber: milestone.weekNumber,
          phase: milestone.phase,
          title: milestone.title,
          description: milestone.description,
          milestones: JSON.stringify(milestone.milestones),
          assignments: JSON.stringify(milestone.assignments),
          readingMaterials: JSON.stringify(milestone.readingMaterials),
        });
      }

      console.log(`Added 8 weekly milestones to checklist ${checklistId}`);
    }

    console.log(
      "✅ Successfully integrated 8-week checklist into all History & Polity courses!"
    );
  } catch (error) {
    console.error("Error integrating checklist:", error);
  } finally {
    await connection.end();
  }
}

integrateChecklist();
