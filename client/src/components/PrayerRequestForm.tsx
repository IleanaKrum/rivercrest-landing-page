import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface PrayerRequestFormProps {
  onSubmitSuccess?: () => void;
}

export const PrayerRequestForm: React.FC<PrayerRequestFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    prayerCategory: 'church_planting',
    prayerRequest: '',
    isPublic: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // tRPC mutation for submitting prayer request
  const submitPrayerMutation = trpc.prayerRequests.submit.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
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
    setError(null);

    try {
      await submitPrayerMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        prayerCategory: formData.prayerCategory as any,
        prayerRequest: formData.prayerRequest,
        isPublic: formData.isPublic,
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        prayerCategory: 'church_planting',
        prayerRequest: '',
        isPublic: false,
      });

      if (onSubmitSuccess) {
        onSubmitSuccess();
      }

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit prayer request';
      setError(errorMessage);
    }
  };

  return (
    <Card className="p-6 bg-white border border-border">
      <h3 className="text-2xl font-bold text-primary mb-2">Submit a Prayer Request</h3>
      <p className="text-foreground/70 mb-6">
        Share your prayer requests related to our mission work. Your prayers matter and strengthen our community.
      </p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-green-900">Thank you for your prayer request!</h4>
            <p className="text-sm text-green-800 mt-1">
              We have received your request and will lift it up in prayer.
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-red-900">Error submitting request</h4>
            <p className="text-sm text-red-800 mt-1">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            minLength={2}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="John Doe"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="john@example.com"
          />
        </div>

        {/* Prayer Category */}
        <div>
          <label htmlFor="prayerCategory" className="block text-sm font-medium text-foreground mb-1">
            Prayer Category *
          </label>
          <select
            id="prayerCategory"
            name="prayerCategory"
            value={formData.prayerCategory}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="church_planting">Church Planting</option>
            <option value="leadership_development">Leadership Development</option>
            <option value="refugee_support">Refugee Support</option>
            <option value="community_outreach">Community Outreach</option>
            <option value="missions">Missions</option>
            <option value="healing">Healing</option>
            <option value="family">Family</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Prayer Request Text */}
        <div>
          <label htmlFor="prayerRequest" className="block text-sm font-medium text-foreground mb-1">
            Your Prayer Request *
          </label>
          <textarea
            id="prayerRequest"
            name="prayerRequest"
            value={formData.prayerRequest}
            onChange={handleInputChange}
            required
            minLength={10}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Please share your prayer request in detail..."
          />
          <p className="text-xs text-foreground/60 mt-1">
            Minimum 10 characters required
          </p>
        </div>

        {/* Public Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isPublic"
            name="isPublic"
            checked={formData.isPublic}
            onChange={handleInputChange}
            className="w-4 h-4 rounded border-border cursor-pointer"
          />
          <label htmlFor="isPublic" className="text-sm text-foreground/70 cursor-pointer">
            Allow this prayer request to be shared with our prayer circle
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={submitPrayerMutation.isPending}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 rounded-lg flex items-center justify-center gap-2"
        >
          {submitPrayerMutation.isPending ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Prayer Request
            </>
          )}
        </Button>

        <p className="text-xs text-foreground/60 text-center">
          Your information is kept private and secure. We will pray for your request.
        </p>
      </form>
    </Card>
  );
};

export default PrayerRequestForm;
