// Nodemailer service for SMTP-based email sending
import nodemailer from 'nodemailer';
import { EmailData } from './emailService';

export interface SMTPConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

export interface EmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: any[];
}

export class NodemailerService {
  private transporter!: nodemailer.Transporter;
  private defaultFrom: string;

  constructor() {
    this.defaultFrom = process.env.REACT_APP_SENDER_EMAIL || 'contact@aaplamahesh.org';
    this.initializeTransporter();
  }

  /**
   * Initialize the email transporter based on environment configuration
   */
  private initializeTransporter() {
    const emailService = process.env.REACT_APP_EMAIL_SERVICE || 'gmail';
    
    let transportConfig: any;

    switch (emailService.toLowerCase()) {
      case 'gmail':
        transportConfig = {
          service: 'gmail',
          auth: {
            user: process.env.REACT_APP_GMAIL_USER || '',
            pass: process.env.REACT_APP_GMAIL_APP_PASSWORD || '' // Use App Password, not regular password
          }
        };
        break;

      case 'brevo':
      case 'sendinblue':
        transportConfig = {
          host: 'smtp-relay.sendinblue.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.REACT_APP_BREVO_SMTP_USER || '',
            pass: process.env.REACT_APP_BREVO_SMTP_PASSWORD || ''
          }
        };
        break;

      case 'outlook':
      case 'hotmail':
        transportConfig = {
          service: 'hotmail',
          auth: {
            user: process.env.REACT_APP_OUTLOOK_USER || '',
            pass: process.env.REACT_APP_OUTLOOK_PASSWORD || ''
          }
        };
        break;

      case 'custom':
        transportConfig = {
          host: process.env.REACT_APP_SMTP_HOST || '',
          port: parseInt(process.env.REACT_APP_SMTP_PORT || '587'),
          secure: process.env.REACT_APP_SMTP_SECURE === 'true',
          auth: {
            user: process.env.REACT_APP_SMTP_USER || '',
            pass: process.env.REACT_APP_SMTP_PASSWORD || ''
          }
        };
        break;

      default:
        console.warn('No email service configured, using default Gmail configuration');
        transportConfig = {
          service: 'gmail',
          auth: {
            user: '',
            pass: ''
          }
        };
    }

    this.transporter = nodemailer.createTransport(transportConfig);
  }

  /**
   * Send an email using the configured transporter
   */
  async sendEmail(options: EmailOptions): Promise<{ success: boolean; message: string; messageId?: string }> {
    try {
      const mailOptions = {
        from: options.from || this.defaultFrom,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
        attachments: options.attachments
      };

      const info = await this.transporter.sendMail(mailOptions);
      
      return {
        success: true,
        message: 'Email sent successfully!',
        messageId: info.messageId
      };
    } catch (error) {
      console.error('Error sending email via Nodemailer:', error);
      return {
        success: false,
        message: `Failed to send email: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Send a form submission email
   */
  async sendFormSubmissionEmail(emailData: EmailData): Promise<{ success: boolean; message: string; messageId?: string }> {
    try {
      const emailContent = this.generateEmailContent(emailData);
      
      const mailOptions: EmailOptions = {
        from: this.defaultFrom,
        to: process.env.REACT_APP_RECIPIENT_EMAIL || 'admin@aaplamahesh.org',
        subject: emailContent.subject,
        text: emailContent.text,
        html: emailContent.html
      };

      return await this.sendEmail(mailOptions);
    } catch (error) {
      console.error('Error sending form submission email:', error);
      return {
        success: false,
        message: 'Failed to send form submission email.'
      };
    }
  }

  /**
   * Send bulk emails to multiple recipients
   */
  async sendBulkEmails(recipients: string[], subject: string, htmlContent: string, textContent?: string): Promise<{ success: boolean; message: string; results: any[] }> {
    const results = [];
    let successCount = 0;

    for (const recipient of recipients) {
      try {
        const result = await this.sendEmail({
          from: this.defaultFrom,
          to: recipient,
          subject,
          html: htmlContent,
          text: textContent
        });

        results.push({ email: recipient, ...result });
        if (result.success) successCount++;
      } catch (error) {
        results.push({ 
          email: recipient, 
          success: false, 
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return {
      success: successCount > 0,
      message: `Sent ${successCount}/${recipients.length} emails successfully`,
      results
    };
  }

  /**
   * Send newsletter/campaign email
   */
  async sendNewsletter(
    recipients: string[], 
    subject: string, 
    content: { html: string; text?: string }
  ): Promise<{ success: boolean; message: string; results: any[] }> {
    const newsletterHtml = this.wrapInNewsletterTemplate(content.html, subject);
    const newsletterText = content.text || this.htmlToText(content.html);

    return await this.sendBulkEmails(recipients, subject, newsletterHtml, newsletterText);
  }

  /**
   * Send auto-reply email to form submitter
   */
  async sendAutoReply(emailData: EmailData): Promise<{ success: boolean; message: string; messageId?: string }> {
    try {
      const autoReplyContent = this.generateAutoReplyContent(emailData);
      
      const mailOptions: EmailOptions = {
        from: this.defaultFrom,
        to: emailData.email,
        subject: autoReplyContent.subject,
        text: autoReplyContent.text,
        html: autoReplyContent.html
      };

      return await this.sendEmail(mailOptions);
    } catch (error) {
      console.error('Error sending auto-reply email:', error);
      return {
        success: false,
        message: 'Failed to send auto-reply email.'
      };
    }
  }

  /**
   * Verify the email configuration
   */
  async verifyConnection(): Promise<{ success: boolean; message: string }> {
    try {
      await this.transporter.verify();
      return {
        success: true,
        message: 'Email configuration verified successfully!'
      };
    } catch (error) {
      console.error('Email configuration verification failed:', error);
      return {
        success: false,
        message: `Email configuration verification failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Send a test email
   */
  async sendTestEmail(testRecipient?: string): Promise<{ success: boolean; message: string; messageId?: string }> {
    const recipient = testRecipient || process.env.REACT_APP_TEST_EMAIL || 'test@aaplamahesh.org';
    
    const mailOptions: EmailOptions = {
      from: this.defaultFrom,
      to: recipient,
      subject: 'Nodemailer Test Email - Aapla Mahesh',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50;">Nodemailer Test Email</h2>
          <p>This is a test email to verify that the Nodemailer SMTP configuration is working correctly.</p>
          <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <p><strong>Test Details:</strong></p>
            <ul>
              <li>Service: ${process.env.REACT_APP_EMAIL_SERVICE || 'Gmail'}</li>
              <li>Sent at: ${new Date().toISOString()}</li>
              <li>From: ${this.defaultFrom}</li>
            </ul>
          </div>
          <p style="color: #7f8c8d; font-size: 12px;">If you received this email, your Nodemailer configuration is working correctly!</p>
        </div>
      `,
      text: `Nodemailer Test Email - This is a test email to verify that the SMTP configuration is working correctly. Sent at: ${new Date().toISOString()}`
    };

    return await this.sendEmail(mailOptions);
  }

  /**
   * Generate email content for form submissions
   */
  private generateEmailContent(emailData: EmailData): { subject: string; html: string; text: string } {
    // This uses the same logic as the Brevo service for consistency
    const { name, email, subject, message, formType, additionalData } = emailData;
    
    let emailSubject = '';
    let emailBody = '';
    
    switch (formType) {
      case 'issue':
        emailSubject = `🚨 New Issue Reported: ${subject}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #e74c3c;">New Issue Report from Aapla Mahesh Website</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Reporter:</strong> ${name} (${email})</p>
              <p><strong>Issue Title:</strong> ${subject}</p>
              <p><strong>Institute:</strong> ${additionalData?.instituteName || 'Not specified'}</p>
              <p><strong>Location:</strong> ${additionalData?.location || 'Not specified'}</p>
            </div>
            <div style="background: #ffffff; padding: 20px; border-left: 4px solid #e74c3c; margin: 20px 0;">
              <h3>Description:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">This email was sent from the Aapla Mahesh website contact form via Nodemailer.</p>
          </div>
        `;
        break;
        
      case 'join':
        emailSubject = `👥 New Team Application: ${name}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2ecc71;">New Team Application from Aapla Mahesh Website</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Applicant:</strong> ${name} (${email})</p>
              <p><strong>Position:</strong> ${additionalData?.position || 'Not specified'}</p>
              <p><strong>Skills:</strong> ${additionalData?.skills || 'Not specified'}</p>
              <p><strong>Experience:</strong> ${additionalData?.experience || 'Not specified'}</p>
            </div>
            <div style="background: #ffffff; padding: 20px; border-left: 4px solid #2ecc71; margin: 20px 0;">
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">This email was sent from the Aapla Mahesh website join form via Nodemailer.</p>
          </div>
        `;
        break;
        
      case 'volunteer':
        emailSubject = `🤝 New Volunteer Application: ${name}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3498db;">New Volunteer Application from Aapla Mahesh Website</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Volunteer:</strong> ${name} (${email})</p>
              <p><strong>University/College:</strong> ${additionalData?.university || 'Not specified'}</p>
              <p><strong>Available Time:</strong> ${additionalData?.availability || 'Not specified'}</p>
              <p><strong>Skills:</strong> ${additionalData?.skills || 'Not specified'}</p>
            </div>
            <div style="background: #ffffff; padding: 20px; border-left: 4px solid #3498db; margin: 20px 0;">
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">This email was sent from the Aapla Mahesh website volunteer form via Nodemailer.</p>
          </div>
        `;
        break;
        
      case 'contact':
        emailSubject = `📧 Contact Form: ${subject}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #9b59b6;">New Contact Form Submission from Aapla Mahesh Website</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name} (${email})</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #ffffff; padding: 20px; border-left: 4px solid #9b59b6; margin: 20px 0;">
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">This email was sent from the Aapla Mahesh website contact form via Nodemailer.</p>
          </div>
        `;
        break;
        
      default:
        emailSubject = `New Form Submission: ${subject}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Form Submission from Aapla Mahesh Website</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${name} (${email})</p>
              <p><strong>Subject:</strong> ${subject}</p>
            </div>
            <div style="background: #ffffff; padding: 20px; border-left: 4px solid #34495e; margin: 20px 0;">
              <h3>Message:</h3>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `;
    }

    const textVersion = this.htmlToText(emailBody);

    return {
      subject: emailSubject,
      html: emailBody,
      text: textVersion
    };
  }

  /**
   * Generate auto-reply content
   */
  private generateAutoReplyContent(emailData: EmailData): { subject: string; html: string; text: string } {
    const subject = `Thank you for contacting Aapla Mahesh - We've received your ${emailData.formType}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2c3e50;">Aapla Mahesh</h1>
          <p style="color: #7f8c8d;">Student Rights Movement</p>
        </div>
        
        <h2 style="color: #e74c3c;">Thank you for reaching out!</h2>
        
        <p>Dear ${emailData.name},</p>
        
        <p>We have successfully received your ${emailData.formType} submission and appreciate you taking the time to contact us.</p>
        
        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Submission Details:</h3>
          <p><strong>Type:</strong> ${emailData.formType.charAt(0).toUpperCase() + emailData.formType.slice(1)}</p>
          <p><strong>Subject:</strong> ${emailData.subject}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        </div>
        
        <p><strong>What happens next?</strong></p>
        <ul>
          <li>Our team will review your submission within 24-48 hours</li>
          <li>We will respond to your email address: ${emailData.email}</li>
          <li>For urgent matters, you can also reach us on our social media channels</li>
        </ul>
        
        <p>Thank you for being part of the Aapla Mahesh movement. Together, we're making a difference in student rights and education.</p>
        
        <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px;">
          <p style="color: #7f8c8d; font-size: 12px;">
            This is an automated response. Please do not reply to this email.<br>
            For immediate assistance, contact us through our website or social media channels.
          </p>
        </div>
      </div>
    `;
    
    const text = `
Thank you for contacting Aapla Mahesh!

Dear ${emailData.name},

We have successfully received your ${emailData.formType} submission and appreciate you taking the time to contact us.

Your Submission Details:
- Type: ${emailData.formType.charAt(0).toUpperCase() + emailData.formType.slice(1)}
- Subject: ${emailData.subject}
- Submitted: ${new Date().toLocaleString()}

What happens next?
- Our team will review your submission within 24-48 hours
- We will respond to your email address: ${emailData.email}
- For urgent matters, you can also reach us on our social media channels

Thank you for being part of the Aapla Mahesh movement. Together, we're making a difference in student rights and education.

This is an automated response. Please do not reply to this email.
For immediate assistance, contact us through our website or social media channels.
    `;

    return { subject, html, text };
  }

  /**
   * Wrap content in newsletter template
   */
  private wrapInNewsletterTemplate(content: string, subject: string): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #2c3e50; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">Aapla Mahesh</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Student Rights Movement</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <h2 style="color: #2c3e50; margin-top: 0;">${subject}</h2>
          ${content}
        </div>
        
        <div style="background: #ecf0f1; padding: 20px; text-align: center; color: #7f8c8d; font-size: 12px;">
          <p>You received this email because you're subscribed to Aapla Mahesh updates.</p>
          <p>© ${new Date().getFullYear()} Aapla Mahesh. All rights reserved.</p>
        </div>
      </div>
    `;
  }

  /**
   * Convert HTML to plain text
   */
  private htmlToText(html: string): string {
    return html
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
  }
}

// Create a singleton instance
export const nodemailerService = new NodemailerService();
