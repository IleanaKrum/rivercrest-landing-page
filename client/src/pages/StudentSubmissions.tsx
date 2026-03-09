import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

interface Assignment {
  id: number;
  title: string;
  description: string;
  assignmentType: string;
  dueDate?: string;
  instructions?: string;
}

interface Submission {
  id: number;
  assignmentId: number;
  status: "submitted" | "under_review" | "graded" | "returned";
  grade?: string;
  feedback?: string;
  submittedAt: string;
  fileName?: string;
}

export default function StudentSubmissions() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [submissionText, setSubmissionText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - replace with actual API calls
  const mockAssignments: Assignment[] = [
    {
      id: 1,
      title: "FMC History Essay",
      description: "Write a 1500-word essay on the founding of the Free Methodist Church",
      assignmentType: "essay",
      dueDate: "2026-04-15",
      instructions: "Submit as PDF or Word document. Use APA citation format.",
    },
    {
      id: 2,
      title: "Polity Application Project",
      description: "Create a presentation on how FMC polity applies to your local church",
      assignmentType: "project",
      dueDate: "2026-05-01",
      instructions: "Submit PowerPoint or PDF. Include speaker notes.",
    },
    {
      id: 3,
      title: "Reflection on Ministry",
      description: "Write a personal reflection on what you've learned so far",
      assignmentType: "reflection",
      dueDate: "2026-03-31",
      instructions: "1-2 pages, single-spaced. Focus on personal insights.",
    },
  ];

  const mockSubmissions: Submission[] = [
    {
      id: 1,
      assignmentId: 1,
      status: "graded",
      grade: "A",
      feedback: "Excellent work! Your analysis of B.T. Roberts' vision was insightful.",
      submittedAt: "2026-04-10",
      fileName: "FMC_History_Essay.pdf",
    },
    {
      id: 2,
      assignmentId: 3,
      status: "submitted",
      submittedAt: "2026-03-28",
      fileName: "Reflection_on_Ministry.docx",
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md">
          <h2 className="text-2xl font-bold text-primary mb-4">Login Required</h2>
          <p className="text-foreground/70 mb-6">
            You must be logged in to view and submit assignments.
          </p>
          <Button onClick={() => setLocation("/")}>Return Home</Button>
        </Card>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedAssignment || (!uploadedFile && !submissionText)) {
      alert("Please provide either a file or text submission");
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Call API to upload file and create submission
      // For now, just simulate
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Assignment submitted successfully!");
      setIsDialogOpen(false);
      setUploadedFile(null);
      setSubmissionText("");
      setSelectedAssignment(null);
    } catch (error) {
      alert("Error submitting assignment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "graded":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "under_review":
        return <Clock className="w-5 h-5 text-blue-600" />;
      case "returned":
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
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
          <h1 className="text-4xl font-bold text-primary mb-2">Assignment Submissions</h1>
          <p className="text-foreground/70">
            Submit your essays, projects, and assignments for your courses
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Assignments Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-primary mb-6">Available Assignments</h2>
            <div className="space-y-4">
              {mockAssignments.map((assignment) => {
                const submission = mockSubmissions.find((s) => s.assignmentId === assignment.id);
                return (
                  <Card key={assignment.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-primary mb-2">
                          {assignment.title}
                        </h3>
                        <p className="text-foreground/70 mb-3">{assignment.description}</p>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full">
                            {assignment.assignmentType}
                          </span>
                          {assignment.dueDate && (
                            <span className="px-3 py-1 bg-background border border-border rounded-full">
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      {submission && (
                        <div className="flex items-center gap-2 ml-4">
                          {getStatusIcon(submission.status)}
                          <span className="text-sm font-medium">
                            {getStatusLabel(submission.status)}
                          </span>
                        </div>
                      )}
                    </div>

                    {submission ? (
                      <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                        <p className="text-sm text-foreground/70 mb-2">
                          <strong>Submitted:</strong>{" "}
                          {new Date(submission.submittedAt).toLocaleDateString()}
                        </p>
                        {submission.fileName && (
                          <p className="text-sm text-foreground/70 mb-2">
                            <strong>File:</strong> {submission.fileName}
                          </p>
                        )}
                        {submission.grade && (
                          <p className="text-sm text-foreground/70 mb-2">
                            <strong>Grade:</strong> {submission.grade}
                          </p>
                        )}
                        {submission.feedback && (
                          <div className="mt-3 p-3 bg-accent/5 rounded border border-accent/20">
                            <p className="text-sm font-medium text-accent mb-1">Feedback:</p>
                            <p className="text-sm text-foreground/70">{submission.feedback}</p>
                          </div>
                        )}
                        {submission.status === "returned" && (
                          <Button
                            className="mt-4 w-full"
                            onClick={() => {
                              setSelectedAssignment(assignment);
                              setIsDialogOpen(true);
                            }}
                          >
                            Resubmit Assignment
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Button
                        className="mt-4 w-full bg-primary hover:bg-primary/90"
                        onClick={() => {
                          setSelectedAssignment(assignment);
                          setIsDialogOpen(true);
                        }}
                      >
                        <FileUp className="w-4 h-4 mr-2" />
                        Submit Assignment
                      </Button>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <Card className="p-6 bg-accent/5 border-accent/20">
              <h3 className="text-lg font-semibold text-primary mb-4">Submission Guidelines</h3>
              <ul className="space-y-3 text-sm text-foreground/70">
                <li className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Submit original work only</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Cite all sources using APA format</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Late submissions may result in grade reduction</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Plagiarism is a serious matter of integrity</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>AI usage must be cited as a source</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 mt-6">
              <h3 className="text-lg font-semibold text-primary mb-4">Grading Scale</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>A (Excellent)</span>
                  <span className="font-semibold">93%+</span>
                </div>
                <div className="flex justify-between">
                  <span>B (Good)</span>
                  <span className="font-semibold">83-86.9%</span>
                </div>
                <div className="flex justify-between">
                  <span>C (Passing)</span>
                  <span className="font-semibold">73-76.9%</span>
                </div>
                <div className="flex justify-between">
                  <span>F (Fail)</span>
                  <span className="font-semibold">&lt;60%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Submission Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
            <DialogDescription>
              {selectedAssignment?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {selectedAssignment?.instructions && (
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="text-sm font-medium text-foreground mb-2">Instructions:</p>
                <p className="text-sm text-foreground/70">{selectedAssignment.instructions}</p>
              </div>
            )}

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Upload File
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <FileUp className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">
                    {uploadedFile ? uploadedFile.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, DOC, DOCX, PPT, PPTX, TXT (Max 10MB)
                  </p>
                </label>
              </div>
            </div>

            {/* Text Submission */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Or paste your submission text
              </label>
              <textarea
                value={submissionText}
                onChange={(e) => setSubmissionText(e.target.value)}
                placeholder="Paste your essay or project content here..."
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                rows={8}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90"
                onClick={handleSubmit}
                disabled={isSubmitting || (!uploadedFile && !submissionText)}
              >
                {isSubmitting ? "Submitting..." : "Submit Assignment"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
