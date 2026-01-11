import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ArrowRight } from 'lucide-react';
import { trackExitIntent, trackFormStart, trackFormSubmit } from '@/react-app/lib/analytics';

interface ExitIntentPopupProps {
  title?: string;
  description?: string;
  magnetName?: string;
  magnetDescription?: string;
  onSuccess?: () => void;
}

export default function ExitIntentPopup({
  title = "Wait! Before you go...",
  description = "Get our free guide to marketing automation",
  magnetName = "7 Automations Every Service Business Needs",
  magnetDescription = "Discover the exact automations that save our clients 15+ hours per week",
  onSuccess
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if already shown in this session
    const shown = sessionStorage.getItem('exit-intent-shown');
    if (shown) {
      setHasShown(true);
      return;
    }

    let exitIntentTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top of page (exiting browser)
      if (e.clientY <= 0 && !exitIntentTriggered && !hasShown) {
        exitIntentTriggered = true;
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('exit-intent-shown', 'true');
        trackExitIntent('shown');
      }
    };

    // Add delay before activating (don't annoy users immediately)
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000); // Wait 5 seconds before monitoring

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
    trackExitIntent('dismissed');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    trackFormStart('exit_intent_lead_magnet');

    try {
      const response = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          magnetName,
          source: 'exit_intent_popup'
        })
      });

      if (response.ok) {
        setIsSuccess(true);
        trackFormSubmit('exit_intent_lead_magnet', true);
        trackExitIntent('converted');

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }

        // Close after 3 seconds
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      } else {
        trackFormSubmit('exit_intent_lead_magnet', false);
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Exit intent form error:', error);
      trackFormSubmit('exit_intent_lead_magnet', false);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 z-50"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-white border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full pointer-events-auto relative">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <X size={24} />
              </button>

              {isSuccess ? (
                // Success State
                <div className="p-8 md:p-12 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Download className="text-white" size={32} />
                    </div>
                  </motion.div>

                  <h2 className="text-3xl md:text-4xl font-black mb-4">
                    Check your email!
                  </h2>
                  <p className="text-lg text-gray-700 mb-2">
                    We've sent <strong>{magnetName}</strong> to:
                  </p>
                  <p className="text-xl font-bold text-teal-500 mb-4">
                    {email}
                  </p>
                  <p className="text-sm text-gray-600">
                    (Check your spam folder if you don't see it)
                  </p>
                </div>
              ) : (
                // Form State
                <div className="p-8 md:p-12">
                  <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                      {title}
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                      {description}
                    </p>

                    {/* Lead Magnet Preview */}
                    <div className="bg-gradient-to-br from-teal-50 to-yellow-50 border-4 border-black p-6 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-teal-500 border-2 border-black flex items-center justify-center mr-4">
                          <Download className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="font-serif text-2xl mb-2 italic">
                            {magnetName}
                          </h3>
                          <p className="text-gray-700">
                            {magnetDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="exit-name" className="block text-sm font-bold mb-2">
                        Your Name
                      </label>
                      <input
                        id="exit-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="exit-email" className="block text-sm font-bold mb-2">
                        Email Address
                      </label>
                      <input
                        id="exit-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:border-teal-500 transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-black hover:text-yellow-400 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <>
                          <span>Send Me The Free Guide</span>
                          <ArrowRight size={20} />
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-600 text-center">
                      No spam. Unsubscribe anytime. We respect your privacy.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
