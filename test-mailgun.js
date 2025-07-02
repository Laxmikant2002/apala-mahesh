// Test script for Mailgun email service
// This script will test both the simple message and formatted email functions

const FormData = require("form-data");
const Mailgun = require("mailgun.js");

// Load environment variables
require('dotenv').config();

async function testMailgunIntegration() {
  console.log('🧪 Starting Mailgun Integration Test...\n');

  // Initialize Mailgun
  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.REACT_APP_MAILGUN_API_KEY || process.env.API_KEY,
  });

  const domain = process.env.REACT_APP_MAILGUN_DOMAIN || process.env.MAILGUN_DOMAIN;
  const recipientEmail = process.env.REACT_APP_RECIPIENT_EMAIL || process.env.RECIPIENT_EMAIL;

  console.log('📋 Configuration:');
  console.log(`Domain: ${domain}`);
  console.log(`Recipient: ${recipientEmail}`);
  console.log(`API Key: ${process.env.REACT_APP_MAILGUN_API_KEY ? 'Found' : 'Missing'}\n`);

  // Test 1: Simple message (like your original example)
  console.log('🚀 Test 1: Sending simple test message...');
  try {
    const simpleMessageData = await mg.messages.create(domain, {
      from: `Mailgun Sandbox <postmaster@${domain}>`,
      to: [`Mahesh Kamble <${recipientEmail}>`],
      subject: "Hello from Aapla Mahesh - Test Email",
      text: "Congratulations! Your Mailgun integration is working correctly. This is a test email from the Aapla Mahesh website.",
    });

    console.log('✅ Simple message sent successfully!');
    console.log('📧 Message ID:', simpleMessageData.id);
    console.log('📤 Status:', simpleMessageData.message);
  } catch (error) {
    console.error('❌ Failed to send simple message:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Formatted HTML email
  console.log('🚀 Test 2: Sending formatted HTML email...');
  try {
    const htmlMessageData = await mg.messages.create(domain, {
      from: `Aapla Mahesh <noreply@${domain}>`,
      to: recipientEmail,
      subject: "🎉 Mailgun Integration Test - HTML Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
            🎯 Mailgun Integration Test Successful!
          </h2>
          <p>Dear Mahesh,</p>
          <p>This is a test email to confirm that your <strong>Aapla Mahesh</strong> website's Mailgun integration is working perfectly!</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #27ae60; margin-top: 0;">✅ Test Results:</h3>
            <ul>
              <li>✅ Mailgun API connection successful</li>
              <li>✅ Email delivery working</li>
              <li>✅ HTML formatting supported</li>
              <li>✅ Environment variables configured</li>
            </ul>
          </div>

          <p>Your email service is now ready to handle:</p>
          <ul>
            <li>🚨 Issue reports</li>
            <li>👥 Team applications</li>
            <li>🤝 Volunteer registrations</li>
            <li>📧 Contact form submissions</li>
          </ul>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>This email was sent from the Aapla Mahesh website using Mailgun.</p>
            <p>Test performed on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
        Mailgun Integration Test Successful!
        
        Dear Mahesh,
        
        This is a test email to confirm that your Aapla Mahesh website's Mailgun integration is working perfectly!
        
        Test Results:
        ✅ Mailgun API connection successful
        ✅ Email delivery working
        ✅ HTML formatting supported
        ✅ Environment variables configured
        
        Your email service is now ready to handle:
        - Issue reports
        - Team applications
        - Volunteer registrations
        - Contact form submissions
        
        This email was sent from the Aapla Mahesh website using Mailgun.
        Test performed on: ${new Date().toLocaleString()}
      `
    });

    console.log('✅ HTML email sent successfully!');
    console.log('📧 Message ID:', htmlMessageData.id);
    console.log('📤 Status:', htmlMessageData.message);
  } catch (error) {
    console.error('❌ Failed to send HTML email:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Contact form simulation
  console.log('🚀 Test 3: Simulating contact form submission...');
  try {
    const contactFormData = await mg.messages.create(domain, {
      from: `Aapla Mahesh Contact Form <noreply@${domain}>`,
      to: recipientEmail,
      subject: "📧 New Contact Form Submission - Test",
      html: `
        <h2>New Contact Form Submission from Aapla Mahesh Website</h2>
        <p><strong>Name:</strong> Test User</p>
        <p><strong>Email:</strong> test@example.com</p>
        <p><strong>Subject:</strong> Testing Mailgun Integration</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          Hello! I am testing the contact form functionality of the Aapla Mahesh website. 
          This message confirms that the Mailgun integration is working correctly for contact form submissions.
        </div>
        <hr>
        <p><small>This email was sent from the Aapla Mahesh website contact form.</small></p>
      `,
      text: `
        New Contact Form Submission from Aapla Mahesh Website
        
        Name: Test User
        Email: test@example.com
        Subject: Testing Mailgun Integration
        
        Message:
        Hello! I am testing the contact form functionality of the Aapla Mahesh website. 
        This message confirms that the Mailgun integration is working correctly for contact form submissions.
        
        This email was sent from the Aapla Mahesh website contact form.
      `
    });

    console.log('✅ Contact form email sent successfully!');
    console.log('📧 Message ID:', contactFormData.id);
    console.log('📤 Status:', contactFormData.message);
  } catch (error) {
    console.error('❌ Failed to send contact form email:');
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }

  console.log('\n' + '🎉 Mailgun Integration Test Complete! 🎉');
  console.log('📬 Please check your inbox at:', recipientEmail);
  console.log('📝 Note: If using sandbox domain, make sure the recipient email is authorized in Mailgun dashboard.');
}

// Run the test
testMailgunIntegration().catch(console.error);
