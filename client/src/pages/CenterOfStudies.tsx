import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, BookOpen, Zap, ExternalLink } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function CenterOfStudies() {
  const { user, isAuthenticated } = useAuth();
  const [location, setLocation] = useLocation();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    candidateName: "",
    candidateAddress: "",
    churchName: "",
    leadPastorName: "",
    essay: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const { data: tracks } = trpc.centerOfStudies.getTrainingTracks.useQuery();
  const submitApp = trpc.centerOfStudies.submitApplication.useMutation();

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mission Statement Banner */}
      <div className="bg-primary/10 border-b border-primary/20 py-6">
        <div className="container">
          <p className="text-center text-sm font-semibold text-accent uppercase tracking-wide mb-2">
            Our Theological Foundation
          </p>
          <h2 className="text-center text-2xl font-bold text-primary mb-3">
            The Abrahamic Root: A Father of Many Nations
          </h2>
          <p className="text-center text-foreground/70 max-w-2xl mx-auto">
            Equipping Swahili-speaking leaders to serve not just their local communities, but to participate in God's global redemptive work across nations.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-primary">Rivercrest</h1>
              <p className="text-xs text-muted-foreground">Center of Studies</p>
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
              href="/resources"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Resources
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
                Login
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
            {tracks?.map((track) => (
              <Card key={track.id} className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-accent/10 rounded-lg">
                    {trackIcons[track.name] || <BookOpen className="w-8 h-8 text-accent" />}
                  </div>
                  <h3 className="text-2xl font-bold text-primary">{track.name}</h3>
                </div>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  {track.description || "Comprehensive training for ministry leadership and pastoral formation."}
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                  onClick={() => {
                    setSelectedTrack(track.id);
                    setShowApplicationForm(true);
                  }}
                >
                  Apply for This Track
                </Button>
              </Card>
            ))}
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
                  <label htmlFor="candidateName" className="block text-sm font-semibold text-foreground mb-2">
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
                  <label htmlFor="candidateAddress" className="block text-sm font-semibold text-foreground mb-2">
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
                  <label htmlFor="churchName" className="block text-sm font-semibold text-foreground mb-2">
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
                  <label htmlFor="leadPastorName" className="block text-sm font-semibold text-foreground mb-2">
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
                  <label htmlFor="essay" className="block text-sm font-semibold text-foreground mb-2">
                    Essay: Why do you want to pursue this training? *
                  </label>
                  <textarea
                    id="essay"
                    name="essay"
                    value={formData.essay}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                    placeholder="Share your motivation and calling for ministry..."
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  * A letter of recommendation from your lead pastor will be requested after initial review.
                </p>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={submitApp.isPending}
                  >
                    {submitApp.isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => setShowApplicationForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      )}

      {/* Resources Section */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container max-w-4xl">
          <div className="mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Additional Learning Resources
            </p>
            <h2 className="text-4xl font-bold text-primary mb-6">Expand Your Knowledge</h2>
            <p className="text-lg text-foreground/80 mb-8">
              Access additional educational resources and materials to support your pastoral and leadership formation journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
            <Card className="p-8 border-2 border-primary/20 hover:border-primary/50 transition-colors">
              <div className="flex items-start gap-4">
                <BookOpen className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-primary mb-3">
                    Free Methodist Church USA Pathwright's Library
                  </h3>
                  <p className="text-foreground/80 mb-6">
                    Access the Center for Pastoral Formation's comprehensive library of educational materials, courses, and resources designed to support your ongoing spiritual and professional development.
                  </p>
                  <a
                    href="https://fmcpastoralformation.pathwright.com/library/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    Visit Pathwright's Library
                    <span>→</span>
                  </a>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Rivercrest FMC</h3>
              <p className="text-primary-foreground/80">
                Center of Studies for Pastoral and Leadership Formation
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="/" className="hover:text-primary-foreground transition-colors">
                    Home
                  </a>
                </li>
                {isAuthenticated && (
                  <li>
                    <a href="/student-dashboard" className="hover:text-primary-foreground transition-colors">
                      Student Dashboard
                    </a>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-primary-foreground/80">
                1701 E 11th St N<br />
                Wichita, KS 67214<br />
                (316) 682-3855
              </p>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/70 text-sm">
            <p>&copy; 2026 Rivercrest Free Methodist Church. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
