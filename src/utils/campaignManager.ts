// Campaign Management Utility for creating and managing email campaigns
import { unifiedEmailService, EmailResult } from './unifiedEmailService';

export interface CampaignTemplate {
  id: string;
  name: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  category: 'newsletter' | 'announcement' | 'event' | 'fundraising' | 'update';
  variables?: string[]; // Variables that can be replaced in the template
}

export interface StudentContact {
  email: string;
  name?: string;
  university?: string;
  course?: string;
  year?: string;
  interests?: string[];
}

export interface CampaignStats {
  sent: number;
  delivered: number;
  opened: number;
  clicked: number;
  bounced: number;
  unsubscribed: number;
}

export class CampaignManager {
  private templates: Map<string, CampaignTemplate> = new Map();
  private contacts: StudentContact[] = [];

  constructor() {
    this.loadDefaultTemplates();
  }

  /**
   * Load default campaign templates
   */
  private loadDefaultTemplates(): void {
    const defaultTemplates: CampaignTemplate[] = [
      {
        id: 'welcome_newsletter',
        name: 'Welcome Newsletter',
        category: 'newsletter',
        subject: 'Welcome to Aapla Mahesh - Student Rights Movement',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 2.5em;">Welcome to Aapla Mahesh!</h1>
              <p style="margin: 10px 0 0 0; font-size: 1.2em; opacity: 0.9;">Empowering Student Rights Across India</p>
            </div>
            
            <div style="padding: 40px 20px;">
              <h2 style="color: #2c3e50;">Dear {{name}},</h2>
              
              <p>Welcome to the Aapla Mahesh movement! We're thrilled to have you join our community of passionate students fighting for education rights and justice.</p>
              
              <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 30px 0;">
                <h3 style="color: #e74c3c; margin-top: 0;">🚀 What You Can Expect:</h3>
                <ul style="color: #555; line-height: 1.8;">
                  <li><strong>Weekly Updates:</strong> Stay informed about student rights issues</li>
                  <li><strong>Action Alerts:</strong> Get notified when your voice is needed</li>
                  <li><strong>Success Stories:</strong> Celebrate victories in student advocacy</li>
                  <li><strong>Resources:</strong> Access tools and guides for your rights</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="{{website_url}}" style="background: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Explore Our Website</a>
              </div>
              
              <p>Together, we're building a stronger voice for student rights. Thank you for being part of this important movement!</p>
              
              <p style="margin-top: 30px;">
                Best regards,<br>
                <strong>The Aapla Mahesh Team</strong>
              </p>
            </div>
          </div>
        `,
        variables: ['name', 'website_url']
      },
      {
        id: 'issue_alert',
        name: 'Issue Alert',
        category: 'announcement',
        subject: '🚨 URGENT: {{issue_title}} - Your Voice Needed!',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #e74c3c; color: white; padding: 30px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 2.2em;">🚨 URGENT ALERT</h1>
              <p style="margin: 10px 0 0 0; font-size: 1.1em;">Your Voice is Needed Now!</p>
            </div>
            
            <div style="padding: 30px 20px;">
              <h2 style="color: #2c3e50;">{{issue_title}}</h2>
              
              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 20px 0;">
                <p style="margin: 0; color: #856404;"><strong>Issue Summary:</strong> {{issue_summary}}</p>
              </div>
              
              <p>{{issue_description}}</p>
              
              <div style="background: #d1ecf1; border-left: 4px solid #bee5eb; padding: 20px; margin: 30px 0;">
                <h3 style="color: #0c5460; margin-top: 0;">📢 How You Can Help:</h3>
                <ul style="color: #0c5460; line-height: 1.6;">
                  <li>Share this alert with your fellow students</li>
                  <li>Contact your college administration</li>
                  <li>Join our upcoming protest/meeting</li>
                  <li>Sign the petition (link below)</li>
                </ul>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="{{action_url}}" style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 10px;">Take Action Now</a>
                <a href="{{petition_url}}" style="background: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 10px;">Sign Petition</a>
              </div>
              
              <p style="font-style: italic; color: #6c757d;">Together, we can make a difference. Every voice matters in our fight for student rights!</p>
            </div>
          </div>
        `,
        variables: ['issue_title', 'issue_summary', 'issue_description', 'action_url', 'petition_url']
      },
      {
        id: 'event_invitation',
        name: 'Event Invitation',
        category: 'event',
        subject: '📅 Join Us: {{event_name}} - {{event_date}}',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 2.2em;">📅 You're Invited!</h1>
              <p style="margin: 10px 0 0 0; font-size: 1.1em;">{{event_name}}</p>
            </div>
            
            <div style="padding: 30px 20px;">
              <h2 style="color: #2c3e50; text-align: center;">{{event_name}}</h2>
              
              <div style="background: #f8f9fa; padding: 25px; border-radius: 10px; margin: 30px 0;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                  <div>
                    <h4 style="color: #495057; margin: 0 0 10px 0;">📅 Date & Time</h4>
                    <p style="margin: 0; font-weight: bold;">{{event_date}}</p>
                    <p style="margin: 5px 0 0 0;">{{event_time}}</p>
                  </div>
                  <div>
                    <h4 style="color: #495057; margin: 0 0 10px 0;">📍 Location</h4>
                    <p style="margin: 0; font-weight: bold;">{{event_location}}</p>
                  </div>
                </div>
              </div>
              
              <h3 style="color: #2c3e50;">About This Event</h3>
              <p>{{event_description}}</p>
              
              <div style="background: #e7f3ff; border-left: 4px solid #007bff; padding: 20px; margin: 30px 0;">
                <h4 style="color: #004085; margin-top: 0;">What to Expect:</h4>
                <ul style="color: #004085; line-height: 1.6;">
                  {{event_agenda}}
                </ul>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="{{registration_url}}" style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">Register Now</a>
              </div>
              
              <p style="text-align: center; color: #6c757d; font-size: 14px;">
                Can't attend? You can still support us by sharing this event with your network!
              </p>
            </div>
          </div>
        `,
        variables: ['event_name', 'event_date', 'event_time', 'event_location', 'event_description', 'event_agenda', 'registration_url']
      },
      {
        id: 'monthly_update',
        name: 'Monthly Update',
        category: 'update',
        subject: '📊 Aapla Mahesh Monthly Update - {{month}} {{year}}',
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #2c3e50; color: white; padding: 30px 20px; text-align: center;">
              <h1 style="margin: 0; font-size: 2.2em;">Monthly Update</h1>
              <p style="margin: 10px 0 0 0; font-size: 1.1em;">{{month}} {{year}}</p>
            </div>
            
            <div style="padding: 30px 20px;">
              <h2 style="color: #2c3e50;">Dear Supporters,</h2>
              
              <p>Here's what we've accomplished together this month and what's coming up!</p>
              
              <div style="background: #d4edda; border-left: 4px solid #28a745; padding: 20px; margin: 30px 0;">
                <h3 style="color: #155724; margin-top: 0;">🎉 This Month's Victories</h3>
                {{monthly_victories}}
              </div>
              
              <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; margin: 30px 0;">
                <h3 style="color: #856404; margin-top: 0;">⚡ Current Campaigns</h3>
                {{current_campaigns}}
              </div>
              
              <div style="background: #f8d7da; border-left: 4px solid #dc3545; padding: 20px; margin: 30px 0;">
                <h3 style="color: #721c24; margin-top: 0;">🚨 Issues That Need Attention</h3>
                {{urgent_issues}}
              </div>
              
              <div style="background: #cce7ff; border-left: 4px solid #007bff; padding: 20px; margin: 30px 0;">
                <h3 style="color: #004085; margin-top: 0;">📅 Upcoming Events</h3>
                {{upcoming_events}}
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="{{website_url}}" style="background: #e74c3c; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 10px;">Visit Website</a>
                <a href="{{donate_url}}" style="background: #28a745; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; margin: 10px;">Support Our Cause</a>
              </div>
              
              <p>Thank you for your continued support. Together, we're making real change happen!</p>
              
              <p style="margin-top: 30px;">
                In solidarity,<br>
                <strong>The Aapla Mahesh Team</strong>
              </p>
            </div>
          </div>
        `,
        variables: ['month', 'year', 'monthly_victories', 'current_campaigns', 'urgent_issues', 'upcoming_events', 'website_url', 'donate_url']
      }
    ];

    defaultTemplates.forEach(template => {
      this.templates.set(template.id, template);
    });
  }

  /**
   * Create a new campaign from a template
   */
  async createCampaignFromTemplate(
    templateId: string,
    variables: Record<string, string>,
    recipients: string[] | { email: string; name?: string }[],
    options?: {
      scheduledAt?: string;
      customSubject?: string;
      customSender?: { name: string; email: string };
    }
  ): Promise<EmailResult> {
    const template = this.templates.get(templateId);
    if (!template) {
      return {
        success: false,
        message: `Template '${templateId}' not found`
      };
    }

    try {
      // Replace variables in template
      const processedContent = this.processTemplate(template, variables);
      
      // Prepare recipient emails
      const recipientEmails = Array.isArray(recipients) 
        ? (typeof recipients[0] === 'string' 
            ? (recipients as string[])
            : (recipients as { email: string; name?: string }[]).map(r => r.email))
        : [];

      return await unifiedEmailService.sendNewsletterEmail(
        recipientEmails,
        options?.customSubject || processedContent.subject,
        processedContent.htmlContent,
        processedContent.textContent
      );
    } catch (error) {
      return {
        success: false,
        message: `Failed to create campaign: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }

  /**
   * Send a quick announcement email
   */
  async sendQuickAnnouncement(
    subject: string,
    message: string,
    recipients: string[],
    options?: {
      urgent?: boolean;
      includeCallToAction?: boolean;
      actionUrl?: string;
      actionText?: string;
    }
  ): Promise<EmailResult> {
    const urgentBadge = options?.urgent ? '🚨 URGENT: ' : '';
    const callToAction = options?.includeCallToAction && options.actionUrl ? `
      <div style="text-align: center; margin: 30px 0;">
        <a href="${options.actionUrl}" style="background: ${options.urgent ? '#dc3545' : '#007bff'}; color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
          ${options.actionText || 'Learn More'}
        </a>
      </div>
    ` : '';

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: ${options?.urgent ? '#dc3545' : '#2c3e50'}; color: white; padding: 30px 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 2em;">${options?.urgent ? '🚨 ' : ''}Announcement</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Aapla Mahesh Team</p>
        </div>
        
        <div style="padding: 30px 20px;">
          <div style="background: ${options?.urgent ? '#f8d7da' : '#f8f9fa'}; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <p style="margin: 0; font-size: 1.1em; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          ${callToAction}
          
          <p style="color: #6c757d; font-size: 14px; text-align: center; margin-top: 30px;">
            Stay connected with Aapla Mahesh for more updates on student rights and education issues.
          </p>
        </div>
      </div>
    `;

    return await unifiedEmailService.sendNewsletterEmail(
      recipients,
      `${urgentBadge}${subject}`,
      htmlContent
    );
  }

  /**
   * Process template by replacing variables
   */
  private processTemplate(template: CampaignTemplate, variables: Record<string, string>): {
    subject: string;
    htmlContent: string;
    textContent: string;
  } {
    let subject = template.subject;
    let htmlContent = template.htmlContent;
    let textContent = template.textContent || this.htmlToText(template.htmlContent);

    // Replace variables
    Object.entries(variables).forEach(([key, value]) => {
      const placeholder = `{{${key}}}`;
      subject = subject.replace(new RegExp(placeholder, 'g'), value);
      htmlContent = htmlContent.replace(new RegExp(placeholder, 'g'), value);
      textContent = textContent.replace(new RegExp(placeholder, 'g'), value);
    });

    return { subject, htmlContent, textContent };
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

  /**
   * Add a new template
   */
  addTemplate(template: CampaignTemplate): void {
    this.templates.set(template.id, template);
  }

  /**
   * Get all templates
   */
  getTemplates(): CampaignTemplate[] {
    return Array.from(this.templates.values());
  }

  /**
   * Get templates by category
   */
  getTemplatesByCategory(category: CampaignTemplate['category']): CampaignTemplate[] {
    return Array.from(this.templates.values()).filter(template => template.category === category);
  }

  /**
   * Get a specific template
   */
  getTemplate(id: string): CampaignTemplate | undefined {
    return this.templates.get(id);
  }

  /**
   * Import contacts from CSV-like data
   */
  importContacts(contactsData: StudentContact[]): void {
    this.contacts = [...this.contacts, ...contactsData];
  }

  /**
   * Get all contacts
   */
  getContacts(): StudentContact[] {
    return [...this.contacts];
  }

  /**
   * Filter contacts by criteria
   */
  filterContacts(criteria: {
    university?: string;
    course?: string;
    year?: string;
    interests?: string[];
  }): StudentContact[] {
    return this.contacts.filter(contact => {
      if (criteria.university && contact.university !== criteria.university) return false;
      if (criteria.course && contact.course !== criteria.course) return false;
      if (criteria.year && contact.year !== criteria.year) return false;
      if (criteria.interests && criteria.interests.length > 0) {
        const hasMatchingInterest = criteria.interests.some(interest => 
          contact.interests?.includes(interest)
        );
        if (!hasMatchingInterest) return false;
      }
      return true;
    });
  }

  /**
   * Get contact emails by criteria
   */
  getContactEmails(criteria?: {
    university?: string;
    course?: string;
    year?: string;
    interests?: string[];
  }): string[] {
    const contacts = criteria ? this.filterContacts(criteria) : this.contacts;
    return contacts.map(contact => contact.email);
  }
}

// Create a singleton instance
export const campaignManager = new CampaignManager();
