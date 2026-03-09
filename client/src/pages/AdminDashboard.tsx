import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle, XCircle, Clock, Users, BookOpen, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("applications");

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
  const { data: applications = [], isLoading: appsLoading } = trpc.admin.getAllApplications.useQuery();
  const { data: courses = [], isLoading: coursesLoading } = trpc.admin.getAllCourses.useQuery();
  const { data: enrollments = [], isLoading: enrollmentsLoading } = trpc.admin.getAllEnrollments.useQuery();

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
  const rejectedApps = applications.filter((app: any) => app.status === "rejected").length;
  const activeEnrollments = enrollments.filter((e: any) => e.status === "in_progress").length;
  const completedEnrollments = enrollments.filter((e: any) => e.status === "completed").length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8 px-6">
        <div className="container">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-primary-foreground/80">Manage applications, courses, and student progress</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="progress">Student Progress</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Manage Applications</h2>
              {appsLoading ? (
                <p className="text-muted-foreground">Loading applications...</p>
              ) : applications.length === 0 ? (
                <p className="text-muted-foreground">No applications yet.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold">Candidate</th>
                        <th className="text-left py-3 px-4 font-semibold">Church</th>
                        <th className="text-left py-3 px-4 font-semibold">Track</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map((app: any) => (
                        <tr key={app.id} className="border-b border-border hover:bg-accent/5">
                          <td className="py-3 px-4">{app.candidateName}</td>
                          <td className="py-3 px-4">{app.churchName}</td>
                          <td className="py-3 px-4">Track {app.trackId}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                app.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : app.status === "approved"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {app.status === "pending" && (
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                  onClick={() => handleApplicationStatus(app.id, "approved")}
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => handleApplicationStatus(app.id, "rejected")}
                                >
                                  Reject
                                </Button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-primary">Manage Courses</h2>
                <Button className="bg-primary hover:bg-primary/90">Add New Course</Button>
              </div>
              {coursesLoading ? (
                <p className="text-muted-foreground">Loading courses...</p>
              ) : courses.length === 0 ? (
                <p className="text-muted-foreground">No courses yet. Create one to get started.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {courses.map((course: any) => (
                    <Card key={course.id} className="p-4 border border-border">
                      <h3 className="font-bold text-lg text-primary mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-muted-foreground">
                          {course.sessionsCount} Sessions • {course.commitmentHours} Hours
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-600">
                          Delete
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Student Progress Tab */}
          <TabsContent value="progress">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6 text-primary">Student Progress Tracking</h2>
              {enrollmentsLoading ? (
                <p className="text-muted-foreground">Loading enrollments...</p>
              ) : enrollments.length === 0 ? (
                <p className="text-muted-foreground">No active enrollments yet.</p>
              ) : (
                <div className="space-y-4">
                  {enrollments.map((enrollment: any) => (
                    <Card key={enrollment.id} className="p-4 border border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">Student ID: {enrollment.userId}</p>
                          <p className="text-sm text-muted-foreground">Course ID: {enrollment.courseId}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            enrollment.status === "enrolled"
                              ? "bg-blue-100 text-blue-800"
                              : enrollment.status === "in_progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {enrollment.status.charAt(0).toUpperCase() + enrollment.status.slice(1)}
                        </span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
