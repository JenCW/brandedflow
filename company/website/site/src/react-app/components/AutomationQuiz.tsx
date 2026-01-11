import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { trackQuizComplete, trackCTAClick } from '@/react-app/lib/analytics';

interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

const questions: Question[] = [
  {
    id: 'lead-capture',
    question: 'How do you currently capture leads from your website?',
    options: [
      { text: 'We don\'t have a website or forms', score: 0 },
      { text: 'Basic contact form that emails us', score: 1 },
      { text: 'Forms connected to email marketing', score: 2 },
      { text: 'Full CRM integration with auto-tagging', score: 3 }
    ]
  },
  {
    id: 'follow-up',
    question: 'How do you follow up with new leads?',
    options: [
      { text: 'Manually, when we remember', score: 0 },
      { text: 'We try to email within 24 hours', score: 1 },
      { text: 'Automated welcome email, then manual', score: 2 },
      { text: 'Full automated nurture sequences', score: 3 }
    ]
  },
  {
    id: 'phone-calls',
    question: 'What happens when someone calls outside business hours?',
    options: [
      { text: 'Goes to voicemail, we check later', score: 0 },
      { text: 'Voicemail with callback promise', score: 1 },
      { text: 'Voicemail + automated text response', score: 2 },
      { text: 'AI answers, qualifies, books appointments', score: 3 }
    ]
  },
  {
    id: 'client-onboarding',
    question: 'How do you onboard new clients?',
    options: [
      { text: 'Manually send docs and instructions', score: 0 },
      { text: 'Email template with attachments', score: 1 },
      { text: 'Automated welcome sequence', score: 2 },
      { text: 'Full portal with automated workflows', score: 3 }
    ]
  },
  {
    id: 'task-tracking',
    question: 'How do you track tasks and deadlines?',
    options: [
      { text: 'Sticky notes and memory', score: 0 },
      { text: 'Spreadsheet or to-do app', score: 1 },
      { text: 'Project management tool', score: 2 },
      { text: 'Automated task creation and reminders', score: 3 }
    ]
  },
  {
    id: 'marketing',
    question: 'How often do you send marketing emails?',
    options: [
      { text: 'Never or very rarely', score: 0 },
      { text: 'Occasionally, when we have time', score: 1 },
      { text: 'Monthly newsletter', score: 2 },
      { text: 'Automated sequences + campaigns', score: 3 }
    ]
  },
  {
    id: 'reporting',
    question: 'How do you track business metrics?',
    options: [
      { text: 'We don\'t really track much', score: 0 },
      { text: 'Check bank account and invoices', score: 1 },
      { text: 'Spreadsheet we update monthly', score: 2 },
      { text: 'Live dashboards with automated reports', score: 3 }
    ]
  }
];

export default function AutomationQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      const totalScore = newAnswers.reduce((a, b) => a + b, 0);
      trackQuizComplete('automation_maturity', totalScore);
    }
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const maxScore = questions.length * 3;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getLevel = () => {
    if (percentage < 25) return { level: 'Beginner', color: 'text-red-500', icon: AlertCircle };
    if (percentage < 50) return { level: 'Getting Started', color: 'text-yellow-500', icon: TrendingUp };
    if (percentage < 75) return { level: 'Intermediate', color: 'text-teal-500', icon: CheckCircle };
    return { level: 'Advanced', color: 'text-green-500', icon: CheckCircle };
  };

  const getRecommendation = () => {
    if (percentage < 25) {
      return {
        title: 'You\'re losing leads and time every day',
        description: 'Your manual processes are costing you opportunities and sanity. Start with basic automation: lead capture, automated follow-ups, and calendar booking.',
        nextSteps: [
          'Set up proper lead capture forms',
          'Implement automated email responses',
          'Add online booking to your calendar',
          'Connect everything to a simple CRM'
        ],
        cta: 'Our Quick Start packages ($1,200-$1,500) are perfect for you'
      };
    }
    if (percentage < 50) {
      return {
        title: 'You have the basics, but you\'re leaving money on the table',
        description: 'You\'ve started automating, but there are gaps costing you leads and time. Let\'s fill those gaps and optimize what you have.',
        nextSteps: [
          'Add AI phone answering for missed calls',
          'Build automated nurture sequences',
          'Set up abandoned lead recovery',
          'Create client onboarding automation'
        ],
        cta: 'Our Website + Lead System ($3,500-$5,000) fits your needs'
      };
    }
    if (percentage < 75) {
      return {
        title: 'You\'re doing well, but we can optimize further',
        description: 'You have solid automation in place. Now it\'s time to optimize conversion rates, add advanced workflows, and scale what\'s working.',
        nextSteps: [
          'A/B test your funnels for better conversion',
          'Add advanced lead scoring',
          'Implement predictive analytics',
          'Build custom automation for unique processes'
        ],
        cta: 'Our Complete Business System ($7,500-$10,000) will maximize your ROI'
      };
    }
    return {
      title: 'You\'re ahead of the game!',
      description: 'Your automation is strong. We can help you scale, optimize for even better ROI, and tackle complex custom workflows.',
      nextSteps: [
        'Advanced conversion optimization',
        'Custom workflow automation',
        'Integration of new tools and platforms',
        'Training your team on best practices'
      ],
      cta: 'Let\'s discuss custom solutions for your specific needs'
    };
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const levelInfo = getLevel();
  const LevelIcon = levelInfo.icon;
  const recommendation = getRecommendation();

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-yellow-400 p-6 border-b-4 border-black">
        <h2 className="text-3xl font-black mb-2">Automation Maturity Quiz</h2>
        <p className="text-sm font-semibold">
          Discover where you stand and what to automate next
        </p>
      </div>

      {!showResults ? (
        <div className="p-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-3 bg-gray-200 border-2 border-black">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
                className="h-full bg-teal-500"
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-6">
                {questions[currentQuestion].question}
              </h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full text-left p-4 border-2 border-black hover:bg-teal-50 hover:border-teal-500 transition-all group"
                  >
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-black text-white flex items-center justify-center font-bold mr-3 group-hover:bg-teal-500 group-hover:text-black transition-colors">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="text-gray-700 group-hover:text-black">
                        {option.text}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8"
        >
          {/* Score */}
          <div className="text-center mb-8">
            <LevelIcon className={`${levelInfo.color} mx-auto mb-4`} size={64} strokeWidth={2} />
            <h3 className="text-4xl font-black mb-2">
              Your Automation Maturity: <span className={levelInfo.color}>{levelInfo.level}</span>
            </h3>
            <p className="text-2xl text-gray-700">
              Score: {totalScore} / {maxScore} ({percentage}%)
            </p>
          </div>

          {/* Recommendation */}
          <div className="bg-gradient-to-br from-teal-50 to-yellow-50 border-4 border-black p-6 mb-6">
            <h4 className="text-2xl font-bold mb-3">{recommendation.title}</h4>
            <p className="text-gray-700 mb-4">{recommendation.description}</p>

            <h5 className="font-bold mb-2">Recommended next steps:</h5>
            <ul className="space-y-2 mb-4">
              {recommendation.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="text-teal-500 mr-2 flex-shrink-0 mt-0.5" size={18} />
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ul>

            <div className="bg-black text-white p-4 text-center">
              <p className="font-bold">{recommendation.cta}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/services"
              onClick={() => trackCTAClick('View Services from Quiz', 'Automation Quiz Results')}
              className="flex-1 px-6 py-4 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-black hover:text-teal-500 transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <span>View Our Services</span>
              <ArrowRight size={20} />
            </a>
            <a
              href="/contact"
              onClick={() => trackCTAClick('Book Consultation from Quiz', 'Automation Quiz Results')}
              className="flex-1 px-6 py-4 bg-yellow-400 text-black font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-black hover:text-yellow-400 transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <span>Book Free Consultation</span>
              <ArrowRight size={20} />
            </a>
          </div>

          {/* Retake */}
          <div className="text-center mt-6">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers([]);
                setShowResults(false);
              }}
              className="text-teal-500 hover:text-black font-semibold transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
