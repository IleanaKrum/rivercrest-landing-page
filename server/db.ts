import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, trainingTracks, courses, courseSessions, applications, enrollments, studentProgress, InsertApplication, InsertEnrollment, InsertStudentProgress } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Center of Studies queries
export async function getTrainingTracks() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(trainingTracks);
}

export async function getCoursesByTrack(trackId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courses).where(eq(courses.trackId, trackId));
}

export async function getCourseById(courseId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getCourseSessionsByCourse(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courseSessions).where(eq(courseSessions.courseId, courseId));
}

export async function createApplication(app: InsertApplication) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const result = await db.insert(applications).values(app);
  return result;
}

export async function getApplicationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(applications).where(eq(applications.userId, userId));
}

export async function getEnrollmentsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(enrollments).where(eq(enrollments.userId, userId));
}

export async function createEnrollment(enrollment: InsertEnrollment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(enrollments).values(enrollment);
}

export async function getStudentProgress(enrollmentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(studentProgress).where(eq(studentProgress.enrollmentId, enrollmentId));
}

export async function updateStudentProgress(enrollmentId: number, sessionId: number, completed: boolean) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  const existing = await db.select().from(studentProgress)
    .where(and(eq(studentProgress.enrollmentId, enrollmentId), eq(studentProgress.sessionId, sessionId)))
    .limit(1);
  
  if (existing.length > 0) {
    return db.update(studentProgress)
      .set({ completed: completed ? 1 : 0, updatedAt: new Date() })
      .where(eq(studentProgress.id, existing[0].id));
  } else {
    return db.insert(studentProgress).values({
      enrollmentId,
      sessionId,
      completed: completed ? 1 : 0,
    });
  }
}
