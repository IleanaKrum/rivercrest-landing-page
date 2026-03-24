import { eq, and, inArray } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, trainingTracks, courses, courseSessions, applications, enrollments, studentProgress, assignments, submissions, courseRegistrations, resources, independentStudyModules, trackModuleLinks, moduleProgress, videoCompletions, moduleVideos, quizzes, quizResults, InsertApplication, InsertEnrollment, InsertStudentProgress, InsertCourse, InsertCourseSession, InsertAssignment, InsertSubmission, InsertCourseRegistration, InsertResource, Resource, InsertIndependentStudyModule, InsertTrackModuleLink, InsertModuleProgress, InsertVideoCompletion } from "../drizzle/schema";
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

// Admin queries
export async function getAllApplications() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(applications);
}

export async function getApplicationById(appId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(applications).where(eq(applications.id, appId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateApplicationStatus(appId: number, status: "pending" | "approved" | "rejected", approvedBy?: number, rejectionReason?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: any = { status, updatedAt: new Date() };
  if (status === "approved" && approvedBy) {
    updateData.approvedBy = approvedBy;
    updateData.approvedAt = new Date();
  }
  if (status === "rejected" && rejectionReason) {
    updateData.rejectionReason = rejectionReason;
  }
  return db.update(applications)
    .set(updateData)
    .where(eq(applications.id, appId));
}

export async function getAllCourses() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courses);
}

export async function createCourse(course: InsertCourse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(courses).values(course);
}

export async function updateCourse(courseId: number, updates: Partial<InsertCourse>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(courses).set(updates).where(eq(courses.id, courseId));
}

export async function deleteCourse(courseId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(courses).where(eq(courses.id, courseId));
}

export async function createCourseSession(session: InsertCourseSession) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(courseSessions).values(session);
}

export async function updateCourseSession(sessionId: number, updates: Partial<InsertCourseSession>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(courseSessions).set(updates).where(eq(courseSessions.id, sessionId));
}

export async function getAllEnrollments() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(enrollments);
}

export async function getEnrollmentById(enrollmentId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(enrollments).where(eq(enrollments.id, enrollmentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateEnrollmentStatus(enrollmentId: number, status: "enrolled" | "in_progress" | "completed") {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(enrollments)
    .set({ status, completedAt: status === "completed" ? new Date() : undefined })
    .where(eq(enrollments.id, enrollmentId));
}

// Assignment and submission queries
export async function createAssignment(assignment: InsertAssignment) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(assignments).values(assignment);
}

export async function getAssignmentsByCourse(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(assignments).where(eq(assignments.courseId, courseId));
}

export async function getAssignmentById(assignmentId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(assignments).where(eq(assignments.id, assignmentId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createSubmission(submission: InsertSubmission) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(submissions).values(submission);
}

export async function getSubmissionsByAssignment(assignmentId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(submissions).where(eq(submissions.assignmentId, assignmentId));
}

export async function getSubmissionsByStudent(userId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(submissions).where(eq(submissions.userId, userId));
}

export async function getSubmissionById(submissionId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(submissions).where(eq(submissions.id, submissionId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateSubmissionStatus(submissionId: number, status: "submitted" | "under_review" | "graded" | "returned", grade?: string, feedback?: string) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: any = { status, updatedAt: new Date() };
  if (grade) updateData.grade = grade;
  if (feedback) updateData.feedback = feedback;
  if (status === "graded") updateData.gradedAt = new Date();
  return db.update(submissions).set(updateData).where(eq(submissions.id, submissionId));
}

// Course registration queries
export async function createCourseRegistration(registration: InsertCourseRegistration) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(courseRegistrations).values(registration);
}

export async function getCourseRegistrationsByCourse(courseId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courseRegistrations).where(eq(courseRegistrations.courseId, courseId));
}

export async function getAllCourseRegistrations() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(courseRegistrations);
}

export async function getCourseRegistrationById(registrationId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(courseRegistrations).where(eq(courseRegistrations.id, registrationId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateCourseRegistrationPaymentStatus(registrationId: number, status: "pending" | "received" | "not_required", paymentDate?: Date) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  const updateData: any = { paymentStatus: status, updatedAt: new Date() };
  if (paymentDate) updateData.paymentDate = paymentDate;
  return db.update(courseRegistrations).set(updateData).where(eq(courseRegistrations.id, registrationId));
}


// Resources queries
export async function createResource(resource: InsertResource) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(resources).values(resource);
}

export async function getAllResources() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(resources).where(eq(resources.isPublished, 1));
}

export async function getResourcesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(resources).where(and(eq(resources.category, category as any), eq(resources.isPublished, 1)));
}

export async function getResourceById(resourceId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(resources).where(eq(resources.id, resourceId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateResource(resourceId: number, updates: Partial<InsertResource>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(resources).set({ ...updates, updatedAt: new Date() }).where(eq(resources.id, resourceId));
}

export async function deleteResource(resourceId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(resources).where(eq(resources.id, resourceId));
}


// Independent Study Modules queries
export async function createIndependentStudyModule(module: InsertIndependentStudyModule) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(independentStudyModules).values(module);
}

export async function getAllIndependentStudyModules() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(independentStudyModules).where(eq(independentStudyModules.isPublished, 1));
}

export async function getIndependentStudyModuleById(moduleId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(independentStudyModules).where(eq(independentStudyModules.id, moduleId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getModulesByCategory(category: string) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(independentStudyModules).where(and(eq(independentStudyModules.category, category as any), eq(independentStudyModules.isPublished, 1)));
}

export async function updateIndependentStudyModule(moduleId: number, updates: Partial<InsertIndependentStudyModule>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(independentStudyModules).set({ ...updates, updatedAt: new Date() }).where(eq(independentStudyModules.id, moduleId));
}

export async function deleteIndependentStudyModule(moduleId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(independentStudyModules).where(eq(independentStudyModules.id, moduleId));
}

// Track-Module Link queries
export async function linkModuleToTrack(link: InsertTrackModuleLink) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(trackModuleLinks).values(link);
}

export async function getModulesForTrack(trackId: number) {
  const db = await getDb();
  if (!db) return [];
  const links = await db.select().from(trackModuleLinks).where(eq(trackModuleLinks.trackId, trackId));
  const moduleIds = links.map(link => link.moduleId);
  if (moduleIds.length === 0) return [];
  return db.select().from(independentStudyModules).where(eq(independentStudyModules.isPublished, 1));
}

export async function getRequiredModulesForTrack(trackId: number) {
  const db = await getDb();
  if (!db) return [];
  const links = await db.select().from(trackModuleLinks).where(and(eq(trackModuleLinks.trackId, trackId), eq(trackModuleLinks.isRequired, 1)));
  const moduleIds = links.map(link => link.moduleId);
  if (moduleIds.length === 0) return [];
  return db.select().from(independentStudyModules).where(eq(independentStudyModules.isPublished, 1));
}

export async function unlinkModuleFromTrack(trackId: number, moduleId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.delete(trackModuleLinks).where(and(eq(trackModuleLinks.trackId, trackId), eq(trackModuleLinks.moduleId, moduleId)));
}

// Module Progress queries
export async function startModuleProgress(userId: number, moduleId: number, trackId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(moduleProgress).values({ userId, moduleId, trackId, isCompleted: 0, progressPercentage: 0 });
}

export async function getModuleProgress(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(moduleProgress).where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.moduleId, moduleId))).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getUserModuleProgress(userId: number, trackId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(moduleProgress).where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.trackId, trackId)));
}

export async function updateModuleProgress(userId: number, moduleId: number, updates: Partial<InsertModuleProgress>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(moduleProgress).set({ ...updates, updatedAt: new Date() }).where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.moduleId, moduleId)));
}

export async function completeModule(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(moduleProgress).set({ isCompleted: 1, progressPercentage: 100, completedAt: new Date(), updatedAt: new Date() }).where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.moduleId, moduleId)));
}

export async function issueCertificate(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.update(moduleProgress).set({ certificateIssued: 1, certificateIssuedAt: new Date(), updatedAt: new Date() }).where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.moduleId, moduleId)));
}

export async function getUserCompletedModules(userId: number, trackId: number) {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(moduleProgress).where(and(eq(moduleProgress.userId, userId), eq(moduleProgress.trackId, trackId), eq(moduleProgress.isCompleted, 1)));
}


// Video Completion Tracking
export async function trackVideoProgress(userId: number, videoId: number, moduleId: number, watchedDuration: number, totalDuration: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Check if record exists
  const existing = await db.select().from(videoCompletions).where(
    and(
      eq(videoCompletions.userId, userId),
      eq(videoCompletions.videoId, videoId)
    )
  );

  const isCompleted = watchedDuration >= (totalDuration * 0.95); // 95% threshold

  if (existing.length > 0) {
    // Update existing record
    return db.update(videoCompletions).set({
      watchedDuration,
      totalDuration,
      isCompleted: isCompleted ? 1 : 0,
      completedAt: isCompleted ? new Date() : null,
      updatedAt: new Date()
    }).where(
      and(
        eq(videoCompletions.userId, userId),
        eq(videoCompletions.videoId, videoId)
      )
    );
  } else {
    // Create new record
    return db.insert(videoCompletions).values({
      userId,
      videoId,
      moduleId,
      watchedDuration,
      totalDuration,
      isCompleted: isCompleted ? 1 : 0,
      completedAt: isCompleted ? new Date() : null,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

export async function getVideoCompletion(userId: number, videoId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(videoCompletions).where(
    and(
      eq(videoCompletions.userId, userId),
      eq(videoCompletions.videoId, videoId)
    )
  );
  
  return result[0] || null;
}

export async function getModuleVideoCompletions(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(videoCompletions).where(
    and(
      eq(videoCompletions.userId, userId),
      eq(videoCompletions.moduleId, moduleId)
    )
  );
}

export async function isModuleVideosCompleted(userId: number, moduleId: number) {
  const db = await getDb();
  if (!db) return false;
  
  // Get all videos for the module
  const allModuleVideos = await db.select().from(moduleVideos).where(
    eq(moduleVideos.moduleId, moduleId)
  );
  
  if (allModuleVideos.length === 0) return true; // No videos to complete
  
  // Check if all videos are completed
  const completions = await db.select().from(videoCompletions).where(
    and(
      eq(videoCompletions.userId, userId),
      eq(videoCompletions.moduleId, moduleId),
      eq(videoCompletions.isCompleted, 1)
    )
  );
  
  return completions.length === allModuleVideos.length;
}


// Analytics functions for admin dashboard
export async function getStudentProgressAnalytics() {
  const database = await getDb();
  if (!database) return [];
  const students = await database.select().from(users).where(eq(users.role, 'user'));
  
  return Promise.all(students.map(async (student) => {
    const completions = await database.select().from(videoCompletions).where(eq(videoCompletions.userId, student.id));
    const studentQuizResults = await database.select().from(quizResults).where(eq(quizResults.userId, student.id));
    
    return {
      id: student.id,
      name: student.name,
      email: student.email,
      videoCompletionRate: completions.length > 0 ? Math.round((completions.filter((c: any) => c.isCompleted).length / completions.length) * 100) : 0,
      averageQuizScore: studentQuizResults.length > 0 ? Math.round(studentQuizResults.reduce((sum: number, r: any) => sum + r.score, 0) / studentQuizResults.length) : 0,
      certificatesEarned: studentQuizResults.filter((r: any) => r.passed).length,
      lastActivity: student.updatedAt || new Date(),
    };
  }));
}

export async function getQuizPerformanceAnalytics() {
  const database = await getDb();
  if (!database) return [];
  const allQuizzes = await database.select().from(quizzes);
  
  return Promise.all(allQuizzes.map(async (quiz) => {
    const results = await database.select().from(quizResults).where(eq(quizResults.quizId, quiz.id));
    
    return {
      quizId: quiz.id,
      quizName: quiz.title,
      totalAttempts: results.length,
      averageScore: results.length > 0 ? Math.round(results.reduce((sum: number, r: any) => sum + r.score, 0) / results.length) : 0,
      passRate: results.length > 0 ? Math.round((results.filter((r: any) => r.passed).length / results.length) * 100) : 0,
      failRate: results.length > 0 ? Math.round((results.filter((r: any) => !r.passed).length / results.length) * 100) : 0,
      highestScore: results.length > 0 ? Math.max(...results.map((r: any) => r.score)) : 0,
      lowestScore: results.length > 0 ? Math.min(...results.map((r: any) => r.score)) : 0,
    };
  }));
}

export async function getModuleCompletionAnalytics() {
  const database = await getDb();
  if (!database) return [];
  const modules = await database.select().from(independentStudyModules);
  
  return Promise.all(modules.map(async (module) => {
    const completions = await database.select().from(videoCompletions).where(eq(videoCompletions.moduleId, module.id));
    const quizIds = (await database.select({ id: quizzes.id }).from(quizzes).where(eq(quizzes.moduleId, module.id))).map((q: any) => q.id);
    const moduleQuizResults = quizIds.length > 0 ? await database.select().from(quizResults).where(inArray(quizResults.quizId, quizIds)) : [];
    
    const uniqueStudents = new Set(completions.map((c: any) => c.userId));
    
    return {
      moduleId: module.id,
      moduleName: module.title,
      category: module.category,
      totalEnrolled: uniqueStudents.size,
      completed: moduleQuizResults.filter((r: any) => r.passed).length,
      inProgress: completions.filter((c: any) => !c.isCompleted).length,
      notStarted: 0,
      averageCompletion: completions.length > 0 ? Math.round((completions.filter((c: any) => c.isCompleted).length / completions.length) * 100) : 0,
      averageQuizScore: moduleQuizResults.length > 0 ? Math.round(moduleQuizResults.reduce((sum: number, r: any) => sum + r.score, 0) / moduleQuizResults.length) : 0,
      certificatesIssued: moduleQuizResults.filter((r: any) => r.passed).length,
    };
  }));
}

export async function getDashboardSummary() {
  const database = await getDb();
  if (!database) return { totalStudents: 0, totalQuizAttempts: 0, averageQuizScore: 0, passRate: 0, certificatesIssued: 0, videoCompletionRate: 0 };
  const students = await database.select().from(users).where(eq(users.role, 'user'));
  const allQuizResults = await database.select().from(quizResults);
  const completions = await database.select().from(videoCompletions);
  
  return {
    totalStudents: students.length,
    totalQuizAttempts: allQuizResults.length,
    averageQuizScore: allQuizResults.length > 0 ? Math.round(allQuizResults.reduce((sum: number, r: any) => sum + r.score, 0) / allQuizResults.length) : 0,
    passRate: allQuizResults.length > 0 ? Math.round((allQuizResults.filter((r: any) => r.passed).length / allQuizResults.length) * 100) : 0,
    certificatesIssued: allQuizResults.filter((r: any) => r.passed).length,
    videoCompletionRate: completions.length > 0 ? Math.round((completions.filter((c: any) => c.isCompleted).length / completions.length) * 100) : 0,
  };
}


// Check if user has an approved application for a training track
export async function getUserApprovedApplication(userId: number, trackId?: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const conditions = [eq(applications.userId, userId), eq(applications.status, "approved")];
  if (trackId) {
    conditions.push(eq(applications.trackId, trackId));
  }
  
  const result = await db.select().from(applications)
    .where(and(...conditions))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

// Check if user is enrolled in a specific course
export async function getUserCourseEnrollment(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  const result = await db.select().from(enrollments)
    .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : undefined;
}

// Check if user has access to a training track (has approved application)
export async function getUserTrackAccess(userId: number, trackId: number) {
  const db = await getDb();
  if (!db) return false;
  
  const application = await getUserApprovedApplication(userId, trackId);
  return !!application;
}

// Get user's application status for a track
export async function getUserApplicationStatus(userId: number, trackId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(applications)
    .where(and(eq(applications.userId, userId), eq(applications.trackId, trackId)))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

// Get all approved applications for a user
export async function getUserApprovedApplications(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(applications)
    .where(and(eq(applications.userId, userId), eq(applications.status, "approved")));
}

// Create enrollment for approved student
export async function createStudentEnrollment(userId: number, courseId: number, applicationId?: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  return db.insert(enrollments).values({
    userId,
    courseId,
    applicationId,
    status: "enrolled",
  });
}


// Course Material Access Control Functions
export async function canUserAccessCourse(userId: number, courseId: number) {
  const db = await getDb();
  if (!db) return false;
  
  // Check if user is admin
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0 && user[0].role === 'admin') return true;
  
  // Check if user has approved enrollment for this course
  const course = await db.select().from(courses).where(eq(courses.id, courseId)).limit(1);
  if (course.length === 0) return false;
  
  const trackId = course[0].trackId;
  
  // Check if user has approved application for this track
  const approvedApp = await db.select().from(applications)
    .where(and(
      eq(applications.userId, userId),
      eq(applications.trackId, trackId),
      eq(applications.status, 'approved')
    ))
    .limit(1);
  
  return approvedApp.length > 0;
}

export async function canUserAccessModule(userId: number, moduleId: number, trackId: number) {
  const db = await getDb();
  if (!db) return false;
  
  // Check if user is admin
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0 && user[0].role === 'admin') return true;
  
  // Check if user has approved application for this track
  const approvedApp = await db.select().from(applications)
    .where(and(
      eq(applications.userId, userId),
      eq(applications.trackId, trackId),
      eq(applications.status, 'approved')
    ))
    .limit(1);
  
  return approvedApp.length > 0;
}

export async function canUserAccessVideo(userId: number, videoId: number, moduleId: number, trackId: number) {
  const db = await getDb();
  if (!db) return false;
  
  // Check if user is admin
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0 && user[0].role === 'admin') return true;
  
  // Check if user has approved application for this track
  const approvedApp = await db.select().from(applications)
    .where(and(
      eq(applications.userId, userId),
      eq(applications.trackId, trackId),
      eq(applications.status, 'approved')
    ))
    .limit(1);
  
  return approvedApp.length > 0;
}

export async function canUserTakeQuiz(userId: number, quizId: number, moduleId: number, trackId: number) {
  const db = await getDb();
  if (!db) return false;
  
  // Check if user is admin
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0 && user[0].role === 'admin') return true;
  
  // Check if user has approved application for this track
  const approvedApp = await db.select().from(applications)
    .where(and(
      eq(applications.userId, userId),
      eq(applications.trackId, trackId),
      eq(applications.status, 'approved')
    ))
    .limit(1);
  
  if (approvedApp.length === 0) return false;
  
  // Check if user has completed all required videos for the module
  const modulesVideosCompleted = await isModuleVideosCompleted(userId, moduleId);
  return modulesVideosCompleted;
}

export async function canUserDownloadCertificate(userId: number, moduleId: number, trackId: number) {
  const db = await getDb();
  if (!db) return false;
  
  // Check if user is admin
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0 && user[0].role === 'admin') return true;
  
  // Check if user has approved application for this track
  const approvedApp = await db.select().from(applications)
    .where(and(
      eq(applications.userId, userId),
      eq(applications.trackId, trackId),
      eq(applications.status, 'approved')
    ))
    .limit(1);
  
  if (approvedApp.length === 0) return false;
  
  // Check if module is completed
  const progress = await getModuleProgress(userId, moduleId);
  if (!progress || progress.isCompleted !== 1) return false;
  
  // Check if certificate has been issued
  return progress.certificateIssued === 1;
}

export async function getUserApprovedTracks(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  // Check if user is admin
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  if (user.length > 0 && user[0].role === 'admin') {
    // Admins can see all tracks
    return db.select().from(trainingTracks);
  }
  
  // Get approved applications for this user
  const approvedApps = await db.select().from(applications)
    .where(and(
      eq(applications.userId, userId),
      eq(applications.status, 'approved')
    ));
  
  if (approvedApps.length === 0) return [];
  
  const trackIds = approvedApps.map(app => app.trackId);
  
  // Get all tracks for these track IDs
  return db.select().from(trainingTracks).where(
    inArray(trainingTracks.id, trackIds)
  );
}

export async function getUserAccessibleCourses(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const approvedTracks = await getUserApprovedTracks(userId);
  if (approvedTracks.length === 0) return [];
  
  const trackIds = approvedTracks.map(t => t.id);
  
  // Get all courses for these tracks
  return db.select().from(courses).where(
    inArray(courses.trackId, trackIds)
  );
}
