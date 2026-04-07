import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";

describe("Forum System", () => {
  const testCourseId = 1;
  const testUserId = 1;
  let testThreadId: number;
  let testPostId: number;

  describe("Forum Threads", () => {
    it("should create a forum thread", async () => {
      const result = await db.createForumThread({
        courseId: testCourseId,
        userId: testUserId,
        title: "Test Discussion Thread",
        content: "This is a test discussion about the course material.",
      });

      expect(result).toBeDefined();
      expect(result.insertId).toBeGreaterThan(0);
      testThreadId = result.insertId;
      console.log("Created test thread ID:", testThreadId);
    });

    it("should retrieve threads for a course", async () => {
      const threads = await db.getForumThreadsByCourse(testCourseId);

      expect(Array.isArray(threads)).toBe(true);
      expect(threads.length).toBeGreaterThan(0);
      expect(threads[0]).toHaveProperty("title");
      expect(threads[0]).toHaveProperty("content");
      expect(threads[0]).toHaveProperty("userId");
    });

    it("should retrieve empty array for course with no threads", async () => {
      const threads = await db.getForumThreadsByCourse(9999);

      expect(Array.isArray(threads)).toBe(true);
      expect(threads.length).toBe(0);
    });

    it("should order threads by creation date", async () => {
      // Create second thread
      await db.createForumThread({
        courseId: testCourseId,
        userId: testUserId,
        title: "Second Test Thread",
        content: "This is the second test thread.",
      });

      const threads = await db.getForumThreadsByCourse(testCourseId);

      expect(threads.length).toBeGreaterThanOrEqual(2);
      // Verify threads are ordered by createdAt
      for (let i = 1; i < threads.length; i++) {
        const prevTime = new Date(threads[i - 1].createdAt).getTime();
        const currTime = new Date(threads[i].createdAt).getTime();
        expect(prevTime).toBeLessThanOrEqual(currTime);
      }
    });
  });

  describe("Forum Posts", () => {
    it("should create a forum post in a thread", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      const result = await db.createForumPost({
        threadId: testThreadId,
        userId: testUserId,
        content: "This is a test reply to the discussion.",
      });

      expect(result).toBeDefined();
      expect(result.insertId).toBeGreaterThan(0);
      testPostId = result.insertId;
    });

    it("should retrieve posts for a thread", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      const posts = await db.getForumPostsByThread(testThreadId);

      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
      expect(posts[0]).toHaveProperty("content");
      expect(posts[0]).toHaveProperty("userId");
      expect(posts[0]).toHaveProperty("threadId");
    });

    it("should retrieve empty array for thread with no posts", async () => {
      // Create a thread without posts
      const threadResult = await db.createForumThread({
        courseId: testCourseId,
        userId: testUserId,
        title: "Empty Thread",
        content: "This thread has no posts.",
      });

      const posts = await db.getForumPostsByThread(threadResult.insertId);

      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBe(0);
    });

    it("should order posts by creation date", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      // Create second post
      await db.createForumPost({
        threadId: testThreadId,
        userId: testUserId,
        content: "This is a second test reply.",
      });

      const posts = await db.getForumPostsByThread(testThreadId);

      expect(posts.length).toBeGreaterThanOrEqual(2);
      // Verify posts are ordered by createdAt
      for (let i = 1; i < posts.length; i++) {
        const prevTime = new Date(posts[i - 1].createdAt).getTime();
        const currTime = new Date(posts[i].createdAt).getTime();
        expect(prevTime).toBeLessThanOrEqual(currTime);
      }
    });

    it("should create multiple posts in same thread", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      const postsBefore = await db.getForumPostsByThread(testThreadId);
      const countBefore = postsBefore.length;

      await db.createForumPost({
        threadId: testThreadId,
        userId: testUserId,
        content: "Third test reply.",
      });

      const postsAfter = await db.getForumPostsByThread(testThreadId);

      expect(postsAfter.length).toBe(countBefore + 1);
    });
  });

  describe("Delete Operations", () => {
    it("should delete a forum post by author", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      // Create a post to delete
      const postResult = await db.createForumPost({
        threadId: testThreadId,
        userId: testUserId,
        content: "Post to be deleted.",
      });

      const postIdToDelete = postResult.insertId;

      // Delete the post
      const deleteResult = await db.deleteForumPost(postIdToDelete, testUserId, false);

      expect(deleteResult).toBeDefined();

      // Verify post is deleted
      const posts = await db.getForumPostsByThread(testThreadId);
      const deletedPost = posts.find(p => p.id === postIdToDelete);
      expect(deletedPost).toBeUndefined();
    });

    it("should delete a forum post by admin", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      // Create a post by different user
      const postResult = await db.createForumPost({
        threadId: testThreadId,
        userId: 999, // Different user
        content: "Post to be deleted by admin.",
      });

      const postIdToDelete = postResult.insertId;

      // Admin deletes the post
      const deleteResult = await db.deleteForumPost(postIdToDelete, testUserId, true);

      expect(deleteResult).toBeDefined();

      // Verify post is deleted
      const posts = await db.getForumPostsByThread(testThreadId);
      const deletedPost = posts.find(p => p.id === postIdToDelete);
      expect(deletedPost).toBeUndefined();
    });

    it("should not allow non-author to delete post", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      // Create a post by one user
      const postResult = await db.createForumPost({
        threadId: testThreadId,
        userId: testUserId,
        content: "Post that should not be deleted.",
      });

      const postIdToDelete = postResult.insertId;

      // Try to delete as different non-admin user
      try {
        await db.deleteForumPost(postIdToDelete, 999, false);
        expect.fail("Should have thrown error");
      } catch (error) {
        expect((error as Error).message).toContain("Unauthorized");
      }
    });

    it("should delete a forum thread and all its posts", async () => {
      // Create a thread with posts
      const threadResult = await db.createForumThread({
        courseId: testCourseId,
        userId: testUserId,
        title: "Thread to Delete",
        content: "This thread will be deleted.",
      });

      const threadIdToDelete = threadResult.insertId;

      // Add posts to the thread
      await db.createForumPost({
        threadId: threadIdToDelete,
        userId: testUserId,
        content: "Post 1",
      });

      await db.createForumPost({
        threadId: threadIdToDelete,
        userId: testUserId,
        content: "Post 2",
      });

      // Delete the thread
      const deleteResult = await db.deleteForumThread(threadIdToDelete, testUserId, false);

      expect(deleteResult).toBeDefined();

      // Verify thread is deleted
      const threads = await db.getForumThreadsByCourse(testCourseId);
      const deletedThread = threads.find(t => t.id === threadIdToDelete);
      expect(deletedThread).toBeUndefined();

      // Verify posts are deleted
      const posts = await db.getForumPostsByThread(threadIdToDelete);
      expect(posts.length).toBe(0);
    });

    it("should delete thread by admin", async () => {
      // Create a thread by one user
      const threadResult = await db.createForumThread({
        courseId: testCourseId,
        userId: 999,
        title: "Thread to Delete by Admin",
        content: "This thread will be deleted by admin.",
      });

      const threadIdToDelete = threadResult.insertId;

      // Admin deletes the thread
      const deleteResult = await db.deleteForumThread(threadIdToDelete, testUserId, true);

      expect(deleteResult).toBeDefined();

      // Verify thread is deleted
      const threads = await db.getForumThreadsByCourse(testCourseId);
      const deletedThread = threads.find(t => t.id === threadIdToDelete);
      expect(deletedThread).toBeUndefined();
    });

    it("should not allow non-author to delete thread", async () => {
      // Create a thread by one user
      const threadResult = await db.createForumThread({
        courseId: testCourseId,
        userId: testUserId,
        title: "Thread that should not be deleted",
        content: "This thread should not be deleted.",
      });

      const threadIdToDelete = threadResult.insertId;

      // Try to delete as different non-admin user
      try {
        await db.deleteForumThread(threadIdToDelete, 999, false);
        expect.fail("Should have thrown error");
      } catch (error) {
        expect((error as Error).message).toContain("Unauthorized");
      }
    });
  });

  describe("Data Validation", () => {
    it("should store thread metadata correctly", async () => {
      const result = await db.createForumThread({
        courseId: testCourseId,
        userId: testUserId,
        title: "Metadata Test Thread",
        content: "Testing metadata storage.",
      });

      const threads = await db.getForumThreadsByCourse(testCourseId);
      const thread = threads.find(t => t.id === result.insertId);

      expect(thread).toBeDefined();
      expect(thread?.courseId).toBe(testCourseId);
      expect(thread?.userId).toBe(testUserId);
      expect(thread?.title).toBe("Metadata Test Thread");
      expect(thread?.content).toBe("Testing metadata storage.");
      expect(thread?.createdAt).toBeDefined();
      expect(thread?.updatedAt).toBeDefined();
    });

    it("should store post metadata correctly", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      const result = await db.createForumPost({
        threadId: testThreadId,
        userId: testUserId,
        content: "Metadata test post.",
      });

      const posts = await db.getForumPostsByThread(testThreadId);
      const post = posts.find(p => p.id === result.insertId);

      expect(post).toBeDefined();
      expect(post?.threadId).toBe(testThreadId);
      expect(post?.userId).toBe(testUserId);
      expect(post?.content).toBe("Metadata test post.");
      expect(post?.createdAt).toBeDefined();
      expect(post?.updatedAt).toBeDefined();
    });

    it("should handle special characters in content", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      const specialContent = "Test with special chars: <script>alert('xss')</script> & \"quotes\" 'apostrophes'";

      const result = await db.createForumPost({
        threadId: testThreadId,
        userId: testUserId,
        content: specialContent,
      });

      const posts = await db.getForumPostsByThread(testThreadId);
      const post = posts.find(p => p.id === result.insertId);

      expect(post?.content).toBe(specialContent);
    });

    it("should handle long content", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      const longContent = "A".repeat(5000); // 5000 character content

      const result = await db.createForumPost({
        threadId: testThreadId,
        userId: testUserId,
        content: longContent,
      });

      const posts = await db.getForumPostsByThread(testThreadId);
      const post = posts.find(p => p.id === result.insertId);

      expect(post?.content).toBe(longContent);
      expect(post?.content.length).toBe(5000);
    });
  });

  describe("Edge Cases", () => {
    it("should handle concurrent thread creation", async () => {
      const promises = Array(5)
        .fill(null)
        .map((_, i) =>
          db.createForumThread({
            courseId: testCourseId,
            userId: testUserId,
            title: `Concurrent Thread ${i}`,
            content: `Content for concurrent thread ${i}`,
          })
        );

      const results = await Promise.all(promises);

      expect(results.length).toBe(5);
      results.forEach(result => {
        expect(result.insertId).toBeGreaterThan(0);
      });

      const threads = await db.getForumThreadsByCourse(testCourseId);
      expect(threads.length).toBeGreaterThanOrEqual(5);
    });

    it("should handle concurrent post creation in same thread", async () => {
      if (!testThreadId || testThreadId <= 0) {
        throw new Error("Test thread not created. Run thread tests first.");
      }

      const promises = Array(5)
        .fill(null)
        .map((_, i) =>
          db.createForumPost({
            threadId: testThreadId,
            userId: testUserId,
            content: `Concurrent post ${i}`,
          })
        );

      const results = await Promise.all(promises);

      expect(results.length).toBe(5);
      results.forEach(result => {
        expect(result.insertId).toBeGreaterThan(0);
      });

      const posts = await db.getForumPostsByThread(testThreadId);
      expect(posts.length).toBeGreaterThanOrEqual(5);
    }).timeout(10000);

    it("should handle thread with many posts", async () => {
      const threadResult = await db.createForumThread({
        courseId: testCourseId,
        userId: testUserId,
        title: "Thread with Many Posts",
        content: "This thread will have many posts.",
      });

      const threadIdWithManyPosts = threadResult.insertId;

      // Create 50 posts
      for (let i = 0; i < 50; i++) {
        await db.createForumPost({
          threadId: threadIdWithManyPosts,
          userId: testUserId,
          content: `Post number ${i + 1}`,
        });
      }

      const posts = await db.getForumPostsByThread(threadIdWithManyPosts);

      expect(posts.length).toBe(50);
    }).timeout(15000);
  });
});
