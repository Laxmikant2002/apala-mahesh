import React, { useState } from 'react';
import { emailService } from '../utils/emailService';

const EmailTest: React.FC = () => {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const runEmailTest = async () => {
    setLoading(true);
    setTestResult('Testing email service...');
    
    try {
      const result = await emailService.sendTestEmail();
      
      if (result.success) {
        setTestResult('✅ Test email sent successfully! Check your email inbox.');
      } else {
        setTestResult(`❌ Test failed: ${result.message}`);
      }
    } catch (error) {
      setTestResult(`❌ Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '20px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      zIndex: 9999,
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      maxWidth: '300px'
    }}>
      <h3>Email Service Test</h3>
      <p>Click the button below to send a test email:</p>
      
      <button 
        onClick={runEmailTest}
        disabled={loading}
        style={{
          padding: '10px 15px',
          backgroundColor: '#030e07',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading ? 0.6 : 1
        }}
      >
        {loading ? 'Testing...' : 'Send Test Email'}
      </button>
      
      {testResult && (
        <div style={{ 
          marginTop: '15px', 
          padding: '10px', 
          backgroundColor: '#f8f9fa',
          borderRadius: '4px',
          fontSize: '14px'
        }}>
          {testResult}
        </div>
      )}
      
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        <strong>Environment Check:</strong>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          <li>Domain: {process.env.REACT_APP_MAILGUN_DOMAIN || '❌ Not set'}</li>
          <li>API Key: {process.env.REACT_APP_MAILGUN_API_KEY ? '✅ Set' : '❌ Not set'}</li>
          <li>Recipient: {process.env.REACT_APP_RECIPIENT_EMAIL || '❌ Not set'}</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailTest;
