import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

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
    
    // In production, this would send to your email service
    // For now, we'll just log it and return success
    console.log("Contact form submission:", data);
    
    // TODO: Add email service integration (e.g., SendGrid, Mailgun)
    // Example:
    // await sendEmail({
    //   to: "jen@brandedandflow.com",
    //   subject: `New contact from ${data.name}`,
    //   body: `Name: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'N/A'}\n\nMessage:\n${data.message}`,
    // });
    
    return c.json({ 
      success: true,
      message: "Thank you for your message. We'll respond within 24 hours."
    });
  }
);

export default app;
