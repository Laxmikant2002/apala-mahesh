import React, { useState } from 'react';
import { emailService } from '../utils/emailService';

const QuickEmailTest: React.FC = () => {
  const [result, setResult] = useState<{
    loading: boolean;
    message: string;
    success: boolean | null;
  }>({
    loading: false,
    message: '',
    success: null
  });

  const testRealEmail = async () => {
    setResult({ loading: true, message: 'Sending test email...', success: null });

    try {
      const testSubmission = {
        name: 'Rahul Sharma',
        email: 'rahul.sharma@student.edu',
        subject: 'URGENT: Hostel Fee Exploitation',
        message: 'Dear Aapla Mahesh Team,\n\nI am writing to report a serious issue regarding excessive hostel fees being charged without proper justification. The management is demanding additional fees that were not mentioned during admission.\n\nThis is affecting many students and we need immediate help.\n\nThank you for your support.',
        formType: 'issue' as const,
        additionalData: {
          instituteName: 'Mumbai University',
          location: 'Mumbai, Maharashtra'
        }
      };

      const response = await emailService.sendEmail(testSubmission);
      
      setResult({
        loading: false,
        message: response.message,
        success: response.success
      });

    } catch (error) {
      setResult({
        loading: false,
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        success: false
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: 'white',
      border: '2px solid #007bff',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: 9999,
      maxWidth: '400px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#007bff' }}>
        📧 Email Test Panel
      </h3>
      
      <button
        onClick={testRealEmail}
        disabled={result.loading}
        style={{
          background: result.loading ? '#ccc' : '#28a745',
          color: 'white',
          border: 'none',
          padding: '12px 20px',
          borderRadius: '5px',
          cursor: result.loading ? 'not-allowed' : 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          width: '100%',
          marginBottom: '15px'
        }}
      >
        {result.loading ? 'Sending...' : '🚀 Send Test Issue Email'}
      </button>

      {result.message && (
        <div style={{
          padding: '10px',
          borderRadius: '5px',
          fontSize: '14px',
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

      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '5px',
        fontSize: '12px',
        color: '#6c757d'
      }}>
        <strong>📋 Test Details:</strong>
        <br />• Student: Rahul Sharma
        <br />• Issue: Hostel Fee Problem
        <br />• Admin Email: nsuimahaforyou@gmail.com
        <br />• Check inbox & spam folder!
      </div>
    </div>
  );
};

export default QuickEmailTest;
