import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, Download, Filter } from "lucide-react";

interface QuizStats {
  quizId: number;
  quizName: string;
  totalAttempts: number;
  averageScore: number;
  passRate: number;
  failRate: number;
  averageTimeMinutes: number;
  highestScore: number;
  lowestScore: number;
}

// Mock data - replace with actual tRPC query
const mockQuizStats: QuizStats[] = [
  {
    quizId: 1,
    quizName: "Wesleyan Theology Quiz",
    totalAttempts: 12,
    averageScore: 78,
    passRate: 83,
    failRate: 17,
    averageTimeMinutes: 18,
    highestScore: 95,
    lowestScore: 55,
  },
  {
    quizId: 2,
    quizName: "Christian Doctrine Quiz",
    totalAttempts: 8,
    averageScore: 82,
    passRate: 88,
    failRate: 12,
    averageTimeMinutes: 22,
    highestScore: 98,
    lowestScore: 68,
  },
  {
    quizId: 3,
    quizName: "FMC Origins Quiz",
    totalAttempts: 5,
    averageScore: 75,
    passRate: 80,
    failRate: 20,
    averageTimeMinutes: 15,
    highestScore: 92,
    lowestScore: 60,
  },
];

export default function QuizAnalytics() {
  const totalAttempts = mockQuizStats.reduce((sum, q) => sum + q.totalAttempts, 0);
  const overallPassRate = Math.round(
    mockQuizStats.reduce((sum, q) => sum + q.passRate * q.totalAttempts, 0) / totalAttempts
  );
  const overallAvgScore = Math.round(
    mockQuizStats.reduce((sum, q) => sum + q.averageScore * q.totalAttempts, 0) / totalAttempts
  );

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 70) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Quiz Performance Analytics</h2>
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
          <p className="text-sm text-muted-foreground">Total Quiz Attempts</p>
          <p className="text-3xl font-bold text-foreground mt-2">{totalAttempts}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Overall Pass Rate</p>
          <p className={`text-3xl font-bold mt-2 ${getScoreColor(overallPassRate)}`}>{overallPassRate}%</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Average Score</p>
          <p className={`text-3xl font-bold mt-2 ${getScoreColor(overallAvgScore)}`}>{overallAvgScore}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Active Quizzes</p>
          <p className="text-3xl font-bold text-foreground mt-2">{mockQuizStats.length}</p>
        </Card>
      </div>

      {/* Quiz Details Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quiz Performance Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold text-foreground">Quiz Name</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Attempts</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Avg Score</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Pass Rate</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Fail Rate</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">Avg Time</th>
                <th className="text-center py-3 px-4 font-semibold text-foreground">High/Low</th>
              </tr>
            </thead>
            <tbody>
              {mockQuizStats.map((quiz) => (
                <tr key={quiz.quizId} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-foreground">{quiz.quizName}</td>
                  <td className="py-3 px-4 text-center text-foreground">{quiz.totalAttempts}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getScoreBg(
                          quiz.averageScore
                        )} ${getScoreColor(quiz.averageScore)}`}
                      >
                        {quiz.averageScore}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                        {quiz.passRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600">
                        {quiz.failRate}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-foreground">{quiz.averageTimeMinutes} min</td>
                  <td className="py-3 px-4 text-center text-sm">
                    <span className="text-green-600 font-semibold">{quiz.highestScore}</span>
                    <span className="text-muted-foreground"> / </span>
                    <span className="text-red-600 font-semibold">{quiz.lowestScore}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Score Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Score Distribution</h3>
        <div className="space-y-4">
          {[
            { range: "90-100", count: 8, percentage: 35 },
            { range: "80-89", count: 10, percentage: 43 },
            { range: "70-79", count: 4, percentage: 17 },
            { range: "60-69", count: 2, percentage: 9 },
            { range: "Below 60", count: 1, percentage: 4 },
          ].map((dist) => (
            <div key={dist.range} className="flex items-center gap-4">
              <span className="w-16 text-sm font-medium text-foreground">{dist.range}</span>
              <div className="flex-1 bg-muted rounded-full h-6 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all"
                  style={{ width: `${dist.percentage}%` }}
                />
              </div>
              <span className="w-12 text-right text-sm text-muted-foreground">{dist.percentage}%</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
