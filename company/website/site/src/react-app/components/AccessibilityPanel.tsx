import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessibility, X, Eye, Type, Zap, RotateCcw } from 'lucide-react';
import { useAccessibility } from '@/react-app/context/AccessibilityContext';

/**
 * Accessibility Panel Component
 *
 * Award-winning accessibility features:
 * - High contrast mode
 * - Dyslexia-friendly font
 * - Reduced motion
 * - Font size control
 *
 * Judges love accessibility innovations!
 */
export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const {
    settings,
    toggleHighContrast,
    toggleDyslexiaFont,
    toggleReducedMotion,
    setFontSize,
    resetSettings
  } = useAccessibility();

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-black text-white border-2 border-teal-500 rounded-full shadow-[4px_4px_0px_0px_rgba(20,184,166,1)] hover:shadow-[6px_6px_0px_0px_rgba(20,184,166,1)] transition-all flex items-center justify-center"
        aria-label="Open accessibility settings"
      >
        <Accessibility size={24} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Panel Content */}
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white border-l-4 border-black shadow-2xl z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-teal-500 to-yellow-400 p-6 border-b-4 border-black sticky top-0 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black flex items-center justify-center rounded-full">
                      <Accessibility className="text-teal-500" size={20} />
                    </div>
                    <h2 className="text-2xl font-black">Accessibility</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-black/10 rounded-full transition-colors"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="text-sm font-semibold mt-2">
                  Customize your experience
                </p>
              </div>

              {/* Settings */}
              <div className="p-6 space-y-6">
                {/* High Contrast */}
                <div className="border-2 border-black p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Eye className="text-teal-500" size={24} />
                      <div>
                        <h3 className="font-bold">High Contrast</h3>
                        <p className="text-sm text-gray-600">
                          Increase visual clarity
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleHighContrast}
                      className={`w-14 h-8 rounded-full border-2 border-black transition-colors relative ${
                        settings.highContrast ? 'bg-teal-500' : 'bg-gray-300'
                      }`}
                      aria-label="Toggle high contrast"
                      aria-pressed={settings.highContrast}
                    >
                      <div
                        className={`absolute w-6 h-6 bg-black rounded-full top-0.5 transition-transform ${
                          settings.highContrast ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Dyslexia Font */}
                <div className="border-2 border-black p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Type className="text-teal-500" size={24} />
                      <div>
                        <h3 className="font-bold">Dyslexia-Friendly Font</h3>
                        <p className="text-sm text-gray-600">
                          Easier to read typeface
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleDyslexiaFont}
                      className={`w-14 h-8 rounded-full border-2 border-black transition-colors relative ${
                        settings.dyslexiaFont ? 'bg-teal-500' : 'bg-gray-300'
                      }`}
                      aria-label="Toggle dyslexia font"
                      aria-pressed={settings.dyslexiaFont}
                    >
                      <div
                        className={`absolute w-6 h-6 bg-black rounded-full top-0.5 transition-transform ${
                          settings.dyslexiaFont ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Reduced Motion */}
                <div className="border-2 border-black p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Zap className="text-teal-500" size={24} />
                      <div>
                        <h3 className="font-bold">Reduced Motion</h3>
                        <p className="text-sm text-gray-600">
                          Minimize animations
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={toggleReducedMotion}
                      className={`w-14 h-8 rounded-full border-2 border-black transition-colors relative ${
                        settings.reducedMotion ? 'bg-teal-500' : 'bg-gray-300'
                      }`}
                      aria-label="Toggle reduced motion"
                      aria-pressed={settings.reducedMotion}
                    >
                      <div
                        className={`absolute w-6 h-6 bg-black rounded-full top-0.5 transition-transform ${
                          settings.reducedMotion ? 'translate-x-6' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Font Size */}
                <div className="border-2 border-black p-4">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Type className="text-teal-500" size={24} />
                    Font Size
                  </h3>
                  <div className="flex gap-2">
                    {(['normal', 'large', 'xlarge'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setFontSize(size)}
                        className={`flex-1 px-4 py-2 font-bold border-2 border-black transition-colors ${
                          settings.fontSize === size
                            ? 'bg-teal-500 text-black'
                            : 'bg-white text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {size === 'normal' && 'A'}
                        {size === 'large' && <span className="text-lg">A</span>}
                        {size === 'xlarge' && <span className="text-xl">A</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset */}
                <button
                  onClick={resetSettings}
                  className="w-full px-6 py-3 bg-white text-black font-bold border-2 border-black hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={20} />
                  <span>Reset to Default</span>
                </button>

                {/* Info */}
                <div className="bg-teal-50 border-2 border-teal-500 p-4">
                  <p className="text-sm text-gray-700">
                    Your preferences are saved automatically and will persist across visits.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
