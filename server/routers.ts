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
});

export type AppRouter = typeof appRouter;
