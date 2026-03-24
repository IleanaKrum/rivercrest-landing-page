import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CheckCircle, XCircle, Search, Award } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

/**
 * Certificate Verification Portal
 * Public page for verifying certificate authenticity
 */
export default function CertificateVerification() {
  const [verificationCode, setVerificationCode] = useState("");
  const [searched, setSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  // Query for certificate verification
  const { data: certificate, isLoading } = trpc.centerOfStudies.getCertificateByVerificationCode.useQuery(
    { code: verificationCode },
    { enabled: searched && verificationCode.length > 0 }
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode.trim()) {
      setSearched(true);
      setIsSearching(true);
    }
  };

  const handleReset = () => {
    setVerificationCode("");
    setSearched(false);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Verify Certificate
          </h1>
          <p className="text-muted-foreground text-lg">
            Verify the authenticity of Rivercrest Free Methodist Church certificates
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-8 mb-8">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
                Verification Code
              </label>
              <div className="flex gap-2">
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 8-character verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.toUpperCase())}
                  maxLength={8}
                  className="flex-1 font-mono text-center text-lg tracking-widest"
                />
                <Button type="submit" disabled={!verificationCode.trim() || isLoading}>
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span className="ml-2">Search</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                The verification code is provided with the certificate
              </p>
            </div>
          </form>
        </Card>

        {/* Results */}
        {searched && (
          <>
            {isLoading ? (
              <Card className="p-12 text-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Verifying certificate...</p>
              </Card>
            ) : certificate ? (
              <Card className="p-8 border-green-200 bg-green-50">
                <div className="flex items-start gap-4 mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-green-900 mb-1">
                      Certificate Verified ✓
                    </h2>
                    <p className="text-green-700">
                      This certificate is authentic and valid
                    </p>
                  </div>
                </div>

                {/* Certificate Details */}
                <div className="bg-white rounded-lg p-6 space-y-4 border border-green-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Student Name</p>
                      <p className="text-lg font-semibold text-foreground">
                        {certificate.studentName || "Student"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Course/Module</p>
                      <p className="text-lg font-semibold text-foreground">
                        {certificate.title}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate Number</p>
                      <p className="text-lg font-mono font-semibold text-foreground">
                        {certificate.certificateNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Issue Date</p>
                      <p className="text-lg font-semibold text-foreground">
                        {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    {certificate.expiryDate && (
                      <div>
                        <p className="text-sm text-muted-foreground">Expiry Date</p>
                        <p className="text-lg font-semibold text-foreground">
                          {new Date(certificate.expiryDate).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-muted-foreground">Issued By</p>
                      <p className="text-lg font-semibold text-foreground">
                        {certificate.issuedBy}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-green-200 pt-4">
                    <p className="text-sm text-muted-foreground mb-2">Verification Code</p>
                    <code className="text-lg font-mono font-semibold text-foreground bg-gray-100 p-3 rounded block text-center">
                      {certificate.verificationCode}
                    </code>
                  </div>
                </div>

                <Button onClick={handleReset} variant="outline" className="w-full mt-6">
                  Verify Another Certificate
                </Button>
              </Card>
            ) : (
              <Card className="p-8 border-red-200 bg-red-50">
                <div className="flex items-start gap-4 mb-6">
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-bold text-red-900 mb-1">
                      Certificate Not Found
                    </h2>
                    <p className="text-red-700">
                      No valid certificate found with this verification code
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 border border-red-200 mb-6">
                  <p className="text-sm text-muted-foreground mb-2">You searched for:</p>
                  <code className="text-lg font-mono font-semibold text-foreground bg-gray-100 p-3 rounded block text-center">
                    {verificationCode}
                  </code>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    <strong>Tips:</strong>
                  </p>
                  <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                    <li>• Check that you've entered the code correctly (case-insensitive)</li>
                    <li>• The code is 8 characters long</li>
                    <li>• Make sure there are no extra spaces</li>
                    <li>• Contact the certificate issuer if you believe this is an error</li>
                  </ul>
                </div>

                <Button onClick={handleReset} className="w-full">
                  Try Again
                </Button>
              </Card>
            )}
          </>
        )}

        {/* Information Section */}
        {!searched && (
          <Card className="p-8 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">
              How to Verify a Certificate
            </h3>
            <ol className="space-y-3 text-blue-800">
              <li className="flex gap-3">
                <span className="font-bold flex-shrink-0">1.</span>
                <span>Obtain the 8-character verification code from the certificate holder</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold flex-shrink-0">2.</span>
                <span>Enter the code in the search field above</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold flex-shrink-0">3.</span>
                <span>Click "Search" to verify the certificate's authenticity</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold flex-shrink-0">4.</span>
                <span>Review the certificate details to confirm it matches your records</span>
              </li>
            </ol>
          </Card>
        )}
      </div>
    </div>
  );
}
