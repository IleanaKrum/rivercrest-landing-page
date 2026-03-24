import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { MissionalCommitment } from "@/components/MissionalCommitment";
import { useLocation } from "wouter";

/**
 * Design: Modern & Vibrant
 * - Vibrant primary colors (bright blues, purples, oranges)
 * - Dynamic gradients and modern layouts
 * - Contemporary typography with strong hierarchy
 * - Bold accents and energetic visual elements
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleApplyCenterOfStudies = () => {
    setLocation("/center-of-studies");
  };

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
          <div className="flex items-center gap-2 group relative">
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/RivercrestFreeMethodistChurch-Logo25_203a03dd.png"
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
              href="#services"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Services
            </a>
            <a
              href="/giving"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Giving
            </a>
            <a
              href="/center-of-studies"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Center of Studies
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
              src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/Welcomemulti-lingualbanner_bf2ec9c9.png"
              alt="Multilingual welcome banner with diverse community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>
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

      {/* Mission Statement Section */}
      <section className="py-20 bg-gradient-to-b from-accent/5 to-transparent">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4 text-center">
              Our Theological Foundation
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-12 text-center">
              The Abrahamic Root: A Father of Many Nations
            </h2>
            
            <div className="space-y-8">
              {/* Genesis Section */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-border">
                <h3 className="text-2xl font-bold text-primary mb-4">The Promise: Genesis 12 & 17</h3>
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  God entered into a covenant with Abraham—not an exclusive club meant to shut others out, but a "blessed to be a blessing" strategy. God promised Abraham that he would be the <span className="italic">"father of many nations"</span> (Genesis 17:5), and explicitly stated that <span className="italic">"all peoples on earth will be blessed through you"</span> (Genesis 12:3).
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  This establishes that the God of Israel was never intended to be a national deity confined by borders. He was the Creator reclaiming His entire creation through one family line.
                </p>
              </div>
              
              {/* Psalm Section */}
              <div className="bg-white rounded-lg p-8 shadow-sm border border-border">
                <h3 className="text-2xl font-bold text-primary mb-4">The Global Turning: Psalm 22</h3>
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  Psalm 22 shifts from individual agony to a declaration of international triumph:
                </p>
                <blockquote className="border-l-4 border-accent pl-6 py-4 italic text-foreground/80 bg-accent/5 rounded">
                  "All the ends of the earth will remember and turn to the Lord, and all the families of the nations will bow down before him, for dominion belongs to the Lord and he rules over the nations." (Psalm 22:27-28)
                </blockquote>
              </div>
            </div>
            
            <div className="mt-12 p-8 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-center text-lg text-foreground/80 leading-relaxed">
                This mission statement guides our Swahili-speaking Center of Studies—equipping leaders to serve not just their local communities, but to participate in God's global redemptive work across nations.
              </p>
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

      {/* Center of Studies CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10 border-y border-primary/20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Swahili Initiative
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Center of Studies
            </h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Equipping Swahili-speaking leaders to serve their communities and participate in God's global redemptive work. Join our comprehensive training programs in pastoral formation, deacon training, and leadership development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-accent hover:bg-accent/90"
                onClick={handleApplyCenterOfStudies}
              >
                Apply to Swahili Initiative Center of Studies
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/5"
                onClick={handleApplyCenterOfStudies}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Community Gallery Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <div className="max-w-2xl mb-16">
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-4">
              Community Gallery
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-6">
              Our Community in Action
            </h2>
            <p className="text-lg text-foreground/70">
              See the vibrant life and ministry happening at Rivercrest Free Methodist Church as we serve our community and grow together in faith.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Gallery Image 1 - Pastor Ileana Quote */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/pastorileana.quote_d8a3325c.webp"
                alt="Pastor Ileana's inspirational quote on humility and service"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 2 - Community Fellowship */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/da9157eb-6b3b-4682-a277-fdb57a0e57d7~1_6e9f5e8b.webp"
                alt="Community members gathering at Rivercrest"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 3 - Children's Ministry */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/20241124_135858~2_3632a111.webp"
                alt="Children's ministry and family fellowship"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 4 - Leadership Team */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/8e86fddd-27ff-4379-9346-eed2da98abbb~1_0a30936d.webp"
                alt="Leadership team and pastoral staff"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 5 - Worship and Prayer */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/20250628_104636_a089c479.webp"
                alt="Worship service and pastoral leadership"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Gallery Image 6 - Missional Commitment */}
            <div className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-64">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663416906571/kBmgeZHWTyHuceHoeAKRrp/Welcomemulti-lingualbanner_bf2ec9c9.png"
                alt="Rivercrest's commitment to multilingual and multicultural ministry"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
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

      {/* Missional Commitment Section */}
      <MissionalCommitment />

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
            <p className="mt-4">
              In Partnership with{" "}
              <a
                href="https://crcfmc.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground hover:underline transition-colors"
              >
                Free Methodist Church Central Region Conference
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
