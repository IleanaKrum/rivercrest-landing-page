import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { forumThreads, forumPosts, courses, users } from "./drizzle/schema.ts";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

async function seedForum() {
  console.log("[Seed Forum] Starting forum data population...");

  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  try {
    // Get existing data
    const existingCourses = await db.select().from(courses).limit(5);
    const existingUsers = await db.select().from(users).limit(2);

    if (existingCourses.length === 0) {
      console.log("[Seed Forum] No courses found. Please run seed-center-of-studies.mjs first.");
      return;
    }

    if (existingUsers.length === 0) {
      console.log("[Seed Forum] No users found. Creating test user...");
      // Create a test user for forum posts
      await db.insert(users).values({
        openId: "test-forum-user-001",
        name: "Forum Moderator",
        email: "forum@rivercrestfmc.org",
        role: "admin",
      });
    }

    const testUser = existingUsers[0] || (await db.select().from(users).limit(1))[0];
    const course1 = existingCourses[0];
    const course2 = existingCourses[1];

    console.log("[Seed Forum] Creating forum threads...");

    // Create sample threads for course 1
    const thread1 = await db.insert(forumThreads).values({
      courseId: course1.id,
      userId: testUser.id,
      title: "Welcome to the Discussion Forum!",
      content:
        "This is a space for students to discuss course material, ask questions, and share insights. Please be respectful and constructive in all conversations. Looking forward to engaging discussions!",
      isApproved: 1,
      isDeleted: 0,
    });

    const thread2 = await db.insert(forumThreads).values({
      courseId: course1.id,
      userId: testUser.id,
      title: "Key Concepts from This Week's Lessons",
      content:
        "Let's discuss the main concepts covered this week. What stood out to you? What questions do you have? Feel free to share your thoughts and reflections on the material.",
      isApproved: 1,
      isDeleted: 0,
    });

    const thread3 = await db.insert(forumThreads).values({
      courseId: course1.id,
      userId: testUser.id,
      title: "Real-World Application Questions",
      content:
        "How can we apply what we're learning to our ministries and communities? Share examples of how this course content relates to your practical experience.",
      isApproved: 1,
      isDeleted: 0,
    });

    // Create sample threads for course 2
    const thread4 = await db.insert(forumThreads).values({
      courseId: course2.id,
      userId: testUser.id,
      title: "Getting Started with This Course",
      content:
        "Welcome everyone! This thread is for introductions and initial questions as we begin this journey together. Share a bit about yourself and what you hope to gain from this course.",
      isApproved: 1,
      isDeleted: 0,
    });

    const thread5 = await db.insert(forumThreads).values({
      courseId: course2.id,
      userId: testUser.id,
      title: "Study Group Coordination",
      content:
        "Would anyone be interested in forming a study group? This thread can help coordinate times and topics for collaborative learning.",
      isApproved: 1,
      isDeleted: 0,
    });

    console.log("[Seed Forum] Creating forum posts...");

    // Create sample posts for thread 1
    await db.insert(forumPosts).values({
      threadId: thread1.insertId,
      userId: testUser.id,
      content:
        "Thank you for creating this space! I'm excited to learn from my classmates and share perspectives on the material.",
      isApproved: 1,
      isDeleted: 0,
    });

    await db.insert(forumPosts).values({
      threadId: thread1.insertId,
      userId: testUser.id,
      content:
        "This is a great opportunity for us to deepen our understanding through dialogue. Looking forward to meaningful discussions!",
      isApproved: 1,
      isDeleted: 0,
    });

    // Create sample posts for thread 2
    await db.insert(forumPosts).values({
      threadId: thread2.insertId,
      userId: testUser.id,
      content:
        "I found the discussion on biblical foundations particularly insightful. It really helped clarify some concepts I was struggling with.",
      isApproved: 1,
      isDeleted: 0,
    });

    await db.insert(forumPosts).values({
      threadId: thread2.insertId,
      userId: testUser.id,
      content:
        "The historical context provided was excellent. It gave me a much deeper appreciation for the material.",
      isApproved: 1,
      isDeleted: 0,
    });

    // Create sample posts for thread 3
    await db.insert(forumPosts).values({
      threadId: thread3.insertId,
      userId: testUser.id,
      content:
        "In my church, we've been able to apply these principles to our outreach programs with great success. The community response has been overwhelming!",
      isApproved: 1,
      isDeleted: 0,
    });

    // Create sample posts for thread 4
    await db.insert(forumPosts).values({
      threadId: thread4.insertId,
      userId: testUser.id,
      content:
        "Hello everyone! I'm a pastor from the Midwest and I'm eager to learn more about this topic. Looking forward to our discussions!",
      isApproved: 1,
      isDeleted: 0,
    });

    // Create sample posts for thread 5
    await db.insert(forumPosts).values({
      threadId: thread5.insertId,
      userId: testUser.id,
      content:
        "I'd be interested in a study group! I'm available most evenings EST. Would that work for others?",
      isApproved: 1,
      isDeleted: 0,
    });

    await db.insert(forumPosts).values({
      threadId: thread5.insertId,
      userId: testUser.id,
      content:
        "Great idea! I'm in different time zone but can work around schedules. Let's make this happen!",
      isApproved: 1,
      isDeleted: 0,
    });

    console.log("[Seed Forum] ✅ Forum data population completed successfully!");
    console.log("[Seed Forum] Summary:");
    console.log(`  - Forum Threads: 5`);
    console.log(`  - Forum Posts: 8`);
    console.log("[Seed Forum] Sample forum data ready for testing!");
  } catch (error) {
    console.error("[Seed Forum] Error:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

seedForum().catch((error) => {
  console.error("Forum seed script failed:", error);
  process.exit(1);
});
