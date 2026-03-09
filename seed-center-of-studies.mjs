import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import {
  trainingTracks,
  courses,
  courseSessions,
} from "./drizzle/schema.ts";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

async function seed() {
  console.log("[Seed] Starting Center of Studies population...");

  // Create connection
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection);

  try {
    // Clear existing data
    console.log("[Seed] Clearing existing data...");
    await db.delete(courseSessions);
    await db.delete(courses);
    await db.delete(trainingTracks);

    // Insert training tracks
    console.log("[Seed] Inserting training tracks...");
    const trackResults = await db.insert(trainingTracks).values([
      {
        name: "Deacon Formation",
        description:
          "Comprehensive training program for candidates preparing for deacon ordination in the Free Methodist Church. This track focuses on spiritual formation, biblical understanding, and pastoral care skills.",
      },
      {
        name: "Evangelist Training",
        description:
          "Specialized training for evangelists called to proclaim the gospel and lead others to faith in Christ. Emphasizes evangelism strategies, discipleship, and church planting principles.",
      },
      {
        name: "Local Church Candidates",
        description:
          "Training pathway for local church leaders and candidates preparing for ministry within their congregations. Covers pastoral leadership, counseling, and congregational care.",
      },
      {
        name: "Conference Ministerial Candidates",
        description:
          "Advanced training for candidates preparing for conference-level ministry and ordination. Includes advanced theology, leadership development, and denominational polity.",
      },
    ]);

    const tracks = await db.select().from(trainingTracks);
    console.log(`[Seed] Created ${tracks.length} training tracks`);

    // Insert courses for each track
    console.log("[Seed] Inserting courses...");

    // Deacon Formation Courses
    const deaconTrack = tracks[0];
    const evangelistTrack = tracks[1];
    const localChurchTrack = tracks[2];
    const conferenceTrack = tracks[3];

    const deaconCourses = await db.insert(courses).values([
      {
        trackId: deaconTrack.id,
        title: "Biblical Foundations for Deacons",
        description:
          "Explore the scriptural basis for the diaconate, studying Acts 6, 1 Timothy 3, and Titus 1. Understand the spiritual qualifications and responsibilities of deacons in the New Testament church.",
        syllabus:
          "Module 1: The Role of Deacons in Acts\nModule 2: Qualifications from 1 Timothy 3\nModule 3: Servant Leadership in Practice\nModule 4: Deacons in the Early Church",
        sessionsCount: 12,
        commitmentHours: 24,
      },
      {
        trackId: deaconTrack.id,
        title: "Spiritual Formation and Character",
        description:
          "Develop spiritual maturity and Christian character essential for diaconal ministry. Focus on prayer, Bible study, holiness, and personal discipleship.",
        syllabus:
          "Module 1: Prayer and Communion with God\nModule 2: Scripture Study Methods\nModule 3: Living a Holy Life\nModule 4: Personal Discipleship Journey",
        sessionsCount: 10,
        commitmentHours: 20,
      },
      {
        trackId: deaconTrack.id,
        title: "Pastoral Care and Counseling Basics",
        description:
          "Learn fundamental skills for providing pastoral care, visiting the sick, and offering basic spiritual counseling to church members.",
        syllabus:
          "Module 1: Listening and Empathy\nModule 2: Visiting the Sick and Homebound\nModule 3: Grief and Crisis Support\nModule 4: Boundaries in Pastoral Care",
        sessionsCount: 10,
        commitmentHours: 20,
      },
    ]);

    // Evangelist Training Courses
    const evangelistCourses = await db.insert(courses).values([
      {
        trackId: evangelistTrack.id,
        title: "Evangelism Theology and Methods",
        description:
          "Understand the theological foundation for evangelism and learn proven methods for sharing the gospel effectively across cultures.",
        syllabus:
          "Module 1: The Great Commission\nModule 2: Gospel Presentation Methods\nModule 3: Cultural Sensitivity in Evangelism\nModule 4: Follow-up and Discipleship",
        sessionsCount: 12,
        commitmentHours: 24,
      },
      {
        trackId: evangelistTrack.id,
        title: "Church Planting and Growth",
        description:
          "Develop skills for planting new churches and helping existing churches grow spiritually and numerically.",
        syllabus:
          "Module 1: Church Planting Principles\nModule 2: Leadership Development\nModule 3: Community Engagement\nModule 4: Sustainability and Growth",
        sessionsCount: 12,
        commitmentHours: 24,
      },
      {
        trackId: evangelistTrack.id,
        title: "Cross-Cultural Ministry",
        description:
          "Prepare for effective ministry across different cultural contexts, understanding worldviews and communication styles.",
        syllabus:
          "Module 1: Cultural Anthropology Basics\nModule 2: Communication Across Cultures\nModule 3: Contextualization of the Gospel\nModule 4: Building Multicultural Teams",
        sessionsCount: 10,
        commitmentHours: 20,
      },
    ]);

    // Local Church Candidates Courses
    const localChurchCourses = await db.insert(courses).values([
      {
        trackId: localChurchTrack.id,
        title: "Local Church Leadership",
        description:
          "Equip local church leaders with skills for effective congregational leadership, vision casting, and team building.",
        syllabus:
          "Module 1: Leadership Foundations\nModule 2: Vision and Mission Development\nModule 3: Team Building and Delegation\nModule 4: Conflict Resolution",
        sessionsCount: 10,
        commitmentHours: 20,
      },
      {
        trackId: localChurchTrack.id,
        title: "Worship and Liturgy",
        description:
          "Understand worship theology and learn to lead meaningful worship experiences that draw congregations closer to God.",
        syllabus:
          "Module 1: Theology of Worship\nModule 2: Liturgical Elements\nModule 3: Music and Worship Leading\nModule 4: Creating Meaningful Worship Experiences",
        sessionsCount: 8,
        commitmentHours: 16,
      },
      {
        trackId: localChurchTrack.id,
        title: "Discipleship and Small Groups",
        description:
          "Develop systems for discipling believers and facilitating small groups that foster spiritual growth and community.",
        syllabus:
          "Module 1: Discipleship Models\nModule 2: Small Group Leadership\nModule 3: Curriculum and Resources\nModule 4: Measuring Spiritual Growth",
        sessionsCount: 10,
        commitmentHours: 20,
      },
    ]);

    // Conference Ministerial Candidates Courses
    const conferenceCourses = await db.insert(courses).values([
      {
        trackId: conferenceTrack.id,
        title: "Advanced Theology and Doctrine",
        description:
          "Deep study of Christian theology, Free Methodist doctrine, and contemporary theological issues.",
        syllabus:
          "Module 1: Systematic Theology\nModule 2: Free Methodist Heritage and Doctrine\nModule 3: Contemporary Theological Issues\nModule 4: Theological Research and Writing",
        sessionsCount: 16,
        commitmentHours: 48,
      },
      {
        trackId: conferenceTrack.id,
        title: "Denominational Polity and History",
        description:
          "Comprehensive study of Free Methodist Church polity, governance, and historical development.",
        syllabus:
          "Module 1: Free Methodist History\nModule 2: Church Governance Structure\nModule 3: Ordination Standards\nModule 4: Denominational Missions and Vision",
        sessionsCount: 12,
        commitmentHours: 24,
      },
      {
        trackId: conferenceTrack.id,
        title: "Advanced Leadership and Ministry",
        description:
          "Develop advanced leadership competencies for conference-level ministry and organizational leadership.",
        syllabus:
          "Module 1: Strategic Leadership\nModule 2: Organizational Development\nModule 3: Financial Management\nModule 4: Vision Casting and Change Management",
        sessionsCount: 14,
        commitmentHours: 35,
      },
      {
        trackId: conferenceTrack.id,
        title: "Pastoral Care and Counseling Advanced",
        description:
          "Advanced training in pastoral counseling, crisis intervention, and mental health awareness for conference ministers.",
        syllabus:
          "Module 1: Counseling Theories and Techniques\nModule 2: Crisis Intervention\nModule 3: Mental Health and Spirituality\nModule 4: Ethical Issues in Counseling",
        sessionsCount: 12,
        commitmentHours: 24,
      },
    ]);

    // Insert course sessions
    console.log("[Seed] Inserting course sessions...");
    const allCourses = await db.select().from(courses);

    const sessionsToInsert = [];
    for (const course of allCourses) {
      for (let i = 1; i <= course.sessionsCount; i++) {
        sessionsToInsert.push({
          courseId: course.id,
          sessionNumber: i,
          title: `${course.title} - Session ${i}`,
          description: `Session ${i} of ${course.title}. This session covers key concepts and practical applications relevant to the course material.`,
          topics: JSON.stringify([
            "Core concepts",
            "Practical application",
            "Discussion and reflection",
          ]),
          assignments: JSON.stringify([
            "Reading assignment",
            "Reflection paper",
            "Group discussion",
          ]),
        });
      }
    }

    await db.insert(courseSessions).values(sessionsToInsert);
    console.log(`[Seed] Created ${sessionsToInsert.length} course sessions`);

    console.log("[Seed] ✅ Center of Studies population completed successfully!");
    console.log(`[Seed] Summary:`);
    console.log(`  - Training Tracks: ${tracks.length}`);
    console.log(`  - Courses: ${allCourses.length}`);
    console.log(`  - Course Sessions: ${sessionsToInsert.length}`);
  } catch (error) {
    console.error("[Seed] Error:", error);
    throw error;
  } finally {
    await connection.end();
  }
}

seed().catch((error) => {
  console.error("Seed script failed:", error);
  process.exit(1);
});
