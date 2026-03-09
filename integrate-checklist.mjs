import mysql from "mysql2/promise";

const connectionConfig = {
  host: process.env.DATABASE_URL?.split("://")[1]?.split("@")[1]?.split(":")[0] || "localhost",
  user: process.env.DATABASE_URL?.split("://")[1]?.split(":")[0] || "root",
  password: process.env.DATABASE_URL?.split(":")[2]?.split("@")[0] || "",
  database: process.env.DATABASE_URL?.split("/").pop() || "rivercrest",
};

async function integrateChecklist() {
  const connection = await mysql.createConnection(connectionConfig);

  try {
    // Get all History & Polity courses
    const [courses] = await connection.query(
      "SELECT id, trackId FROM courses WHERE title = 'FMC History & Polity'"
    );

    if (courses.length === 0) {
      console.log("No History & Polity courses found");
      return;
    }

    console.log(`Found ${courses.length} History & Polity courses`);

    // Create the 8-week intensive checklist
    const [checklistResult] = await connection.query(
      "INSERT INTO course_checklists (courseId, title, description, totalWeeks) VALUES (?, ?, ?, ?)",
      [
        courses[0].id,
        "8-Week Intensive Checklist",
        "Complete guide for the intensive 8-week History & Polity course with weekly milestones and assignments",
        8,
      ]
    );

    const checklistId = checklistResult.insertId;
    console.log(`Created checklist with ID: ${checklistId}`);

    // Define the 8-week milestones
    const milestones = [
      {
        weekNumber: 1,
        phase: "Phase 1: FM History (Weeks 1–3)",
        title: "Week 1: Begin Reading",
        description: "Start foundational reading materials",
        milestones: JSON.stringify([
          "Begin reading B.T. and Ellen Roberts and the First Free Methodists",
          "Begin reading Fire Among the Stubble",
          "Review course syllabus and requirements",
        ]),
        assignments: JSON.stringify([]),
        readingMaterials: JSON.stringify([
          "B.T. and Ellen Roberts and the First Free Methodists",
          "Fire Among the Stubble",
        ]),
      },
      {
        weekNumber: 2,
        phase: "Phase 1: FM History (Weeks 1–3)",
        title: "Week 2: FM History Lessons",
        description: "Complete three lessons focused on FM History",
        milestones: JSON.stringify([
          "Complete Lesson 1: Foundations of Free Methodism",
          "Complete Lesson 2: B.T. Roberts and Early Leadership",
          "Complete Lesson 3: Growth and Development of the Movement",
        ]),
        assignments: JSON.stringify([]),
        readingMaterials: JSON.stringify([
          "Course Module 1: FM History Overview",
          "Course Module 2: Founding Principles",
          "Course Module 3: Historical Development",
        ]),
      },
      {
        weekNumber: 3,
        phase: "Phase 1: FM History (Weeks 1–3)",
        title: "Week 3: History Submissions",
        description: "Submit all history section work",
        milestones: JSON.stringify([
          "Complete Celebrations of Learning (Quizzes/Tests) for Section One",
          "Submit Practical Application Essay regarding history",
          "Submit Narrated PowerPoint presentation",
        ]),
        assignments: JSON.stringify([
          "Quiz/Test: FM History Celebrations of Learning",
          "Essay: Practical Application of FM History",
          "Project: Narrated PowerPoint Presentation",
        ]),
        readingMaterials: JSON.stringify([]),
      },
      {
        weekNumber: 4,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 4: Begin Polity Study",
        description: "Start working through polity lessons",
        milestones: JSON.stringify([
          "Begin Lesson 1: Introduction to FM Polity",
          "Begin Lesson 2: Church Structure and Governance",
          "Study 2019 Book of Discipline (Chapters 1-3)",
        ]),
        assignments: JSON.stringify([]),
        readingMaterials: JSON.stringify([
          "2019 Book of Discipline (Chapters 1-3)",
          "Pastors and Church Leaders Manual (Introduction)",
        ]),
      },
      {
        weekNumber: 5,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 5: Continue Polity Study",
        description: "Continue through polity lessons and materials",
        milestones: JSON.stringify([
          "Complete Lessons 3-6: Core Polity Principles",
          "Study 2019 Book of Discipline (Chapters 4-6)",
          "Review Pastors and Church Leaders Manual (Sections 1-2)",
        ]),
        assignments: JSON.stringify([]),
        readingMaterials: JSON.stringify([
          "2019 Book of Discipline (Chapters 4-6)",
          "Pastors and Church Leaders Manual (Sections 1-2)",
        ]),
      },
      {
        weekNumber: 6,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 6: Complete Polity Lessons",
        description: "Finish all polity lessons",
        milestones: JSON.stringify([
          "Complete Lessons 7-12: Advanced Polity Topics",
          "Study 2019 Book of Discipline (Chapters 7-9)",
          "Review Pastors and Church Leaders Manual (Sections 3-4)",
        ]),
        assignments: JSON.stringify([]),
        readingMaterials: JSON.stringify([
          "2019 Book of Discipline (Chapters 7-9)",
          "Pastors and Church Leaders Manual (Sections 3-4)",
          "First Lessons on Money",
        ]),
      },
      {
        weekNumber: 7,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 7: Polity Submissions",
        description: "Submit polity section work",
        milestones: JSON.stringify([
          "Complete Celebrations of Learning for Section Two",
          "Submit Practical Application Essays for polity section",
          "Review all submitted work for completeness",
        ]),
        assignments: JSON.stringify([
          "Quiz/Test: FM Polity Celebrations of Learning",
          "Essays: Practical Application of FM Polity",
        ]),
        readingMaterials: JSON.stringify([]),
      },
      {
        weekNumber: 8,
        phase: "Phase 2: FM Polity (Weeks 4–8)",
        title: "Week 8: Final Requirements",
        description: "Complete final requirements and reflection",
        milestones: JSON.stringify([
          "Perform self-evaluation of calling to FMC ministry",
          "Submit Final Project",
          "Verify all assignments meet grading requirements (73% minimum)",
          "Confirm integrity of all submitted work",
        ]),
        assignments: JSON.stringify([
          "Self-Evaluation: Calling and Commitment",
          "Final Project: Comprehensive Ministry Application",
        ]),
        readingMaterials: JSON.stringify([]),
      },
    ];

    // Insert all weekly milestones
    for (const milestone of milestones) {
      await connection.query(
        "INSERT INTO weekly_milestones (checklistId, weekNumber, phase, title, description, milestones, assignments, readingMaterials) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          checklistId,
          milestone.weekNumber,
          milestone.phase,
          milestone.title,
          milestone.description,
          milestone.milestones,
          milestone.assignments,
          milestone.readingMaterials,
        ]
      );
    }

    console.log(`Successfully created 8 weekly milestones for checklist ${checklistId}`);

    // Update all History & Polity courses to reference this checklist
    for (const course of courses) {
      // Insert checklist for each course if not already done
      const [existingChecklist] = await connection.query(
        "SELECT id FROM course_checklists WHERE courseId = ?",
        [course.id]
      );

      if (existingChecklist.length === 0) {
        const [newChecklistResult] = await connection.query(
          "INSERT INTO course_checklists (courseId, title, description, totalWeeks) VALUES (?, ?, ?, ?)",
          [
            course.id,
            "8-Week Intensive Checklist",
            "Complete guide for the intensive 8-week History & Polity course with weekly milestones and assignments",
            8,
          ]
        );

        const newChecklistId = newChecklistResult.insertId;

        // Copy all milestones to this course's checklist
        for (const milestone of milestones) {
          await connection.query(
            "INSERT INTO weekly_milestones (checklistId, weekNumber, phase, title, description, milestones, assignments, readingMaterials) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              newChecklistId,
              milestone.weekNumber,
              milestone.phase,
              milestone.title,
              milestone.description,
              milestone.milestones,
              milestone.assignments,
              milestone.readingMaterials,
            ]
          );
        }

        console.log(`Created checklist for course ${course.id} (Track ${course.trackId})`);
      }
    }

    console.log("✅ Successfully integrated 8-week checklist into all History & Polity courses!");
  } catch (error) {
    console.error("Error integrating checklist:", error);
  } finally {
    await connection.end();
  }
}

integrateChecklist();
