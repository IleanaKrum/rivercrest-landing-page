import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, BookOpen, FileText, AlertCircle } from "lucide-react";

/**
 * Center of Studies Resources Page
 * Displays downloadable resources including books, syllabuses, guidelines, and articles
 */
export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch all resources
  const { data: allResources, isLoading, error } = (trpc.centerOfStudies as any).getAllResources.useQuery();

  // Filter resources by category if one is selected
  const displayedResources = selectedCategory
    ? allResources?.filter((r: any) => r.category === selectedCategory)
    : allResources;

  const categories = [
    { value: "book", label: "Books", icon: BookOpen },
    { value: "syllabus", label: "Syllabuses", icon: FileText },
    { value: "guideline", label: "Guidelines", icon: FileText },
    { value: "article", label: "Articles", icon: FileText },
    { value: "other", label: "Other", icon: FileText },
  ];

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.icon || FileText;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Unknown size";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 px-4">
        <div className="container">
          <h1 className="text-4xl font-bold font-serif text-primary mb-3">
            Center of Studies Resources
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access essential materials for pastoral and leadership training, including the Book of Discipline,
            course syllabuses, and study guides in English and Swahili.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-3">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              className="rounded-full"
            >
              All Resources
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.value)}
                className="rounded-full"
              >
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="mt-12">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-4 text-muted-foreground">Loading resources...</p>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-6 flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-destructive mb-1">Error Loading Resources</h3>
                <p className="text-sm text-destructive/80">
                  We encountered an error loading the resources. Please try again later.
                </p>
              </div>
            </div>
          ) : !displayedResources || displayedResources.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-lg text-muted-foreground">
                {selectedCategory ? "No resources found in this category." : "No resources available yet."}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedResources.map((resource: any) => {
                const Icon = getCategoryIcon(resource.category);
                return (
                  <Card
                    key={resource.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Category Badge */}
                      <div className="flex items-center gap-2 mb-3">
                        <Icon className="h-4 w-4 text-primary" />
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          {categories.find((c) => c.value === resource.category)?.label || resource.category}
                        </span>
                        {resource.language !== "English" && (
                          <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                            {resource.language}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{resource.title}</h3>

                      {/* Description */}
                      {resource.description && (
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-1">
                          {resource.description}
                        </p>
                      )}

                      {/* Metadata */}
                      <div className="text-xs text-muted-foreground space-y-1 mb-4">
                        {resource.author && <p>By: {resource.author}</p>}
                        {resource.fileSize && <p>Size: {formatFileSize(resource.fileSize)}</p>}
                        {resource.publishDate && (
                          <p>
                            Published:{" "}
                            {new Date(resource.publishDate).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        )}
                      </div>

                      {/* Download Button */}
                      <a
                        href={resource.fileUrl}
                        download={resource.fileName}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </a>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-card border border-border rounded-lg p-8">
          <h2 className="text-2xl font-semibold font-serif mb-4">About These Resources</h2>
          <div className="prose prose-sm max-w-none text-foreground">
            <p className="mb-4">
              These resources are provided to support your pastoral and leadership development through Rivercrest Free
              Methodist Church's Center of Studies. All materials are available in English and Swahili to serve our
              diverse community of faith leaders.
            </p>
            <p className="mb-4">
              The <strong>Book of Discipline</strong> is the foundational document for Free Methodist Church governance,
              doctrine, and pastoral practice. It serves as an essential reference for all church leaders and students.
            </p>
            <p>
              For additional resources or questions about these materials, please contact our Center of Studies
              coordinator at <strong>studies@rivercrest.org</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
