/**
 * Analytics tracking wrapper
 * Supports Google Analytics 4 and custom event tracking
 */

// TypeScript declarations for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Track a page view
 */
export function trackPageView(path: string, title?: string) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title
    });
  }

  console.log('[Analytics] Page view:', { path, title });
}

/**
 * Track a custom event
 */
export function trackEvent(
  eventName: string,
  parameters?: Record<string, unknown>
) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, parameters);
  }

  console.log('[Analytics] Event:', eventName, parameters);
}

/**
 * Track form start (user begins filling out a form)
 */
export function trackFormStart(formName: string) {
  trackEvent('form_start', {
    form_name: formName,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track form submission
 */
export function trackFormSubmit(formName: string, success: boolean) {
  trackEvent(success ? 'form_submit_success' : 'form_submit_error', {
    form_name: formName,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track CTA button click
 */
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent('cta_click', {
    cta_name: ctaName,
    location: location,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track lead magnet download
 */
export function trackLeadMagnetDownload(magnetName: string, email: string) {
  trackEvent('lead_magnet_download', {
    magnet_name: magnetName,
    email_hash: hashEmail(email), // Hash for privacy
    timestamp: new Date().toISOString()
  });
}

/**
 * Track scroll depth
 */
export function trackScrollDepth(depth: number) {
  trackEvent('scroll_depth', {
    depth_percentage: depth,
    page_path: window.location.pathname
  });
}

/**
 * Track time on page
 */
export function trackTimeOnPage(seconds: number) {
  trackEvent('time_on_page', {
    seconds: seconds,
    page_path: window.location.pathname
  });
}

/**
 * Track video play
 */
export function trackVideoPlay(videoName: string) {
  trackEvent('video_play', {
    video_name: videoName,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track calculator usage
 */
export function trackCalculatorUse(calculatorType: string, result?: unknown) {
  trackEvent('calculator_use', {
    calculator_type: calculatorType,
    has_result: !!result,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track quiz completion
 */
export function trackQuizComplete(quizName: string, score?: number) {
  trackEvent('quiz_complete', {
    quiz_name: quizName,
    score: score,
    timestamp: new Date().toISOString()
  });
}

/**
 * Track exit intent
 */
export function trackExitIntent(action: 'shown' | 'dismissed' | 'converted') {
  trackEvent('exit_intent', {
    action: action,
    timestamp: new Date().toISOString()
  });
}

/**
 * Simple email hash for privacy (non-reversible)
 */
function hashEmail(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    const char = email.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash.toString(36);
}

/**
 * Initialize scroll tracking
 */
export function initScrollTracking() {
  const depths = [25, 50, 75, 100];
  const tracked = new Set<number>();

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const scrollPercent = Math.round(
      ((scrollTop + windowHeight) / documentHeight) * 100
    );

    for (const depth of depths) {
      if (scrollPercent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        trackScrollDepth(depth);
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}

/**
 * Initialize time on page tracking
 */
export function initTimeTracking() {
  const startTime = Date.now();

  const trackTime = () => {
    const seconds = Math.round((Date.now() - startTime) / 1000);
    trackTimeOnPage(seconds);
  };

  // Track at 30 seconds, 60 seconds, 2 minutes, 5 minutes
  const timeouts = [
    setTimeout(() => trackTime(), 30000),
    setTimeout(() => trackTime(), 60000),
    setTimeout(() => trackTime(), 120000),
    setTimeout(() => trackTime(), 300000)
  ];

  // Track on page unload
  const handleUnload = () => trackTime();
  window.addEventListener('beforeunload', handleUnload);

  return () => {
    timeouts.forEach(t => clearTimeout(t));
    window.removeEventListener('beforeunload', handleUnload);
  };
}

/**
 * Initialize all analytics tracking
 */
export function initAnalytics() {
  // Start scroll tracking
  const cleanupScroll = initScrollTracking();

  // Start time tracking
  const cleanupTime = initTimeTracking();

  // Return cleanup function
  return () => {
    cleanupScroll();
    cleanupTime();
  };
}
