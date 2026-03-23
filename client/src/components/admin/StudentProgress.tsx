import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Download, Filter } from "lucide-react";
import { useState } from "react";

interface StudentProgressData {
  id: number;
  name: string;
  email: string;
  enrolledCourses: number;
  completedCourses: number;
  videoCompletionRate: number;
  averageQuizScore: number;
  certificatesEarned: number;
  lastActivity: string;
}

// Mock data - replace with actual tRPC query
const mockStudents: StudentProgressData[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    enrolledCourses: 3,
    completedCourses: 1,
    videoCompletionRate: 85,
    averageQuizScore: 78,
    certificatesEarned: 1,
    lastActivity: "2 hours ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    enrolledCourses: 2,
    completedCourses: 2,
    videoCompletionRate: 100,
    averageQuizScore: 92,
    certificatesEarned: 2,
    lastActivity: "30 minutes ago",
  },
  {
    id: 3,
    name: "Samuel Johnson",
    email: "samuel@example.com",
    enrolledCourses: 1,
    completedCourses: 0,
    videoCompletionRate: 45,
    averageQuizScore: 0,
    certificatesEarned: 0,
    lastActivity: "3 days ago",
  },
];

export default function StudentProgress() {
  const [filterStatus, setFilterStatus] = useState("all");

  const getProgressColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBg = (rate: number) => {
    if (rate >= 80) return "bg-green-100";
    if (rate >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Student Progress Tracking</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Active Students</p>
          <p className="text-3xl font-bold text-foreground mt-2">{mockStudents.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Video Completion</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {Math.round(mockStudents.reduce((sum, s) => sum + s.videoCompletionRate, 0) / mockStudents.length)}%
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Avg Quiz Score</p>
          <p className="text-3xl font-bold text-foreground mt-2">
            {Math.round(mockStudents.reduce((sum, s) => sum + s.averageQuizScore, 0) / mockStudents.length)}
          </p>
        </Card>
      </div>

      {/* Student Table */}
      <Card className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Student Name</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Email</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Enrolled</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Completed</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Video %</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Quiz Score</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Certificates</th>
                <th className="text-left py-3 px-4 font-semibold text-foreground">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {mockStudents.map((student) => (
                <tr key={student.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{student.name}</td>
                  <td className="py-3 px-4 text-muted-foreground">{student.email}</td>
                  <td className="py-3 px-4 text-center text-foreground">{student.enrolledCourses}</td>
                  <td className="py-3 px-4 text-center text-foreground">{student.completedCourses}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getProgressBg(
                          student.videoCompletionRate
                        )} ${getProgressColor(student.videoCompletionRate)}`}
                      >
                        {student.videoCompletionRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getProgressBg(
                          student.averageQuizScore
                        )} ${getProgressColor(student.averageQuizScore)}`}
                      >
                        {student.averageQuizScore > 0 ? `${student.averageQuizScore}%` : "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center font-semibold text-foreground">
                    {student.certificatesEarned}
                  </td>
                  <td className="py-3 px-4 text-muted-foreground text-xs">{student.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
