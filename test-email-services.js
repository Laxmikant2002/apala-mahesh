#!/usr/bin/env node

// Email Services Test Script
// Run this script to test your email configuration

const { unifiedEmailService } = require('./src/utils/unifiedEmailService');
const { campaignManager } = require('./src/utils/campaignManager');

async function runEmailTests() {
  console.log('🚀 Starting Email Services Test...\n');

  // Test 1: Check provider status
  console.log('📊 Checking provider status...');
  try {
    const status = unifiedEmailService.getProviderStatus();
    console.log('✅ Brevo configured:', status.brevo.configured);
    console.log('✅ Nodemailer configured:', status.nodemailer.configured);
    console.log('✅ Active provider:', status.active);
    console.log('');
  } catch (error) {
    console.error('❌ Error checking status:', error.message);
  }

  // Test 2: Test email providers
  console.log('🧪 Testing email providers...');
  try {
    const testResults = await unifiedEmailService.testEmailSetup();
    
    console.log('📧 Brevo test:', testResults.brevo.success ? '✅ PASS' : '❌ FAIL');
    if (!testResults.brevo.success) {
      console.log('   Error:', testResults.brevo.message);
    }
    
    console.log('📧 Nodemailer test:', testResults.nodemailer.success ? '✅ PASS' : '❌ FAIL');
    if (!testResults.nodemailer.success) {
      console.log('   Error:', testResults.nodemailer.message);
    }
    console.log('');
  } catch (error) {
    console.error('❌ Error testing providers:', error.message);
  }

  // Test 3: Send a form submission email
  console.log('📝 Testing form submission email...');
  try {
    const formData = {
      name: 'Test Student',
      email: 'test@university.edu',
      subject: 'Test Issue Report',
      message: 'This is a test message to verify that form submissions are working correctly.',
      formType: 'issue',
      additionalData: {
        instituteName: 'Test University',
        location: 'Test City'
      }
    };

    const result = await unifiedEmailService.sendFormEmail(formData);
    console.log('📧 Form email test:', result.success ? '✅ PASS' : '❌ FAIL');
    console.log('   Message:', result.message);
    console.log('');
  } catch (error) {
    console.error('❌ Error testing form email:', error.message);
  }

  // Test 4: Send a quick announcement
  console.log('📢 Testing quick announcement...');
  try {
    const result = await campaignManager.sendQuickAnnouncement(
      'Test Announcement',
      'This is a test announcement to verify that our email campaign system is working correctly.',
      ['test@example.com'],
      {
        urgent: false,
        includeCallToAction: true,
        actionUrl: 'https://aaplamahesh.org',
        actionText: 'Visit Website'
      }
    );
    
    console.log('📧 Announcement test:', result.success ? '✅ PASS' : '❌ FAIL');
    console.log('   Message:', result.message);
    console.log('');
  } catch (error) {
    console.error('❌ Error testing announcement:', error.message);
  }

  console.log('🎉 Email services test completed!');
}

// Environment check
function checkEnvironment() {
  console.log('🔍 Checking environment configuration...\n');
  
  const requiredVars = [
    'REACT_APP_SENDER_EMAIL',
    'REACT_APP_RECIPIENT_EMAIL'
  ];
  
  const optionalVars = [
    'REACT_APP_BREVO_API_KEY',
    'REACT_APP_GMAIL_USER',
    'REACT_APP_GMAIL_APP_PASSWORD',
    'REACT_APP_SMTP_HOST'
  ];
  
  console.log('📋 Required variables:');
  requiredVars.forEach(varName => {
    const isSet = !!process.env[varName];
    console.log(`  ${isSet ? '✅' : '❌'} ${varName}: ${isSet ? 'Set' : 'Not set'}`);
  });
  
  console.log('\n📋 Email provider variables:');
  optionalVars.forEach(varName => {
    const isSet = !!process.env[varName];
    console.log(`  ${isSet ? '✅' : '⚪'} ${varName}: ${isSet ? 'Set' : 'Not set'}`);
  });
  
  console.log('\n💡 Tips:');
  console.log('  - Copy .env.example to .env and fill in your credentials');
  console.log('  - For Gmail, use App Passwords (not your regular password)');
  console.log('  - For Brevo, get your API key from app.brevo.com');
  console.log('  - At least one email provider should be configured\n');
}

// Main execution
async function main() {
  console.log('📧 Aapla Mahesh Email Services Test\n');
  console.log('==================================\n');
  
  checkEnvironment();
  await runEmailTests();
}

if (require.main === module) {
  main().catch(error => {
    console.error('❌ Test script failed:', error);
    process.exit(1);
  });
}

module.exports = { main, runEmailTests, checkEnvironment };
