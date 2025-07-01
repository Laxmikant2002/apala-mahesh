import Mailgun from 'mailgun.js';
import formData from 'form-data';

const mailgun = new Mailgun(formData);

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  formType: 'issue' | 'join' | 'volunteer' | 'contact';
  additionalData?: any;
}

export class EmailService {
  private mg: any;
  private domain: string;
  private apiKey: string;
  private recipientEmail: string;

  constructor() {
    this.domain = process.env.REACT_APP_MAILGUN_DOMAIN || '';
    this.apiKey = process.env.REACT_APP_MAILGUN_API_KEY || '';
    this.recipientEmail = process.env.REACT_APP_RECIPIENT_EMAIL || '';
    
    if (this.apiKey && this.domain) {
      this.mg = mailgun.client({
        username: 'api',
        key: this.apiKey
      });
    }
  }

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      if (!this.mg) {
        throw new Error('Mailgun not configured. Please check your environment variables.');
      }

      const emailContent = this.generateEmailContent(emailData);
      
      const messageData = {
        from: `Aapla Mahesh <noreply@${this.domain}>`,
        to: this.recipientEmail,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text
      };

      await this.mg.messages.create(this.domain, messageData);
      
      return {
        success: true,
        message: 'Email sent successfully!'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.'
      };
    }
  }

  private generateEmailContent(emailData: EmailData): { subject: string; html: string; text: string } {
    const { name, email, subject, message, formType, additionalData } = emailData;
    
    let emailSubject = '';
    let emailBody = '';
    
    switch (formType) {
      case 'issue':
        emailSubject = `🚨 New Issue Reported: ${subject}`;
        emailBody = `
          <h2>New Issue Report from Aapla Mahesh Website</h2>
          <p><strong>Reporter:</strong> ${name} (${email})</p>
          <p><strong>Issue Title:</strong> ${subject}</p>
          <p><strong>Institute:</strong> ${additionalData?.instituteName || 'Not specified'}</p>
          <p><strong>Location:</strong> ${additionalData?.location || 'Not specified'}</p>
          <p><strong>Description:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>This email was sent from the Aapla Mahesh website contact form.</small></p>
        `;
        break;
        
      case 'join':
        emailSubject = `👥 New Team Application: ${name}`;
        emailBody = `
          <h2>New Team Application from Aapla Mahesh Website</h2>
          <p><strong>Applicant:</strong> ${name} (${email})</p>
          <p><strong>Position:</strong> ${additionalData?.position || 'Not specified'}</p>
          <p><strong>Skills:</strong> ${additionalData?.skills || 'Not specified'}</p>
          <p><strong>Experience:</strong> ${additionalData?.experience || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>This email was sent from the Aapla Mahesh website join form.</small></p>
        `;
        break;
        
      case 'volunteer':
        emailSubject = `🤝 New Volunteer Application: ${name}`;
        emailBody = `
          <h2>New Volunteer Application from Aapla Mahesh Website</h2>
          <p><strong>Volunteer:</strong> ${name} (${email})</p>
          <p><strong>University/College:</strong> ${additionalData?.university || 'Not specified'}</p>
          <p><strong>Available Time:</strong> ${additionalData?.availability || 'Not specified'}</p>
          <p><strong>Skills:</strong> ${additionalData?.skills || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>This email was sent from the Aapla Mahesh website volunteer form.</small></p>
        `;
        break;
        
      case 'contact':
        emailSubject = `📧 Contact Form: ${subject}`;
        emailBody = `
          <h2>New Contact Form Submission from Aapla Mahesh Website</h2>
          <p><strong>Name:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>This email was sent from the Aapla Mahesh website contact form.</small></p>
        `;
        break;
        
      default:
        emailSubject = `New Form Submission: ${subject}`;
        emailBody = `
          <h2>New Form Submission from Aapla Mahesh Website</h2>
          <p><strong>Name:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        `;
    }

    const textVersion = emailBody.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');

    return {
      subject: emailSubject,
      html: emailBody,
      text: textVersion
    };
  }

  // Test email function
  async sendTestEmail(): Promise<{ success: boolean; message: string }> {
    const testData: EmailData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Email from Aapla Mahesh',
      message: 'This is a test email to verify that the email service is working correctly.',
      formType: 'contact'
    };

    return await this.sendEmail(testData);
  }
}

// Create a singleton instance
export const emailService = new EmailService();
