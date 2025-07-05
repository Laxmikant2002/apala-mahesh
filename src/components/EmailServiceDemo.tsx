// Email Service Demo Component
// This component demonstrates how to use the new email services

import React, { useState } from 'react';
import { emailService, EmailData } from '../utils/emailService';
import { unifiedEmailService } from '../utils/unifiedEmailService';
import { campaignManager } from '../utils/campaignManager';

interface EmailServiceDemoProps {
  className?: string;
}

const EmailServiceDemo: React.FC<EmailServiceDemoProps> = ({ className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'campaign' | 'test' | 'status'>('form');

  // Form submission test
  const handleFormSubmissionTest = async () => {
    setIsLoading(true);
    try {
      const testEmailData: EmailData = {
        name: 'John Doe',
        email: 'john.doe@university.edu',
        subject: 'Fee Hike Issue at XYZ University',
        message: 'We are facing an unreasonable fee hike of 40% this semester. Students are unable to afford this sudden increase. We need immediate intervention to address this issue.',
        formType: 'issue',
        additionalData: {
          instituteName: 'XYZ University',
          location: 'Mumbai, Maharashtra'
        }
      };

      const result = await emailService.sendEmail(testEmailData);
      setResults({
        type: 'Form Submission',
        success: result.success,
        message: result.message,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      setResults({
        type: 'Form Submission',
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Campaign test
  const handleCampaignTest = async () => {
    setIsLoading(true);
    try {
      const result = await campaignManager.createCampaignFromTemplate(
        'issue_alert',
        {
          issue_title: 'Emergency: Fee Hike at Multiple Universities',
          issue_summary: 'Universities across Maharashtra are implementing sudden fee increases without proper student consultation',
          issue_description: 'Multiple universities have announced 30-50% fee increases effective immediately. Students and their families are struggling to cope with this financial burden during already challenging times.',
          action_url: 'https://aaplamahesh.org/action/fee-hike-protest',
          petition_url: 'https://aaplamahesh.org/petition/stop-fee-hike'
        },
        [
          'student1@university.edu',
          'student2@college.edu',
          'activist@movement.org'
        ],
        {
          customSubject: 'URGENT: Stand Against Unfair Fee Hikes - Your Voice Matters!'
        }
      );

      setResults({
        type: 'Email Campaign',
        success: result.success,
        message: result.message,
        campaignId: result.campaignId,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      setResults({
        type: 'Email Campaign',
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Quick announcement test
  const handleAnnouncementTest = async () => {
    setIsLoading(true);
    try {
      const result = await campaignManager.sendQuickAnnouncement(
        'Protest Scheduled Tomorrow at Azad Maidan',
        'Join us tomorrow at 10 AM at Azad Maidan, Mumbai to protest against the recent fee hikes across Maharashtra universities. Bring your student ID, banners, and spread the word to your fellow students. Together we can make our voices heard!',
        ['student1@university.edu', 'student2@college.edu'],
        {
          urgent: true,
          includeCallToAction: true,
          actionUrl: 'https://aaplamahesh.org/events/protest-details',
          actionText: 'Get Complete Event Details'
        }
      );

      setResults({
        type: 'Quick Announcement',
        success: result.success,
        message: result.message,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      setResults({
        type: 'Quick Announcement',
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Test all providers
  const handleProviderTest = async () => {
    setIsLoading(true);
    try {
      const testResults = await emailService.testAllProviders();
      setResults({
        type: 'Provider Test',
        brevo: testResults.brevo,
        nodemailer: testResults.nodemailer,
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      setResults({
        type: 'Provider Test',
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get service status
  const handleStatusCheck = async () => {
    setIsLoading(true);
    try {
      const status = await emailService.getServiceStatus();
      const providerStatus = unifiedEmailService.getProviderStatus();
      
      setResults({
        type: 'Service Status',
        configured: status.configured,
        activeProvider: status.activeProvider,
        features: status.features,
        providerDetails: {
          brevo: {
            configured: providerStatus.brevo.configured,
            features: providerStatus.brevo.features
          },
          nodemailer: {
            configured: providerStatus.nodemailer.configured,
            features: providerStatus.nodemailer.features
          }
        },
        timestamp: new Date().toLocaleString()
      });
    } catch (error) {
      setResults({
        type: 'Service Status',
        success: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date().toLocaleString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`email-service-demo ${className || ''}`} style={{ maxWidth: '800px', margin: '20px auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#2c3e50', color: 'white', padding: '20px', borderRadius: '8px 8px 0 0' }}>
        <h2 style={{ margin: '0 0 10px 0' }}>📧 Email Services Demo</h2>
        <p style={{ margin: 0, opacity: 0.9 }}>Test Brevo campaigns, Nodemailer, and unified email functionality</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', borderBottom: '1px solid #ddd', background: '#f8f9fa' }}>
        {[
          { key: 'form', label: '📝 Form Email' },
          { key: 'campaign', label: '📢 Campaigns' },
          { key: 'test', label: '🧪 Provider Test' },
          { key: 'status', label: '📊 Status' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            style={{
              padding: '15px 20px',
              border: 'none',
              background: activeTab === tab.key ? '#007bff' : 'transparent',
              color: activeTab === tab.key ? 'white' : '#666',
              cursor: 'pointer',
              borderRadius: 0,
              flex: 1,
              fontWeight: activeTab === tab.key ? 'bold' : 'normal'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '30px', background: 'white', borderRadius: '0 0 8px 8px', border: '1px solid #ddd', borderTop: 'none' }}>
        {activeTab === 'form' && (
          <div>
            <h3 style={{ color: '#2c3e50', marginTop: 0 }}>📝 Form Submission Email Test</h3>
            <p style={{ color: '#666', marginBottom: '25px' }}>
              Test sending a form submission email (issue report) using the unified email service.
            </p>
            <button
              onClick={handleFormSubmissionTest}
              disabled={isLoading}
              style={{
                background: '#28a745',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              {isLoading ? 'Sending...' : 'Send Test Issue Report'}
            </button>
          </div>
        )}

        {activeTab === 'campaign' && (
          <div>
            <h3 style={{ color: '#2c3e50', marginTop: 0 }}>📢 Email Campaign Tests</h3>
            <p style={{ color: '#666', marginBottom: '25px' }}>
              Test different types of email campaigns using pre-built templates.
            </p>
            
            <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <button
                onClick={handleCampaignTest}
                disabled={isLoading}
                style={{
                  background: '#dc3545',
                  color: 'white',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '6px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                🚨 Send Issue Alert Campaign
              </button>
              
              <button
                onClick={handleAnnouncementTest}
                disabled={isLoading}
                style={{
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  padding: '15px 20px',
                  borderRadius: '6px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  fontWeight: 'bold'
                }}
              >
                📢 Send Quick Announcement
              </button>
            </div>
          </div>
        )}

        {activeTab === 'test' && (
          <div>
            <h3 style={{ color: '#2c3e50', marginTop: 0 }}>🧪 Email Provider Tests</h3>
            <p style={{ color: '#666', marginBottom: '25px' }}>
              Test the configuration and connectivity of both Brevo and Nodemailer services.
            </p>
            <button
              onClick={handleProviderTest}
              disabled={isLoading}
              style={{
                background: '#6f42c1',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              {isLoading ? 'Testing...' : 'Test All Providers'}
            </button>
          </div>
        )}

        {activeTab === 'status' && (
          <div>
            <h3 style={{ color: '#2c3e50', marginTop: 0 }}>📊 Service Status Check</h3>
            <p style={{ color: '#666', marginBottom: '25px' }}>
              Check the current configuration and status of all email services.
            </p>
            <button
              onClick={handleStatusCheck}
              disabled={isLoading}
              style={{
                background: '#fd7e14',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              {isLoading ? 'Checking...' : 'Check Service Status'}
            </button>
          </div>
        )}

        {/* Results Display */}
        {results && (
          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            background: results.success !== false ? '#d1ecf1' : '#f8d7da',
            border: `1px solid ${results.success !== false ? '#bee5eb' : '#f5c6cb'}`,
            borderRadius: '6px'
          }}>
            <h4 style={{ 
              color: results.success !== false ? '#0c5460' : '#721c24',
              marginTop: 0,
              marginBottom: '15px'
            }}>
              {results.type} Results
            </h4>
            
            {results.type === 'Provider Test' ? (
              <div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Brevo:</strong> 
                  <span style={{ 
                    color: results.brevo.success ? '#28a745' : '#dc3545',
                    marginLeft: '10px',
                    fontWeight: 'bold'
                  }}>
                    {results.brevo.success ? '✅ Working' : '❌ Failed'}
                  </span>
                  <div style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
                    {results.brevo.message}
                  </div>
                </div>
                <div>
                  <strong>Nodemailer:</strong>
                  <span style={{ 
                    color: results.nodemailer.success ? '#28a745' : '#dc3545',
                    marginLeft: '10px',
                    fontWeight: 'bold'
                  }}>
                    {results.nodemailer.success ? '✅ Working' : '❌ Failed'}
                  </span>
                  <div style={{ fontSize: '14px', color: '#666', marginLeft: '10px' }}>
                    {results.nodemailer.message}
                  </div>
                </div>
              </div>
            ) : results.type === 'Service Status' ? (
              <div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Configured:</strong> 
                  <span style={{ color: results.configured ? '#28a745' : '#dc3545', marginLeft: '10px' }}>
                    {results.configured ? 'Yes' : 'No'}
                  </span>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Active Provider:</strong> 
                  <span style={{ marginLeft: '10px', fontWeight: 'bold' }}>
                    {results.activeProvider}
                  </span>
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <strong>Features:</strong>
                  <ul style={{ marginTop: '5px' }}>
                    {results.features.map((feature: string, index: number) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: '20px' }}>
                  <h5>Provider Details:</h5>
                  <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                    <div>
                      <strong>Brevo:</strong> {results.providerDetails.brevo.configured ? '✅' : '❌'}
                    </div>
                    <div>
                      <strong>Nodemailer:</strong> {results.providerDetails.nodemailer.configured ? '✅' : '❌'}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Status:</strong> 
                  <span style={{ 
                    color: results.success ? '#28a745' : '#dc3545',
                    marginLeft: '10px',
                    fontWeight: 'bold'
                  }}>
                    {results.success ? 'Success' : 'Failed'}
                  </span>
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Message:</strong> {results.message}
                </div>
                {results.campaignId && (
                  <div style={{ marginBottom: '10px' }}>
                    <strong>Campaign ID:</strong> {results.campaignId}
                  </div>
                )}
              </div>
            )}
            
            <div style={{ fontSize: '12px', color: '#666', marginTop: '15px' }}>
              <strong>Timestamp:</strong> {results.timestamp}
            </div>
          </div>
        )}

        {/* Configuration Guide */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: '#f8f9fa', 
          borderRadius: '6px',
          border: '1px solid #dee2e6'
        }}>
          <h4 style={{ color: '#495057', marginTop: 0 }}>⚙️ Configuration Guide</h4>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '15px' }}>
            To use these email services, you need to configure your environment variables:
          </p>
          <div style={{ background: '#343a40', color: '#f8f9fa', padding: '15px', borderRadius: '4px', fontSize: '13px', fontFamily: 'monospace' }}>
            <div># For Brevo (Recommended for campaigns)</div>
            <div>REACT_APP_BREVO_API_KEY=your_api_key</div>
            <br />
            <div># For Gmail SMTP</div>
            <div>REACT_APP_GMAIL_USER=your-email@gmail.com</div>
            <div>REACT_APP_GMAIL_APP_PASSWORD=your_app_password</div>
            <br />
            <div># General settings</div>
            <div>REACT_APP_SENDER_EMAIL=contact@aaplamahesh.org</div>
            <div>REACT_APP_RECIPIENT_EMAIL=admin@aaplamahesh.org</div>
          </div>
          <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '10px', marginBottom: 0 }}>
            See <code>.env.example</code> and <code>EMAIL_SERVICES_GUIDE.md</code> for complete setup instructions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailServiceDemo;
