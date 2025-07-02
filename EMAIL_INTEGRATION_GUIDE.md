# Email Service Setup Guide

This guide explains how to set up and use the email services in your Aapla Mahesh React application.

## Overview

The project includes two email service implementations:

1. **Frontend Email Service** (`emailService.ts`) - For client-side React usage (simulated)
2. **Backend Email Service** (`backendEmailService.ts`) - For server-side Node.js usage with actual Mailgun integration

## Quick Start

### 1. Environment Variables

Update your `.env` file with your actual Mailgun credentials:

```env
# Mailgun Configuration
REACT_APP_MAILGUN_DOMAIN=sandboxec4aa7eb6c304457a308afce4514bcf1.mailgun.org
REACT_APP_MAILGUN_API_KEY=your_actual_mailgun_api_key_here
REACT_APP_RECIPIENT_EMAIL=nilangekarmahi1@gmail.com

# Backend environment variables (for Node.js backend)
MAILGUN_DOMAIN=sandboxec4aa7eb6c304457a308afce4514bcf1.mailgun.org
MAILGUN_API_KEY=your_actual_mailgun_api_key_here
API_KEY=your_actual_mailgun_api_key_here
RECIPIENT_EMAIL=nilangekarmahi1@gmail.com
```

### 2. Getting Your Mailgun API Key

1. Log in to your Mailgun account
2. Go to Settings > API Keys
3. Copy your Private API key
4. Replace `your_actual_mailgun_api_key_here` in your `.env` file

### 3. Frontend Usage (React)

```typescript
import { emailService } from './utils/emailService';

const handleSubmit = async (formData) => {
  const emailData = {
    name: formData.name,
    email: formData.email,
    subject: formData.subject,
    message: formData.message,
    formType: 'contact', // 'issue', 'join', 'volunteer', 'contact'
    additionalData: formData.additionalData
  };

  const result = await emailService.sendEmail(emailData);
  if (result.success) {
    alert('Email sent successfully!');
  } else {
    alert('Failed to send email: ' + result.message);
  }
};
```

### 4. Backend Usage (Node.js)

For actual email sending, you'll need a backend API:

```typescript
import { backendEmailService, sendSimpleMessage } from './utils/backendEmailService';

// Send a simple test message (like your example)
const testResult = await sendSimpleMessage();
console.log(testResult);

// Send a formatted email
const emailData = {
  name: 'Mahesh Kamble',
  email: 'nilangekarmahi1@gmail.com',
  subject: 'Test Email',
  message: 'This is a test message',
  formType: 'contact'
};

const result = await backendEmailService.sendEmail(emailData);
console.log(result);
```

## API Reference

### EmailData Interface

```typescript
interface EmailData {
  name: string;              // Sender's name
  email: string;             // Sender's email
  subject: string;           // Email subject
  message: string;           // Email message body
  formType: 'issue' | 'join' | 'volunteer' | 'contact'; // Type of form
  additionalData?: any;      // Additional form-specific data
}
```

### Form Types

- **issue**: For reporting issues/problems
- **join**: For team applications
- **volunteer**: For volunteer applications
- **contact**: For general contact forms

### Methods

#### `sendEmail(emailData: EmailData)`

Sends an email with the provided data.

**Returns:** `Promise<{ success: boolean; message: string; data?: any }>`

#### `sendTestEmail()`

Sends a test email to verify the service is working.

**Returns:** `Promise<{ success: boolean; message: string; data?: any }>`

#### `sendSimpleMessage()` (Backend only)

Sends a simple test message like your original example.

**Returns:** `Promise<{ success: boolean; message: string; data?: any }>`

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never expose your Mailgun API key in client-side code**
2. **The frontend service is for demonstration only**
3. **In production, use a backend API to handle email sending**
4. **Store sensitive credentials in environment variables**

## Production Setup

For production, you should:

1. Create a backend API endpoint (e.g., `/api/send-email`)
2. Use the `backendEmailService` on your server
3. Have your React app call your backend API instead of using Mailgun directly
4. Validate and sanitize all inputs on the backend

### Example Backend API (Express.js)

```javascript
const express = require('express');
const { backendEmailService } = require('./utils/backendEmailService');

const app = express();
app.use(express.json());

app.post('/api/send-email', async (req, res) => {
  try {
    const result = await backendEmailService.sendEmail(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
```

### Example Frontend API Call

```typescript
const sendEmail = async (emailData) => {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(emailData)
  });
  return await response.json();
};
```

## Testing

Use the provided examples to test your email setup:

```typescript
import { testFrontendEmail, testBackendEmail } from './utils/emailExamples';

// Test frontend (simulated)
await testFrontendEmail();

// Test backend (actual Mailgun)
await testBackendEmail();
```

## Troubleshooting

### Common Issues

1. **"Cannot find module 'mailgun.js'"**
   - Run `npm install` to install dependencies

2. **"Mailgun not configured"**
   - Check your `.env` file and API key

3. **"403 Forbidden"**
   - Verify your API key is correct
   - Check your Mailgun domain settings

4. **Emails not being received**
   - Check spam/junk folders
   - Verify recipient email address
   - Check Mailgun logs in your dashboard

### Mailgun Sandbox Limitations

If using a sandbox domain:
- You can only send emails to authorized recipients
- Add recipient emails in your Mailgun dashboard under "Authorized Recipients"

## Migration from Your Original Code

Your original Mailgun code has been integrated into the `backendEmailService`. The main changes:

1. **Structured as a class** for better organization
2. **Added form-specific email templates** for different types of submissions
3. **Proper error handling** and response formatting
4. **Environment variable management** for different deployment scenarios
5. **TypeScript support** for better development experience

The core functionality remains the same - your `sendSimpleMessage` function is available and works exactly as before.
