/**
 * Base44 Client Portal Integration
 * Handles portal access, metrics updates, and client data sync
 */

// CONFIGURATION - Update with your Base44 credentials
const BASE44_PORTAL_URL = 'https://bfclientportal.base44.app'; // e.g., https://yourcompany.base44.io
const BASE44_API_KEY = '44caa8f87d0b47d5934ddd5d03903946'; // Your Base44 API key
const BASE44_WORKSPACE_ID = 'YOUR_WORKSPACE_ID'; // Your Base44 workspace ID

/**
 * Initialize Base44 integration on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeBase44PortalLinks();
    initializeMetricsTracking();
    checkClientSession();
});

/**
 * Initialize portal access links
 */
function initializeBase44PortalLinks() {
    // Add portal access button to header/footer if client is logged in
    const portalLinks = document.querySelectorAll('[data-base44-portal]');
    
    portalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            openBase44Portal();
        });
    });
    
    // Add portal link to contact forms (after submission)
    const forms = document.querySelectorAll('form[data-crm-form]');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            // After successful submission, show portal access option
            setTimeout(() => {
                showPortalAccessOption(form);
            }, 2000);
        });
    });
}

/**
 * Open Base44 portal
 */
function openBase44Portal() {
    // Check if client email is stored in session/localStorage
    const clientEmail = getClientEmail();
    
    if (clientEmail) {
        // Generate portal access link with client email
        const portalUrl = generatePortalUrl(clientEmail);
        window.open(portalUrl, '_blank');
        
        // Track portal access
        trackMetric('portal_access', {
            client_email: clientEmail,
            timestamp: new Date().toISOString(),
            page: window.location.pathname
        });
    } else {
        // Redirect to login/access page
        window.location.href = '/portal-access.html';
    }
}

/**
 * Generate Base44 portal URL with client authentication
 */
function generatePortalUrl(clientEmail) {
    // Option 1: Direct portal URL (if Base44 handles auth)
    if (BASE44_PORTAL_URL && BASE44_PORTAL_URL !== 'YOUR_BASE44_PORTAL_URL') {
        return `${BASE44_PORTAL_URL}?email=${encodeURIComponent(clientEmail)}`;
    }
    
    // Option 2: Use Base44 API to generate access token
    return generatePortalAccessToken(clientEmail);
}

/**
 * Generate portal access token via Base44 API
 */
async function generatePortalAccessToken(clientEmail) {
    try {
        const response = await fetch(`${BASE44_PORTAL_URL}/api/auth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BASE44_API_KEY}`
            },
            body: JSON.stringify({
                email: clientEmail,
                workspace_id: BASE44_WORKSPACE_ID
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            return `${BASE44_PORTAL_URL}/portal?token=${data.token}`;
        }
    } catch (error) {
        console.error('Base44 token generation error:', error);
    }
    
    // Fallback: direct portal URL
    return BASE44_PORTAL_URL;
}

/**
 * Update metrics in Base44
 */
async function updateBase44Metrics(metricName, metricData) {
    if (!BASE44_API_KEY || BASE44_API_KEY === 'YOUR_BASE44_API_KEY') {
        console.log('Base44 metrics update skipped (not configured):', metricName, metricData);
        return;
    }
    
    try {
        const response = await fetch(`${BASE44_PORTAL_URL}/api/metrics`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${BASE44_API_KEY}`
            },
            body: JSON.stringify({
                workspace_id: BASE44_WORKSPACE_ID,
                metric_name: metricName,
                metric_data: {
                    ...metricData,
                    timestamp: new Date().toISOString(),
                    source: 'website'
                }
            })
        });
        
        if (response.ok) {
            console.log('Base44 metrics updated:', metricName);
        } else {
            console.error('Base44 metrics update failed:', response.status);
        }
    } catch (error) {
        console.error('Base44 metrics update error:', error);
    }
}

/**
 * Initialize metrics tracking for Base44
 */
function initializeMetricsTracking() {
    // Track form submissions
    document.addEventListener('formSubmitted', function(e) {
        updateBase44Metrics('form_submission', {
            form_type: e.detail.formType,
            client_email: e.detail.email,
            page: e.detail.page
        });
    });
    
    // Track page views
    updateBase44Metrics('page_view', {
        page: window.location.pathname,
        referrer: document.referrer
    });
    
    // Track CTA clicks
    document.addEventListener('ctaClick', function(e) {
        updateBase44Metrics('cta_click', {
            button_text: e.detail.buttonText,
            page: e.detail.page
        });
    });
    
    // Track phone/email clicks
    document.addEventListener('contactClick', function(e) {
        updateBase44Metrics('contact_click', {
            contact_type: e.detail.type,
            page: e.detail.page
        });
    });
}

/**
 * Check if client has active session
 */
function checkClientSession() {
    const clientEmail = getClientEmail();
    
    if (clientEmail) {
        // Show portal access button
        showPortalAccessButton();
        
        // Load client-specific content if needed
        loadClientContent(clientEmail);
    }
}

/**
 * Get client email from session/localStorage
 */
function getClientEmail() {
    // Check localStorage first
    const storedEmail = localStorage.getItem('client_email');
    if (storedEmail) {
        return storedEmail;
    }
    
    // Check sessionStorage
    const sessionEmail = sessionStorage.getItem('client_email');
    if (sessionEmail) {
        return sessionEmail;
    }
    
    // Check URL parameters (for portal access links)
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam) {
        localStorage.setItem('client_email', emailParam);
        return emailParam;
    }
    
    return null;
}

/**
 * Store client email after form submission
 */
function storeClientEmail(email) {
    localStorage.setItem('client_email', email);
    sessionStorage.setItem('client_email', email);
}

/**
 * Show portal access button
 */
function showPortalAccessButton() {
    // Check if button already exists
    if (document.querySelector('[data-base44-portal-button]')) {
        return;
    }
    
    // Create portal access button
    const portalButton = document.createElement('a');
    portalButton.href = '#';
    portalButton.className = 'portal-access-button';
    portalButton.setAttribute('data-base44-portal', 'true');
    portalButton.textContent = 'Client Portal';
    portalButton.style.cssText = `
        display: inline-block;
        padding: 10px 20px;
        background: #d4af37;
        color: #0a0a0a;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        margin-left: 20px;
    `;
    
    // Add to navigation or footer
    const nav = document.querySelector('.nav-menu');
    if (nav) {
        const li = document.createElement('li');
        li.appendChild(portalButton);
        nav.appendChild(li);
    } else {
        // Add to footer if nav not found
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.insertBefore(portalButton, footer.firstChild);
        }
    }
}

/**
 * Show portal access option after form submission
 */
function showPortalAccessOption(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    
    if (email) {
        storeClientEmail(email);
        
        const successMessage = form.querySelector('.form-success');
        if (successMessage) {
            const portalLink = document.createElement('div');
            portalLink.className = 'portal-access-link';
            portalLink.innerHTML = `
                <p style="margin-top: 15px;">
                    <a href="#" data-base44-portal="true" style="color: #d4af37; text-decoration: underline;">
                        Access your client portal →
                    </a>
                </p>
            `;
            successMessage.appendChild(portalLink);
        }
    }
}

/**
 * Load client-specific content from Base44
 */
async function loadClientContent(clientEmail) {
    if (!BASE44_API_KEY || BASE44_API_KEY === 'YOUR_BASE44_API_KEY') {
        return;
    }
    
    try {
        const response = await fetch(`${BASE44_PORTAL_URL}/api/client/content`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${BASE44_API_KEY}`,
                'X-Client-Email': clientEmail
            }
        });
        
        if (response.ok) {
            const content = await response.json();
            
            // Update page with client-specific content
            if (content.project_status) {
                updateProjectStatus(content.project_status);
            }
            
            if (content.documents) {
                showClientDocuments(content.documents);
            }
        }
    } catch (error) {
        console.error('Base44 content load error:', error);
    }
}

/**
 * Update project status display
 */
function updateProjectStatus(status) {
    const statusElement = document.querySelector('[data-project-status]');
    if (statusElement) {
        statusElement.textContent = status;
    }
}

/**
 * Show client documents
 */
function showClientDocuments(documents) {
    const documentsContainer = document.querySelector('[data-client-documents]');
    if (documentsContainer && documents.length > 0) {
        documentsContainer.innerHTML = '<h3>Your Documents</h3>';
        documents.forEach(doc => {
            const link = document.createElement('a');
            link.href = doc.url;
            link.textContent = doc.name;
            link.target = '_blank';
            documentsContainer.appendChild(link);
        });
    }
}

/**
 * Track metric (wrapper function)
 */
function trackMetric(metricName, metricData) {
    // Update Base44 metrics
    updateBase44Metrics(metricName, metricData);
    
    // Also track in analytics
    if (typeof trackEvent !== 'undefined') {
        trackEvent(metricName, metricData);
    }
}

// Make functions globally available
window.openBase44Portal = openBase44Portal;
window.trackMetric = trackMetric;


