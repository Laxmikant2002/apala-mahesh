// Unified Email Service that combines Brevo and Nodemailer capabilities
import { EmailData } from './emailService';
import { brevoEmailService, CampaignData } from './brevoEmailService';
import { nodemailerService } from './nodemailerService';

export type EmailProvider = 'brevo' | 'nodemailer' | 'auto';

export interface EmailServiceConfig {
  provider: EmailProvider;
  fallbackProvider?: EmailProvider;
  autoReply?: boolean;
}

export interface CampaignResult {
  success: boolean;
  message: string;
  campaignId?: number;
  results?: any[];
}

export interface EmailResult {
  success: boolean;
  message: string;
  messageId?: string;
}

export class UnifiedEmailService {
  private config: EmailServiceConfig;

  constructor(config?: Partial<EmailServiceConfig>) {
    this.config = {
      provider: 'auto',
      fallbackProvider: 'nodemailer',
      autoReply: true,
      ...config
    };
  }

  /**
   * Send a form submission email using the configured provider
   */
  async sendFormEmail(emailData: EmailData): Promise<EmailResult> {
    let result: EmailResult;
    
    try {
      // Determine which provider to use
      const provider = this.getProvider();
      
      if (provider === 'brevo') {
        result = await brevoEmailService.sendTransactionalEmail(emailData);
      } else {
        result = await nodemailerService.sendFormSubmissionEmail(emailData);
      }

      // Send auto-reply if enabled and primary email was successful
      if (result.success && this.config.autoReply) {
        try {
          await this.sendAutoReply(emailData);
        } catch (error) {
          console.warn('Auto-reply failed:', error);
          // Don't fail the main email if auto-reply fails
        }
      }

      return result;
    } catch (error) {
      console.error('Primary email provider failed:', error);
      
      // Try fallback provider if available
      if (this.config.fallbackProvider && this.config.fallbackProvider !== this.config.provider) {
        try {
          console.log(`Trying fallback provider: ${this.config.fallbackProvider}`);
          
          if (this.config.fallbackProvider === 'brevo') {
            result = await brevoEmailService.sendTransactionalEmail(emailData);
          } else {
            result = await nodemailerService.sendFormSubmissionEmail(emailData);
          }

          return {
            ...result,
            message: `${result.message} (via fallback provider)`
          };
        } catch (fallbackError) {
          console.error('Fallback provider also failed:', fallbackError);
        }
      }

      return {
        success: false,
        message: 'Failed to send email via all available providers'
      };
    }
  }

  /**
   * Send auto-reply email to the form submitter
   */
  async sendAutoReply(emailData: EmailData): Promise<EmailResult> {
    try {
      // Always use Nodemailer for auto-replies as it's more reliable for this purpose
      return await nodemailerService.sendAutoReply(emailData);
    } catch (error) {
      console.error('Auto-reply failed:', error);
      return {
        success: false,
        message: 'Failed to send auto-reply email'
      };
    }
  }

  /**
   * Create and send an email campaign
   */
  async sendCampaign(campaignData: CampaignData): Promise<CampaignResult> {
    try {
      // For campaigns, prefer Brevo API
      if (campaignData.listIds && campaignData.listIds.length > 0) {
        // Use Brevo's campaign API for large lists
        const result = await brevoEmailService.createEmailCampaign(campaignData);
        return {
          success: result.success,
          message: result.message,
          campaignId: result.campaignId
        };
      } else if (campaignData.recipients && campaignData.recipients.length > 0) {
        // For smaller recipient lists, send individual emails
        if (campaignData.recipients.length <= 50) {
          // Use Brevo for smaller batches
          const result = await brevoEmailService.sendCampaignToRecipients(campaignData);
          return {
            success: result.success,
            message: result.message,
            results: result.results
          };
        } else {
          // Use Nodemailer for bulk sending
          const recipients = campaignData.recipients.map(r => r.email);
          const result = await nodemailerService.sendBulkEmails(
            recipients,
            campaignData.subject,
            campaignData.htmlContent,
            campaignData.textContent
          );
          return {
            success: result.success,
            message: result.message,
            results: result.results
          };
        }
      } else {
        throw new Error('No recipients specified for campaign');
      }
    } catch (error) {
      console.error('Campaign sending failed:', error);
      return {
        success: false,
        message: `Failed to send campaign: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Send newsletter to a list of recipients
   */
  async sendNewsletter(
    recipients: string[], 
    subject: string, 
    content: { html: string; text?: string }
  ): Promise<CampaignResult> {
    try {
      if (recipients.length <= 100) {
        // Use Brevo for smaller newsletters
        const campaignData: CampaignData = {
          name: `Newsletter: ${subject}`,
          subject,
          sender: {
            name: process.env.REACT_APP_SENDER_NAME || 'Aapla Mahesh Team',
            email: process.env.REACT_APP_SENDER_EMAIL || 'contact@aaplamahesh.org'
          },
          htmlContent: content.html,
          textContent: content.text,
          recipients: recipients.map(email => ({ email }))
        };

        const result = await brevoEmailService.sendCampaignToRecipients(campaignData);
        return {
          success: result.success,
          message: result.message,
          results: result.results
        };
      } else {
        // Use Nodemailer for larger newsletters
        const result = await nodemailerService.sendNewsletter(recipients, subject, content);
        return {
          success: result.success,
          message: result.message,
          results: result.results
        };
      }
    } catch (error) {
      console.error('Newsletter sending failed:', error);
      return {
        success: false,
        message: `Failed to send newsletter: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Test email functionality
   */
  async testEmailSetup(): Promise<{ brevo: EmailResult; nodemailer: EmailResult }> {
    const results = {
      brevo: { success: false, message: 'Not tested' },
      nodemailer: { success: false, message: 'Not tested' }
    };

    // Test Brevo
    try {
      results.brevo = await brevoEmailService.testConnection();
    } catch (error) {
      results.brevo = {
        success: false,
        message: `Brevo test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }

    // Test Nodemailer
    try {
      const verifyResult = await nodemailerService.verifyConnection();
      if (verifyResult.success) {
        results.nodemailer = await nodemailerService.sendTestEmail();
      } else {
        results.nodemailer = verifyResult;
      }
    } catch (error) {
      results.nodemailer = {
        success: false,
        message: `Nodemailer test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }

    return results;
  }

  /**
   * Get campaign statistics (Brevo only)
   */
  async getCampaignStats(campaignId: number): Promise<{ success: boolean; stats?: any; message: string }> {
    try {
      return await brevoEmailService.getCampaignStats(campaignId);
    } catch (error) {
      return {
        success: false,
        message: `Failed to get campaign stats: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Create a contact list for future campaigns (Brevo only)
   */
  async createContactList(listName: string, contacts: { email: string; name?: string }[]): Promise<{ success: boolean; message: string; listId?: number }> {
    try {
      return await brevoEmailService.createContactList(listName, contacts);
    } catch (error) {
      return {
        success: false,
        message: `Failed to create contact list: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Update service configuration
   */
  updateConfig(newConfig: Partial<EmailServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
  }

  /**
   * Get current configuration
   */
  getConfig(): EmailServiceConfig {
    return { ...this.config };
  }

  /**
   * Determine which provider to use based on configuration
   */
  private getProvider(): EmailProvider {
    if (this.config.provider === 'auto') {
      // Auto-select based on environment or availability
      const brevoApiKey = process.env.REACT_APP_BREVO_API_KEY || process.env.BREVO_API_KEY;
      const gmailUser = process.env.REACT_APP_GMAIL_USER;
      const smtpHost = process.env.REACT_APP_SMTP_HOST;

      if (brevoApiKey) {
        return 'brevo';
      } else if (gmailUser || smtpHost) {
        return 'nodemailer';
      } else {
        console.warn('No email provider configured properly');
        return 'nodemailer'; // Default fallback
      }
    }

    return this.config.provider;
  }

  /**
   * Check if a provider is properly configured
   */
  isProviderConfigured(provider: EmailProvider): boolean {
    switch (provider) {
      case 'brevo':
        return !!(process.env.REACT_APP_BREVO_API_KEY || process.env.BREVO_API_KEY);
      
      case 'nodemailer':
        return !!(
          process.env.REACT_APP_GMAIL_USER ||
          process.env.REACT_APP_SMTP_HOST ||
          process.env.REACT_APP_BREVO_SMTP_USER
        );
      
      default:
        return false;
    }
  }

  /**
   * Get provider status and configuration info
   */
  getProviderStatus(): { 
    brevo: { configured: boolean; features: string[] }; 
    nodemailer: { configured: boolean; features: string[] };
    active: EmailProvider;
  } {
    return {
      brevo: {
        configured: this.isProviderConfigured('brevo'),
        features: ['Transactional emails', 'Bulk campaigns', 'Contact lists', 'Analytics', 'Templates']
      },
      nodemailer: {
        configured: this.isProviderConfigured('nodemailer'),
        features: ['SMTP emails', 'Bulk sending', 'Auto-replies', 'Multiple providers', 'Custom templates']
      },
      active: this.getProvider()
    };
  }
}

// Create a singleton instance
export const unifiedEmailService = new UnifiedEmailService();
