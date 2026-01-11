import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Check, ArrowRight } from 'lucide-react';
import { trackFormStart, trackFormSubmit, trackLeadMagnetDownload } from '@/react-app/lib/analytics';

interface LeadMagnetFormProps {
  magnetName: string;
  magnetDescription: string;
  buttonText?: string;
  source?: string;
}

export default function LeadMagnetForm({
  magnetName,
  magnetDescription,
  buttonText = "Download Free Guide",
  source = "lead_magnet_page"
}: LeadMagnetFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    trackFormStart(`lead_magnet_${magnetName.toLowerCase().replace(/\s+/g, '_')}`);

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          magnetName,
          source
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        trackFormSubmit(`lead_magnet_${magnetName.toLowerCase().replace(/\s+/g, '_')}`, true);
        trackLeadMagnetDownload(magnetName, formData.email);
      } else {
        const data = await response.json();
        setError(data.error || 'Something went wrong. Please try again.');
        trackFormSubmit(`lead_magnet_${magnetName.toLowerCase().replace(/\s+/g, '_')}`, false);
      }
    } catch (err) {
      console.error('Lead magnet form error:', err);
      setError('Network error. Please check your connection and try again.');
      trackFormSubmit(`lead_magnet_${magnetName.toLowerCase().replace(/\s+/g, '_')}`, false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-teal-50 to-yellow-50 border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 bg-teal-500 border-4 border-black rounded-full flex items-center justify-center">
              <Check className="text-white" size={40} strokeWidth={3} />
            </div>
          </motion.div>

          <h3 className="text-3xl font-black mb-4">
            Check your email!
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            We've sent <strong>{magnetName}</strong> to:
          </p>
          <p className="text-xl font-bold text-teal-500 mb-6">
            {formData.email}
          </p>

          <div className="bg-white border-2 border-black p-6 mb-6">
            <p className="font-bold mb-2">What's next:</p>
            <ul className="text-left space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>Check your inbox (and spam folder) for the guide</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>You'll also get a 5-email series with automation tips</span>
              </li>
              <li className="flex items-start">
                <span className="text-teal-500 mr-2">•</span>
                <span>Reply anytime if you have questions</span>
              </li>
            </ul>
          </div>

          <a
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-teal-500 hover:text-black transition-colors"
          >
            <span>View Our Services</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-yellow-400 p-6 border-b-4 border-black">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-black flex items-center justify-center">
            <Download className="text-teal-500" size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black mb-2">
              {magnetName}
            </h3>
            <p className="text-sm font-semibold">
              {magnetDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 space-y-6">
        <div>
          <label htmlFor="lead-name" className="block text-sm font-bold mb-2">
            Your Name *
          </label>
          <input
            id="lead-name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500 transition-colors"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="lead-email" className="block text-sm font-bold mb-2">
            Email Address *
          </label>
          <input
            id="lead-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500 transition-colors"
            placeholder="john@example.com"
          />
        </div>

        {error && (
          <div className="bg-red-50 border-2 border-red-500 p-4 text-red-700 text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-6 py-4 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-black hover:text-teal-500 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            'Sending...'
          ) : (
            <>
              <Download size={20} />
              <span>{buttonText}</span>
            </>
          )}
        </button>

        <p className="text-xs text-gray-600 text-center">
          No spam. Unsubscribe anytime. We respect your privacy.
        </p>
      </form>
    </div>
  );
}
