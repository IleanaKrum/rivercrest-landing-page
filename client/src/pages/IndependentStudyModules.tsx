import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { BookOpen, Clock, CheckCircle2, Lock } from "lucide-react";
import { useState } from "react";

export default function IndependentStudyModules() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // @ts-expect-error - tRPC types not regenerated yet
  const { data: modules, isLoading } = trpc.centerOfStudies.getAllModules.useQuery();
  // @ts-expect-error - tRPC types not regenerated yet
  const { data: userProgress } = trpc.centerOfStudies.getUserModuleProgress.useQuery(
    { trackId: user?.id || 0 },
    { enabled: isAuthenticated && !!user?.id }
  );

  const categories = [
    { id: "trinity", label: "The Holy Trinity" },
    { id: "scripture", label: "Scripture Authority" },
    { id: "humanity", label: "Humanity & Moral Freedom" },
    { id: "law_and_love", label: "Law of Life & Love" },
    { id: "good_works", label: "Good Works" },
    { id: "christ_sacrifice", label: "Christ's Sacrifice" },
    { id: "new_life", label: "New Life in Christ" },
    { id: "sanctification", label: "Sanctification" },
    { id: "restoration", label: "Restoration" },
    { id: "church", label: "The Church" },
    { id: "worship", label: "Worship & Sacraments" },
  ];

  const filteredModules = selectedCategory
    ? modules?.filter((m: any) => m.category === selectedCategory)
    : modules;

  const getProgressPercentage = (moduleId: number) => {
    const progress = userProgress?.find((p: any) => p.moduleId === moduleId);
    return progress?.progressPercentage || 0;
  };

  const isModuleCompleted = (moduleId: number) => {
    const progress = userProgress?.find((p: any) => p.moduleId === moduleId);
    return progress?.isCompleted === 1;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Free Methodist Way Independent Study</h1>
            <p className="text-lg text-primary-foreground/90 mb-6">
              Deepen your understanding of Free Methodist doctrine through our comprehensive independent study modules. Study at your own pace with materials in English and Swahili.
            </p>
            {!isAuthenticated && (
              <Button size="lg" variant="secondary">
                <Link href="/auth/login">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Doctrinal Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="w-full"
            >
              All Topics
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.id)}
                className="w-full text-sm"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading modules...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules?.map((module: any) => {
              const isCompleted = isModuleCompleted(module.id);
              const progress = getProgressPercentage(module.id);

              return (
                <Link key={module.id} href={`/module/${module.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <BookOpen className="w-8 h-8 text-primary flex-shrink-0" />
                        {isCompleted && (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        )}
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {module.description}
                      </p>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.estimatedHours} hours</span>
                        </div>
                        {module.language && (
                          <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                            {module.language}
                          </span>
                        )}
                      </div>

                      {/* Progress Bar */}
                      {isAuthenticated && progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium">Progress</span>
                            <span className="text-xs text-muted-foreground">{progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full transition-all"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {/* CTA */}
                      <Button
                        className="w-full"
                        variant={isCompleted ? "outline" : "default"}
                      >
                        {isCompleted ? "Review Module" : "Start Studying"}
                      </Button>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {!isLoading && filteredModules?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No modules found in this category.</p>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="bg-secondary/50 py-12 mt-12">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Self-Paced Learning
              </h3>
              <p className="text-sm text-muted-foreground">
                Study at your own pace with flexible scheduling that fits your lifestyle.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Bilingual Content
              </h3>
              <p className="text-sm text-muted-foreground">
                Access materials in both English and Swahili for comprehensive understanding.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Certificates
              </h3>
              <p className="text-sm text-muted-foreground">
                Earn certificates upon completion to recognize your learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
