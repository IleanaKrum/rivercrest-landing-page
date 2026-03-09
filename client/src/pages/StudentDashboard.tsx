import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, CheckCircle2, Clock, LogOut } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

export default function StudentDashboard() {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const { data: enrollments, isLoading: enrollmentsLoading } = trpc.centerOfStudies.getMyEnrollments.useQuery();
  const { data: applications } = trpc.centerOfStudies.getMyApplications.useQuery();
  const { data: courseDetails } = trpc.centerOfStudies.getCourseDetails.useQuery(
    { courseId: selectedCourse || 0 },
    { enabled: selectedCourse !== null }
  );
  const { data: courseSessions } = trpc.centerOfStudies.getCourseSessions.useQuery(
    { courseId: selectedCourse || 0 },
    { enabled: selectedCourse !== null }
  );
  const { data: studentProgress } = trpc.centerOfStudies.getStudentProgress.useQuery(
    { enrollmentId: enrollments?.[0]?.id || 0 },
    { enabled: enrollments && enrollments.length > 0 && selectedCourse !== null }
  );

  const updateProgress = trpc.centerOfStudies.updateSessionProgress.useMutation();

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  const handleToggleSessionProgress = async (enrollmentId: number, sessionId: number, currentStatus: boolean) => {
    try {
      await updateProgress.mutateAsync({
        enrollmentId,
        sessionId,
        completed: !currentStatus,
      });
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const getProgressPercentage = () => {
    if (!studentProgress || !courseSessions) return 0;
    const completedCount = studentProgress.filter((p) => p.completed === 1).length;
    return Math.round((completedCount / courseSessions.length) * 100);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-primary">Student Dashboard</h1>
              <p className="text-xs text-muted-foreground">Rivercrest Center of Studies</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <LanguageSelector />
            <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              {t('nav.logout')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Enrollments */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-0 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-6">{t('dashboard.enrollments')}</h2>

              {enrollmentsLoading ? (
                <p className="text-muted-foreground">Loading courses...</p>
              ) : enrollments && enrollments.length > 0 ? (
                <div className="space-y-3">
                  {enrollments.map((enrollment) => (
                    <button
                      key={enrollment.id}
                      onClick={() => setSelectedCourse(enrollment.courseId)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        selectedCourse === enrollment.courseId
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                        <div>
                          <p className="font-semibold text-foreground text-sm">Course {enrollment.courseId}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Status: {enrollment.status}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">{t('dashboard.noEnrollments')}</p>
                  <Button
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/5"
                    onClick={() => setLocation("/center-of-studies")}
                  >
                    Browse Programs
                  </Button>
                </div>
              )}

              {applications && applications.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-4">{t('dashboard.title')}</h3>
                  <div className="space-y-3">
                    {applications.map((app) => (
                      <Card key={app.id} className="p-4 bg-background border border-border">
                        <p className="text-sm font-semibold text-foreground">Track {app.trackId}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Status: <span className="font-semibold text-accent">{app.status}</span>
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Content - Course Details */}
          <div className="lg:col-span-2">
            {selectedCourse && courseDetails ? (
              <div className="space-y-6">
                {/* Course Header */}
                <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-primary/5 to-background">
                  <h2 className="text-3xl font-bold text-primary mb-4">{courseDetails.title}</h2>
                  <p className="text-foreground/70 mb-6 leading-relaxed">{courseDetails.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground mb-1">{t('course.sessions')}</p>
                      <p className="text-2xl font-bold text-primary">{courseDetails.sessionsCount}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-border">
                      <p className="text-xs text-muted-foreground mb-1">{t('course.hoursRequired')}</p>
                      <p className="text-2xl font-bold text-primary">{courseDetails.commitmentHours}</p>
                    </div>
                  </div>
                </Card>

                {/* Progress Bar */}
                {enrollments && enrollments.length > 0 && (
                  <Card className="p-6 border-0 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-foreground">{t('dashboard.progress')}</h3>
                      <span className="text-2xl font-bold text-primary">{getProgressPercentage()}%</span>
                    </div>
                    <div className="w-full bg-border rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-primary h-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage()}%` }}
                      />
                    </div>
                  </Card>
                )}

                {/* Syllabus */}
                {courseDetails.syllabus && (
                  <Card className="p-8 border-0 shadow-lg">
                    <h3 className="text-xl font-bold text-primary mb-4">{t('course.syllabus')}</h3>
                    <div className="prose prose-sm max-w-none text-foreground/80 whitespace-pre-wrap">
                      {courseDetails.syllabus}
                    </div>
                  </Card>
                )}

                {/* Sessions */}
                {courseSessions && courseSessions.length > 0 && (
                  <Card className="p-8 border-0 shadow-lg">
                    <h3 className="text-xl font-bold text-primary mb-6">{t('course.sessions')}</h3>
                    <div className="space-y-4">
                      {courseSessions.map((session) => {
                        const progressItem = studentProgress?.find((p) => p.sessionId === session.id);
                        const isCompleted = progressItem?.completed === 1;

                        return (
                          <div
                            key={session.id}
                            className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all"
                          >
                            <div className="flex items-start gap-4">
                              <button
                                onClick={() =>
                                  handleToggleSessionProgress(enrollments![0].id, session.id, isCompleted)
                                }
                                className="flex-shrink-0 mt-1"
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="w-6 h-6 text-accent" />
                                ) : (
                                  <div className="w-6 h-6 rounded-full border-2 border-border hover:border-primary transition-colors" />
                                )}
                              </button>
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground mb-2">
                                  Session {session.sessionNumber}: {session.title}
                                </h4>
                                {session.description && (
                                  <p className="text-sm text-foreground/70 mb-3">{session.description}</p>
                                )}
                                {session.topics && (
                                  <div className="mb-3">
                                    <p className="text-xs font-semibold text-muted-foreground mb-2">Topics:</p>
                                    <p className="text-sm text-foreground/70">{session.topics}</p>
                                  </div>
                                )}
                                {session.assignments && (
                                  <div>
                                    <p className="text-xs font-semibold text-muted-foreground mb-2">Assignments:</p>
                                    <p className="text-sm text-foreground/70">{session.assignments}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                )}
              </div>
            ) : (
              <Card className="p-12 border-0 shadow-lg text-center">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-lg text-foreground/70 mb-4">Select a course to view details and track your progress</p>
                {enrollments && enrollments.length === 0 && (
                  <Button
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => setLocation("/center-of-studies")}
                  >
                    Explore Training Programs
                  </Button>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
