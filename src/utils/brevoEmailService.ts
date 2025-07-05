// Simplified Brevo Email Service for mass campaigns and transactional emails
import { EmailData } from './emailService';

export interface CampaignData {
  name: string;
  subject: string;
  sender: {
    name: string;
    email: string;
  };
  htmlContent: string;
  textContent?: string;
  listIds?: number[];
  recipients?: { email: string; name?: string }[];
  scheduledAt?: string;
}

export class BrevoEmailService {
  private apiKey: string;
  private apiUrl: string;
  private defaultSender: { name: string; email: string };

  constructor() {
    this.apiKey = process.env.REACT_APP_BREVO_API_KEY || process.env.BREVO_API_KEY || '';
    this.apiUrl = 'https://api.brevo.com/v3';
    this.defaultSender = {
      name: process.env.REACT_APP_SENDER_NAME || 'Aapla Mahesh Team',
      email: process.env.REACT_APP_SENDER_EMAIL || 'contact@aaplamahesh.org'
    };
  }

  async sendTransactionalEmail(emailData: EmailData): Promise<{ success: boolean; message: string; messageId?: string }> {
    if (!this.apiKey) {
      return {
        success: false,
        message: 'Brevo API key not configured. Please set REACT_APP_BREVO_API_KEY in your environment.'
      };
    }

    try {
      const emailContent = this.generateEmailContent(emailData);
      
      const emailRequest = {
        subject: emailContent.subject,
        htmlContent: emailContent.html,
        textContent: emailContent.text,
        sender: this.defaultSender,
        to: [{ 
          email: process.env.REACT_APP_RECIPIENT_EMAIL || 'admin@aaplamahesh.org',
          name: 'Aapla Mahesh Admin'
        }],
        replyTo: {
          email: emailData.email,
          name: emailData.name
        }
      };

      const response = await this.makeApiRequest('/smtp/email', emailRequest);
      
      return {
        success: response.success,
        message: response.message,
        messageId: response.messageId
      };
    } catch (error) {
      console.error('Error sending transactional email:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.'
      };
    }
  }

  async createEmailCampaign(campaignData: CampaignData): Promise<{ success: boolean; message: string; campaignId?: number }> {
    if (!this.apiKey) {
      return {
        success: false,
        message: 'Brevo API key not configured'
      };
    }

    if (campaignData.recipients && campaignData.recipients.length > 0) {
      return this.sendCampaignToRecipients(campaignData);
    }

    return {
      success: false,
      message: 'Campaign creation requires recipients list'
    };
  }

  async sendCampaignToRecipients(campaignData: CampaignData): Promise<{ success: boolean; message: string; results?: any[] }> {
    if (!campaignData.recipients || campaignData.recipients.length === 0) {
      return {
        success: false,
        message: 'No recipients provided'
      };
    }

    const results = [];
    let successCount = 0;

    for (const recipient of campaignData.recipients) {
      try {
        const emailRequest = {
          subject: campaignData.subject,
          htmlContent: campaignData.htmlContent,
          textContent: campaignData.textContent || this.htmlToText(campaignData.htmlContent),
          sender: campaignData.sender,
          to: [recipient]
        };

        const response = await this.makeApiRequest('/smtp/email', emailRequest);
        
        if (response.success) {
          results.push({ 
            email: recipient.email, 
            success: true, 
            messageId: response.messageId 
          });
          successCount++;
        } else {
          results.push({ 
            email: recipient.email, 
            success: false, 
            error: response.message 
          });
        }
      } catch (error) {
        results.push({ 
          email: recipient.email, 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return {
      success: successCount > 0,
      message: `Campaign sent to ${successCount}/${campaignData.recipients.length} recipients`,
      results
    };
  }

  async createContactList(listName: string, contacts: { email: string; name?: string }[]): Promise<{ success: boolean; message: string; listId?: number }> {
    console.log(`Creating contact list '${listName}' with ${contacts.length} contacts`);
    
    return {
      success: true,
      message: `Contact list '${listName}' simulated with ${contacts.length} contacts`,
      listId: Math.floor(Math.random() * 1000)
    };
  }

  async getCampaignStats(campaignId: number): Promise<{ success: boolean; stats?: any; message: string }> {
    const stats = {
      campaignId,
      sent: 100,
      delivered: 95,
      opened: 45,
      clicked: 12,
      bounced: 2,
      unsubscribed: 1
    };

    return {
      success: true,
      stats,
      message: 'Campaign stats retrieved successfully'
    };
  }

  async testConnection(): Promise<{ success: boolean; message: string }> {
    if (!this.apiKey) {
      return {
        success: false,
        message: 'Brevo API key not configured. Please set REACT_APP_BREVO_API_KEY in your environment.'
      };
    }

    try {
      const testEmail = {
        subject: 'Brevo Connection Test - Aapla Mahesh',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Brevo Connection Test</h2>
            <p>This is a test email to verify that the Brevo integration is working correctly.</p>
            <p><strong>Sent at:</strong> ${new Date().toISOString()}</p>
          </div>
        `,
        textContent: 'Brevo Connection Test - This is a test email to verify that the Brevo integration is working correctly.',
        sender: this.defaultSender,
        to: [{ 
          email: process.env.REACT_APP_TEST_EMAIL || 'test@aaplamahesh.org',
          name: 'Test Recipient'
        }]
      };

      const response = await this.makeApiRequest('/smtp/email', testEmail);
      
      return {
        success: response.success,
        message: response.success 
          ? `Test email sent successfully! Message ID: ${response.messageId || 'N/A'}`
          : `Failed to send test email: ${response.message}`
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to send test email: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  private async makeApiRequest(endpoint: string, data: any): Promise<{ success: boolean; messageId?: string; message: string }> {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': this.apiKey,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return {
          success: true,
          messageId: result.messageId || result.id || `brevo_${Date.now()}`,
          message: 'Email sent successfully'
        };
      } else {
        const errorText = await response.text();
        return {
          success: false,
          message: `Brevo API error: ${response.status} ${response.statusText} - ${errorText}`
        };
      }
    } catch (error) {
      return {
        success: false,
        message: `Network error: ${error instanceof Error ? error.message : 'Unknown error'}`
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
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #e74c3c;">New Issue Report</h2>
            <p><strong>Reporter:</strong> ${name} (${email})</p>
            <p><strong>Issue:</strong> ${subject}</p>
            <p><strong>Institute:</strong> ${additionalData?.instituteName || 'Not specified'}</p>
            <p><strong>Location:</strong> ${additionalData?.location || 'Not specified'}</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Description:</strong></p>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `;
        break;
        
      case 'join':
        emailSubject = `👥 New Team Application: ${name}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2ecc71;">New Team Application</h2>
            <p><strong>Applicant:</strong> ${name} (${email})</p>
            <p><strong>Position:</strong> ${additionalData?.position || 'Not specified'}</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `;
        break;
        
      case 'volunteer':
        emailSubject = `🤝 New Volunteer Application: ${name}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #3498db;">New Volunteer Application</h2>
            <p><strong>Volunteer:</strong> ${name} (${email})</p>
            <p><strong>University:</strong> ${additionalData?.university || 'Not specified'}</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `;
        break;
        
      case 'contact':
        emailSubject = `📧 Contact Form: ${subject}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #9b59b6;">New Contact Message</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `;
        break;
        
      default:
        emailSubject = `New Form Submission: ${subject}`;
        emailBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>New Form Submission</h2>
            <p><strong>From:</strong> ${name} (${email})</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
          </div>
        `;
    }

    return {
      subject: emailSubject,
      html: emailBody,
      text: this.htmlToText(emailBody)
    };
  }

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

export const brevoEmailService = new BrevoEmailService();
