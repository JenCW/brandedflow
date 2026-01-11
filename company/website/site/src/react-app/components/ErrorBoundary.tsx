import { Component, ReactNode, ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary component to catch React errors
 * Displays fallback UI and logs errors to Sentry
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to Sentry (will be configured with Sentry.init in main.tsx)
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);

    // If Sentry is initialized, it will automatically capture this
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        contexts: {
          react: {
            componentStack: errorInfo.componentStack
          }
        }
      });
    }
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-white flex items-center justify-center px-6">
          <div className="max-w-2xl w-full">
            {/* Error Card */}
            <div className="border-4 border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-start mb-6">
                <AlertTriangle
                  className="text-yellow-400 flex-shrink-0 mr-4"
                  size={48}
                  strokeWidth={2}
                />
                <div>
                  <h1 className="text-4xl font-black mb-2">
                    Something went wrong
                  </h1>
                  <p className="text-lg text-gray-700">
                    We've been notified and are looking into it.
                  </p>
                </div>
              </div>

              {/* Error details (only in development) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-black text-white p-4 mb-6 font-mono text-sm overflow-auto">
                  <div className="mb-2 font-bold text-yellow-400">
                    Error Details:
                  </div>
                  <div>{this.state.error.toString()}</div>
                  {this.state.error.stack && (
                    <pre className="mt-2 text-xs opacity-75">
                      {this.state.error.stack}
                    </pre>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-teal-500 text-black font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-black hover:text-teal-500 transition-colors"
                >
                  Reload Page
                </button>
                <button
                  onClick={() => (window.location.href = '/')}
                  className="px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-yellow-400 transition-colors"
                >
                  Go Home
                </button>
                <a
                  href="/contact"
                  className="px-6 py-3 bg-white text-black font-bold text-sm uppercase tracking-wider border-2 border-black hover:bg-yellow-400 transition-colors inline-block"
                >
                  Contact Support
                </a>
              </div>
            </div>

            {/* Additional help */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                If this problem persists, please{' '}
                <a
                  href="mailto:jen@brandedandflow.com"
                  className="text-teal-500 font-semibold hover:underline"
                >
                  contact us directly
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// TypeScript declaration for Sentry on window
declare global {
  interface Window {
    Sentry?: {
      captureException: (error: Error, context?: Record<string, unknown>) => void;
      captureMessage: (message: string, level?: string) => void;
    };
  }
}
