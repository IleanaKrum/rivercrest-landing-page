import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Download, Filter } from "lucide-react";

interface ModuleStats {
  moduleId: number;
  moduleName: string;
  category: string;
  totalEnrolled: number;
  completed: number;
  inProgress: number;
  notStarted: number;
  averageCompletion: number;
  averageQuizScore: number;
  certificatesIssued: number;
}

// Mock data - replace with actual tRPC query
const mockModuleStats: ModuleStats[] = [
  {
    moduleId: 1,
    moduleName: "Wesleyan Theology",
    category: "theology",
    totalEnrolled: 12,
    completed: 10,
    inProgress: 2,
    notStarted: 0,
    averageCompletion: 92,
    averageQuizScore: 78,
    certificatesIssued: 10,
  },
  {
    moduleId: 2,
    moduleName: "Introduction to Christian Doctrine",
    category: "theology",
    totalEnrolled: 8,
    completed: 5,
    inProgress: 3,
    notStarted: 0,
    averageCompletion: 68,
    averageQuizScore: 82,
    certificatesIssued: 5,
  },
  {
    moduleId: 3,
    moduleName: "FMC Origins and History",
    category: "history",
    totalEnrolled: 15,
    completed: 12,
    inProgress: 2,
    notStarted: 1,
    averageCompletion: 85,
    averageQuizScore: 75,
    certificatesIssued: 12,
  },
];

export default function ModuleCompletion() {
  const totalEnrolled = mockModuleStats.reduce((sum, m) => sum + m.totalEnrolled, 0);
  const totalCompleted = mockModuleStats.reduce((sum, m) => sum + m.completed, 0);
  const totalCertificates = mockModuleStats.reduce((sum, m) => sum + m.certificatesIssued, 0);
  const overallCompletionRate = Math.round((totalCompleted / totalEnrolled) * 100);

  const getCompletionColor = (rate: number) => {
    if (rate >= 80) return "text-green-600";
    if (rate >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getCompletionBg = (rate: number) => {
    if (rate >= 80) return "bg-green-100";
    if (rate >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Module Completion Tracking</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Total Enrollments</p>
          <p className="text-3xl font-bold text-foreground mt-2">{totalEnrolled}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{totalCompleted}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completion Rate</p>
          <p className={`text-3xl font-bold mt-2 ${getCompletionColor(overallCompletionRate)}`}>
            {overallCompletionRate}%
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Certificates Issued</p>
          <p className="text-3xl font-bold text-primary mt-2">{totalCertificates}</p>
        </Card>
      </div>

      {/* Module Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Module Performance Overview</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Module Name</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Enrolled</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Completed</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">In Progress</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Not Started</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Completion %</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Avg Quiz Score</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Certificates</th>
              </tr>
            </thead>
            <tbody>
              {mockModuleStats.map((module) => {
                const completionRate = Math.round((module.completed / module.totalEnrolled) * 100);
                return (
                  <tr key={module.moduleId} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{module.moduleName}</td>
                    <td className="py-3 px-4 text-center text-foreground">{module.totalEnrolled}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                        {module.completed}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
                        {module.inProgress}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
                        {module.notStarted}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getCompletionBg(
                            completionRate
                          )} ${getCompletionColor(completionRate)}`}
                        >
                          {completionRate}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
                          {module.averageQuizScore}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-foreground">
                      {module.certificatesIssued}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Completion Trends */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Enrollment Status Distribution</h3>
        <div className="space-y-4">
          {[
            { status: "Completed", count: totalCompleted, color: "bg-green-500" },
            {
              status: "In Progress",
              count: mockModuleStats.reduce((sum, m) => sum + m.inProgress, 0),
              color: "bg-yellow-500",
            },
            {
              status: "Not Started",
              count: mockModuleStats.reduce((sum, m) => sum + m.notStarted, 0),
              color: "bg-gray-500",
            },
          ].map((item) => (
            <div key={item.status} className="flex items-center gap-4">
              <span className="w-24 text-sm font-medium text-foreground">{item.status}</span>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div
                  className={`${item.color} h-full transition-all`}
                  style={{ width: `${(item.count / totalEnrolled) * 100}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm font-semibold text-foreground">{item.count}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
