// Email service for client-side React application
// This now integrates with the unified email service for better functionality

import { unifiedEmailService, EmailResult } from './unifiedEmailService';

export interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
  formType: 'issue' | 'join' | 'volunteer' | 'contact';
  additionalData?: any;
}

export class EmailService {
  private recipientEmail: string;

  constructor() {
    // In a React app, use process.env for environment variables at build time
    this.recipientEmail = process.env.REACT_APP_RECIPIENT_EMAIL || '';
  }

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      // Use the unified email service for better functionality
      const result: EmailResult = await unifiedEmailService.sendFormEmail(emailData);
      
      return {
        success: result.success,
        message: result.message
      };
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        message: 'Failed to send email. Please try again later.'
      };
    }
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

  // Check email service status
  async getServiceStatus(): Promise<{
    configured: boolean;
    activeProvider: string;
    features: string[];
  }> {
    try {
      const status = unifiedEmailService.getProviderStatus();
      return {
        configured: status.brevo.configured || status.nodemailer.configured,
        activeProvider: status.active,
        features: status.active === 'brevo' ? status.brevo.features : status.nodemailer.features
      };
    } catch (error) {
      return {
        configured: false,
        activeProvider: 'none',
        features: []
      };
    }
  }

  // Test all email providers
  async testAllProviders(): Promise<{
    brevo: { success: boolean; message: string };
    nodemailer: { success: boolean; message: string };
  }> {
    try {
      return await unifiedEmailService.testEmailSetup();
    } catch (error) {
      return {
        brevo: { success: false, message: 'Test failed' },
        nodemailer: { success: false, message: 'Test failed' }
      };
    }
  }
}

// Create a singleton instance
export const emailService = new EmailService();
