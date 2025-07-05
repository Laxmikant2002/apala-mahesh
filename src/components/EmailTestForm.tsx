import React, { useState } from 'react';
import { emailService } from '../utils/emailService';

const EmailTestForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [result, setResult] = useState<{
    loading: boolean;
    success: boolean | null;
    message: string;
  }>({
    loading: false,
    success: null,
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setResult({ loading: true, success: null, message: 'Sending email...' });
    
    try {
      const emailResult = await emailService.sendEmail({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        formType: 'contact'
      });
      
      setResult({
        loading: false,
        success: emailResult.success,
        message: emailResult.message
      });
      
      // Clear form if successful
      if (emailResult.success) {
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      setResult({
        loading: false,
        success: false,
        message: 'Error sending email. Please try again.'
      });
    }
  };

  const handleQuickTest = async () => {
    setResult({ loading: true, success: null, message: 'Sending test email...' });
    
    try {
      const testResult = await emailService.sendTestEmail();
      setResult({
        loading: false,
        success: testResult.success,
        message: testResult.message
      });
    } catch (error) {
      setResult({
        loading: false,
        success: false,
        message: 'Test email failed. Check your email configuration.'
      });
    }
  };

  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '20px auto', 
      padding: '20px', 
      border: '1px solid #ddd', 
      borderRadius: '8px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>
        📧 Email Test Form
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>
        Test your email configuration. Admin will receive notifications at: 
        <strong> nsuimahaforyou@gmail.com</strong>
      </p>

      {/* Quick Test Button */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button 
          onClick={handleQuickTest}
          disabled={result.loading}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: result.loading ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          {result.loading ? 'Sending...' : '🚀 Quick Test Email'}
        </button>
      </div>

      <div style={{ textAlign: 'center', margin: '10px 0', color: '#999' }}>
        OR
      </div>

      {/* Custom Form */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Name:
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Email:
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Subject:
          </label>
          <input
            type="text"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px'
            }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Message:
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '14px',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={result.loading}
          style={{
            width: '100%',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '5px',
            cursor: result.loading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {result.loading ? 'Sending...' : '📨 Send Test Email'}
        </button>
      </form>

      {/* Result Display */}
      {result.message && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          borderRadius: '5px',
          backgroundColor: result.success === true ? '#d4edda' : 
                           result.success === false ? '#f8d7da' : '#d1ecf1',
          color: result.success === true ? '#155724' : 
                 result.success === false ? '#721c24' : '#0c5460',
          border: `1px solid ${result.success === true ? '#c3e6cb' : 
                                result.success === false ? '#f5c6cb' : '#bee5eb'}`
        }}>
          <strong>
            {result.success === true ? '✅ Success!' : 
             result.success === false ? '❌ Error!' : 'ℹ️ Info:'}
          </strong>
          <div style={{ marginTop: '5px' }}>{result.message}</div>
        </div>
      )}

      {/* Configuration Help */}
      <div style={{
        marginTop: '20px',
        padding: '15px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
        fontSize: '14px',
        color: '#6c757d'
      }}>
        <strong>📋 Configuration Checklist:</strong>
        <ul style={{ marginTop: '10px', marginLeft: '20px' }}>
          <li>✅ Admin email: nsuimahaforyou@gmail.com (configured)</li>
          <li>⚙️ Add REACT_APP_BREVO_API_KEY to .env file</li>
          <li>🔄 Restart server after changing .env</li>
          <li>📧 Check spam folder if email not received</li>
        </ul>
      </div>
    </div>
  );
};

export default EmailTestForm;
