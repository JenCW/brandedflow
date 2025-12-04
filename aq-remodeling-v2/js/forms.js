/**
 * Form Handling & CRM Integration
 * Submits forms to Airtable/n8n webhook for CRM integration
 * Also integrates with Base44 for client portal access
 */

// CONFIGURATION - Update with your webhook URL
const WEBHOOK_URL = 'YOUR_WEBHOOK_URL_HERE'; // Replace with your n8n or Airtable webhook URL
const AIRTABLE_BASE_ID = 'YOUR_AIRTABLE_BASE_ID'; // Optional: if using Airtable directly
const AIRTABLE_API_KEY = 'YOUR_AIRTABLE_API_KEY'; // Optional: if using Airtable directly
const BASE44_ENABLED = true; // Set to true if using Base44 integration

/**
 * Initialize all forms on page load
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    initializePhoneTracking();
    initializeEmailTracking();
});

/**
 * Initialize all contact forms
 */
function initializeForms() {
    const forms = document.querySelectorAll('form[data-crm-form]');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
        
        // Add real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    });
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Disable submit button
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Collect form data
    const formData = collectFormData(form);
    
    // Validate form
    if (!validateForm(form)) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        return;
    }
    
    try {
        // Submit to CRM
        const response = await submitToCRM(formData, form);
        
        if (response.success) {
            // Track conversion event
            trackConversion('form_submission', {
                form_type: form.dataset.formType || 'contact',
                page: window.location.pathname
            });
            
            // Trigger form submitted event for Base44/metrics
            const formSubmittedEvent = new CustomEvent('formSubmitted', {
                detail: {
                    formType: form.dataset.formType || 'contact',
                    email: formData.email,
                    page: window.location.pathname
                }
            });
            document.dispatchEvent(formSubmittedEvent);
            
            // Store client email for Base44 portal access
            if (formData.email && BASE44_ENABLED) {
                if (typeof storeClientEmail !== 'undefined') {
                    storeClientEmail(formData.email);
                }
            }
            
            // Show success message
            showFormSuccess(form);
            
            // Reset form
            form.reset();
            
            // Optional: Redirect to thank you page
            // window.location.href = '/thank-you.html';
            
        } else {
            throw new Error(response.error || 'Submission failed');
        }
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormError(form, 'Sorry, there was an error submitting your form. Please try again or call us directly.');
        
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

/**
 * Collect form data into structured object
 */
function collectFormData(form) {
    const formData = {
        timestamp: new Date().toISOString(),
        source: window.location.href,
        page: window.location.pathname,
        referrer: document.referrer || 'direct'
    };
    
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        if (input.name && input.value.trim()) {
            formData[input.name] = input.value.trim();
        }
    });
    
    // Add UTM parameters if present
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.forEach((value, key) => {
        if (key.startsWith('utm_')) {
            formData[key] = value;
        }
    });
    
    return formData;
}

/**
 * Submit to CRM (n8n webhook or Airtable)
 */
async function submitToCRM(data, form) {
    // Option 1: Submit to n8n webhook (recommended)
    if (WEBHOOK_URL && WEBHOOK_URL !== 'YOUR_WEBHOOK_URL_HERE') {
        return await submitToWebhook(data);
    }
    
    // Option 2: Submit directly to Airtable
    if (AIRTABLE_BASE_ID && AIRTABLE_API_KEY) {
        return await submitToAirtable(data, form);
    }
    
    // Fallback: Log to console (for testing)
    console.log('Form data (not submitted - configure webhook):', data);
    return { success: true, message: 'Form data logged (webhook not configured)' };
}

/**
 * Submit to n8n webhook
 */
async function submitToWebhook(data) {
    const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    
    if (!response.ok) {
        throw new Error(`Webhook error: ${response.status}`);
    }
    
    return { success: true };
}

/**
 * Submit directly to Airtable
 */
async function submitToAirtable(data, form) {
    const tableName = form.dataset.airtableTable || 'Leads';
    
    const airtableData = {
        fields: {
            'Name': data.name || '',
            'Email': data.email || '',
            'Phone': data.phone || '',
            'Message': data.message || '',
            'Project Type': data.project_type || '',
            'Source': data.source || '',
            'Date': data.timestamp || new Date().toISOString()
        }
    };
    
    const response = await fetch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${tableName}`,
        {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(airtableData)
        }
    );
    
    if (!response.ok) {
        throw new Error(`Airtable error: ${response.status}`);
    }
    
    return { success: true };
}

/**
 * Validate form
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Validate email format
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        if (!isValidEmail(emailField.value)) {
            showFieldError(emailField, 'Please enter a valid email address');
            isValid = false;
        }
    }
    
    // Validate phone format (optional)
    const phoneField = form.querySelector('input[type="tel"]');
    if (phoneField && phoneField.value) {
        if (!isValidPhone(phoneField.value)) {
            showFieldError(phoneField, 'Please enter a valid phone number');
            isValid = false;
        }
    }
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    if (field.type === 'email' && value && !isValidEmail(value)) {
        showFieldError(field, 'Please enter a valid email address');
        return false;
    }
    
    clearFieldError({ target: field });
    return true;
}

/**
 * Clear field error
 */
function clearFieldError(e) {
    const field = e.target;
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.classList.remove('error');
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    field.parentElement.appendChild(errorElement);
}

/**
 * Show form success message
 */
function showFormSuccess(form) {
    const successMessage = form.querySelector('.form-success') || createSuccessMessage(form);
    successMessage.style.display = 'block';
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Hide after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 5000);
}

/**
 * Show form error message
 */
function showFormError(form, message) {
    const errorMessage = form.querySelector('.form-error') || createErrorMessage(form);
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Create success message element
 */
function createSuccessMessage(form) {
    const message = document.createElement('div');
    message.className = 'form-success';
    message.innerHTML = '<strong>Thank you!</strong> We\'ve received your message and will get back to you within 24 hours.';
    form.insertBefore(message, form.firstChild);
    return message;
}

/**
 * Create error message element
 */
function createErrorMessage(form) {
    const message = document.createElement('div');
    message.className = 'form-error';
    form.insertBefore(message, form.firstChild);
    return message;
}

/**
 * Initialize phone number click tracking
 */
function initializePhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackConversion('phone_click', {
                phone: this.href.replace('tel:', ''),
                page: window.location.pathname
            });
        });
    });
}

/**
 * Initialize email click tracking
 */
function initializeEmailTracking() {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function() {
            trackConversion('email_click', {
                email: this.href.replace('mailto:', ''),
                page: window.location.pathname
            });
        });
    });
}

/**
 * Track conversion event (for analytics)
 */
function trackConversion(eventName, eventData) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Custom analytics (if needed)
    if (typeof customAnalytics !== 'undefined') {
        customAnalytics.track(eventName, eventData);
    }
    
    console.log('Conversion tracked:', eventName, eventData);
}

/**
 * Email validation
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Phone validation (basic)
 */
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

