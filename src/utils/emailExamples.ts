// Example usage of the email services
// This file demonstrates how to use both the frontend and backend email services

import { emailService } from './emailService';
import { backendEmailService, sendSimpleMessage } from './backendEmailService';

// Example 1: Frontend email service (simulated)
export async function testFrontendEmail() {
  console.log('Testing frontend email service...');
  
  const emailData = {
    name: 'Mahesh Kamble',
    email: 'nilangekarmahi1@gmail.com',
    subject: 'Test Issue Report',
    message: 'This is a test issue report from the Aapla Mahesh website.',
    formType: 'issue' as const,
    additionalData: {
      instituteName: 'Test University',
      location: 'Mumbai, Maharashtra'
    }
  };

  try {
    const result = await emailService.sendEmail(emailData);
    console.log('Frontend email result:', result);
    return result;
  } catch (error) {
    console.error('Error sending frontend email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}

// Example 2: Backend email service (actual Mailgun integration)
// Note: This will only work in a Node.js environment with proper environment variables
export async function testBackendEmail() {
  console.log('Testing backend email service...');
  
  try {
    // Test the simple message function (like your example)
    const simpleResult = await sendSimpleMessage();
    console.log('Simple message result:', simpleResult);
    
    // Test the full email service
    const emailData = {
      name: 'Mahesh Kamble',
      email: 'nilangekarmahi1@gmail.com',
      subject: 'Test Contact Form',
      message: 'This is a test contact form submission from the Aapla Mahesh website using actual Mailgun integration.',
      formType: 'contact' as const
    };

    const result = await backendEmailService.sendEmail(emailData);
    console.log('Backend email result:', result);
    return result;
  } catch (error) {
    console.error('Error sending backend email:', error);
    return { success: false, message: 'Failed to send email' };
  }
}

// Example 3: Test email function
export async function testEmailFunction() {
  console.log('Testing email test function...');
  
  try {
    const result = await backendEmailService.sendTestEmail();
    console.log('Test email result:', result);
    return result;
  } catch (error) {
    console.error('Error sending test email:', error);
    return { success: false, message: 'Failed to send test email' };
  }
}

// Usage instructions:
// 
// 1. For frontend (React) usage:
//    import { testFrontendEmail } from './utils/emailExamples';
//    testFrontendEmail();
//
// 2. For backend (Node.js) usage:
//    Make sure to set your environment variables:
//    - MAILGUN_API_KEY or REACT_APP_MAILGUN_API_KEY
//    - MAILGUN_DOMAIN or REACT_APP_MAILGUN_DOMAIN
//    - RECIPIENT_EMAIL or REACT_APP_RECIPIENT_EMAIL
//
//    Then:
//    import { testBackendEmail } from './utils/emailExamples';
//    testBackendEmail();
//
// 3. To send the simple message like your example:
//    import { sendSimpleMessage } from './utils/backendEmailService';
//    sendSimpleMessage();
