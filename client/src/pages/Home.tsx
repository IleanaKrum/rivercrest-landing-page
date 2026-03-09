import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";

/**
 * Design: Modern Spiritual Minimalism
 * - Deep navy/teal primary with warm cream backgrounds
 * - Asymmetrical layouts with generous whitespace
 * - Crimson Text serif for headings, Inter sans-serif for body
 * - Subtle spiritual symbolism and soft shadows
 */

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(false);
    }, 3000);
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
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-primary">Rivercrest</h1>
              <p className="text-xs text-muted-foreground">Free Methodist Church</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#services"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
            <Button variant="default" size="sm">
              Visit Us
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[600px] lg:min-h-[700px]">
          {/* Left: Image */}
          <div className="relative order-2 lg:order-1">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/hero-spiritual-light-3FxtJ5Zdt8QcPoZ6nQvAFx.webp"
              alt="Spiritual light and sacred geometry"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 bg-background flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-12 lg:py-0">
            <div className="max-w-md">
              <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
                Welcome to Our Community
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold text-primary mb-6 leading-tight">
                A House of Prayer for The Nations
              </h1>
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                Rivercrest Free Methodist Church is a faith-centered community dedicated to living out the gospel in our cultural contexts, fostering unity while honoring the distinct gifts of every community we serve.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Join Us Sunday
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-12">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/divider-spiritual-kU5meeyJcxiGgDNQszoCqx.webp"
          alt="Decorative divider"
          className="w-64 h-auto opacity-60"
        />
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Our Ministry
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              What We Offer
            </h2>
            <p className="text-lg text-foreground/70">
              Discover the various ways we serve our community and support spiritual growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1: Prayer */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/service-card-prayer-LWnNdxnwCTrCr7XaVw9geF.webp"
                  alt="Prayer and spiritual practice"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-3">Prayer & Worship</h3>
                <p className="text-foreground/70 mb-6">
                  Join us in meaningful worship experiences and prayer gatherings that deepen our connection to faith and community.
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>
            </Card>

            {/* Service Card 2: Community */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/service-card-community-Dzc8FXefC6MLaFtxoXg6KM.webp"
                  alt="Community and fellowship"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-3">Community Outreach</h3>
                <p className="text-foreground/70 mb-6">
                  We believe in serving our neighbors and building bridges across communities through compassionate action and support.
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>
            </Card>

            {/* Service Card 3: Growth */}
            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0">
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/service-card-growth-9utNfJ7foJPYoMBALiq4rb.webp"
                  alt="Spiritual growth and development"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-primary mb-3">Spiritual Growth</h3>
                <p className="text-foreground/70 mb-6">
                  Explore Bible studies, discipleship programs, and resources designed to nurture your spiritual journey.
                </p>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5"
                >
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-12 bg-white">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/divider-spiritual-kU5meeyJcxiGgDNQszoCqx.webp"
          alt="Decorative divider"
          className="w-64 h-auto opacity-60"
        />
      </div>

      {/* Social Proof Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Community Voices
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              What Our Members Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <Card className="p-8 border-l-4 border-accent bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">JM</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">James Mitchell</p>
                  <p className="text-sm text-muted-foreground">Member for 5 years</p>
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                "Rivercrest has become my spiritual home. The community here is welcoming, the teaching is profound, and I've grown so much in my faith journey."
              </p>
            </Card>

            {/* Testimonial 2 */}
            <Card className="p-8 border-l-4 border-accent bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">SM</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sarah Martinez</p>
                  <p className="text-sm text-muted-foreground">New member</p>
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                "I visited for the first time last month and felt immediately welcomed. The message was powerful and the people genuinely care about each other."
              </p>
            </Card>

            {/* Testimonial 3 */}
            <Card className="p-8 border-l-4 border-accent bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">DK</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">David Kim</p>
                  <p className="text-sm text-muted-foreground">Member for 2 years</p>
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                "The outreach programs here have transformed my understanding of what it means to serve. I'm grateful for this community of faith."
              </p>
            </Card>

            {/* Testimonial 4 */}
            <Card className="p-8 border-l-4 border-accent bg-white">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-accent font-bold">ER</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Member for 8 years</p>
                </div>
              </div>
              <p className="text-foreground/70 leading-relaxed">
                "Rev. Iliana's leadership and vision have helped our church grow spiritually. I love how we're making a real difference in Wichita."
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="flex justify-center py-12 bg-background">
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/divider-spiritual-kU5meeyJcxiGgDNQszoCqx.webp"
          alt="Decorative divider"
          className="w-64 h-auto opacity-60"
        />
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <div>
              <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
                Get In Touch
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-8">
                Connect With Us
              </h2>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location</h3>
                    <p className="text-foreground/70">
                      1701 E 11th St N<br />
                      Wichita, KS 67214
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Phone</h3>
                    <p className="text-foreground/70">(316) 682-3855</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-foreground/70">rfmcoffice@gmail.com</p>
                  </div>
                </div>

                {/* Service Times */}
                <div className="mt-12 p-6 bg-background rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Service Times</h3>
                  <p className="text-foreground/70">
                    <strong>Sunday:</strong> 10:15 AM - 1:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="p-8 border-0 shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
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
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
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
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us how we can help..."
                    ></textarea>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>

                  {submitted && (
                    <div className="p-4 rounded-lg bg-accent/10 border border-accent text-accent text-center">
                      Thank you! We'll get back to you soon.
                    </div>
                  )}
                </form>
              </Card>
            </div>
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
                A House of Prayer for The Nations, serving Wichita with faith, hope, and love.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-primary-foreground/80">
                <li>
                  <a href="#services" className="hover:text-primary-foreground transition-colors">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-primary-foreground transition-colors">
                    Contact
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
