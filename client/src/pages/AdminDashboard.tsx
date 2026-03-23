import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { CheckCircle, XCircle, Clock, Users, BookOpen, BarChart3 } from "lucide-react";
import StudentProgress from "@/components/admin/StudentProgress";
import QuizAnalytics from "@/components/admin/QuizAnalytics";
import ModuleCompletion from "@/components/admin/ModuleCompletion";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("analytics");

  // Check if user is admin
  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <h1 className="text-2xl font-bold text-primary mb-4">Access Denied</h1>
          <p className="text-foreground/70 mb-6">
            You do not have permission to access the admin dashboard. Only administrators can view this page.
          </p>
          <Button onClick={() => navigate("/")} className="w-full" variant="default">
            Return to Home
          </Button>
        </Card>
      </div>
    );
  }

  // Fetch admin data
  const { data: applications = [], isLoading: appsLoading } = (trpc.admin.getAllApplications as any).useQuery();
  const { data: courses = [], isLoading: coursesLoading } = (trpc.admin.getAllCourses as any).useQuery();
  const { data: enrollments = [], isLoading: enrollmentsLoading } = (trpc.admin.getAllEnrollments as any).useQuery();
  const { data: dashboardSummary = {} as any } = (trpc.admin.getDashboardSummary as any).useQuery();

  const updateAppStatus = trpc.admin.updateApplicationStatus.useMutation();

  const handleApplicationStatus = async (appId: number, status: "approved" | "rejected") => {
    try {
      await updateAppStatus.mutateAsync({ applicationId: appId, status });
      // Refetch applications
      window.location.reload();
    } catch (error) {
      console.error("Failed to update application status:", error);
    }
  };

  // Calculate statistics
  const pendingApps = applications.filter((app: any) => app.status === "pending").length;
  const approvedApps = applications.filter((app: any) => app.status === "approved").length;
  const activeEnrollments = enrollments.filter((e: any) => e.status === "in_progress").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container py-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-primary-foreground/80">Manage applications, courses, and student progress</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending Applications</p>
                <p className="text-3xl font-bold text-primary">{pendingApps}</p>
              </div>
              <Clock className="w-12 h-12 text-accent opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedApps}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600 opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Courses</p>
                <p className="text-3xl font-bold text-primary">{courses.length}</p>
              </div>
              <BookOpen className="w-12 h-12 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Active Students</p>
                <p className="text-3xl font-bold text-primary">{activeEnrollments}</p>
              </div>
              <Users className="w-12 h-12 text-primary opacity-50" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pass Rate</p>
                <p className="text-3xl font-bold text-green-600">{dashboardSummary?.passRate || 0}%</p>
              </div>
              <BarChart3 className="w-12 h-12 text-green-600 opacity-50" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="analytics">Analytics Overview</TabsTrigger>
            <TabsTrigger value="students">Student Progress</TabsTrigger>
            <TabsTrigger value="quizzes">Quiz Performance</TabsTrigger>
            <TabsTrigger value="modules">Module Completion</TabsTrigger>
          </TabsList>

          {/* Analytics Overview Tab */}
          <TabsContent value="analytics">
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-6">Dashboard Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Total Students</p>
                  <p className="text-3xl font-bold text-foreground">{dashboardSummary?.totalStudents || 0}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Quiz Attempts</p>
                  <p className="text-3xl font-bold text-foreground">{dashboardSummary?.totalQuizAttempts || 0}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Certificates Issued</p>
                  <p className="text-3xl font-bold text-green-600">{dashboardSummary?.certificatesIssued || 0}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Average Quiz Score</p>
                  <p className="text-3xl font-bold text-foreground">{dashboardSummary?.averageQuizScore || 0}</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Video Completion Rate</p>
                  <p className="text-3xl font-bold text-blue-600">{dashboardSummary?.videoCompletionRate || 0}%</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Student Progress Tab */}
          <TabsContent value="students">
            <StudentProgress />
          </TabsContent>

          {/* Quiz Performance Tab */}
          <TabsContent value="quizzes">
            <QuizAnalytics />
          </TabsContent>

          {/* Module Completion Tab */}
          <TabsContent value="modules">
            <ModuleCompletion />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
