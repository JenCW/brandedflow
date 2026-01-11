import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { sendContactConfirmation, sendStaffNotification } from "./lib/email";

const app = new Hono<{ Bindings: Env }>();

// Contact form schema
const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

// Contact form endpoint
app.post(
  "/api/contact",
  zValidator("json", contactFormSchema),
  async (c) => {
    const data = c.req.valid("json");

    console.log("[Contact Form] Received submission:", {
      name: data.name,
      email: data.email,
      company: data.company || 'N/A'
    });

    // Send confirmation email to user
    const userEmailResult = await sendContactConfirmation({
      name: data.name,
      email: data.email,
      message: data.message
    });

    if (!userEmailResult.success) {
      console.warn("[Contact Form] Failed to send user confirmation:", userEmailResult.error);
    }

    // Send notification to staff
    const staffEmailResult = await sendStaffNotification({
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      submittedAt: new Date().toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    });

    if (!staffEmailResult.success) {
      console.warn("[Contact Form] Failed to send staff notification:", staffEmailResult.error);
    }

    // Track analytics event (will add analytics integration next)
    console.log("[Analytics] Contact form submission", {
      name: data.name,
      hasCompany: !!data.company,
      messageLength: data.message.length
    });

    return c.json({
      success: true,
      message: "Thank you for your message. We'll respond within 24 hours."
    });
  }
);

// Lead magnet schema
const leadMagnetSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  magnetName: z.string().min(1, "Magnet name is required"),
  source: z.string().optional(),
});

// Lead magnet download endpoint
app.post(
  "/api/lead-magnet",
  zValidator("json", leadMagnetSchema),
  async (c) => {
    const data = c.req.valid("json");

    console.log("[Lead Magnet] Download request:", {
      name: data.name,
      email: data.email,
      magnetName: data.magnetName,
      source: data.source
    });

    // Send lead magnet email to user
    const emailResult = await sendEmail({
      to: data.email,
      subject: `Your free guide: ${data.magnetName}`,
      html: generateLeadMagnetEmail(data.name, data.magnetName),
      replyTo: 'jen@brandedandflow.com'
    });

    if (!emailResult.success) {
      console.warn("[Lead Magnet] Failed to send email:", emailResult.error);
      return c.json({
        success: false,
        error: "Failed to send email. Please try again."
      }, 500);
    }

    // Notify staff about new lead magnet download
    await sendEmail({
      to: process.env.STAFF_EMAIL || 'jen@brandedandflow.com',
      subject: `New Lead Magnet Download: ${data.magnetName}`,
      html: generateStaffLeadMagnetNotification(data),
      replyTo: data.email
    });

    // Track analytics
    console.log("[Analytics] Lead magnet download", {
      magnetName: data.magnetName,
      source: data.source
    });

    return c.json({
      success: true,
      message: "Check your email for the download link!"
    });
  }
);

// Helper function to generate lead magnet email
function generateLeadMagnetEmail(name: string, magnetName: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Free Guide</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #000; max-width: 600px; margin: 0 auto; padding: 20px;">

      <!-- Header -->
      <div style="border-bottom: 4px solid #000; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="font-size: 32px; margin: 0; font-weight: 900;">branded<span style="color: #14b8a6; font-style: italic;">+FLOW</span></h1>
      </div>

      <!-- Message -->
      <div style="margin-bottom: 30px;">
        <h2 style="font-size: 28px; margin-bottom: 15px; font-weight: 700;">Hey ${name}! Here's your guide 👇</h2>
        <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
          Thanks for downloading <strong>${magnetName}</strong>. This guide will help you understand exactly which automations to implement first.
        </p>
      </div>

      <!-- Download Button -->
      <div style="text-align: center; margin: 40px 0;">
        <a href="https://brandedandflow.com/downloads/${magnetName.toLowerCase().replace(/\s+/g, '-')}.pdf" style="display: inline-block; background: #14b8a6; color: #000; padding: 16px 32px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 2px solid #000; font-size: 16px;">
          Download Your Free Guide
        </a>
      </div>

      <!-- What's Next -->
      <div style="background: #f9fafb; border-left: 4px solid #14b8a6; padding: 20px; margin: 30px 0;">
        <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 700;">What happens next:</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li style="margin-bottom: 10px;">Over the next 2 weeks, you'll get 5 emails with automation tips</li>
          <li style="margin-bottom: 10px;">Each email includes real examples and implementation guides</li>
          <li style="margin-bottom: 10px;">Reply anytime with questions - I read every email</li>
        </ul>
      </div>

      <!-- CTA -->
      <div style="border: 2px solid #000; background: #fff; padding: 20px; text-align: center; margin: 30px 0;">
        <h3 style="font-size: 20px; margin: 0 0 10px; font-weight: 700;">Want help implementing this?</h3>
        <p style="color: #374151; margin: 0 0 20px;">We can build these automation systems for you.</p>
        <a href="https://brandedandflow.com/services" style="display: inline-block; background: #000; color: #14b8a6; padding: 12px 24px; text-decoration: none; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border: 2px solid #000; font-size: 14px;">
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
          <a href="https://brandedandflow.com/unsubscribe" style="color: #9ca3af; text-decoration: none;">Unsubscribe</a>
        </p>
      </div>

    </body>
    </html>
  `;
}

// Helper function to generate staff notification
function generateStaffLeadMagnetNotification(data: { name: string; email: string; magnetName: string; source?: string }): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Lead Magnet Download</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #000; max-width: 600px; margin: 0 auto; padding: 20px;">

      <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 20px;">
        <h1 style="margin: 0 0 10px; font-size: 24px; font-weight: 900;">📥 New Lead Magnet Download</h1>
        <p style="margin: 0; color: #92400e; font-size: 14px;">${new Date().toLocaleString()}</p>
      </div>

      <div style="background: #f9fafb; border: 2px solid #000; padding: 20px; margin-bottom: 20px;">
        <table style="width: 100%;">
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Lead Magnet:</td>
            <td style="padding: 8px 0;">${data.magnetName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Name:</td>
            <td style="padding: 8px 0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Email:</td>
            <td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #14b8a6; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 700;">Source:</td>
            <td style="padding: 8px 0;">${data.source || 'Unknown'}</td>
          </tr>
        </table>
      </div>

      <div style="text-align: center;">
        <a href="mailto:${data.email}" style="display: inline-block; background: #14b8a6; color: #000; padding: 12px 24px; text-decoration: none; font-weight: 700; border: 2px solid #000; margin-right: 10px;">
          Email ${data.name}
        </a>
      </div>

    </body>
    </html>
  `;
}

export default app;
