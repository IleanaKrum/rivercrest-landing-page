import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, BookOpen, Zap, ExternalLink, AlertCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function CenterOfStudies() {
  const { user, isAuthenticated, loading } = useAuth();
  const [location, setLocation] = useLocation();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [expandedTrack, setExpandedTrack] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    candidateAddress: "",
    churchName: "",
    leadPastorName: "",
    essay: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { data: tracks } = trpc.centerOfStudies.getTrainingTracks.useQuery();
  const submitApp = trpc.centerOfStudies.submitApplication.useMutation();
  
  // Get all track access statuses in a single query - ONLY if authenticated
  const trackIds = useMemo(() => tracks?.map(t => t.id) || [], [tracks]);
  const { data: allTrackAccess } = trpc.centerOfStudies.checkTrackAccess.useQuery(
    { trackId: trackIds[0] || 0 },
    { enabled: isAuthenticated && trackIds.length > 0 }
  );
  
  // For unauthenticated users, show public information only
  // They can still see tracks and apply, but won't see their access status
  
  // Helper to get access status for a specific track
  const getTrackAccess = (trackId: number) => {
    if (!isAuthenticated || !allTrackAccess) return null;
    return allTrackAccess;
  };

  const trackIcons: Record<string, React.ReactNode> = {
    "Deacon Formation": <Heart className="w-8 h-8 text-accent" />,
    "Evangelist Training": <Zap className="w-8 h-8 text-accent" />,
    "Local Church Candidates": <Users className="w-8 h-8 text-accent" />,
    "Conference Ministerial Candidates": <BookOpen className="w-8 h-8 text-accent" />,
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTrack) return;

    try {
      await submitApp.mutateAsync({
        trackId: selectedTrack,
        candidateName: formData.candidateName,
        candidateEmail: formData.candidateEmail,
        candidatePhone: formData.candidatePhone,
        candidateAddress: formData.candidateAddress,
        churchName: formData.churchName,
        leadPastorName: formData.leadPastorName,
        essay: formData.essay,
      });
      setSubmitted(true);
      setTimeout(() => {
        setShowApplicationForm(false);
        setFormData({
          candidateName: "",
          candidateEmail: "",
          candidatePhone: "",
          candidateAddress: "",
          churchName: "",
          leadPastorName: "",
          essay: "",
        });
        setSelectedTrack(null);
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to submit application:", error);
    }
  };

  const renderTrackButton = (track: any) => {
    // For unauthenticated users, show Apply button
    if (!isAuthenticated) {
      return (
        <Button
          variant="outline"
          className="border-primary text-primary hover:bg-primary/5 w-full"
          onClick={() => {
            setSelectedTrack(track.id);
            setShowApplicationForm(true);
          }}
        >
          Apply for This Track
        </Button>
      );
    }
    
    // For authenticated users, show their access status

    const trackAccess = getTrackAccess(track.id);
    const hasApproval = trackAccess?.hasAccess;
    const appStatus = trackAccess?.applicationStatus;

    if (hasApproval) {
      return (
        <Button
          className="bg-accent hover:bg-accent/90 w-full"
          onClick={() => setExpandedTrack(track.id)}
        >
          View Courses
        </Button>
      );
    }

    if (appStatus === "pending") {
      return (
        <Button disabled className="w-full" variant="outline">
          Application Under Review
        </Button>
      );
    }

    if (appStatus === "rejected") {
      return (
        <Button
          variant="outline"
          className="border-red-600 text-red-600 hover:bg-red-50 w-full"
          onClick={() => {
            setSelectedTrack(track.id);
            setShowApplicationForm(true);
          }}
        >
          Reapply for This Track
        </Button>
      );
    }

    return (
      <Button
        variant="outline"
        className="border-primary text-primary hover:bg-primary/5 w-full"
        onClick={() => {
          setSelectedTrack(track.id);
          setShowApplicationForm(true);
        }}
      >
        Apply for This Track
      </Button>
    );
  };

  const getStatusBadge = (track: any) => {
    // Only show status badge for authenticated users
    if (!isAuthenticated) return null;

    const trackAccess = getTrackAccess(track.id);
    const hasApproval = trackAccess?.hasAccess;
    const appStatus = trackAccess?.applicationStatus;

    if (!appStatus) return null;

    if (hasApproval) {
      return (
        <span className="text-accent text-sm font-semibold flex items-center gap-1">
          ✓ Approved - Access Granted
        </span>
      );
    }

    if (appStatus === "pending") {
      return (
        <span className="text-yellow-600 text-sm font-semibold flex items-center gap-1">
          <AlertCircle className="w-4 h-4" /> Application Pending
        </span>
      );
    }

    if (appStatus === "rejected") {
      return (
        <span className="text-red-600 text-sm font-semibold flex items-center gap-1">
          ✗ Application Rejected
        </span>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2 group relative">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/RivercrestFreeMethodistChurch-Logo25_98841074.png"
              alt="Rivercrest Free Methodist Church Logo"
              className="h-20 w-auto transition-transform duration-300 group-hover:scale-110 cursor-pointer"
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              Rivercrest Free Methodist Church
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-primary"></div>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Home
            </a>
            <a
              href="/email-notifications"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Features
            </a>
            {isAuthenticated ? (
              <Button variant="default" size="sm" onClick={() => setLocation("/student-dashboard")}>
                Dashboard
              </Button>
            ) : (
              <Button variant="default" size="sm" onClick={() => window.location.href = getLoginUrl()}>
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-4xl">
          <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
            Educational Excellence
          </p>
          <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            Center of Studies for Pastoral and Leadership Formation
          </h1>
          <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
            A comprehensive educational pathway for Swahili-speaking candidates preparing for ordination in the Free Methodist Church. We offer specialized training for consecrated deacons, evangelists, local ministerial candidates, and Conference ministerial candidates.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90"
            onClick={() => setShowApplicationForm(true)}
          >
            Apply Now
          </Button>
        </div>
      </section>

      {/* Training Tracks Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Four Pathways to Ministry
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Training Tracks
            </h2>
            <p className="text-lg text-foreground/70">
              Choose the track that aligns with your calling and prepare for ordained ministry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tracks?.map((track) => {
              const trackAccess = isAuthenticated ? getTrackAccess(track.id) : null;
              const hasApproval = trackAccess?.hasAccess;

              return (
                <Card
                  key={track.id}
                  className={`p-8 border-0 shadow-lg hover:shadow-xl transition-shadow ${
                    hasApproval ? "ring-2 ring-accent" : ""
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      {trackIcons[track.name] || <BookOpen className="w-8 h-8 text-accent" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-primary">{track.name}</h3>
                      {getStatusBadge(track) && (
                        <div className="mt-2">{getStatusBadge(track)}</div>
                      )}
                    </div>
                  </div>
                  <p className="text-foreground/70 mb-6 leading-relaxed">
                    {track.description ||
                      "Comprehensive training for ministry leadership and pastoral formation."}
                  </p>
                  {renderTrackButton(track)}
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 border-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-primary">Application Form</h2>
              <button
                onClick={() => setShowApplicationForm(false)}
                className="text-2xl text-foreground/50 hover:text-foreground"
              >
                ×
              </button>
            </div>

            {submitted ? (
              <div className="p-6 rounded-lg bg-accent/10 border border-accent text-center">
                <p className="text-lg font-semibold text-accent mb-2">Application Submitted!</p>
                <p className="text-foreground/70">
                  Thank you for your application. We will review it and contact you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div>
                  <label
                    htmlFor="candidateName"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="candidateName"
                    name="candidateName"
                    value={formData.candidateName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="candidateEmail"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="candidateEmail"
                    name="candidateEmail"
                    value={formData.candidateEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="candidatePhone"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="candidatePhone"
                    name="candidatePhone"
                    value={formData.candidatePhone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Your phone number"
                  />
                </div>

                <div>
                  <label
                    htmlFor="candidateAddress"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Address *
                  </label>
                  <input
                    type="text"
                    id="candidateAddress"
                    name="candidateAddress"
                    value={formData.candidateAddress}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Your address"
                  />
                </div>

                <div>
                  <label
                    htmlFor="churchName"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Church Name *
                  </label>
                  <input
                    type="text"
                    id="churchName"
                    name="churchName"
                    value={formData.churchName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Your church name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="leadPastorName"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Lead Pastor's Name *
                  </label>
                  <input
                    type="text"
                    id="leadPastorName"
                    name="leadPastorName"
                    value={formData.leadPastorName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                    placeholder="Lead pastor's name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="essay"
                    className="block text-sm font-semibold text-foreground mb-2"
                  >
                    Essay: Why do you want to pursue this training? *
                  </label>
                  <textarea
                    id="essay"
                    name="essay"
                    value={formData.essay}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                    placeholder="Share your motivation and goals for this training program..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={submitApp.isPending}
                >
                  {submitApp.isPending ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}
