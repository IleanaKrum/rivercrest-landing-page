import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, CheckCircle, Users, Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

/**
 * Email Notification Feature Showcase
 * Demonstrates the automatic email notification system for course registrations
 */
export default function EmailNotificationShowcase() {
  const [activeTab, setActiveTab] = useState<"student" | "admin">("student");

  const features = [
    {
      icon: <Mail className="w-8 h-8 text-accent" />,
      title: "Instant Confirmations",
      description: "Students receive immediate email confirmations upon successful course registration with all course details.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-accent" />,
      title: "Complete Information",
      description: "Emails include course name, start date, instructor details, and payment instructions in a professional format.",
    },
    {
      icon: <Users className="w-8 h-8 text-accent" />,
      title: "Admin Alerts",
      description: "Administrators receive notifications for new registrations with payment status tracking for printed materials.",
    },
    {
      icon: <Zap className="w-8 h-8 text-accent" />,
      title: "Automated Workflow",
      description: "Non-blocking email sending ensures registrations complete instantly while notifications are sent in the background.",
    },
  ];

  const benefits = [
    {
      title: "Student Experience",
      items: [
        "Immediate confirmation of registration",
        "Clear course details and start dates",
        "Payment instructions for printed materials",
        "Professional, branded email templates",
        "Contact information for questions",
      ],
    },
    {
      title: "Administrator Benefits",
      items: [
        "Real-time alerts for new registrations",
        "Payment status tracking",
        "Student contact information in alerts",
        "Quick action buttons for payment marking",
        "Centralized notification management",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-primary">Rivercrest</h1>
              <p className="text-xs text-muted-foreground">Email Notifications</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/center-of-studies"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Back to Center of Studies
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="w-8 h-8 text-accent" />
            <p className="text-sm font-semibold text-accent uppercase tracking-wide">
              Feature Showcase
            </p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
            Automated Email Notifications
          </h1>
          <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
            Streamline your course registration process with intelligent email notifications. Students receive instant confirmations while administrators stay informed about new registrations and payment requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Learn More
            </Button>
            <Button size="lg" variant="outline">
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Key Features
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Intelligent Notification System
            </h2>
            <p className="text-lg text-foreground/70">
              Our email notification system is designed to enhance communication between students and administrators, ensuring no registration goes unnoticed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-foreground/70">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Email Mockups Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Email Examples
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Professional Email Templates
            </h2>
            <p className="text-lg text-foreground/70">
              View sample emails sent to students and administrators. Each email is professionally designed with Rivercrest branding and contains all necessary information.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-border">
            <button
              onClick={() => setActiveTab("student")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "student"
                  ? "text-primary border-b-2 border-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Student Confirmation
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "admin"
                  ? "text-primary border-b-2 border-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              Admin Alert
            </button>
          </div>

          {/* Email Mockup Display */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {activeTab === "student" ? (
              <div className="p-8">
                <div className="max-w-2xl mx-auto">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/email-notification-student-ah2MytYuZP7FNW7aHVscwD.webp"
                    alt="Student Email Confirmation"
                    className="w-full rounded-lg shadow-md"
                  />
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      Student Registration Confirmation
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      When a student successfully registers for a course, they immediately receive a professional confirmation email that includes:
                    </p>
                    <ul className="space-y-2 text-foreground/70">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Complete course details (name, start date, instructor)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Printed materials information and pricing ($45 USA only)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Payment instructions and deadlines</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Church contact information for questions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <div className="max-w-2xl mx-auto">
                  <img
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/email-notification-admin-mGJ4AG2k2DAYBqHEEU8xh8.webp"
                    alt="Admin Email Alert"
                    className="w-full rounded-lg shadow-md"
                  />
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      Administrator Registration Alert
                    </h3>
                    <p className="text-foreground/70 mb-4">
                      Administrators receive real-time alerts for new course registrations with actionable information:
                    </p>
                    <ul className="space-y-2 text-foreground/70">
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Student name and email address</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Course enrolled in and registration date</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Payment status for printed materials</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>Quick action buttons to view or mark payments</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Benefits
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Improved Communication & Efficiency
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {benefits.map((benefit, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-primary mb-6">{benefit.title}</h3>
                <ul className="space-y-4">
                  {benefit.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <span className="text-foreground/70">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Details Section */}
      <section className="py-20 bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Technical Implementation
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Powered by Resend
            </h2>
            <p className="text-lg text-foreground/70">
              Our email notification system is built using Resend, a modern email service provider that ensures reliable delivery and professional email rendering across all clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-3">Reliable Delivery</h3>
              <p className="text-foreground/70">
                Emails are delivered reliably with automatic retries and bounce handling to ensure messages reach their destinations.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-3">Professional Templates</h3>
              <p className="text-foreground/70">
                HTML email templates are professionally designed and tested across all major email clients for consistent rendering.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-xl font-bold text-primary mb-3">Non-Blocking</h3>
              <p className="text-foreground/70">
                Email sending happens asynchronously, so registration confirmations are instant while emails are sent in the background.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container max-w-4xl text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Streamline Your Registration Process?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Start using automated email notifications for your course registrations today. Improve student communication and administrative efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Register for a Course
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-foreground/60 mb-4">
              Rivercrest Free Methodist Church • Center of Studies
            </p>
            <p className="text-center text-sm text-foreground/50">
              © 2024 Rivercrest Free Methodist Church. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
