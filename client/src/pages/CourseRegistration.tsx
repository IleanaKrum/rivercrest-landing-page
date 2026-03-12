import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, Phone, MapPin, DollarSign, CheckCircle2, Globe } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface CourseRegistrationProps {
  courseId?: string;
  courseName?: string;
}

export default function CourseRegistration(props: any) {
  const courseId = props.params?.courseId || props.courseId;
  const parsedCourseId = courseId ? parseInt(courseId as string, 10) : undefined;
  const [formData, setFormData] = useState({
    courseId: parsedCourseId || 0,
    studentName: "",
    studentEmail: "",
    studentPhone: "",
    country: "",
    state: "",
    wantsPrintedMaterials: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const registerMutation = trpc.courseRegistration.registerForCourse.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const finalCourseId = formData.courseId > 0 ? formData.courseId : (parsedCourseId || 0);
      await registerMutation.mutateAsync({
        courseId: finalCourseId,
        studentName: formData.studentName,
        studentEmail: formData.studentEmail,
        studentPhone: formData.studentPhone,
        country: formData.country,
        state: formData.state,
        wantsPrintedMaterials: formData.wantsPrintedMaterials,
      });

      setSubmitted(true);
      setTimeout(() => {
      setFormData({
        courseId: parsedCourseId || 0,
          studentName: "",
          studentEmail: "",
          studentPhone: "",
          country: "",
          state: "",
          wantsPrintedMaterials: false,
        });
        setSubmitted(false);
      }, 5000);
    } catch (err: any) {
      setError(err.message || "Failed to register for course");
    }
  };

  const isUSA = formData.country.toLowerCase() === "usa" || formData.country.toLowerCase() === "united states";
  const printedMaterialsCost = formData.wantsPrintedMaterials && isUSA ? 45 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-primary mb-4">
            Course Registration
          </h1>
          {parsedCourseId && (
            <p className="text-lg text-muted-foreground mb-2">
              Registering for Course ID: <span className="font-semibold text-foreground">#{parsedCourseId}</span>
            </p>
          )}
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our Swahili-speaking pastoral and leadership training program. Complete the form below to register for your course.
          </p>
        </div>

        {submitted && (
          <Card className="mb-8 bg-green-50 border-green-200 p-6">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-green-900 mb-2">Registration Submitted Successfully!</h3>
                <p className="text-green-800 mb-4">
                  Thank you for registering. We have received your information and will contact you shortly.
                </p>
                {formData.wantsPrintedMaterials && isUSA && (
                  <div className="bg-white rounded p-4 border border-green-200">
                    <p className="font-semibold text-green-900 mb-2">Printed Materials Payment</p>
                    <p className="text-green-800 mb-3">
                      You requested printed materials for <strong>$45.00</strong>. Our team will send you payment instructions via email.
                    </p>
                    <p className="text-sm text-green-700">
                      Payment methods accepted: Bank transfer, Check, or PayPal
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}

        {error && (
          <Card className="mb-8 bg-red-50 border-red-200 p-6">
            <p className="text-red-900">{error}</p>
          </Card>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
            <Card className="p-8 shadow-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Student Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="studentEmail"
                        value={formData.studentEmail}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="studentPhone"
                        value={formData.studentPhone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Location Information */}
                <div>
                  <h3 className="text-lg font-semibold text-primary mb-4">Location</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Country *
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g., USA, Kenya, Tanzania"
                        list="countries"
                      />
                      <datalist id="countries">
                        <option value="USA" />
                        <option value="Kenya" />
                        <option value="Tanzania" />
                        <option value="Uganda" />
                        <option value="Rwanda" />
                        <option value="Burundi" />
                        <option value="Democratic Republic of Congo" />
                        <option value="South Africa" />
                        <option value="Nigeria" />
                        <option value="Ghana" />
                      </datalist>
                    </div>

                    {isUSA && (
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          State/Province
                        </label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          placeholder="e.g., California, Texas"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Printed Materials Option */}
                <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-6 rounded-lg border border-primary/20">
                  <h3 className="text-lg font-semibold text-primary mb-4">Printed Materials</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="wantsPrintedMaterials"
                        checked={formData.wantsPrintedMaterials}
                        onChange={handleInputChange}
                        className="w-5 h-5 mt-1 rounded border-border focus:ring-2 focus:ring-primary"
                      />
                      <div>
                        <p className="font-medium text-foreground">
                          Request Printed Course Materials
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          High-quality printed syllabus, study guides, and reference materials
                        </p>
                      </div>
                    </label>

                    {formData.wantsPrintedMaterials && !isUSA && (
                      <div className="bg-amber-50 border border-amber-200 rounded p-4">
                        <p className="text-sm text-amber-900">
                          <strong>Note:</strong> Printed materials are currently available for USA residents only. Digital materials will be provided to all students.
                        </p>
                      </div>
                    )}

                    {formData.wantsPrintedMaterials && isUSA && (
                      <div className="bg-blue-50 border border-blue-200 rounded p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-blue-600" />
                          <p className="font-semibold text-blue-900">Cost: $45.00</p>
                        </div>
                        <p className="text-sm text-blue-800">
                          Payment will be collected via manual invoice. Our team will contact you with payment options.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={registerMutation.isPending || submitted}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  {registerMutation.isPending ? "Registering..." : "Complete Registration"}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  By registering, you agree to receive course materials and updates via email.
                </p>
              </form>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="md:col-span-1">
            {/* Course Info Card */}
            {parsedCourseId && (
              <Card className="p-6 mb-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
                <h3 className="font-semibold text-primary mb-3">Course Details</h3>
                <p className="text-sm text-foreground mb-4">Course ID: #{parsedCourseId}</p>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>Digital materials included</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4" />
                    <span>Email support available</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Swahili-speaking program</span>
                  </div>
                </div>
              </Card>
            )}

            {/* FAQ Card */}
            <Card className="p-6">
              <h3 className="font-semibold text-primary mb-4">Frequently Asked</h3>
              
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-foreground mb-1">What's included?</p>
                  <p className="text-muted-foreground">
                    All students receive digital course materials, video lessons, and access to assignments.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground mb-1">Printed Materials</p>
                  <p className="text-muted-foreground">
                    Available for $45 (USA only). Includes syllabus, study guides, and reference materials.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground mb-1">Payment Methods</p>
                  <p className="text-muted-foreground">
                    Bank transfer, check, or PayPal. Invoice sent after registration.
                  </p>
                </div>

                <div>
                  <p className="font-medium text-foreground mb-1">Support</p>
                  <p className="text-muted-foreground">
                    Email: info@rivercrest.org<br/>Phone: (555) 123-4567
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
