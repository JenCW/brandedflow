"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  UserCheck, 
  FileText, 
  ClipboardCheck, 
  Shield, 
  Key,
  X,
  ArrowRight
} from "lucide-react";

interface ProcessStep {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  role: string;
  responsibilities: string[];
  timeline: string;
  borrowerAction: string;
  color: string;
}

const processSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Application",
    icon: User,
    role: "Borrower",
    responsibilities: [
      "Complete loan application",
      "Provide initial documentation",
      "Share financial information",
      "Discuss loan goals and needs"
    ],
    timeline: "Day 1",
    borrowerAction: "Fill out application and gather basic documents (pay stubs, bank statements)",
    color: "from-primary/20 to-primary/5"
  },
  {
    id: 2,
    title: "Review & Guidance",
    icon: UserCheck,
    role: "Loan Officer",
    responsibilities: [
      "Review application completeness",
      "Analyze credit and financial profile",
      "Recommend best loan programs",
      "Answer questions and provide guidance",
      "Pre-approve qualified borrowers"
    ],
    timeline: "Days 1-3",
    borrowerAction: "Respond to questions, provide additional info if needed",
    color: "from-blue-500/20 to-blue-500/5"
  },
  {
    id: 3,
    title: "Disclosures",
    icon: FileText,
    role: "Compliance Team",
    responsibilities: [
      "Prepare initial loan estimate",
      "Send required disclosures",
      "Ensure regulatory compliance",
      "Prepare final closing disclosure",
      "Verify all fees and terms"
    ],
    timeline: "Days 3-7",
    borrowerAction: "Review and sign disclosures, ask questions about fees and terms",
    color: "from-purple-500/20 to-purple-500/5"
  },
  {
    id: 4,
    title: "Processing",
    icon: ClipboardCheck,
    role: "Loan Processor",
    responsibilities: [
      "Collect and verify all documents",
      "Order appraisal and title work",
      "Verify employment and income",
      "Coordinate with third parties",
      "Prepare file for underwriting"
    ],
    timeline: "Days 7-21",
    borrowerAction: "Submit requested documents promptly (W-2s, tax returns, bank statements, etc.)",
    color: "from-green-500/20 to-green-500/5"
  },
  {
    id: 5,
    title: "Underwriting",
    icon: Shield,
    role: "Underwriter",
    responsibilities: [
      "Assess credit risk",
      "Verify all documentation",
      "Ensure loan meets guidelines",
      "Approve or conditionally approve",
      "Clear any conditions"
    ],
    timeline: "Days 21-30",
    borrowerAction: "Provide any additional documentation requested, respond to conditions",
    color: "from-amber-500/20 to-amber-500/5"
  },
  {
    id: 6,
    title: "Funding",
    icon: Key,
    role: "Funding & Closing",
    responsibilities: [
      "Schedule closing appointment",
      "Prepare closing documents",
      "Coordinate with title company",
      "Disburse funds",
      "Record the mortgage"
    ],
    timeline: "Days 30-45",
    borrowerAction: "Attend closing, sign documents, bring ID and certified funds if required",
    color: "from-emerald-500/20 to-emerald-500/5"
  }
];

export default function LoanProcessFlow() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section className="relative bg-zinc-950 py-24 overflow-hidden" data-testid="section-loan-process">
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary font-semibold mb-4 tracking-widest uppercase text-lg">
            The Process
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase tracking-wide">
            How Your Loan Moves Forward
          </h2>
          <p className="text-zinc-300 text-lg max-w-3xl mx-auto">
            Transparency from start to finish. Here's exactly what happens at each step and who's responsible for making it happen.
          </p>
        </div>

        {/* Desktop Flowchart */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Lines */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2 z-0 px-10">
              <div className="relative h-full flex">
                {processSteps.slice(0, -1).map((_, index) => (
                  <motion.div
                    key={`line-${index}`}
                    className="flex-1 h-full bg-gradient-to-r from-primary/40 via-primary/30 to-primary/40"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ transformOrigin: 'left' }}
                  />
                ))}
              </div>
            </div>

            {/* Step Nodes */}
            <div className="relative flex justify-between items-center">
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                const isHovered = hoveredStep === step.id;
                const isSelected = selectedStep === step.id;

                return (
                  <div key={step.id} className="relative z-10 flex-1 flex flex-col items-center">
                    <motion.button
                      onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                      onMouseEnter={() => setHoveredStep(step.id)}
                      onMouseLeave={() => setHoveredStep(null)}
                      className="relative group"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Glow effect on hover */}
                      {isHovered && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/30 blur-xl"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1.2, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                        />
                      )}

                      {/* Node Circle */}
                      <div className={`
                        relative w-20 h-20 rounded-full bg-gradient-to-br ${step.color}
                        border-2 ${isHovered || isSelected ? 'border-primary' : 'border-zinc-700'}
                        flex items-center justify-center
                        transition-all duration-300
                        ${isHovered || isSelected ? 'shadow-lg shadow-primary/50' : ''}
                      `}>
                        <Icon className={`w-10 h-10 ${isHovered || isSelected ? 'text-primary' : 'text-zinc-400'} transition-colors`} />
                        
                        {/* Step Number Badge */}
                        <div className={`
                          absolute -top-2 -right-2 w-8 h-8 rounded-full
                          ${isHovered || isSelected ? 'bg-primary' : 'bg-zinc-700'}
                          flex items-center justify-center text-white font-bold text-sm
                          transition-colors
                        `}>
                          {step.id}
                        </div>
                      </div>

                      {/* Step Title */}
                      <motion.div
                        className="mt-4 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                      >
                        <h3 className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                          isHovered || isSelected ? 'text-primary' : 'text-white'
                        }`}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-zinc-500 mt-1">{step.role}</p>
                      </motion.div>
                    </motion.button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Vertical Stack */}
        <div className="lg:hidden space-y-6">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isSelected = selectedStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <button
                  onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                  className="w-full text-left"
                >
                  <div className={`
                    relative p-6 rounded-xl border-2 transition-all
                    ${isSelected 
                      ? 'bg-gradient-to-br from-primary/20 to-primary/5 border-primary' 
                      : 'bg-zinc-900/50 border-zinc-700 hover:border-zinc-600'
                    }
                  `}>
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-16 h-16 rounded-full bg-gradient-to-br ${step.color}
                        border-2 ${isSelected ? 'border-primary' : 'border-zinc-700'}
                        flex items-center justify-center flex-shrink-0
                      `}>
                        <Icon className={`w-8 h-8 ${isSelected ? 'text-primary' : 'text-zinc-400'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`
                            w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                            ${isSelected ? 'bg-primary text-white' : 'bg-zinc-700 text-zinc-400'}
                          `}>
                            {step.id}
                          </span>
                          <h3 className={`font-bold uppercase tracking-wide ${
                            isSelected ? 'text-primary' : 'text-white'
                          }`}>
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-sm text-zinc-400">{step.role}</p>
                      </div>
                      <ArrowRight className={`w-5 h-5 transition-transform ${
                        isSelected ? 'text-primary rotate-90' : 'text-zinc-500'
                      }`} />
                    </div>
                  </div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 p-6 bg-zinc-900/50 border border-zinc-700 rounded-xl">
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-primary font-semibold mb-2 uppercase text-sm">Timeline</h4>
                            <p className="text-zinc-300">{step.timeline}</p>
                          </div>
                          <div>
                            <h4 className="text-primary font-semibold mb-2 uppercase text-sm">Responsibilities</h4>
                            <ul className="space-y-2">
                              {step.responsibilities.map((resp, idx) => (
                                <li key={idx} className="text-zinc-300 text-sm flex items-start gap-2">
                                  <span className="text-primary mt-1">•</span>
                                  <span>{resp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-primary font-semibold mb-2 uppercase text-sm">What You Need to Do</h4>
                            <p className="text-zinc-300 text-sm">{step.borrowerAction}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Desktop Popup Details */}
        <AnimatePresence>
          {selectedStep && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
              onClick={() => setSelectedStep(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-2xl bg-zinc-900 border-2 border-primary rounded-2xl p-8 shadow-2xl"
              >
                <button
                  onClick={() => setSelectedStep(null)}
                  className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>

                {(() => {
                  const step = processSteps.find(s => s.id === selectedStep);
                  if (!step) return null;
                  const Icon = step.icon;

                  return (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} border-2 border-primary flex items-center justify-center`}>
                          <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                              {step.id}
                            </span>
                            <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-zinc-400">{step.role}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-primary font-semibold mb-3 uppercase text-sm">Timeline</h4>
                          <p className="text-zinc-300">{step.timeline}</p>
                        </div>
                        <div>
                          <h4 className="text-primary font-semibold mb-3 uppercase text-sm">What You Need to Do</h4>
                          <p className="text-zinc-300 text-sm">{step.borrowerAction}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-primary font-semibold mb-3 uppercase text-sm">Responsibilities</h4>
                        <ul className="space-y-2">
                          {step.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-zinc-300 flex items-start gap-3">
                              <span className="text-primary mt-1 flex-shrink-0">•</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

