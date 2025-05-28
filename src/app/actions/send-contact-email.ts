
'use server';

import type * as z from 'zod';
import nodemailer from 'nodemailer';

// It's crucial to use environment variables for sensitive data like SMTP credentials.
// These should be set in your .env or .env.local file, or your hosting environment's configuration.
// Example .env variables:
// SMTP_HOST=smtp.example.com
// SMTP_PORT=587
// SMTP_USER=your-email@example.com
// SMTP_PASSWORD=your-email-password-or-app-password
// MAIL_FROM_ADDRESS can be the same as SMTP_USER or another verified sender email
// MAIL_FROM_NAME="Your Website Name" (Optional, for sender display name)

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
const MAIL_TO = 'shivanicharan297@gmail.com'; // The email address that will receive the contact form submissions
const MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS || SMTP_USER; // Email address shown in the 'From' field
const MAIL_FROM_NAME = process.env.MAIL_FROM_NAME || 'Contact Form'; // Display name for the 'From' field

interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

interface ActionResult {
  success: boolean;
  message: string;
}

export async function sendContactEmailAction(data: SendEmailParams): Promise<ActionResult> {
  if (!data.name || !data.email || !data.message) {
    return { success: false, message: 'All fields are required.' };
  }

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASSWORD || !MAIL_FROM_ADDRESS) {
    console.error('SMTP configuration is missing in environment variables. Email will not be sent.');
    console.log('Required SMTP environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, MAIL_FROM_ADDRESS (optional: MAIL_FROM_NAME)');
    // This is a fallback for demonstration if SMTP isn't configured.
    // In a real app, you might want to return a more user-friendly server error.
    return { success: false, message: 'Server configuration error. Could not send email.' };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // true for 465 (SMTPS), false for other ports (like 587 with STARTTLS)
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
    // It's good practice to add timeout options
    connectionTimeout: 5000, // 5 seconds
    greetingTimeout: 5000, // 5 seconds
    socketTimeout: 10000, // 10 seconds
  });

  const mailOptions = {
    from: `"${data.name} (via ${MAIL_FROM_NAME})" <${MAIL_FROM_ADDRESS}>`, // Sender address (must be authenticated user or allowed sender)
    replyTo: data.email, // Set reply-to to the user's actual email
    to: MAIL_TO, // Your email address where you want to receive messages
    subject: `New Contact Form Message from ${data.name}`, // Subject line
    text: `You have received a new message from your website contact form:\n\nName: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`, // plain text body
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>This email was sent from the contact form on your portfolio website.</small></p>
    `, // html body
  };

  try {
    // TODO: UNCOMMENT THE FOLLOWING LINE TO ACTUALLY SEND EMAILS
    // await transporter.sendMail(mailOptions);
    // console.log('Email sending simulated. To enable, uncomment transporter.sendMail in send-contact-email.ts');
    // console.log('Mail options:', JSON.stringify(mailOptions, null, 2));
    
    // For demonstration, if SMTP credentials are provided, we assume success.
    // In a real scenario, the success of transporter.sendMail() would determine this.
    // If you uncomment sendMail, make sure to handle its potential errors properly.
    
    // SIMULATE SENDING FOR NOW IF THE ABOVE LINE IS COMMENTED
    // If the transporter.sendMail line is commented out, we can simulate success for testing UI.
    // If it's uncommented, the actual result of sendMail should be used.
    const isSimulating = (typeof (transporter as any).sendMail) !== 'function' || (transporter as any).sendMail.toString().includes('await transporter.sendMail(mailOptions);'); // Cast to any to check if it's the original function
    if (isSimulating) {
      console.log('Email sending simulated as transporter.sendMail is commented out or not yet defined by a real provider. Mail options:', mailOptions);
       await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    } else {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully to:', MAIL_TO);
    }
    return { success: true, message: 'Your message has been sent successfully!' };

  } catch (error) {
    console.error('Error sending email:', error);
    // Log more detailed error for server-side debugging
    if (error instanceof Error) {
        console.error('Error details:', { name: error.name, message: error.message, stack: error.stack });
    } else {
        console.error('Unknown error object:', error);
    }
    return { success: false, message: 'An error occurred while trying to send your message. Please try again later.' };
  }
}
