import { Resend } from 'resend';

// Initialize Resend client
const getResendClient = () => {
  const apiKey = import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured - emails will not be sent');
    return null;
  }

  return new Resend(apiKey);
};

export interface EmailOptions {
  to: string | string[];
  from?: string;
  subject: string;
  html: string;
  replyTo?: string;
  cc?: string | string[];
  bcc?: string | string[];
}

/**
 * Send an email via Resend
 * Gracefully handles missing API key (logs but doesn't throw)
 */
export async function sendEmail(options: EmailOptions): Promise<{
  success: boolean;
  messageId?: string;
  error?: string;
}> {
  const resend = getResendClient();

  if (!resend) {
    console.log('[Email] Skipping email send (Resend not configured):', {
      to: options.to,
      subject: options.subject
    });
    return {
      success: false,
      error: 'Email service not configured'
    };
  }

  try {
    const defaultFrom = import.meta.env.FROM_EMAIL || 'hello@brandedandflow.com';

    const { data, error } = await resend.emails.send({
      from: options.from || defaultFrom,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo,
      cc: options.cc,
      bcc: options.bcc,
    });

    if (error) {
      console.error('[Email] Send failed:', error);
      return {
        success: false,
        error: error.message || 'Unknown error'
      };
    }

    console.log('[Email] Sent successfully:', {
      messageId: data?.id,
      to: options.to,
      subject: options.subject
    });

    return {
      success: true,
      messageId: data?.id
    };
  } catch (error) {
    console.error('[Email] Unexpected error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unexpected error'
    };
  }
}

/**
 * Send contact form confirmation to user
 */
export async function sendContactConfirmation(data: {
  name: string;
  email: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thanks for reaching out</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #000; max-width: 600px; margin: 0 auto; padding: 20px;">

      <!-- Header with brand -->
      <div style="border-bottom: 4px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-size: 32px; margin: 0; font-weight: 900;">branded<span style="color: #14b8a6; font-style: italic;">+FLOW</span></h1>
        <p style="margin: 10px 0 0; color: #666;">brand + automate + nurture</p>
      </div>

      <!-- Message -->
      <div style="background: #f9fafb; border-left: 4px solid #14b8a6; padding: 20px; margin-bottom: 30px;">
        <h2 style="margin: 0 0 15px; font-size: 24px; font-weight: 700;">Thanks for reaching out, ${data.name}!</h2>
        <p style="margin: 0; color: #374151; font-size: 16px;">
          We received your message and will respond within 24 hours with next steps.
        </p>
      </div>

      <!-- What's next section -->
      <div style="margin-bottom: 30px;">
        <h3 style="font-size: 18px; margin-bottom: 15px; font-weight: 700;">What happens next:</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 10px; color: #374151;">Response within 24 hours (usually much faster)</li>
          <li style="margin-bottom: 10px; color: #374151;">Professional consultation, not a sales pitch</li>
          <li style="margin-bottom: 10px; color: #374151;">Honest assessment of fit and scope</li>
          <li style="margin-bottom: 10px; color: #374151;">Clear next steps with no obligation</li>
        </ul>
      </div>

      <!-- Your message recap -->
      <div style="background: #fef3c7; border: 2px solid #000; padding: 15px; margin-bottom: 30px;">
        <h4 style="margin: 0 0 10px; font-size: 14px; text-transform: uppercase; font-weight: 700;">Your message:</h4>
        <p style="margin: 0; color: #374151; white-space: pre-wrap;">${data.message}</p>
      </div>

      <!-- CTA -->
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://brandedandflow.com/services" style="display: inline-block; background: #14b8a6; color: #000; padding: 14px 28px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 2px solid #000;">
          View Our Services
        </a>
      </div>

      <!-- Footer -->
      <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 40px; text-align: center; color: #6b7280; font-size: 14px;">
        <p style="margin: 0 0 10px;">
          <strong>branded+flow</strong><br>
          18952 MacArthur Blvd, Suite 113<br>
          Irvine, CA 92612
        </p>
        <p style="margin: 10px 0;">
          <a href="mailto:jen@brandedandflow.com" style="color: #14b8a6; text-decoration: none;">jen@brandedandflow.com</a> ·
          <a href="tel:+17147884500" style="color: #14b8a6; text-decoration: none;">(714) 788-4500</a>
        </p>
        <p style="margin: 15px 0 0; font-size: 12px;">
          <a href="https://brandedandflow.com" style="color: #14b8a6; text-decoration: none;">Website</a> ·
          <a href="https://www.instagram.com/brandedandflow" style="color: #14b8a6; text-decoration: none;">Instagram</a> ·
          <a href="https://www.linkedin.com/company/brandedandflow" style="color: #14b8a6; text-decoration: none;">LinkedIn</a>
        </p>
      </div>

    </body>
    </html>
  `;

  return sendEmail({
    to: data.email,
    subject: "We received your message - here's what happens next",
    html,
    replyTo: 'jen@brandedandflow.com'
  });
}

/**
 * Send staff notification about new contact form submission
 */
export async function sendStaffNotification(data: {
  name: string;
  email: string;
  company?: string;
  message: string;
  submittedAt: string;
}): Promise<{ success: boolean; error?: string }> {
  const staffEmail = import.meta.env.STAFF_EMAIL || 'jen@brandedandflow.com';

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #000; max-width: 600px; margin: 0 auto; padding: 20px;">

      <!-- Alert Header -->
      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 30px;">
        <h1 style="margin: 0 0 10px; font-size: 24px; font-weight: 900;">🔔 New Contact Form Submission</h1>
        <p style="margin: 0; color: #92400e; font-size: 14px;">Submitted at ${data.submittedAt}</p>
      </div>

      <!-- Contact Details -->
      <div style="background: #f9fafb; border: 2px solid #000; padding: 20px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 15px; font-size: 18px; font-weight: 700; border-bottom: 2px solid #14b8a6; padding-bottom: 10px;">Contact Information</h2>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 700; width: 120px;">Name:</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #14b8a6; text-decoration: none;">${data.email}</a></td>
          </tr>
          ${data.company ? `
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Company:</td>
            <td style="padding: 8px 0;">${data.company}</td>
          </tr>
          ` : ''}
        </table>
      </div>

      <!-- Message -->
      <div style="background: #fff; border: 2px solid #000; padding: 20px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px; font-size: 16px; font-weight: 700;">Message:</h3>
        <p style="margin: 0; color: #374151; white-space: pre-wrap; line-height: 1.8;">${data.message}</p>
      </div>

      <!-- Quick Actions -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="mailto:${data.email}" style="display: inline-block; background: #14b8a6; color: #000; padding: 12px 24px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 2px solid #000; margin-right: 10px;">
          Reply Now
        </a>
        <a href="https://calendly.com/brandedandflow" style="display: inline-block; background: #fff; color: #000; padding: 12px 24px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 2px solid #000;">
          Schedule Call
        </a>
      </div>

      <!-- Footer -->
      <div style="border-top: 2px solid #e5e7eb; padding-top: 20px; margin-top: 40px; text-align: center; color: #6b7280; font-size: 12px;">
        <p style="margin: 0;">This notification was sent to ${staffEmail} from brandedandflow.com</p>
      </div>

    </body>
    </html>
  `;

  return sendEmail({
    to: staffEmail,
    subject: `New Contact: ${data.name}${data.company ? ` (${data.company})` : ''}`,
    html,
    replyTo: data.email
  });
}
