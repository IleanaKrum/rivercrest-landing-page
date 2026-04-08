import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Zap, Heart } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";

export default function AvailableCourses() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);

  const { data: tracks } = trpc.centerOfStudies.getTrainingTracks.useQuery();
  const { data: courses } = trpc.centerOfStudies.getCoursesByTrack.useQuery(
    { trackId: selectedTrack || 0 },
    { enabled: selectedTrack !== null }
  );

  const trackIcons: Record<string, React.ReactNode> = {
    "Deacon Formation": <Heart className="w-6 h-6" />,
    "Evangelist Training": <Zap className="w-6 h-6" />,
    "Local Church Candidates": <Users className="w-6 h-6" />,
    "Conference Ministerial Candidates": <BookOpen className="w-6 h-6" />,
  };

  const trackColors: Record<string, string> = {
    "Deacon Formation": "from-rose-500 to-pink-500",
    "Evangelist Training": "from-amber-500 to-orange-500",
    "Local Church Candidates": "from-blue-500 to-cyan-500",
    "Conference Ministerial Candidates": "from-purple-500 to-indigo-500",
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
            <h1 className="text-lg font-semibold text-primary">Rivercrest</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setLocation("/")}
              className="text-foreground hover:text-primary"
            >
              Home
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLocation("/center-of-studies")}
              className="text-foreground hover:text-primary"
            >
              Apply
            </Button>
            {isAuthenticated && (
              <Button
                variant="ghost"
                onClick={() => setLocation("/student-dashboard")}
                className="text-foreground hover:text-primary"
              >
                Dashboard
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Available Courses
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl">
            Explore our comprehensive curriculum organized by training track. Each course is designed to equip you with essential knowledge and practical skills for ministry leadership.
          </p>
        </div>
      </section>

      {/* Training Tracks */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-primary mb-8">Training Tracks</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {tracks?.map((track) => (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(selectedTrack === track.id ? null : track.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  selectedTrack === track.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-primary">{trackIcons[track.name]}</div>
                  <h3 className="font-semibold text-foreground">{track.name}</h3>
                </div>
                <p className="text-sm text-foreground/60">{track.description?.substring(0, 60)}...</p>
              </button>
            ))}
          </div>

          {/* Courses for Selected Track */}
          {selectedTrack && courses && courses.length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Courses in {tracks?.find(t => t.id === selectedTrack)?.name}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course: any) => {
                  const trackName = tracks?.find(t => t.id === selectedTrack)?.name || "";
                  const gradientClass = trackColors[trackName] || "from-blue-500 to-cyan-500";
                  
                  return (
                    <Card
                      key={course.id}
                      className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
                    >
                      {/* Course Header with Gradient */}
                      <div className={`bg-gradient-to-r ${gradientClass} p-6 text-white`}>
                        <h4 className="text-xl font-bold mb-2">{course.title}</h4>
                        <div className="flex items-center gap-4 text-sm">
                          <span>📚 {course.sessionsCount} sessions</span>
                          <span>⏱️ {course.commitmentHours} hours</span>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-6 flex-1 flex flex-col">
                        <p className="text-foreground/70 mb-4 flex-1">
                          {course.description || "A comprehensive course designed to equip you with essential knowledge and practical skills."}
                        </p>
                        
                        {/* Course Details */}
                        <div className="space-y-2 mb-6 text-sm">
                          {course.prerequisites && (
                            <div>
                              <span className="font-semibold text-foreground">Prerequisites:</span>
                              <p className="text-foreground/70">{course.prerequisites}</p>
                            </div>
                          )}
                          {course.outcomes && (
                            <div>
                              <span className="font-semibold text-foreground">Learning Outcomes:</span>
                              <p className="text-foreground/70">{course.outcomes}</p>
                            </div>
                          )}
                        </div>

                        {/* Apply Button */}
                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => setLocation("/center-of-studies")}
                        >
                          Apply for This Track
                        </Button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* All Courses View */}
          {!selectedTrack && (
            <div>
              <p className="text-center text-foreground/60 py-12">
                Select a training track above to view its courses
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Ministry Journey?</h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Apply now to join the Rivercrest FMC Center for Studies and start your transformation into a confident, faithful minister.
          </p>
          <Button
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            onClick={() => setLocation("/center-of-studies")}
          >
            Apply Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 border-t border-border py-8">
        <div className="container text-center text-foreground/60 text-sm">
          <p>&copy; 2026 Rivercrest Free Methodist Church. All rights reserved.</p>
          <p className="mt-2">
            <a href="https://fmcusa.org/webelieve" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
              Free Methodist Church USA - We Believe
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
