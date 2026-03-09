import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

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
        candidateAddress: z.string(),
        churchName: z.string(),
        leadPastorName: z.string(),
        recommendationLetterUrl: z.string().optional(),
        essay: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        return db.createApplication({
          trackId: input.trackId,
          candidateName: input.candidateName,
          candidateAddress: input.candidateAddress,
          churchName: input.churchName,
          leadPastorName: input.leadPastorName,
          recommendationLetterUrl: input.recommendationLetterUrl,
          essay: input.essay,
          userId: ctx.user?.id,
          status: "pending",
        });
      }),
    
    getMyApplications: protectedProcedure.query(({ ctx }) =>
      db.getApplicationsByUserId(ctx.user.id)
    ),
    
    getMyEnrollments: protectedProcedure.query(({ ctx }) =>
      db.getEnrollmentsByUserId(ctx.user.id)
    ),
    
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
  }),
});

export type AppRouter = typeof appRouter;
