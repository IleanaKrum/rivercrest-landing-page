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
  candidateEmail: varchar("candidateEmail", { length: 320 }).notNull(),
  candidatePhone: varchar("candidatePhone", { length: 20 }),
  candidateAddress: text("candidateAddress"),
  churchName: varchar("churchName", { length: 255 }).notNull(),
  leadPastorName: varchar("leadPastorName", { length: 255 }).notNull(),
  recommendationLetterUrl: varchar("recommendationLetterUrl", { length: 512 }),
  essay: text("essay"),
  status: mysqlEnum("status", ["pending", "approved", "rejected"]).default("pending"),
  approvedBy: int("approvedBy"), // Foreign key to users (admin who approved)
  approvedAt: timestamp("approvedAt"), // When the application was approved
  rejectionReason: text("rejectionReason"), // Reason for rejection if rejected
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type InsertApplication = typeof applications.$inferInsert;

// Admin approvers for Center of Studies applications
export const adminApprovers = mysqlTable("admin_approvers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users
  name: varchar("name", { length: 255 }).notNull(), // e.g., "Rev. Pastor Ileana Krum"
  email: varchar("email", { length: 320 }).notNull(),
  isActive: int("isActive").default(1), // 0 or 1
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AdminApprover = typeof adminApprovers.$inferSelect;
export type InsertAdminApprover = typeof adminApprovers.$inferInsert;

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
// Course assignments (essays, projects, etc.)
export const assignments = mysqlTable("assignments", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  sessionId: int("sessionId"),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  assignmentType: mysqlEnum("assignmentType", ["essay", "project", "presentation", "reflection", "other"]).notNull(),
  dueDate: timestamp("dueDate"),
  instructions: text("instructions"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Assignment = typeof assignments.$inferSelect;
export type InsertAssignment = typeof assignments.$inferInsert;

// Student submissions for assignments
export const submissions = mysqlTable("submissions", {
  id: int("id").autoincrement().primaryKey(),
  assignmentId: int("assignmentId").notNull(),
  enrollmentId: int("enrollmentId").notNull(),
  userId: int("userId").notNull(),
  fileUrl: varchar("fileUrl", { length: 512 }),
  fileName: varchar("fileName", { length: 255 }),
  fileSize: int("fileSize"), // in bytes
  submissionText: text("submissionText"), // for text submissions
  status: mysqlEnum("status", ["submitted", "under_review", "graded", "returned"]).default("submitted"),
  grade: varchar("grade", { length: 10 }), // A, B, C, F, etc.
  feedback: text("feedback"),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
  gradedAt: timestamp("gradedAt"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Submission = typeof submissions.$inferSelect;
export type InsertSubmission = typeof submissions.$inferInsert;


// Course checklists and weekly milestones
export const courseChecklists = mysqlTable("course_checklists", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(), // e.g., "8-Week Intensive Checklist"
  description: text("description"),
  totalWeeks: int("totalWeeks").default(8),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type CourseChecklist = typeof courseChecklists.$inferSelect;
export type InsertCourseChecklist = typeof courseChecklists.$inferInsert;

// Weekly milestones within a checklist
export const weeklyMilestones = mysqlTable("weekly_milestones", {
  id: int("id").autoincrement().primaryKey(),
  checklistId: int("checklistId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  phase: varchar("phase", { length: 255 }), // e.g., "Phase 1: FM History"
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  milestones: text("milestones"), // JSON array of milestone items
  assignments: text("assignments"), // JSON array of assignments for the week
  readingMaterials: text("readingMaterials"), // JSON array of required readings
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WeeklyMilestone = typeof weeklyMilestones.$inferSelect;
export type InsertWeeklyMilestone = typeof weeklyMilestones.$inferInsert;

// Student progress on checklist items
export const checklistProgress = mysqlTable("checklist_progress", {
  id: int("id").autoincrement().primaryKey(),
  enrollmentId: int("enrollmentId").notNull(),
  checklistId: int("checklistId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  itemIndex: int("itemIndex").notNull(), // Index of the milestone item
  completed: int("completed").default(0), // 0 or 1
  completedAt: timestamp("completedAt"),
  notes: text("notes"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ChecklistProgress = typeof checklistProgress.$inferSelect;
export type InsertChecklistProgress = typeof checklistProgress.$inferInsert;


// Course registrations with printed materials option
export const courseRegistrations = mysqlTable("course_registrations", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  userId: int("userId"),
  studentName: varchar("studentName", { length: 255 }).notNull(),
  studentEmail: varchar("studentEmail", { length: 320 }).notNull(),
  studentPhone: varchar("studentPhone", { length: 20 }),
  country: varchar("country", { length: 100 }).notNull(),
  state: varchar("state", { length: 100 }),
  wantsPrintedMaterials: int("wantsPrintedMaterials").default(0), // 0 or 1
  printedMaterialsCost: int("printedMaterialsCost").default(0), // 4500 for $45.00
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "received", "not_required"]).default("pending"),
  paymentDate: timestamp("paymentDate"),
  registrationDate: timestamp("registrationDate").defaultNow().notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CourseRegistration = typeof courseRegistrations.$inferSelect;
export type InsertCourseRegistration = typeof courseRegistrations.$inferInsert;


// Center of Studies Resources (Books, Syllabuses, Guidelines, etc.)
export const resources = mysqlTable("resources", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", ["book", "syllabus", "guideline", "article", "other"]).notNull(),
  language: varchar("language", { length: 50 }).default("English"), // English, Swahili, etc.
  fileUrl: varchar("fileUrl", { length: 512 }).notNull(), // CDN URL to the PDF or file
  fileName: varchar("fileName", { length: 255 }).notNull(),
  fileSize: int("fileSize"), // in bytes
  author: varchar("author", { length: 255 }), // Author or organization
  publishDate: timestamp("publishDate"),
  isPublished: int("isPublished").default(1), // 0 or 1
  displayOrder: int("displayOrder").default(0), // For sorting resources
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Resource = typeof resources.$inferSelect;
export type InsertResource = typeof resources.$inferInsert;

// Stripe payments for printed materials
export const payments = mysqlTable("payments", {
  id: int("id").autoincrement().primaryKey(),
  registrationId: int("registrationId").notNull(),
  userId: int("userId"),
  courseId: int("courseId").notNull(),
  stripeSessionId: varchar("stripeSessionId", { length: 255 }).notNull().unique(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 255 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 255 }),
  amount: int("amount").notNull(), // Amount in cents (e.g., 4500 for $45.00)
  currency: varchar("currency", { length: 3 }).default("usd"),
  status: mysqlEnum("status", ["pending", "completed", "failed", "cancelled"]).default("pending"),
  paymentMethod: varchar("paymentMethod", { length: 50 }), // "card", "bank_transfer", etc.
  description: varchar("description", { length: 255 }), // "Printed Materials - Course Name"
  metadata: text("metadata"), // JSON string with additional data
  paidAt: timestamp("paidAt"),
  failureReason: text("failureReason"),
  receiptUrl: varchar("receiptUrl", { length: 512 }), // Stripe receipt URL
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Payment = typeof payments.$inferSelect;
export type InsertPayment = typeof payments.$inferInsert;


// Independent Study Modules - Free Methodist Way doctrinal content
export const independentStudyModules = mysqlTable("independent_study_modules", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(), // "The Holy Trinity", "Scripture Authority", etc.
  description: text("description"), // Brief description of the module
  content: text("content"), // Full module content (HTML or markdown)
  contentSwahili: text("contentSwahili"), // Swahili translation of content
  category: mysqlEnum("category", [
    "trinity",
    "scripture",
    "humanity",
    "law_and_love",
    "good_works",
    "christ_sacrifice",
    "new_life",
    "sanctification",
    "restoration",
    "church",
    "worship",
    "sacraments",
    "theology",
  ]).notNull(),
  language: varchar("language", { length: 50 }).default("English"), // Primary language
  order: int("order").default(0), // Display order
  estimatedHours: int("estimatedHours").default(1), // Estimated study time in hours
  isPublished: int("isPublished").default(1), // 0 or 1
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type IndependentStudyModule = typeof independentStudyModules.$inferSelect;
export type InsertIndependentStudyModule = typeof independentStudyModules.$inferInsert;

// Track-Module Relationships - Which modules are required/recommended for each track
export const trackModuleLinks = mysqlTable("track_module_links", {
  id: int("id").autoincrement().primaryKey(),
  trackId: int("trackId").notNull(), // Foreign key to training_tracks
  moduleId: int("moduleId").notNull(), // Foreign key to independent_study_modules
  isRequired: int("isRequired").default(0), // 0 = optional, 1 = required
  order: int("order").default(0), // Order within the track
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type TrackModuleLink = typeof trackModuleLinks.$inferSelect;
export type InsertTrackModuleLink = typeof trackModuleLinks.$inferInsert;

// Student Progress Tracking - Track which modules students have completed
export const moduleProgress = mysqlTable("module_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users
  moduleId: int("moduleId").notNull(), // Foreign key to independent_study_modules
  trackId: int("trackId").notNull(), // Which track this is part of
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"), // NULL if not completed
  isCompleted: int("isCompleted").default(0), // 0 or 1
  progressPercentage: int("progressPercentage").default(0), // 0-100
  notes: text("notes"), // Student's reflection notes
  certificateIssued: int("certificateIssued").default(0), // 0 or 1
  certificateIssuedAt: timestamp("certificateIssuedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ModuleProgress = typeof moduleProgress.$inferSelect;
export type InsertModuleProgress = typeof moduleProgress.$inferInsert;


// Post-Video Assessment Quizzes
export const quizzes = mysqlTable("quizzes", {
  id: int("id").autoincrement().primaryKey(),
  videoId: int("videoId"), // Foreign key to videos table (optional)
  moduleId: int("moduleId"), // Foreign key to independent_study_modules (optional)
  title: varchar("title", { length: 255 }).notNull(),
  titleSwahili: varchar("titleSwahili", { length: 255 }),
  description: text("description"),
  descriptionSwahili: text("descriptionSwahili"),
  passingScore: int("passingScore").default(70), // Percentage required to pass (0-100)
  timeLimit: int("timeLimit"), // Optional time limit in minutes
  isPublished: int("isPublished").default(1), // 0 or 1
  order: int("order").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;

// Quiz Questions
export const quizQuestions = mysqlTable("quiz_questions", {
  id: int("id").autoincrement().primaryKey(),
  quizId: int("quizId").notNull(), // Foreign key to quizzes
  questionText: text("questionText").notNull(),
  questionTextSwahili: text("questionTextSwahili"),
  questionType: varchar("questionType", { length: 50 }).default("multiple_choice"), // multiple_choice, true_false, short_answer
  order: int("order").default(0),
  points: int("points").default(1), // Points for this question
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = typeof quizQuestions.$inferInsert;

// Quiz Answer Options
export const quizAnswers = mysqlTable("quiz_answers", {
  id: int("id").autoincrement().primaryKey(),
  questionId: int("questionId").notNull(), // Foreign key to quiz_questions
  answerText: text("answerText").notNull(),
  answerTextSwahili: text("answerTextSwahili"),
  isCorrect: int("isCorrect").default(0), // 0 or 1
  order: int("order").default(0),
  explanation: text("explanation"), // Explanation for why this is correct/incorrect
  explanationSwahili: text("explanationSwahili"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizAnswer = typeof quizAnswers.$inferSelect;
export type InsertQuizAnswer = typeof quizAnswers.$inferInsert;

// Student Quiz Results
export const quizResults = mysqlTable("quiz_results", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Foreign key to users
  quizId: int("quizId").notNull(), // Foreign key to quizzes
  score: int("score").default(0), // Percentage score (0-100)
  passed: int("passed").default(0), // 0 or 1 (based on passing_score)
  totalPoints: int("totalPoints").default(0),
  earnedPoints: int("earnedPoints").default(0),
  timeSpent: int("timeSpent"), // Time spent in seconds
  completedAt: timestamp("completedAt").defaultNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizResult = typeof quizResults.$inferSelect;
export type InsertQuizResult = typeof quizResults.$inferInsert;

// Student Quiz Answers (detailed tracking)
export const studentQuizAnswers = mysqlTable("student_quiz_answers", {
  id: int("id").autoincrement().primaryKey(),
  quizResultId: int("quizResultId").notNull(), // Foreign key to quiz_results
  questionId: int("questionId").notNull(), // Foreign key to quiz_questions
  selectedAnswerId: int("selectedAnswerId"), // Foreign key to quiz_answers (NULL if no answer)
  isCorrect: int("isCorrect").default(0), // 0 or 1
  pointsEarned: int("pointsEarned").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type StudentQuizAnswer = typeof studentQuizAnswers.$inferSelect;
export type InsertStudentQuizAnswer = typeof studentQuizAnswers.$inferInsert;


// Module Videos (Lesson Videos)
export const moduleVideos = mysqlTable("module_videos", {
  id: int("id").autoincrement().primaryKey(),
  moduleId: int("moduleId").notNull(), // Foreign key to independent_study_modules
  title: varchar("title", { length: 255 }).notNull(),
  titleSwahili: varchar("titleSwahili", { length: 255 }),
  description: text("description"),
  descriptionSwahili: text("descriptionSwahili"),
  videoUrl: text("videoUrl").notNull(), // CDN URL to video
  duration: int("duration"), // Duration in seconds
  lessonNumber: int("lessonNumber").notNull(), // Which lesson (1-6)
  order: int("order").default(0),
  isPublished: int("isPublished").default(1), // 0 or 1
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

export type ModuleVideo = typeof moduleVideos.$inferSelect;
export type InsertModuleVideo = typeof moduleVideos.$inferInsert;


// Video Subtitles
export const videoSubtitles = mysqlTable("video_subtitles", {
  id: int("id").autoincrement().primaryKey(),
  videoId: int("videoId").notNull(), // Foreign key to module_videos
  language: varchar("language", { length: 10 }).notNull(), // Language code (e.g., 'sw', 'en')
  languageName: varchar("languageName", { length: 50 }).notNull(), // Display name (e.g., 'Swahili', 'English')
  subtitleUrl: text("subtitleUrl").notNull(), // CDN URL to SRT file
  isDefault: int("isDefault").default(0), // 0 or 1 - default subtitle language
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

export type VideoSubtitle = typeof videoSubtitles.$inferSelect;
export type InsertVideoSubtitle = typeof videoSubtitles.$inferInsert;


// Video Completion Tracking
export const videoCompletions = mysqlTable("video_completions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  videoId: int("videoId").notNull(),
  moduleId: int("moduleId").notNull(),
  watchedDuration: int("watchedDuration").default(0).notNull(), // Seconds watched
  totalDuration: int("totalDuration").default(0).notNull(), // Total video duration in seconds
  isCompleted: int("isCompleted").default(0).notNull(), // 0 or 1 - completed when watched >= 95% of video
  completedAt: timestamp("completedAt"), // When the video was marked as completed
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

export type VideoCompletion = typeof videoCompletions.$inferSelect;
export type InsertVideoCompletion = typeof videoCompletions.$inferInsert;

// Prayer Requests - Community prayer requests related to mission work
export const prayerRequests = mysqlTable("prayer_requests", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(), // Requester's name
  email: varchar("email", { length: 320 }).notNull(), // Requester's email
  prayerCategory: mysqlEnum("prayerCategory", [
    "church_planting",
    "leadership_development",
    "refugee_support",
    "community_outreach",
    "missions",
    "healing",
    "family",
    "other"
  ]).default("other").notNull(),
  prayerRequest: text("prayerRequest").notNull(), // The prayer request text
  isPublic: int("isPublic").default(0).notNull(), // 0 = private, 1 = can be shared in prayer circle
  status: mysqlEnum("status", ["new", "acknowledged", "praying", "answered"]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull()
});

export type PrayerRequest = typeof prayerRequests.$inferSelect;
export type InsertPrayerRequest = typeof prayerRequests.$inferInsert;

// Forum/Discussion Board Tables
export const forumThreads = mysqlTable("forum_threads", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  isApproved: int("isApproved").default(1),
  isDeleted: int("isDeleted").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumThread = typeof forumThreads.$inferSelect;
export type InsertForumThread = typeof forumThreads.$inferInsert;

export const forumPosts = mysqlTable("forum_posts", {
  id: int("id").autoincrement().primaryKey(),
  threadId: int("threadId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  isApproved: int("isApproved").default(1),
  isDeleted: int("isDeleted").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ForumPost = typeof forumPosts.$inferSelect;
export type InsertForumPost = typeof forumPosts.$inferInsert;
