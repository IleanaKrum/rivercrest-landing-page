import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Center of Studies - Training tracks and courses
export const trainingTracks = mysqlTable("training_tracks", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // "Deacon Formation", "Evangelist Training", etc.
  description: text("description"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TrainingTrack = typeof trainingTracks.$inferSelect;
export type InsertTrainingTrack = typeof trainingTracks.$inferInsert;

// Courses within each training track
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  trackId: int("trackId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  syllabus: text("syllabus"), // Full course syllabus
  sessionsCount: int("sessionsCount").default(0),
  commitmentHours: int("commitmentHours").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Course = typeof courses.$inferSelect;
export type InsertCourse = typeof courses.$inferInsert;

// Course sessions with details
export const courseSessions = mysqlTable("course_sessions", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  sessionNumber: int("sessionNumber").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  topics: text("topics"), // JSON array of topics
  assignments: text("assignments"), // JSON array of assignments
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CourseSession = typeof courseSessions.$inferSelect;
export type InsertCourseSession = typeof courseSessions.$inferInsert;

// Student applications to training programs
export const applications = mysqlTable("applications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  trackId: int("trackId").notNull(),
  candidateName: varchar("candidateName", { length: 255 }).notNull(),
  candidateAddress: text("candidateAddress"),
  churchName: varchar("churchName", { length: 255 }).notNull(),
  leadPastorName: varchar("leadPastorName", { length: 255 }).notNull(),
  recommendationLetterUrl: varchar("recommendationLetterUrl", { length: 512 }),
  essay: text("essay"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

// Student enrollments in courses
export const enrollments = mysqlTable("enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  applicationId: int("applicationId"),
  enrolledAt: timestamp("enrolledAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  status: mysqlEnum("status", ["enrolled", "in_progress", "completed"]).default("enrolled"),
});

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = typeof enrollments.$inferInsert;

// Student progress tracking
export const studentProgress = mysqlTable("student_progress", {
  id: int("id").autoincrement().primaryKey(),
  enrollmentId: int("enrollmentId").notNull(),
  sessionId: int("sessionId").notNull(),
  completed: int("completed").default(0), // 0 or 1
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type StudentProgress = typeof studentProgress.$inferSelect;
export type InsertStudentProgress = typeof studentProgress.$inferInsert;