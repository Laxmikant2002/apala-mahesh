// Unified email service for browser environment (React)
// Uses only browser-compatible email services

import { EmailData } from './emailService';
import { brevoEmailService } from './brevoEmailService';

export interface EmailResult {
  success: boolean;
  message: string;
  messageId?: string;
}

export interface ProviderStatus {
  brevo: {
    configured: boolean;
    features: string[];
  };
  active: string;
}

export class UnifiedEmailService {
  private brevoService = brevoEmailService;

  /**
   * Send an email using the best available provider
   */
  async sendFormEmail(emailData: EmailData): Promise<EmailResult> {
    // Try Brevo first (if configured)
    if (this.isBrevoConfigured()) {
      try {
        const result = await this.brevoService.sendTransactionalEmail(emailData);
        return {
          success: result.success,
          message: result.message,
          messageId: result.messageId
        };
      } catch (error) {
        console.warn('Brevo service failed:', error);
      }
    }

    // Fallback to a simple HTTP POST to a backend endpoint (if available)
    try {
      return await this.sendViaBackend(emailData);
    } catch (error) {
      return {
        success: false,
        message: 'All email services are unavailable. Please contact us directly.'
      };
    }
  }

  /**
   * Send email via backend API (for SMTP services)
   */
  private async sendViaBackend(emailData: EmailData): Promise<EmailResult> {
    // This would connect to your backend API that handles SMTP
    const backendUrl = process.env.REACT_APP_BACKEND_URL || '/api/send-email';
    
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      throw new Error('Backend email service not available');
    }
  }

  /**
   * Send email via Brevo specifically
   */
  async sendViaBrevo(emailData: EmailData): Promise<EmailResult> {
    if (!this.isBrevoConfigured()) {
      return {
        success: false,
        message: 'Brevo email service is not configured'
      };
    }

    try {
      const result = await this.brevoService.sendTransactionalEmail(emailData);
      return {
        success: result.success,
        message: result.message,
        messageId: result.messageId
      };
    } catch (error) {
      return {
        success: false,
        message: `Brevo service error: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Test email setup for all providers
   */
  async testEmailSetup(): Promise<{
    brevo: { success: boolean; message: string };
    backend: { success: boolean; message: string };
  }> {
    const testData: EmailData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Email Service Test',
      message: 'This is a test message to verify email service functionality.',
      formType: 'contact'
    };

    // Test Brevo
    const brevoTest = this.isBrevoConfigured() 
      ? await this.testBrevoService(testData)
      : { success: false, message: 'Brevo not configured' };

    // Test backend
    const backendTest = await this.testBackendService(testData);

    return {
      brevo: brevoTest,
      backend: backendTest
    };
  }

  /**
   * Test Brevo service
   */
  private async testBrevoService(testData: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      // Just test if we can create the email content without sending
      const result = await this.brevoService.sendTransactionalEmail({
        ...testData,
        subject: '[TEST] ' + testData.subject
      });
      
      return {
        success: result.success,
        message: result.success ? 'Brevo service is working' : result.message
      };
    } catch (error) {
      return {
        success: false,
        message: `Brevo test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Test backend service
   */
  private async testBackendService(testData: EmailData): Promise<{ success: boolean; message: string }> {
    try {
      const result = await this.sendViaBackend({
        ...testData,
        subject: '[TEST] ' + testData.subject
      });
      
      return {
        success: result.success,
        message: result.success ? 'Backend service is working' : result.message
      };
    } catch (error) {
      return {
        success: false,
        message: 'Backend service not available or not configured'
      };
    }
  }

  /**
   * Get provider status
   */
  getProviderStatus(): ProviderStatus {
    const brevoConfigured = this.isBrevoConfigured();
    
    return {
      brevo: {
        configured: brevoConfigured,
        features: brevoConfigured ? ['transactional', 'campaigns', 'templates'] : []
      },
      active: brevoConfigured ? 'brevo' : 'none'
    };
  }

  /**
   * Check if Brevo is configured
   */
  private isBrevoConfigured(): boolean {
    const apiKey = process.env.REACT_APP_BREVO_API_KEY || process.env.BREVO_API_KEY;
    return !!apiKey && apiKey.length > 0;
  }

  /**
   * Send newsletter/campaign email
   */
  async sendNewsletterEmail(
    recipients: string[],
    subject: string,
    htmlContent: string,
    textContent?: string
  ): Promise<EmailResult> {
    if (!this.isBrevoConfigured()) {
      return {
        success: false,
        message: 'Newsletter functionality requires Brevo configuration'
      };
    }

    try {
      const campaignData = {
        name: `Newsletter - ${new Date().toISOString().split('T')[0]}`,
        subject: subject,
        sender: {
          name: process.env.REACT_APP_SENDER_NAME || 'Aapla Mahesh Team',
          email: process.env.REACT_APP_SENDER_EMAIL || 'contact@aaplamahesh.org'
        },
        htmlContent: htmlContent,
        textContent: textContent,
        recipients: recipients.map(email => ({ email }))
      };

      const result = await this.brevoService.createEmailCampaign(campaignData);
      return {
        success: result.success,
        message: result.message,
        messageId: result.campaignId?.toString()
      };
    } catch (error) {
      return {
        success: false,
        message: `Newsletter sending failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

// Create singleton instance
export const unifiedEmailService = new UnifiedEmailService();
