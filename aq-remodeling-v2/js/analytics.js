/**
 * Analytics & Conversion Tracking
 * Google Analytics 4 and custom event tracking
 */

// CONFIGURATION - Update with your GA4 Measurement ID
const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with your Google Analytics 4 Measurement ID

/**
 * Initialize analytics on page load
 */
(function() {
    // Load Google Analytics 4
    if (GA4_MEASUREMENT_ID && GA4_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
        loadGoogleAnalytics();
    }
    
    // Track page view
    trackPageView();
    
    // Initialize event tracking
    initializeEventTracking();
    
    // Track scroll depth
    trackScrollDepth();
    
    // Track time on page
    trackTimeOnPage();
})();

/**
 * Load Google Analytics 4
 */
function loadGoogleAnalytics() {
    // Load gtag.js
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script1);
    
    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', GA4_MEASUREMENT_ID, {
        'page_path': window.location.pathname,
        'page_title': document.title,
        'page_location': window.location.href
    });
    
    // Make gtag globally available
    window.gtag = gtag;
}

/**
 * Track page view
 */
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            'page_path': window.location.pathname,
            'page_title': document.title,
            'page_location': window.location.href
        });
    }
}

/**
 * Initialize event tracking for buttons and links
 */
function initializeEventTracking() {
    // Track CTA button clicks
    const ctaButtons = document.querySelectorAll('.cta-button, [data-track="cta"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('cta_click', {
                'button_text': this.textContent.trim(),
                'button_location': this.closest('section')?.className || 'unknown',
                'page': window.location.pathname
            });
        });
    });
    
    // Track portfolio image clicks
    const portfolioImages = document.querySelectorAll('[data-portfolio-image]');
    portfolioImages.forEach(image => {
        image.addEventListener('click', function() {
            trackEvent('portfolio_view', {
                'image_alt': this.alt || 'unknown',
                'page': window.location.pathname
            });
        });
    });
    
    // Track FAQ toggles
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isOpen = item.classList.contains('active');
                trackEvent('faq_toggle', {
                    'question': this.textContent.trim(),
                    'action': isOpen ? 'close' : 'open',
                    'page': window.location.pathname
                });
            });
        }
    });
    
    // Track outbound links
    const outboundLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.hostname + '"])');
    outboundLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('outbound_link', {
                'link_url': this.href,
                'link_text': this.textContent.trim(),
                'page': window.location.pathname
            });
        });
    });
}

/**
 * Track scroll depth
 */
function trackScrollDepth() {
    let scrollDepthTracked = {
        25: false,
        50: false,
        75: false,
        100: false
    };
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        // Track 25% increments
        [25, 50, 75, 100].forEach(threshold => {
            if (scrollPercent >= threshold && !scrollDepthTracked[threshold]) {
                scrollDepthTracked[threshold] = true;
                trackEvent('scroll_depth', {
                    'scroll_percent': threshold,
                    'page': window.location.pathname
                });
            }
        });
    }, { passive: true });
}

/**
 * Track time on page
 */
function trackTimeOnPage() {
    const startTime = Date.now();
    
    // Track every 30 seconds
    setInterval(function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        
        if (timeOnPage === 30 || timeOnPage === 60 || timeOnPage === 120) {
            trackEvent('time_on_page', {
                'seconds': timeOnPage,
                'page': window.location.pathname
            });
        }
    }, 1000);
    
    // Track on page unload
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        trackEvent('page_exit', {
            'time_on_page': timeOnPage,
            'page': window.location.pathname
        });
    });
}

/**
 * Track custom event
 */
function trackEvent(eventName, eventData) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Console log for debugging
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('Event tracked:', eventName, eventData);
    }
}

/**
 * Track conversion (for form submissions, etc.)
 */
function trackConversion(conversionName, conversionData) {
    trackEvent(conversionName, {
        ...conversionData,
        'event_category': 'conversion',
        'value': 1
    });
    
    // Mark as conversion in GA4
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': GA4_MEASUREMENT_ID,
            'event_category': 'conversion',
            'event_label': conversionName,
            'value': 1
        });
    }
}

// Make functions globally available
window.trackEvent = trackEvent;
window.trackConversion = trackConversion;

