import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { sendCourseRegistrationEmail, sendAdminRegistrationNotification, sendCertificateEmail, sendApplicationConfirmationEmail, sendApplicationAdminNotification } from "./_core/email";
import { ENV } from "./_core/env";
import { generateCertificatePDF, generateCertificateFilename } from "./_core/certificate";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  centerOfStudies: router({
    getTrainingTracks: publicProcedure.query(() => db.getTrainingTracks()),
    
    getCoursesByTrack: publicProcedure
      .input(z.object({ trackId: z.number() }))
      .query(({ input }) => db.getCoursesByTrack(input.trackId)),
    
    submitApplication: publicProcedure
      .input(z.object({
        trackId: z.number(),
        candidateName: z.string(),
        candidateEmail: z.string().email(),
        candidatePhone: z.string().optional(),
        candidateAddress: z.string(),
        churchName: z.string(),
        leadPastorName: z.string(),
        recommendationLetterUrl: z.string().optional(),
        essay: z.string(),
        interestExplanation: z.string().optional(),
        ministryPursuit: z.string().optional(),
        leadPastorOrElder: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const application = await db.createApplication({
          trackId: input.trackId,
          candidateName: input.candidateName,
          candidateEmail: input.candidateEmail,
          candidatePhone: input.candidatePhone,
          candidateAddress: input.candidateAddress,
          churchName: input.churchName,
          leadPastorName: input.leadPastorName,
          recommendationLetterUrl: input.recommendationLetterUrl,
          essay: input.essay,
          interestExplanation: input.interestExplanation,
          ministryPursuit: input.ministryPursuit,
          leadPastorOrElder: input.leadPastorOrElder,
          userId: ctx.user?.id,
          status: "pending",
        });

        // Fetch track name for email context
        const track = await db.getTrainingTrackById(input.trackId);
        const trackName = track?.name ?? `Track #${input.trackId}`;
        const applicationId = (application as any)?.insertId ?? "";

        // Send confirmation email to applicant (non-blocking)
        sendApplicationConfirmationEmail(
          input.candidateName,
          input.candidateEmail,
          trackName,
          applicationId
        ).catch((err) =>
          console.error("[submitApplication] Failed to send confirmation email:", err)
        );

        // Send admin notification (non-blocking)
        sendApplicationAdminNotification(
          input.candidateName,
          input.candidateEmail,
          trackName,
          input.churchName,
          applicationId,
          "rev.ileanakrum@rivercrestfmc.org"
        ).catch((err) =>
          console.error("[submitApplication] Failed to send admin notification:", err)
        );

        return application;
      }),
    
    getMyApplications: protectedProcedure.query(({ ctx }) =>
      db.getApplicationsByUserId(ctx.user.id)
    ),
    
    getMyEnrollments: protectedProcedure.query(({ ctx }) =>
      db.getEnrollmentsByUserId(ctx.user.id)
    ),
    
    checkTrackAccess: protectedProcedure
      .input(z.object({ trackId: z.number() }))
      .query(async ({ input, ctx }) => {
        const hasAccess = await db.getUserTrackAccess(ctx.user.id, input.trackId);
        const applicationStatus = await db.getUserApplicationStatus(ctx.user.id, input.trackId);
        return {
          hasAccess,
          applicationStatus: applicationStatus?.status || null,
          message: hasAccess ? "Access granted" : applicationStatus?.status === "pending" ? "Application pending review" : "No application found",
        };
      }),
    
    getApplicationStatus: protectedProcedure
      .input(z.object({ trackId: z.number() }))
      .query(async ({ input, ctx }) => {
        return db.getUserApplicationStatus(ctx.user.id, input.trackId);
      }),
    
    getCourseDetails: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(({ input }) => db.getCourseById(input.courseId)),
    
    getCourseSessions: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(({ input }) => db.getCourseSessionsByCourse(input.courseId)),
    
    getStudentProgress: protectedProcedure
      .input(z.object({ enrollmentId: z.number() }))
      .query(({ input }) => db.getStudentProgress(input.enrollmentId)),
    
    updateSessionProgress: protectedProcedure
      .input(z.object({
        enrollmentId: z.number(),
        sessionId: z.number(),
        completed: z.boolean(),
      }))
      .mutation(({ input }) =>
        db.updateStudentProgress(input.enrollmentId, input.sessionId, input.completed)
      ),
    
    trackVideoProgress: protectedProcedure
      .input(z.object({
        enrollmentId: z.number(),
        sessionId: z.number(),
        videoId: z.string(),
        currentTime: z.number(),
        duration: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Track video viewing progress
        // This helps us understand student engagement with video content
        try {
          // Log video progress for analytics
          console.log(`[Video Progress] User ${ctx.user.id} - Session ${input.sessionId} - Video ${input.videoId} - ${input.currentTime}/${input.duration}s`);
          
          // Mark session as completed if video is fully watched (90%+)
          if (input.currentTime >= input.duration * 0.9) {
            await db.updateStudentProgress(input.enrollmentId, input.sessionId, true);
          }
          
          return { success: true, message: 'Video progress tracked' };
        } catch (error) {
          console.error('[Video Progress Error]', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to track video progress',
          });
        }
      }),
    
    canAccessCourse: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input, ctx }) => {
        const hasAccess = await db.canUserAccessCourse(ctx.user.id, input.courseId);
        return { hasAccess };
      }),
    
    canAccessModule: protectedProcedure
      .input(z.object({ moduleId: z.number(), trackId: z.number() }))
      .query(async ({ input, ctx }) => {
        const hasAccess = await db.canUserAccessModule(ctx.user.id, input.moduleId, input.trackId);
        return { hasAccess };
      }),
    
    canAccessVideo: protectedProcedure
      .input(z.object({ videoId: z.number(), moduleId: z.number(), trackId: z.number() }))
      .query(async ({ input, ctx }) => {
        const hasAccess = await db.canUserAccessVideo(ctx.user.id, input.videoId, input.moduleId, input.trackId);
        return { hasAccess };
      }),
    
    canTakeQuiz: protectedProcedure
      .input(z.object({ quizId: z.number(), moduleId: z.number(), trackId: z.number() }))
      .query(async ({ input, ctx }) => {
        const canTake = await db.canUserTakeQuiz(ctx.user.id, input.quizId, input.moduleId, input.trackId);
        return { canTake };
      }),
    
    canDownloadCertificate: protectedProcedure
      .input(z.object({ moduleId: z.number(), trackId: z.number() }))
      .query(async ({ input, ctx }) => {
        const canDownload = await db.canUserDownloadCertificate(ctx.user.id, input.moduleId, input.trackId);
        return { canDownload };
      }),
    
    getAccessibleTracks: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getUserApprovedTracks(ctx.user.id);
      }),
    
    getAccessibleCourses: protectedProcedure
      .query(async ({ ctx }) => {
        return db.getUserAccessibleCourses(ctx.user.id);
      }),
  }),

  admin: router({
    getAllApplications: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getAllApplications();
    }),

    updateApplicationStatus: protectedProcedure
      .input(z.object({
        applicationId: z.number(),
        status: z.enum(['pending', 'approved', 'rejected']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
        return db.updateApplicationStatus(input.applicationId, input.status);
      }),

    getAllCourses: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getAllCourses();
    }),

    createCourse: protectedProcedure
      .input(z.object({
        trackId: z.number(),
        title: z.string(),
        description: z.string().optional(),
        syllabus: z.string().optional(),
        sessionsCount: z.number().optional(),
        commitmentHours: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
        return db.createCourse(input);
      }),

    updateCourse: protectedProcedure
      .input(z.object({
        courseId: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        syllabus: z.string().optional(),
        sessionsCount: z.number().optional(),
        commitmentHours: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
        const { courseId, ...updates } = input;
        return db.updateCourse(courseId, updates);
      }),

    deleteCourse: protectedProcedure
      .input(z.object({ courseId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
        return db.deleteCourse(input.courseId);
      }),

    getAllEnrollments: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getAllEnrollments();
    }),

    updateEnrollmentStatus: protectedProcedure
      .input(z.object({
        enrollmentId: z.number(),
        status: z.enum(['enrolled', 'in_progress', 'completed']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
        return db.updateEnrollmentStatus(input.enrollmentId, input.status);
      }),

    getAllCourseRegistrations: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getAllCourseRegistrations();
    }),

    updateCourseRegistrationPaymentStatus: protectedProcedure
      .input(z.object({
        registrationId: z.number(),
        status: z.enum(['pending', 'received', 'not_required']),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
        return db.updateCourseRegistrationPaymentStatus(input.registrationId, input.status, new Date());
      }),

    getAllResources: publicProcedure
      .query(() => db.getAllResources()),

    getResourcesByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => db.getResourcesByCategory(input.category)),

    getResourceById: publicProcedure
      .input(z.object({ resourceId: z.number() }))
      .query(({ input }) => db.getResourceById(input.resourceId)),

    // Analytics procedures
    getStudentProgressAnalytics: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getStudentProgressAnalytics();
    }),

    getQuizPerformanceAnalytics: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getQuizPerformanceAnalytics();
    }),

    getModuleCompletionAnalytics: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getModuleCompletionAnalytics();
    }),

    getDashboardSummary: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getDashboardSummary();
    }),

    getAllCoursesWithDetails: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== 'admin') throw new Error('Unauthorized');
      return db.getAllCourses();
    }),
  }),

  courseRegistration: router({
    registerForCourse: publicProcedure
      .input(z.object({
        courseId: z.number(),
        studentName: z.string(),
        studentEmail: z.string().email(),
        studentPhone: z.string().optional(),
        country: z.string(),
        state: z.string().optional(),
        wantsPrintedMaterials: z.boolean(),
      }))
      .mutation(async ({ input }) => {
        const isUSA = input.country.toLowerCase() === 'usa' || input.country.toLowerCase() === 'united states';
        const wantsMaterials = input.wantsPrintedMaterials && isUSA;
        
        const registration = await db.createCourseRegistration({
          courseId: input.courseId,
          studentName: input.studentName,
          studentEmail: input.studentEmail,
          studentPhone: input.studentPhone,
          country: input.country,
          state: input.state,
          wantsPrintedMaterials: wantsMaterials ? 1 : 0,
          printedMaterialsCost: wantsMaterials ? 4500 : 0,
          paymentStatus: wantsMaterials ? 'pending' : 'not_required',
        });

        // Send confirmation email to student
        await sendCourseRegistrationEmail({
          studentName: input.studentName,
          studentEmail: input.studentEmail,
          courseId: input.courseId,
          wantsPrintedMaterials: wantsMaterials,
          printedMaterialsCost: wantsMaterials ? 4500 : 0,
          country: input.country,
        });

        // Send admin notification
        await sendAdminRegistrationNotification(
          {
            studentName: input.studentName,
            studentEmail: input.studentEmail,
            courseId: input.courseId,
            wantsPrintedMaterials: wantsMaterials,
            printedMaterialsCost: wantsMaterials ? 4500 : 0,
            country: input.country,
          },
          "rev.ileanakrum@rivercrestfmc.org"
        );

        return registration;
      }),

    getCourseRegistrationsByCourse: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(({ input }) => db.getCourseRegistrationsByCourse(input.courseId)),

    getAllResources: publicProcedure
      .query(() => db.getAllResources()),

    getResourcesByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => db.getResourcesByCategory(input.category)),

    getResourceById: publicProcedure
      .input(z.object({ resourceId: z.number() }))
      .query(({ input }) => db.getResourceById(input.resourceId)),

    createResource: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        category: z.enum(["book", "syllabus", "guideline", "article", "other"]),
        language: z.string().default("English"),
        fileUrl: z.string().url(),
        fileName: z.string(),
        fileSize: z.number().optional(),
        author: z.string().optional(),
        publishDate: z.date().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can create resources" });
        }
        return db.createResource({
          ...input,
          isPublished: 1,
        });
      }),

    updateResource: protectedProcedure
      .input(z.object({
        resourceId: z.number(),
        title: z.string().optional(),
        description: z.string().optional(),
        category: z.enum(["book", "syllabus", "guideline", "article", "other"]).optional(),
        language: z.string().optional(),
        fileUrl: z.string().url().optional(),
        fileName: z.string().optional(),
        fileSize: z.number().optional(),
        author: z.string().optional(),
        publishDate: z.date().optional(),
        isPublished: z.number().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can update resources" });
        }
        const { resourceId, ...updates } = input;
        return db.updateResource(resourceId, updates);
      }),

    deleteResource: protectedProcedure
      .input(z.object({ resourceId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can delete resources" });
        }
        return db.deleteResource(input.resourceId);
      }),
    
    // Independent Study Modules
    getAllModules: publicProcedure.query(() => db.getAllIndependentStudyModules()),
    
    getModuleById: publicProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(({ input }) => db.getIndependentStudyModuleById(input.moduleId)),
    
    getModulesByCategory: publicProcedure
      .input(z.object({ category: z.string() }))
      .query(({ input }) => db.getModulesByCategory(input.category)),
    
    getModulesForTrack: publicProcedure
      .input(z.object({ trackId: z.number() }))
      .query(({ input }) => db.getModulesForTrack(input.trackId)),
    
    getRequiredModulesForTrack: publicProcedure
      .input(z.object({ trackId: z.number() }))
      .query(({ input }) => db.getRequiredModulesForTrack(input.trackId)),
    
    startModule: protectedProcedure
      .input(z.object({ moduleId: z.number(), trackId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        return db.startModuleProgress(ctx.user.id, input.moduleId, input.trackId);
      }),
    
    getModuleProgress: protectedProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        return db.getModuleProgress(ctx.user.id, input.moduleId);
      }),
    
    getUserModuleProgress: protectedProcedure
      .input(z.object({ trackId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        return db.getUserModuleProgress(ctx.user.id, input.trackId);
      }),
    
    completeModule: protectedProcedure
      .input(z.object({ moduleId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        
        // Complete the module
        const result = await db.completeModule(ctx.user.id, input.moduleId);
        
        // Get module details for certificate
        const module = await db.getIndependentStudyModuleById(input.moduleId);
        if (module && ctx.user.email) {
          try {
            // Generate certificate PDF
            const pdfBuffer = await generateCertificatePDF(
              ctx.user.name || "Student",
              module.title,
              new Date()
            );
            
            // Generate certificate ID
            const certificateId = `CERT-${ctx.user.id}-${input.moduleId}-${Date.now()}`;
            
            // Send certificate email
            await sendCertificateEmail(
              ctx.user.name || "Student",
              ctx.user.email,
              module.title,
              pdfBuffer,
              certificateId
            );
          } catch (error) {
            console.error("[Certificate] Error sending certificate email:", error);
            // Don't fail the mutation if email fails
          }
        }
        
        return result;
      }),
    
    updateModuleProgress: protectedProcedure
      .input(z.object({
        moduleId: z.number(),
        progressPercentage: z.number().min(0).max(100),
        notes: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        return db.updateModuleProgress(ctx.user.id, input.moduleId, {
          progressPercentage: input.progressPercentage,
          notes: input.notes,
        });
      }),
    
    issueCertificate: protectedProcedure
      .input(z.object({ moduleId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        return db.issueCertificate(ctx.user.id, input.moduleId);
      }),
    
    getUserCompletedModules: protectedProcedure
      .input(z.object({ trackId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        return db.getUserCompletedModules(ctx.user.id, input.trackId);
      }),
    
    createModule: protectedProcedure
      .input(z.object({
        title: z.string(),
        description: z.string().optional(),
        content: z.string(),
        contentSwahili: z.string().optional(),
        category: z.enum(["trinity", "scripture", "humanity", "law_and_love", "good_works", "christ_sacrifice", "new_life", "sanctification", "restoration", "church", "worship", "sacraments"]),
        language: z.string().default("English"),
        order: z.number().default(0),
        estimatedHours: z.number().default(1),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN", message: "Only admins can create modules" });
        }
        return db.createIndependentStudyModule({
          ...input,
          isPublished: 1,
        });
      }),
    
    getVideosByModule: publicProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input }) => {
        return db.getVideosByModuleWithSubtitles(input.moduleId);
      }),
    
    getQuizByModuleId: publicProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input }) => {
        return null;
      }),
    
    submitQuiz: protectedProcedure
      .input(z.object({
        quizId: z.number(),
        moduleId: z.number(),
        score: z.number(),
        passed: z.number(),
        totalPoints: z.number(),
        earnedPoints: z.number(),
        timeSpent: z.number(),
        answers: z.array(z.object({
          questionId: z.number(),
          selectedAnswerId: z.number(),
        })),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        return { success: true };
      }),
    
    downloadCertificate: protectedProcedure
      .input(z.object({ moduleId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
        
        // Get module details
        const module = await db.getIndependentStudyModuleById(input.moduleId);
        if (!module) {
          throw new TRPCError({ code: "NOT_FOUND", message: "Module not found" });
        }
        
        // Check if user has completed the module
        const progress = await db.getModuleProgress(ctx.user.id, input.moduleId);
        if (!progress || progress.isCompleted !== 1) {
          throw new TRPCError({ 
            code: "FORBIDDEN", 
            message: "You must complete the module before downloading the certificate" 
          });
        }
        
        // Generate PDF certificate
        const pdfBuffer = await generateCertificatePDF(
          ctx.user.name || "Student",
          module.title,
          progress.completedAt || new Date()
        );
        
        // Generate filename
        const filename = generateCertificateFilename(ctx.user.name || "Student", module.title);
        
        // Return PDF as base64 for download
        return {
          pdf: pdfBuffer.toString("base64"),
          filename,
          success: true,
        };
      }),

    // Video Completion Tracking
    trackVideoProgress: protectedProcedure
      .input(z.object({
        videoId: z.number(),
        moduleId: z.number(),
        watchedDuration: z.number(),
        totalDuration: z.number(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
        return db.trackVideoProgress(
          ctx.user.id,
          input.videoId,
          input.moduleId,
          input.watchedDuration,
          input.totalDuration
        );
      }),

    getVideoCompletion: protectedProcedure
      .input(z.object({ videoId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
        return db.getVideoCompletion(ctx.user.id, input.videoId);
      }),

    getModuleVideoCompletions: protectedProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
        return db.getModuleVideoCompletions(ctx.user.id, input.moduleId);
      }),

    isModuleVideosCompleted: protectedProcedure
      .input(z.object({ moduleId: z.number() }))
      .query(async ({ input, ctx }) => {
        if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
        return db.isModuleVideosCompleted(ctx.user.id, input.moduleId);
      }),
  }),

  prayerRequests: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Invalid email address"),
        prayerCategory: z.enum([
          "church_planting",
          "leadership_development",
          "refugee_support",
          "community_outreach",
          "missions",
          "healing",
          "family",
          "other"
        ]),
        prayerRequest: z.string().min(10, "Prayer request must be at least 10 characters"),
        isPublic: z.boolean().default(false),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await db.createPrayerRequest({
            name: input.name,
            email: input.email,
            prayerCategory: input.prayerCategory,
            prayerRequest: input.prayerRequest,
            isPublic: input.isPublic ? 1 : 0,
            status: "new",
          });
          return { success: true, message: "Prayer request submitted successfully" };
        } catch (error) {
          console.error("Error submitting prayer request:", error);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to submit prayer request",
          });
        }
      }),

    getAll: protectedProcedure
      .query(async ({ ctx }) => {
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return db.getAllPrayerRequests();
      }),

    updateStatus: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["new", "acknowledged", "praying", "answered"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return db.updatePrayerRequestStatus(input.id, input.status);
      }),

    bulkUpdateStatus: protectedProcedure
      .input(z.object({
        ids: z.array(z.number()),
        status: z.enum(["new", "acknowledged", "praying", "answered"]),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return db.bulkUpdatePrayerRequestStatus(input.ids, input.status);
      }),

    deletePrayerRequest: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return db.deletePrayerRequest(input.id);
      }),

    bulkDelete: protectedProcedure
      .input(z.object({ ids: z.array(z.number()) }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user || ctx.user.role !== "admin") {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return db.bulkDeletePrayerRequests(input.ids);
      }),
  }),

  forum: router({
    // Get all threads for a course
    getThreadsByCourse: publicProcedure
      .input(z.object({ courseId: z.number() }))
      .query(async ({ input }) => {
        return db.getForumThreadsByCourse(input.courseId);
      }),

    // Get posts for a thread
    getPostsByThread: publicProcedure
      .input(z.object({ threadId: z.number() }))
      .query(async ({ input }) => {
        return db.getForumPostsByThread(input.threadId);
      }),

    // Create a new thread (requires authentication)
    createThread: protectedProcedure
      .input(z.object({
        courseId: z.number(),
        title: z.string().min(3).max(255),
        content: z.string().min(10),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return db.createForumThread({
          courseId: input.courseId,
          userId: ctx.user.id,
          title: input.title,
          content: input.content,
        });
      }),

    // Create a post in a thread (requires authentication)
    createPost: protectedProcedure
      .input(z.object({
        threadId: z.number(),
        content: z.string().min(1),
      }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return db.createForumPost({
          threadId: input.threadId,
          userId: ctx.user.id,
          content: input.content,
        });
      }),

    // Delete a post (admin only or post author)
    deletePost: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return db.deleteForumPost(input.postId, ctx.user.id, ctx.user.role === "admin");
      }),

    // Delete a thread (admin only or thread author)
    deleteThread: protectedProcedure
      .input(z.object({ threadId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (!ctx.user) {
          throw new TRPCError({ code: "UNAUTHORIZED" });
        }
        return db.deleteForumThread(input.threadId, ctx.user.id, ctx.user.role === "admin");
      }),
  }),
});

export type AppRouter = typeof appRouter;
