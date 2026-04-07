import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";

interface CourseForumProps {
  courseId: number;
  courseName: string;
}

export function CourseForum({ courseId, courseName }: CourseForumProps) {
  const { user, isAuthenticated } = useAuth();
  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
  const [showNewThreadForm, setShowNewThreadForm] = useState(false);
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  // Queries
  const threadsQuery = trpc.forum.getThreadsByCourse.useQuery({ courseId });
  const postsQuery = trpc.forum.getPostsByThread.useQuery(
    { threadId: selectedThreadId! },
    { enabled: !!selectedThreadId }
  );

  // Mutations
  const createThreadMutation = trpc.forum.createThread.useMutation({
    onSuccess: () => {
      threadsQuery.refetch();
      setNewThreadTitle("");
      setNewThreadContent("");
      setShowNewThreadForm(false);
    },
  });

  const createPostMutation = trpc.forum.createPost.useMutation({
    onSuccess: () => {
      postsQuery.refetch();
      setNewPostContent("");
    },
  });

  const deletePostMutation = trpc.forum.deletePost.useMutation({
    onSuccess: () => {
      postsQuery.refetch();
    },
  });

  const deleteThreadMutation = trpc.forum.deleteThread.useMutation({
    onSuccess: () => {
      threadsQuery.refetch();
      setSelectedThreadId(null);
    },
  });

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreadTitle.trim() || !newThreadContent.trim()) return;

    try {
      await createThreadMutation.mutateAsync({
        courseId,
        title: newThreadTitle,
        content: newThreadContent,
      });
    } catch (error) {
      console.error("Failed to create thread:", error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedThreadId || !newPostContent.trim()) return;

    try {
      await createPostMutation.mutateAsync({
        threadId: selectedThreadId,
        content: newPostContent,
      });
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  const handleDeletePost = async (postId: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePostMutation.mutateAsync({ postId });
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleDeleteThread = async (threadId: number) => {
    if (!confirm("Are you sure you want to delete this thread? All posts will be deleted.")) return;

    try {
      await deleteThreadMutation.mutateAsync({ threadId });
    } catch (error) {
      console.error("Failed to delete thread:", error);
    }
  };

  const threads = threadsQuery.data || [];
  const posts = postsQuery.data || [];
  const selectedThread = threads.find(t => t.id === selectedThreadId);

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Discussion Forum</h2>
        </div>
        {isAuthenticated && (
          <Button
            onClick={() => setShowNewThreadForm(!showNewThreadForm)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Discussion
          </Button>
        )}
      </div>

      {/* New Thread Form */}
      {showNewThreadForm && isAuthenticated && (
        <Card className="p-6 bg-muted">
          <h3 className="text-lg font-semibold mb-4">Start a New Discussion</h3>
          <form onSubmit={handleCreateThread} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={newThreadTitle}
                onChange={(e) => setNewThreadTitle(e.target.value)}
                placeholder="Enter discussion title"
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                value={newThreadContent}
                onChange={(e) => setNewThreadContent(e.target.value)}
                placeholder="Enter your message"
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" disabled={createThreadMutation.isPending}>
                {createThreadMutation.isPending ? "Posting..." : "Post Discussion"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewThreadForm(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threads List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Discussions ({threads.length})</h3>
            {threadsQuery.isLoading ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : threads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No discussions yet. Be the first to start one!
              </div>
            ) : (
              <div className="space-y-2">
                {threads.map((thread) => (
                  <button
                    key={thread.id}
                    onClick={() => setSelectedThreadId(thread.id)}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedThreadId === thread.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted hover:bg-muted/80"
                    }`}
                  >
                    <p className="font-medium text-sm line-clamp-2">{thread.title}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {format(new Date(thread.createdAt), "MMM d, yyyy")}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Thread Details and Posts */}
        <div className="lg:col-span-2">
          {selectedThread ? (
            <div className="space-y-4">
              {/* Thread Header */}
              <Card className="p-6 bg-muted">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedThread.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Posted on {format(new Date(selectedThread.createdAt), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  {user?.id === selectedThread.userId || user?.role === "admin" ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteThread(selectedThread.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  ) : null}
                </div>
                <p className="mt-4 text-foreground">{selectedThread.content}</p>
              </Card>

              {/* Posts */}
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Replies ({posts.length})</h4>
                {postsQuery.isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">Loading...</div>
                ) : posts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No replies yet. Be the first to respond!
                  </div>
                ) : (
                  <div className="space-y-4 mb-6">
                    {posts.map((post) => (
                      <div key={post.id} className="p-4 bg-muted rounded-md">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1">
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(post.createdAt), "MMM d, yyyy 'at' h:mm a")}
                            </p>
                            <p className="mt-2 text-foreground">{post.content}</p>
                          </div>
                          {user?.id === post.userId || user?.role === "admin" ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeletePost(post.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          ) : null}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* New Post Form */}
                {isAuthenticated ? (
                  <form onSubmit={handleCreatePost} className="mt-6 pt-6 border-t border-border">
                    <label className="block text-sm font-medium mb-2">Add a Reply</label>
                    <div className="flex gap-2">
                      <textarea
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        placeholder="Write your reply..."
                        rows={3}
                        className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={createPostMutation.isPending}
                      className="mt-2 gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {createPostMutation.isPending ? "Posting..." : "Post Reply"}
                    </Button>
                  </form>
                ) : (
                  <div className="mt-6 pt-6 border-t border-border text-center text-muted-foreground">
                    <p>Please log in to participate in discussions</p>
                  </div>
                )}
              </Card>
            </div>
          ) : (
            <Card className="p-12 text-center">
              <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Select a discussion or create a new one to get started
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
