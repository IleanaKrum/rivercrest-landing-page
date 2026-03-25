import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, XCircle, Clock, RotateCcw } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

interface QuizQuestion {
  id: number;
  questionText: string;
  questionTextSwahili?: string;
  questionType: string;
  order: number;
  points: number;
}

interface QuizAnswer {
  id: number;
  answerText: string;
  answerTextSwahili?: string;
  isCorrect: number;
  order: number;
  explanation?: string;
  explanationSwahili?: string;
}

interface QuizData {
  id: number;
  title: string;
  titleSwahili?: string;
  description?: string;
  descriptionSwahili?: string;
  passingScore: number;
  timeLimit?: number;
  questions: (QuizQuestion & { answers: QuizAnswer[] })[];
}

interface QuizComponentProps {
  quizId: number;
  moduleId: number;
  onComplete?: (passed: boolean, score: number) => void;
}

export function QuizComponent({ quizId, moduleId, onComplete }: QuizComponentProps) {
  const { user } = useAuth();
  const [language, setLanguage] = useState<"en" | "sw">("en");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizPassed, setQuizPassed] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showExplanation, setShowExplanation] = useState<number | null>(null);

  // Fetch quiz data
  // @ts-expect-error - tRPC types not regenerated yet
  const { data: quizData, isLoading } = trpc.centerOfStudies.getQuizByModuleId.useQuery(
    { moduleId },
    { enabled: !!moduleId }
  );

  // Submit quiz mutation
  // @ts-expect-error - tRPC types not regenerated yet
  const submitQuizMutation = trpc.centerOfStudies.submitQuiz.useMutation();

  // Initialize timer
  useEffect(() => {
    if (!quizStarted || !quizData || showResults) return;

    if (quizData.timeLimit) {
      setTimeRemaining(quizData.timeLimit * 60);
    }
  }, [quizStarted, quizData, showResults]);

  // Timer countdown
  useEffect(() => {
    if (timeRemaining === null || timeRemaining <= 0 || !quizStarted) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev && prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev ? prev - 1 : null;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, quizStarted]);

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">
              {language === "en" ? "Loading quiz..." : "Inapakia quiz..."}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  if (!quizData) {
    return (
      <Card className="p-6 border-yellow-200 bg-yellow-50">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-900">
              {language === "en" ? "Quiz Not Found" : "Quiz Haipatikani"}
            </h3>
            <p className="text-sm text-yellow-800 mt-1">
              {language === "en"
                ? "This module does not have an associated quiz yet."
                : "Moduli hii haina quiz inayohusiana nayo."}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  const handleSelectAnswer = (questionId: number, answerId: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(null);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(null);
    }
  };

  const handleSubmitQuiz = async () => {
    const questions = quizData.questions;
    let totalPoints = 0;
    let earnedPoints = 0;

    // Calculate score
    questions.forEach((question: any) => {
      totalPoints += question.points;
      const selectedAnswerId = selectedAnswers[question.id];
      if (selectedAnswerId) {
        const answer = question.answers.find((a: any) => a.id === selectedAnswerId);
        if (answer && answer.isCorrect) {
          earnedPoints += question.points;
        }
      }
    });

    const score = Math.round((earnedPoints / totalPoints) * 100);
    const passed = score >= quizData.passingScore;

    setQuizScore(score);
    setQuizPassed(passed);
    setShowResults(true);

    // Call completion callback
    if (onComplete) {
      onComplete(passed, score);
    }

    // Submit to backend
    if (user) {
      try {
        await submitQuizMutation.mutateAsync({
          quizId,
          moduleId,
          score,
          passed: passed ? 1 : 0,
          totalPoints,
          earnedPoints,
          timeSpent: quizData.timeLimit ? (quizData.timeLimit * 60 - (timeRemaining || 0)) : 0,
          answers: Object.entries(selectedAnswers).map(([questionId, answerId]) => ({
            questionId: parseInt(questionId),
            selectedAnswerId: answerId,
          })),
        });
      } catch (error) {
        console.error("Error submitting quiz:", error);
      }
    }
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowExplanation(null);
    setTimeRemaining(null);
  };

  const formatTime = (seconds: number | null) => {
    if (seconds === null) return "";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const question = quizData.questions[currentQuestion];
  const selectedAnswerId = selectedAnswers[question?.id];
      const selectedAnswer = question?.answers.find((a: any) => a.id === selectedAnswerId);

  // Quiz not started - show intro
  if (!quizStarted) {
    return (
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-2">
              {language === "en" ? quizData.title : quizData.titleSwahili || quizData.title}
            </h2>
            <p className="text-muted-foreground">
              {language === "en"
                ? quizData.description
                : quizData.descriptionSwahili || quizData.description}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {language === "en" ? "Questions:" : "Maswali:"}
              </span>
              <span>{quizData.questions.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">
                {language === "en" ? "Passing Score:" : "Alama ya Kupita:"}
              </span>
              <span>{quizData.passingScore}%</span>
            </div>
            {quizData.timeLimit && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="font-semibold">
                  {language === "en" ? "Time Limit:" : "Muda wa Juu:"}
                </span>
                <span>{quizData.timeLimit} minutes</span>
              </div>
            )}
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => setLanguage(language === "en" ? "sw" : "en")}
              variant="outline"
            >
              {language === "en" ? "Swahili" : "English"}
            </Button>
            <Button onClick={handleStartQuiz} size="lg">
              {language === "en" ? "Start Quiz" : "Anza Quiz"}
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Quiz completed - show results
  if (showResults) {
    return (
      <Card className="p-8">
        <div className="text-center space-y-6">
          <div
            className={`flex justify-center mb-4 ${
              quizPassed ? "text-green-600" : "text-red-600"
            }`}
          >
            {quizPassed ? (
              <CheckCircle className="h-16 w-16" />
            ) : (
              <XCircle className="h-16 w-16" />
            )}
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-2">
              {quizPassed
                ? language === "en"
                  ? "Quiz Passed!"
                  : "Quiz Ilipita!"
                : language === "en"
                  ? "Quiz Failed"
                  : "Quiz Haikusudiwa"}
            </h2>
            <p className="text-5xl font-bold text-primary">{quizScore}%</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-left">
            <div className="flex justify-between">
              <span className="font-semibold">
                {language === "en" ? "Your Score:" : "Alama Yako:"}
              </span>
              <span>{quizScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">
                {language === "en" ? "Passing Score:" : "Alama ya Kupita:"}
              </span>
              <span>{quizData.passingScore}%</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">
                {language === "en" ? "Questions Correct:" : "Maswali Sahihi:"}
              </span>
              <span>
                {Object.entries(selectedAnswers).filter(([qId, aId]) => {
                  const q = quizData.questions.find((q: any) => q.id === parseInt(qId));
                  const a = q?.answers.find((a: any) => a.id === aId);
                  return a?.isCorrect;
                }).length}{" "}
                / {quizData.questions.length}
              </span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => setLanguage(language === "en" ? "sw" : "en")}
              variant="outline"
            >
              {language === "en" ? "Swahili" : "English"}
            </Button>
            {!quizPassed && (
              <Button onClick={handleRetakeQuiz} variant="outline">
                {language === "en" ? "Retake Quiz" : "Jaribu Tena"}
              </Button>
            )}
            {quizPassed && (
              <Button onClick={handleRetakeQuiz} variant="outline">
                {language === "en" ? "Review Quiz" : "Pitia Quiz"}
              </Button>
            )}
          </div>

          {quizPassed && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800">
                {language === "en"
                  ? "Congratulations! You have passed this quiz and can now complete the module."
                  : "Hongera! Umepita quiz hii na sasa unaweza kumalizia moduli."}
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // Quiz in progress - show question
  return (
    <Card className="p-6">
      <div className="space-y-6">
        {/* Header with progress and timer */}
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-2">
              {language === "en" ? "Question" : "Swali"} {currentQuestion + 1} /{" "}
              {quizData.questions.length}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{
                  width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
          {timeRemaining !== null && (
            <div
              className={`ml-6 text-lg font-semibold ${
                timeRemaining < 60 ? "text-red-600" : "text-foreground"
              }`}
            >
              <Clock className="h-5 w-5 inline mr-2" />
              {formatTime(timeRemaining)}
            </div>
          )}
        </div>

        {/* Language toggle */}
        <div className="flex justify-end">
          <Button
            onClick={() => setLanguage(language === "en" ? "sw" : "en")}
            variant="outline"
            size="sm"
          >
            {language === "en" ? "Swahili" : "English"}
          </Button>
        </div>

        {/* Question */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">
            {language === "en"
              ? question.questionText
              : question.questionTextSwahili || question.questionText}
          </h3>

          {/* Answer options */}
          <div className="space-y-3">
            {question.answers.map((answer: any) => (
              <div key={answer.id}>
                <button
                  onClick={() => handleSelectAnswer(question.id, answer.id)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    selectedAnswerId === answer.id
                      ? "border-primary bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`h-5 w-5 rounded-full border-2 flex-shrink-0 mt-0.5 ${
                        selectedAnswerId === answer.id
                          ? "border-primary bg-primary"
                          : "border-gray-300"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="font-medium">
                        {language === "en"
                          ? answer.answerText
                          : answer.answerTextSwahili || answer.answerText}
                      </p>
                    </div>
                  </div>
                </button>

                {/* Show explanation if answer is selected and explanation is available */}
                {selectedAnswerId === answer.id && showExplanation === answer.id && (
                  <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm">
                    <p className="font-semibold text-blue-900 mb-1">
                      {language === "en" ? "Explanation:" : "Maelezo:"}
                    </p>
                    <p className="text-blue-800">
                      {language === "en"
                        ? answer.explanation
                        : answer.explanationSwahili || answer.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Show explanation button */}
          {selectedAnswerId && (
            <Button
              onClick={() =>
                setShowExplanation(
                  showExplanation === selectedAnswerId ? null : selectedAnswerId
                )
              }
              variant="outline"
              className="w-full"
            >
              {showExplanation === selectedAnswerId
                ? language === "en"
                  ? "Hide Explanation"
                  : "Ficha Maelezo"
                : language === "en"
                  ? "Show Explanation"
                  : "Tukio Maelezo"}
            </Button>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3 justify-between border-t pt-4">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            {language === "en" ? "← Previous" : "← Nyuma"}
          </Button>

          {currentQuestion === quizData.questions.length - 1 ? (
            <Button
              onClick={handleSubmitQuiz}
              disabled={Object.keys(selectedAnswers).length === 0}
              className="bg-green-600 hover:bg-green-700"
            >
              {language === "en" ? "Submit Quiz" : "Tuma Quiz"}
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} disabled={!selectedAnswerId}>
              {language === "en" ? "Next →" : "Inayofuata →"}
            </Button>
          )}
        </div>

        {/* Unanswered warning */}
        {!selectedAnswerId && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            {language === "en"
              ? "Please select an answer to continue."
              : "Tafadhali chagua jibu ili kuendelea."}
          </div>
        )}
      </div>
    </Card>
  );
}
