import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, FileText, MessageSquare, Download } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface Submission {
  id: number;
  studentName: string;
  assignmentTitle: string;
  fileName: string;
  submittedAt: string;
  status: "submitted" | "under_review" | "graded" | "returned";
  grade?: string;
  feedback?: string;
}

export default function AdminSubmissions() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Mock data - replace with actual API calls
  const mockSubmissions: Submission[] = [
    {
      id: 1,
      studentName: "James Mitchell",
      assignmentTitle: "FMC History Essay",
      fileName: "FMC_History_Essay.pdf",
      submittedAt: "2026-04-10",
      status: "submitted",
    },
    {
      id: 2,
      studentName: "Sarah Martinez",
      assignmentTitle: "Polity Application Project",
      fileName: "Polity_Project.pptx",
      submittedAt: "2026-04-18",
      status: "under_review",
    },
    {
      id: 3,
      studentName: "David Kim",
      assignmentTitle: "FMC History Essay",
      fileName: "History_Essay_Kim.docx",
      submittedAt: "2026-04-08",
      status: "graded",
      grade: "A",
      feedback: "Excellent analysis of B.T. Roberts' vision and the founding principles.",
    },
    {
      id: 4,
      studentName: "Emily Rodriguez",
      assignmentTitle: "Reflection on Ministry",
      fileName: "Reflection_Rodriguez.pdf",
      submittedAt: "2026-03-28",
      status: "returned",
      grade: "B-",
      feedback: "Good reflection, but needs more depth on practical application.",
    },
  ];

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h2 className="text-2xl font-bold text-primary mb-4">Access Denied</h2>
          <p className="text-foreground/70 mb-6">
            Only administrators can access this page.
          </p>
          <Button onClick={() => setLocation("/")}>Return Home</Button>
        </Card>
      </div>
    );
  }

  const filteredSubmissions = mockSubmissions.filter(
    (sub) => filterStatus === "all" || sub.status === filterStatus
  );

  const handleGradeSubmission = async () => {
    if (!selectedSubmission || !grade) {
      alert("Please select a grade");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Call API to update submission with grade and feedback
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Submission graded successfully!");
      setIsReviewDialogOpen(false);
      setGrade("");
      setFeedback("");
      setSelectedSubmission(null);
    } catch (error) {
      alert("Error grading submission. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "under_review":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      case "graded":
        return "bg-green-50 border-green-200 text-green-700";
      case "returned":
        return "bg-orange-50 border-orange-200 text-orange-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "under_review":
        return "Under Review";
      case "graded":
        return "Graded";
      case "returned":
        return "Returned for Revision";
      default:
        return "Submitted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container py-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Review Student Submissions</h1>
          <p className="text-foreground/70">
            Review, grade, and provide feedback on student assignments
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["all", "submitted", "under_review", "graded", "returned"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "outline"}
              onClick={() => setFilterStatus(status)}
              className="whitespace-nowrap"
            >
              {status === "all"
                ? "All Submissions"
                : status === "under_review"
                  ? "Under Review"
                  : status === "graded"
                    ? "Graded"
                    : status === "returned"
                      ? "Returned"
                      : "Submitted"}
            </Button>
          ))}
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          {filteredSubmissions.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-foreground/70">No submissions found with this filter.</p>
            </Card>
          ) : (
            filteredSubmissions.map((submission) => (
              <Card
                key={submission.id}
                className={`p-6 border-2 ${getStatusColor(submission.status)} cursor-pointer hover:shadow-lg transition-all`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <FileText className="w-5 h-5 text-muted-foreground" />
                      <h3 className="text-lg font-semibold text-foreground">
                        {submission.assignmentTitle}
                      </h3>
                    </div>
                    <p className="text-foreground/70 mb-2">
                      <strong>Student:</strong> {submission.studentName}
                    </p>
                    <p className="text-foreground/70 mb-2">
                      <strong>File:</strong> {submission.fileName}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Submitted: {new Date(submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                        submission.status
                      )}`}
                    >
                      {getStatusLabel(submission.status)}
                    </span>
                    {submission.grade && (
                      <span className="text-lg font-bold text-primary">{submission.grade}</span>
                    )}
                  </div>
                </div>

                {submission.feedback && (
                  <div className="mt-4 p-4 bg-white rounded-lg border border-border">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-accent" />
                      <p className="text-sm font-medium text-foreground">Feedback:</p>
                    </div>
                    <p className="text-sm text-foreground/70">{submission.feedback}</p>
                  </div>
                )}

                <div className="flex gap-3 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download File
                  </Button>
                  {submission.status !== "graded" && (
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setGrade(submission.grade || "");
                        setFeedback(submission.feedback || "");
                        setIsReviewDialogOpen(true);
                      }}
                    >
                      {submission.status === "returned" ? "Update Grade" : "Grade Submission"}
                    </Button>
                  )}
                  {submission.status === "graded" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setGrade(submission.grade || "");
                        setFeedback(submission.feedback || "");
                        setIsReviewDialogOpen(true);
                      }}
                    >
                      Edit Grade
                    </Button>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-primary">
              {mockSubmissions.filter((s) => s.status === "submitted").length}
            </p>
            <p className="text-sm text-foreground/70 mt-2">Awaiting Review</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">
              {mockSubmissions.filter((s) => s.status === "under_review").length}
            </p>
            <p className="text-sm text-foreground/70 mt-2">Under Review</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-green-600">
              {mockSubmissions.filter((s) => s.status === "graded").length}
            </p>
            <p className="text-sm text-foreground/70 mt-2">Graded</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-3xl font-bold text-orange-600">
              {mockSubmissions.filter((s) => s.status === "returned").length}
            </p>
            <p className="text-sm text-foreground/70 mt-2">Returned</p>
          </Card>
        </div>
      </div>

      {/* Grading Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Grade Submission</DialogTitle>
            <DialogDescription>
              {selectedSubmission?.studentName} - {selectedSubmission?.assignmentTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Grade Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Grade
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["A", "B", "C", "F"].map((g) => (
                  <Button
                    key={g}
                    variant={grade === g ? "default" : "outline"}
                    onClick={() => setGrade(g)}
                    className="text-lg font-bold"
                  >
                    {g}
                  </Button>
                ))}
              </div>
            </div>

            {/* Feedback */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Feedback for Student
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Provide constructive feedback on the submission..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                rows={6}
              />
            </div>

            {/* Grading Scale Reference */}
            <div className="p-4 bg-background rounded-lg border border-border">
              <p className="text-sm font-medium text-foreground mb-2">Grading Scale:</p>
              <div className="grid grid-cols-2 gap-2 text-sm text-foreground/70">
                <div>A (Excellent): 93%+</div>
                <div>B (Good): 83-86.9%</div>
                <div>C (Passing): 73-76.9%</div>
                <div>F (Fail): &lt;60%</div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsReviewDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 flex items-center gap-2"
                onClick={handleGradeSubmission}
                disabled={isSubmitting || !grade}
              >
                <CheckCircle className="w-4 h-4" />
                {isSubmitting ? "Saving..." : "Save Grade"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
