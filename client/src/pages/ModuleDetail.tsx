import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { ArrowLeft, BookOpen, Clock, CheckCircle2, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Streamdown } from "streamdown";

export default function ModuleDetail() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [language, setLanguage] = useState<"english" | "swahili">("english");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Extract module ID from URL
  const moduleId = parseInt(window.location.pathname.split("/").pop() || "0");

  // Fetch module data
  const { data: module, isLoading } = trpc.centerOfStudies.getModuleById.useQuery(
    { moduleId },
    { enabled: moduleId > 0 }
  );

  // Fetch user's progress
  const { data: progress } = trpc.centerOfStudies.getModuleProgress.useQuery(
    { moduleId },
    { enabled: isAuthenticated && moduleId > 0 }
  );

  // Update progress mutation
  const updateProgressMutation = trpc.centerOfStudies.updateModuleProgress.useMutation();
  const completeModuleMutation = trpc.centerOfStudies.completeModule.useMutation();

  // Initialize progress data
  useEffect(() => {
    if (progress) {
      setProgressPercentage(progress.progressPercentage || 0);
      setNotes(progress.notes || "");
    }
  }, [progress]);

  const handleProgressUpdate = async () => {
    if (!isAuthenticated || !user) return;

    setIsSaving(true);
    try {
      await updateProgressMutation.mutateAsync({
        moduleId,
        progressPercentage,
        notes,
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCompleteModule = async () => {
    if (!isAuthenticated || !user) return;

    try {
      await completeModuleMutation.mutateAsync({ moduleId });
      setProgressPercentage(100);
    } catch (error) {
      console.error("Failed to complete module:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading module...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Module not found</p>
          <Button onClick={() => navigate("/modules")} className="mt-4">
            Back to Modules
          </Button>
        </div>
      </div>
    );
  }

  const content = language === "english" ? module.content : module.contentSwahili || module.content;
  const isCompleted = progress?.isCompleted === 1;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-8">
        <div className="container">
          <Button
            variant="ghost"
            className="text-primary-foreground hover:bg-primary-foreground/20 mb-4"
            onClick={() => navigate("/modules")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Modules
          </Button>

          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-8 h-8" />
                <h1 className="text-4xl font-bold">{module.title}</h1>
              </div>
              <p className="text-lg text-primary-foreground/90">{module.description}</p>
            </div>
            {isCompleted && (
              <div className="flex items-center gap-2 bg-green-600/20 px-4 py-2 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <span className="text-green-100 font-medium">Completed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {/* Language Tabs */}
            <Card className="mb-8">
              <div className="flex gap-2 p-4 border-b border-border">
                <Button
                  variant={language === "english" ? "default" : "outline"}
                  onClick={() => setLanguage("english")}
                  className="flex items-center gap-2"
                >
                  <Globe className="w-4 h-4" />
                  English
                </Button>
                {module.contentSwahili && (
                  <Button
                    variant={language === "swahili" ? "default" : "outline"}
                    onClick={() => setLanguage("swahili")}
                    className="flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Kiswahili
                  </Button>
                )}
              </div>

              {/* Module Content */}
              <div className="p-8">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <Streamdown>{content || ""}</Streamdown>
                </div>
              </div>
            </Card>

            {/* Reflection Notes Section */}
            {isAuthenticated && (
              <Card>
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-bold">Reflection Notes</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Write your thoughts and reflections as you study this module
                  </p>
                </div>

                <div className="p-6">
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Enter your reflection notes here..."
                    className="w-full h-32 p-4 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />

                  <Button
                    onClick={handleProgressUpdate}
                    disabled={isSaving}
                    className="mt-4"
                  >
                    {isSaving ? "Saving..." : "Save Notes"}
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Module Info Card */}
            <Card className="mb-6">
              <div className="p-6">
                <h3 className="font-bold mb-4">Module Information</h3>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Time</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-medium">{module.estimatedHours} hours</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm font-medium">
                      {module.category}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-medium mt-1">{module.language}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Progress Card */}
            {isAuthenticated && (
              <Card className="mb-6">
                <div className="p-6">
                  <h3 className="font-bold mb-4">Your Progress</h3>

                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Completion</span>
                        <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div
                          className="bg-primary h-3 rounded-full transition-all"
                          style={{ width: `${progressPercentage}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={progressPercentage}
                        onChange={(e) => setProgressPercentage(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                      />
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button
                        onClick={handleProgressUpdate}
                        disabled={isSaving}
                        variant="outline"
                        className="w-full"
                      >
                        {isSaving ? "Updating..." : "Update Progress"}
                      </Button>

                      {!isCompleted && (
                        <Button
                          onClick={handleCompleteModule}
                          className="w-full"
                        >
                          Mark as Complete
                        </Button>
                      )}

                      {isCompleted && (
                        <div className="flex items-center justify-center gap-2 py-2 text-green-600">
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="font-medium">Module Completed!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* CTA for Non-Authenticated Users */}
            {!isAuthenticated && (
              <Card>
                <div className="p-6 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign in to track your progress and save notes
                  </p>
                  <Button className="w-full">Sign In</Button>
                </div>
              </Card>
            )}

            {/* Related Modules */}
            {module.category && (
              <Card>
                <div className="p-6">
                  <h3 className="font-bold mb-4">Same Category</h3>
                  <p className="text-sm text-muted-foreground">
                    Other modules in the {module.category} category
                  </p>
                  <Button variant="outline" className="w-full mt-4">
                    Browse Category
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
