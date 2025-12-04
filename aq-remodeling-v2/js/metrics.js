/**
 * Metrics Dashboard & Tracking System
 * Tracks all website metrics and provides dashboard data
 */

// Metrics storage (in production, this would be sent to database/API)
const metrics = {
    pageViews: 0,
    formSubmissions: 0,
    ctaClicks: 0,
    phoneClicks: 0,
    emailClicks: 0,
    portfolioViews: 0,
    faqOpens: 0,
    scrollDepth: {},
    timeOnPage: {},
    conversions: []
};

/**
 * Initialize metrics tracking
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeMetrics();
    loadMetricsDashboard();
});

/**
 * Initialize all metrics tracking
 */
function initializeMetrics() {
    // Track page view
    trackPageView();
    
    // Track user interactions
    trackUserInteractions();
    
    // Track conversions
    trackConversions();
    
    // Send metrics to Base44 periodically
    setInterval(sendMetricsToBase44, 60000); // Every minute
}

/**
 * Track page view
 */
function trackPageView() {
    metrics.pageViews++;
    
    const pageData = {
        page: window.location.pathname,
        referrer: document.referrer || 'direct',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenSize: `${window.screen.width}x${window.screen.height}`
    };
    
    // Store in localStorage for persistence
    storeMetric('page_view', pageData);
}

/**
 * Track user interactions
 */
function trackUserInteractions() {
    // CTA button clicks
    document.addEventListener('click', function(e) {
        if (e.target.matches('.cta-button, [data-track="cta"]')) {
            metrics.ctaClicks++;
            trackMetric('cta_click', {
                button_text: e.target.textContent.trim(),
                page: window.location.pathname
            });
        }
        
        // Phone clicks
        if (e.target.matches('a[href^="tel:"]')) {
            metrics.phoneClicks++;
            trackMetric('phone_click', {
                phone: e.target.href.replace('tel:', ''),
                page: window.location.pathname
            });
        }
        
        // Email clicks
        if (e.target.matches('a[href^="mailto:"]')) {
            metrics.emailClicks++;
            trackMetric('email_click', {
                email: e.target.href.replace('mailto:', ''),
                page: window.location.pathname
            });
        }
        
        // Portfolio image clicks
        if (e.target.matches('[data-portfolio-image]')) {
            metrics.portfolioViews++;
            trackMetric('portfolio_view', {
                image_alt: e.target.alt || 'unknown',
                page: window.location.pathname
            });
        }
        
        // FAQ opens
        if (e.target.matches('.faq-question')) {
            metrics.faqOpens++;
            trackMetric('faq_open', {
                question: e.target.textContent.trim(),
                page: window.location.pathname
            });
        }
    });
}

/**
 * Track conversions
 */
function trackConversions() {
    // Listen for form submissions
    document.addEventListener('formSubmitted', function(e) {
        metrics.formSubmissions++;
        
        const conversion = {
            type: 'form_submission',
            form_type: e.detail.formType || 'contact',
            client_email: e.detail.email,
            timestamp: new Date().toISOString(),
            page: e.detail.page || window.location.pathname,
            value: 1
        };
        
        metrics.conversions.push(conversion);
        storeMetric('conversion', conversion);
    });
}

/**
 * Track scroll depth
 */
function trackScrollDepth() {
    let depthsTracked = [];
    
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        [25, 50, 75, 100].forEach(depth => {
            if (scrollPercent >= depth && !depthsTracked.includes(depth)) {
                depthsTracked.push(depth);
                metrics.scrollDepth[depth] = (metrics.scrollDepth[depth] || 0) + 1;
                
                trackMetric('scroll_depth', {
                    depth: depth,
                    page: window.location.pathname
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
    
    // Track on page unload
    window.addEventListener('beforeunload', function() {
        const timeOnPage = Math.round((Date.now() - startTime) / 1000);
        
        const timeRange = getTimeRange(timeOnPage);
        metrics.timeOnPage[timeRange] = (metrics.timeOnPage[timeRange] || 0) + 1;
        
        trackMetric('time_on_page', {
            seconds: timeOnPage,
            range: timeRange,
            page: window.location.pathname
        });
    });
}

/**
 * Get time range category
 */
function getTimeRange(seconds) {
    if (seconds < 30) return '0-30s';
    if (seconds < 60) return '30-60s';
    if (seconds < 120) return '1-2min';
    if (seconds < 300) return '2-5min';
    return '5min+';
}

/**
 * Track metric
 */
function trackMetric(metricName, metricData) {
    const metric = {
        name: metricName,
        data: metricData,
        timestamp: new Date().toISOString()
    };
    
    // Store locally
    storeMetric(metricName, metricData);
    
    // Send to Base44 if available
    if (typeof updateBase44Metrics !== 'undefined') {
        updateBase44Metrics(metricName, metricData);
    }
    
    // Send to analytics
    if (typeof trackEvent !== 'undefined') {
        trackEvent(metricName, metricData);
    }
}

/**
 * Store metric in localStorage
 */
function storeMetric(metricName, metricData) {
    try {
        const stored = JSON.parse(localStorage.getItem('website_metrics') || '[]');
        stored.push({
            name: metricName,
            data: metricData,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 1000 metrics
        if (stored.length > 1000) {
            stored.splice(0, stored.length - 1000);
        }
        
        localStorage.setItem('website_metrics', JSON.stringify(stored));
    } catch (error) {
        console.error('Error storing metric:', error);
    }
}

/**
 * Get metrics summary
 */
function getMetricsSummary() {
    const stored = JSON.parse(localStorage.getItem('website_metrics') || '[]');
    
    // Calculate summary
    const summary = {
        total_page_views: metrics.pageViews,
        total_form_submissions: metrics.formSubmissions,
        total_cta_clicks: metrics.ctaClicks,
        total_phone_clicks: metrics.phoneClicks,
        total_email_clicks: metrics.emailClicks,
        total_portfolio_views: metrics.portfolioViews,
        total_faq_opens: metrics.faqOpens,
        conversion_rate: metrics.formSubmissions > 0 
            ? ((metrics.formSubmissions / metrics.pageViews) * 100).toFixed(2) + '%'
            : '0%',
        scroll_depth: metrics.scrollDepth,
        time_on_page: metrics.timeOnPage,
        recent_conversions: metrics.conversions.slice(-10)
    };
    
    return summary;
}

/**
 * Send metrics to Base44
 */
async function sendMetricsToBase44() {
    if (typeof updateBase44Metrics === 'undefined') {
        return;
    }
    
    const summary = getMetricsSummary();
    
    // Send summary to Base44
    updateBase44Metrics('website_summary', summary);
}

/**
 * Load metrics dashboard (if dashboard page exists)
 */
function loadMetricsDashboard() {
    // Check if we're on a metrics dashboard page
    if (document.querySelector('[data-metrics-dashboard]')) {
        displayMetricsDashboard();
    }
}

/**
 * Display metrics dashboard
 */
function displayMetricsDashboard() {
    const summary = getMetricsSummary();
    const dashboard = document.querySelector('[data-metrics-dashboard]');
    
    if (!dashboard) return;
    
    dashboard.innerHTML = `
        <div class="metrics-dashboard">
            <h2>Website Metrics</h2>
            
            <div class="metrics-grid">
                <div class="metric-card">
                    <h3>Page Views</h3>
                    <p class="metric-value">${summary.total_page_views}</p>
                </div>
                
                <div class="metric-card">
                    <h3>Form Submissions</h3>
                    <p class="metric-value">${summary.total_form_submissions}</p>
                </div>
                
                <div class="metric-card">
                    <h3>CTA Clicks</h3>
                    <p class="metric-value">${summary.total_cta_clicks}</p>
                </div>
                
                <div class="metric-card">
                    <h3>Conversion Rate</h3>
                    <p class="metric-value">${summary.conversion_rate}</p>
                </div>
                
                <div class="metric-card">
                    <h3>Phone Clicks</h3>
                    <p class="metric-value">${summary.total_phone_clicks}</p>
                </div>
                
                <div class="metric-card">
                    <h3>Email Clicks</h3>
                    <p class="metric-value">${summary.total_email_clicks}</p>
                </div>
            </div>
            
            <div class="recent-conversions">
                <h3>Recent Conversions</h3>
                <ul>
                    ${summary.recent_conversions.map(conv => `
                        <li>
                            <strong>${conv.type}</strong> - 
                            ${conv.client_email || 'N/A'} - 
                            ${new Date(conv.timestamp).toLocaleString()}
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
}

/**
 * Export metrics as JSON
 */
function exportMetrics() {
    const summary = getMetricsSummary();
    const dataStr = JSON.stringify(summary, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `metrics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

// Make functions globally available
window.getMetricsSummary = getMetricsSummary;
window.exportMetrics = exportMetrics;
window.trackMetric = trackMetric;

// Initialize scroll and time tracking
trackScrollDepth();
trackTimeOnPage();


