import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Share2, Award, Calendar, CheckCircle } from "lucide-react";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

/**
 * Student Certificates Page
 * Displays all certificates earned by the authenticated student
 * Allows downloading and sharing certificates
 */
export default function StudentCertificates() {
  const { user, isAuthenticated, loading } = useAuth();
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [shareMessage, setShareMessage] = useState("");

  // Fetch student's certificates
  const { data: certificates = [], isLoading: certificatesLoading } = trpc.centerOfStudies.getStudentCertificates.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Sign In Required</h2>
          <p className="text-muted-foreground mb-6">
            Please log in to view your certificates.
          </p>
          <a href="/api/oauth/login">
            <Button className="w-full">Sign In</Button>
          </a>
        </Card>
      </div>
    );
  }

  const handleDownloadCertificate = (certificate: any) => {
    if (certificate.pdfUrl) {
      // Open PDF in new window
      window.open(certificate.pdfUrl, "_blank");
    }
  };

  const handleShareCertificate = (certificate: any) => {
    const verificationUrl = `${window.location.origin}/verify-certificate/${certificate.verificationCode}`;
    const shareText = `I've earned a certificate in ${certificate.title} from Rivercrest Free Methodist Church Center of Studies! Verify it here: ${verificationUrl}`;

    if (navigator.share) {
      navigator.share({
        title: "My Certificate",
        text: shareText,
        url: verificationUrl,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      setShareMessage("Certificate link copied to clipboard!");
      setTimeout(() => setShareMessage(""), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">My Certificates</h1>
          <p className="text-muted-foreground text-lg">
            Certificates you've earned through course completion
          </p>
        </div>

        {/* Share Message */}
        {shareMessage && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg text-green-800">
            {shareMessage}
          </div>
        )}

        {/* Certificates Grid */}
        {certificatesLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : certificates.length === 0 ? (
          <Card className="p-12 text-center">
            <Award className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Certificates Yet</h3>
            <p className="text-muted-foreground mb-6">
              Complete courses and pass the quizzes to earn certificates.
            </p>
            <a href="/center-of-studies">
              <Button>Explore Courses</Button>
            </a>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert: any) => (
              <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                {/* Certificate Preview */}
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-6 border-b border-border">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">
                        {cert.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Certificate #{cert.certificateNumber}
                      </p>
                    </div>
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  </div>

                  {/* Certificate Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Issued: {new Date(cert.issueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {cert.expiryDate && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Expires: {new Date(cert.expiryDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 flex gap-3">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 flex items-center gap-2"
                    onClick={() => handleDownloadCertificate(cert)}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 flex items-center gap-2"
                    onClick={() => handleShareCertificate(cert)}
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                </div>

                {/* Verification Code */}
                <div className="px-6 pb-6 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Verification Code:</p>
                  <code className="text-sm font-mono bg-muted p-2 rounded block text-center text-foreground">
                    {cert.verificationCode}
                  </code>
                  <p className="text-xs text-muted-foreground mt-2 text-center">
                    Share this code for verification
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Verification Info */}
        {certificates.length > 0 && (
          <Card className="mt-12 p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Share Your Certificates</h3>
            <ul className="text-blue-800 space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="font-bold">1.</span>
                <span>Click "Share" to send your certificate to others</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">2.</span>
                <span>Share your verification code for employers or institutions to verify</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold">3.</span>
                <span>
                  Visit the <a href="/verify-certificate" className="underline font-semibold">verification page</a> to check other certificates
                </span>
              </li>
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
}
