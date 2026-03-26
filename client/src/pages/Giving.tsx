import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Gift, Users, CheckCircle } from "lucide-react";
import { useState } from "react";

/**
 * Giving/Donations Page
 * Allows church members to indicate their giving intention with donation type and amount
 * Information is collected for manual processing
 */

type DonationType = "tithe" | "offering" | "project" | null;

export default function Giving() {
  const [selectedType, setSelectedType] = useState<DonationType>(null);
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [customAmount, setCustomAmount] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const donationTypes = [
    {
      id: "tithe",
      name: "Tithe",
      description: "Regular tithe to support our ministry",
      icon: Heart,
    },
    {
      id: "offering",
      name: "Offering",
      description: "Special offering for church operations",
      icon: Gift,
    },
    {
      id: "project",
      name: "Special Project",
      description: "Support a specific ministry project",
      icon: Users,
    },
  ];

  const predefinedAmounts = ["25", "50", "100", "250", "500"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || (!selectedAmount && !customAmount)) {
      alert("Please select a donation type and amount");
      return;
    }
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSelectedType(null);
      setSelectedAmount("");
      setCustomAmount("");
      setSubmitted(false);
    }, 4000);
  };

  const finalAmount = customAmount || selectedAmount;

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
              href="/#contact"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
            <Button variant="default" size="sm">
              <a href="/">Back</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Support Our Ministry
            </p>
            <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
              Give With Purpose
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Your generous giving supports our mission to serve as a House of Prayer for The Nations. Every contribution makes a meaningful difference in our community.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container max-w-4xl">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Step 1: Select Donation Type */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">
                1. Choose Your Giving Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {donationTypes.map((type) => {
                  const IconComponent = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id as DonationType)}
                      className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <IconComponent className="w-8 h-8 text-accent mb-4" />
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {type.name}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {type.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Amount */}
            {selectedType && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary">
                  2. Select Your Amount
                </h2>

                {/* Predefined Amounts */}
                <div>
                  <p className="text-sm font-semibold text-foreground/70 mb-4">
                    Quick amounts:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {predefinedAmounts.map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amount);
                          setCustomAmount("");
                        }}
                        className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                          selectedAmount === amount && !customAmount
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border text-foreground hover:border-primary"
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label htmlFor="customAmount" className="block text-sm font-semibold text-foreground mb-2">
                    Or enter a custom amount:
                  </label>
                  <div className="flex gap-2">
                    <span className="flex items-center px-4 py-3 bg-muted text-foreground rounded-lg">
                      $
                    </span>
                    <input
                      type="number"
                      id="customAmount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount("");
                      }}
                      placeholder="Enter amount"
                      min="1"
                      step="0.01"
                      className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Amount Summary */}
                {finalAmount && (
                  <Card className="p-6 bg-accent/5 border-accent">
                    <p className="text-sm text-foreground/70 mb-2">
                      Your giving amount:
                    </p>
                    <p className="text-4xl font-bold text-primary">
                      ${parseFloat(finalAmount).toFixed(2)}
                    </p>
                  </Card>
                )}
              </div>
            )}

            {/* Step 3: Donor Information */}
            {selectedType && finalAmount && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-primary">
                  3. Your Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message (Optional)
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent resize-none"
                      placeholder="Tell us about your giving intention or prayer request..."
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {selectedType && finalAmount && (
              <div className="space-y-4">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                >
                  Submit Giving Information
                </Button>

                {submitted && (
                  <Card className="p-6 bg-accent/10 border-accent">
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-bold text-accent mb-2">
                          Thank You for Your Generosity!
                        </h3>
                        <p className="text-foreground/70 text-sm">
                          We've received your giving information. Our team will contact you shortly with payment instructions. Your support means everything to our ministry.
                        </p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Information Section */}
      <section className="py-20 bg-background">
        <div className="container max-w-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                How Your Giving Helps
              </h3>
              <ul className="space-y-3 text-foreground/70">
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Fund community outreach programs</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Enable spiritual growth initiatives</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent font-bold">•</span>
                  <span>Partner with FMC Central Region Conference and Swahili Center of Studies Initiative</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">
                Contact Information
              </h3>
              <div className="space-y-4 text-foreground/70">
                <div>
                  <p className="font-semibold text-foreground mb-1">Address</p>
                  <p>1701 E 11th St N<br />Wichita, KS 67214</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Phone</p>
                  <p>(316) 682-3855</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground mb-1">Email</p>
                  <p>rfmcoffice@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/RivercrestFreeMethodistChurch-Logo25_98841074.png"
                alt="Rivercrest Free Methodist Church Logo"
                className="h-24 w-auto mb-4"
              />
              <p className="text-primary-foreground/80">
                A House of Prayer for The Nations, serving Wichita with faith, hope, and love.
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
                <li>
                  <a href="/giving" className="hover:text-primary-foreground transition-colors">
                    Giving
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/rivercrestfmc/" target="_blank" rel="noopener noreferrer" className="hover:text-primary-foreground transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Service Times</h4>
              <p className="text-primary-foreground/80">
                Sunday<br />
                10:15 AM - 1:00 PM
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
