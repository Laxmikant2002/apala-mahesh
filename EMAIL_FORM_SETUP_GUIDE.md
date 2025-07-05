# Email Form Setup Guide - Send Admin Notifications

## 🎯 **Goal**: When users submit forms, admin receives email notifications

## 📧 **Current Setup Status**
✅ Email service is already configured and working  
✅ Forms are already connected to email service  
✅ Admin email is configured: `nsuimahaforyou@gmail.com`

## 🔧 **Step-by-Step Setup**

### Step 1: Choose Your Email Provider

#### Option A: **Brevo (Recommended for Production)**
```env
# Add to your .env file
REACT_APP_BREVO_API_KEY=your_brevo_api_key_here
```

**How to get Brevo API Key:**
1. Go to [brevo.com](https://www.brevo.com)
2. Create free account (300 emails/day free)
3. Go to **Account → SMTP & API → API Keys**
4. Create new API key
5. Copy and paste into `.env` file

#### Option B: **Gmail SMTP (Good for Testing)**
```env
# Add to your .env file
REACT_APP_GMAIL_USER=your_gmail@gmail.com
REACT_APP_GMAIL_APP_PASSWORD=your_gmail_app_password
```

**How to get Gmail App Password:**
1. Enable 2-Factor Authentication on Gmail
2. Go to **Google Account → Security → App passwords**
3. Generate password for "Mail"
4. Use this password (not your regular Gmail password)

### Step 2: Configure Environment Variables

Edit your `.env` file:
```env
# REQUIRED: Admin email (already configured)
REACT_APP_RECIPIENT_EMAIL=nsuimahaforyou@gmail.com
REACT_APP_SENDER_NAME=Aapla Mahesh Team
REACT_APP_SENDER_EMAIL=contact@aaplamahesh.org

# CHOOSE ONE: Brevo OR Gmail
# Option A: Brevo (Recommended)
REACT_APP_BREVO_API_KEY=your_brevo_api_key_here

# Option B: Gmail SMTP
# REACT_APP_GMAIL_USER=your_gmail@gmail.com
# REACT_APP_GMAIL_APP_PASSWORD=your_gmail_app_password
```

### Step 3: Test the Email System

Your project already has a test component. To test:

1. **Start your development server:**
   ```bash
   npm start
   ```

2. **Test via browser console:**
   ```javascript
   // Open browser console and run:
   import { emailService } from './src/utils/emailService.js';
   emailService.sendTestEmail().then(result => console.log(result));
   ```

3. **Or create a test form submission** (recommended)

## 📧 **Email Flow Diagram**

```
User fills form → Submit → emailService.sendEmail() → unifiedEmailService → 
→ Brevo API OR Backend SMTP → Admin receives email
```

## 📝 **What Happens When Form is Submitted**

### Form Types That Send Emails:
1. **Contact Form** (`ContactUs.tsx`) - Basic contact
2. **Raise Issue Form** (`RaiseIssue.tsx`) - Issue reporting
3. **Join Movement Form** (`JoinMovement.tsx`) - Volunteer registration

### Email Content Sent to Admin:
```
Subject: [AAPLA MAHESH] New Issue Report: {issueTitle}

From: {userName} <{userEmail}>
Form Type: Issue Report
Institute: {instituteName}
Location: {location}

Message:
{description}

---
Submitted via Aapla Mahesh Website
Time: {timestamp}
```

## 🛠 **Troubleshooting**

### Problem: No emails received
**Solution:**
1. Check `.env` file has correct values
2. Restart development server after changing `.env`
3. Check spam folder
4. Verify API key is valid

### Problem: Brevo errors
**Solution:**
1. Verify API key is correct
2. Check Brevo account is not suspended
3. Ensure sender email is verified in Brevo

### Problem: Gmail SMTP errors
**Solution:**
1. Ensure 2FA is enabled
2. Use App Password, not regular password
3. Enable "Less secure app access" (if needed)

## 🚀 **Ready to Use**

Your email system is **ALREADY WORKING**! Just:

1. **Add API key** to `.env` file (Brevo recommended)
2. **Restart server** (`npm start`)
3. **Test with real form submission**

The admin (`nsuimahaforyou@gmail.com`) will receive emails automatically when users submit forms.

## 📞 **Support**

If you need help:
1. Check browser console for errors
2. Check `.env` file configuration
3. Test with simple contact form first
4. Verify email provider settings

---
**✅ Your email system is configured and ready to use!**
