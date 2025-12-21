/**
 * Process Mortgage Lead
 * Handles new mortgage leads from Airtable and sends notifications
 */

const nodemailer = require('nodemailer');

module.exports = {
  description: 'Process new mortgage lead from Airtable and send notification',
  
  params: {
    lead_name: {
      type: 'string',
      required: true,
      description: 'Lead full name'
    },
    lead_phone: {
      type: 'string',
      required: true,
      description: 'Lead phone number'
    },
    lead_email: {
      type: 'string',
      required: true,
      description: 'Lead email address'
    },
    lead_city: {
      type: 'string',
      required: true,
      description: 'Lead city location'
    },
    lead_situation: {
      type: 'string',
      required: true,
      description: 'Lead situation/notes'
    },
    notification_email: {
      type: 'string',
      required: false,
      description: 'Email to notify (defaults to env var)'
    }
  },

  async execute(params, { PROJECT_ROOT }) {
    const { 
      lead_name, 
      lead_phone, 
      lead_email, 
      lead_city, 
      lead_situation,
      notification_email 
    } = params;

    // Validate required fields
    if (!lead_name || !lead_phone || !lead_email || !lead_city || !lead_situation) {
      throw new Error('Missing required lead fields');
    }

    const recipientEmail = notification_email || process.env.NOTIFICATION_EMAIL;
    
    if (!recipientEmail) {
      throw new Error('No notification email configured (set NOTIFICATION_EMAIL in .env or pass notification_email param)');
    }

    // Create email message
    const subject = `🔥 New CA Mortgage Lead - ${lead_name}`;
    const message = `New CA mortgage lead

Name: ${lead_name}
Phone: ${lead_phone}
City: ${lead_city}

Situation:
${lead_situation}

Call ASAP.`;

    // Send notification based on configured method
    const notificationMethod = process.env.NOTIFICATION_METHOD || 'email';

    if (notificationMethod === 'email') {
      await sendEmail(recipientEmail, subject, message);
    } else {
      throw new Error(`Unsupported notification method: ${notificationMethod}`);
    }

    return {
      success: true,
      lead: {
        name: lead_name,
        phone: lead_phone,
        email: lead_email,
        city: lead_city
      },
      notification_sent: true,
      notification_method: notificationMethod,
      recipient: recipientEmail,
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Send email notification
 */
async function sendEmail(to, subject, message) {
  // Use environment variables for email configuration
  const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  };

  if (!emailConfig.auth.user || !emailConfig.auth.pass) {
    throw new Error('SMTP credentials not configured (set SMTP_USER and SMTP_PASS in .env)');
  }

  const transporter = nodemailer.createTransport(emailConfig);

  const mailOptions = {
    from: emailConfig.auth.user,
    to,
    subject,
    text: message
  };

  await transporter.sendMail(mailOptions);
  
  console.log(`✅ Email sent to ${to}`);
}

