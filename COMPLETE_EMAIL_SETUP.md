# 📧 Complete Email Setup for Admin Notifications

## 🎯 **GOAL**: When users submit forms → Admin receives email at `nsuimahaforyou@gmail.com`

## ✅ **CURRENT STATUS**
- ✅ Email system is **ALREADY BUILT** and working
- ✅ All forms are **ALREADY CONNECTED** to email service
- ✅ Admin email is configured: `nsuimahaforyou@gmail.com`
- ⚙️ Just need to **configure email provider** in `.env` file

## 🔧 **SETUP (Choose ONE option)**

### Option 1: Brevo API (Recommended - Best for production)

**Step 1:** Get Brevo API Key
1. Go to [brevo.com](https://www.brevo.com) and create free account
2. Navigate to: **Account Settings → SMTP & API → API Keys**
3. Click **"Generate a new API key"**
4. Copy the API key

**Step 2:** Add to `.env` file
```env
# Add this line to your .env file
REACT_APP_BREVO_API_KEY=xkeysib-your-api-key-here
```

**Step 3:** Restart server
```bash
npm start
```

### Option 2: Gmail SMTP (Good for testing)

**Step 1:** Enable App Password
1. Enable **2-Factor Authentication** on your Gmail account
2. Go to: **Google Account → Security → App passwords**
3. Select **"Mail"** and generate password
4. Copy the 16-character password

**Step 2:** Add to `.env` file
```env
# Add these lines to your .env file
REACT_APP_GMAIL_USER=your_gmail@gmail.com
REACT_APP_GMAIL_APP_PASSWORD=your-16-character-app-password
```

**Step 3:** Restart server
```bash
npm start
```

## 📝 **How It Works**

### 1. **Form Submission Flow:**
```
User fills form → Submit button → emailService.sendEmail() → 
→ unifiedEmailService.sendFormEmail() → Brevo API OR Backend SMTP → 
→ Email sent to nsuimahaforyou@gmail.com
```

### 2. **Forms That Send Admin Notifications:**

**Contact Form** (`/` homepage - scroll to contact section)
- User message → Admin notification

**Raise Issue Form** (`/raise-issue`)
- Issue report → Admin notification with details

**Join Movement Form** (`/` homepage - scroll to join section)
- Volunteer registration → Admin notification

### 3. **Email Content Example:**
```
To: nsuimahaforyou@gmail.com
From: Aapla Mahesh Team <contact@aaplamahesh.org>
Subject: [AAPLA MAHESH] New Issue Report: Hostel Fee Issue

Name: John Student
Email: john@student.edu
Form Type: Issue Report
Institute: ABC College
Location: Mumbai

Issue: Hostel Fee Issue
Description: The hostel is charging excessive fees without proper justification...

---
Submitted via Aapla Mahesh Website
```

## 🧪 **Testing Your Setup**

### Quick Test:
1. Add email provider to `.env`
2. Restart server: `npm start`
3. Go to: `http://localhost:3000/raise-issue`
4. Fill and submit form
5. Check `nsuimahaforyou@gmail.com` inbox (and spam folder)

### Advanced Test:
1. Add `EmailTestForm` component (see QUICK_EMAIL_TEST.md)
2. Visit: `http://localhost:3000/email-test`
3. Use quick test button

## 🔍 **Troubleshooting**

### No emails received?
1. **Check spam folder** - New email systems often go to spam
2. **Verify API key** - Make sure it's copied correctly
3. **Restart server** - Always restart after changing `.env`
4. **Check browser console** - Look for error messages

### Brevo errors?
1. **Verify account** - Confirm Brevo account is active
2. **Check API key permissions** - Ensure it has send permissions
3. **Verify sender email** - Add `contact@aaplamahesh.org` to Brevo

### Gmail errors?
1. **App password** - Use app password, not regular password
2. **2FA required** - Gmail requires 2-factor authentication
3. **Less secure apps** - May need to enable in Gmail settings

## 📊 **Current Configuration**

Your `.env` file should look like this:

```env
# REQUIRED - Admin email (already configured)
REACT_APP_RECIPIENT_EMAIL=nsuimahaforyou@gmail.com
REACT_APP_SENDER_NAME=Aapla Mahesh Team
REACT_APP_SENDER_EMAIL=contact@aaplamahesh.org

# CHOOSE ONE EMAIL PROVIDER:

# Option A: Brevo (recommended)
REACT_APP_BREVO_API_KEY=your_brevo_api_key_here

# Option B: Gmail SMTP
# REACT_APP_GMAIL_USER=your_gmail@gmail.com
# REACT_APP_GMAIL_APP_PASSWORD=your_gmail_app_password
```

## 🚀 **You're Ready!**

Your email system is **completely functional**. Just:

1. ✅ Choose email provider (Brevo recommended)
2. ✅ Add credentials to `.env` file  
3. ✅ Restart server
4. ✅ Test with any form submission
5. ✅ Admin receives notifications automatically!

---

**Need help?** Check browser console for errors or contact developer.
