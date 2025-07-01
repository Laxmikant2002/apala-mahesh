# Email Service Setup Guide

This guide will help you set up email functionality for the Aapla Mahesh website using Mailgun.

## Step 1: Mailgun Account Setup

1. **Sign up for Mailgun**
   - Go to [mailgun.com](https://mailgun.com)
   - Sign up for a free account
   - Verify your email address

2. **Domain Setup**
   - In Mailgun dashboard, go to "Sending" > "Domains"
   - Click "Add New Domain"
   - Enter your domain: `mg.yourdomain.com` (replace with your actual domain)
   - Choose your region (US or EU)
   - Click "Add Domain"

## Step 2: DNS Configuration

You need to add DNS records to your domain provider:

### Required DNS Records:
1. **TXT Record** (for domain verification)
   - Name: `yourdomain.com`
   - Value: `v=spf1 include:mailgun.org ~all`

2. **CNAME Records** (for tracking)
   - Name: `email.mg.yourdomain.com`
   - Value: `mailgun.org`

3. **MX Records** (for receiving)
   - Name: `mg.yourdomain.com`
   - Value: `mxa.mailgun.org` (Priority: 10)
   - Value: `mxb.mailgun.org` (Priority: 10)

4. **CNAME Record** (for DKIM)
   - You'll get specific DKIM values from Mailgun dashboard

## Step 3: Get API Credentials

1. In Mailgun dashboard, go to "Settings" > "API Keys"
2. Copy your **Private API Key**
3. Your domain will be `mg.yourdomain.com`

## Step 4: Configure Environment Variables

Update your `.env` file with the following:

```env
# Replace these with your actual values
REACT_APP_MAILGUN_DOMAIN=mg.yourdomain.com
REACT_APP_MAILGUN_API_KEY=your_private_api_key_here
REACT_APP_RECIPIENT_EMAIL=your-email@yourdomain.com
```

## Step 5: Verify Setup

1. Start your React app: `npm start`
2. You'll see an "Email Service Test" widget in the top-right corner
3. Check that all environment variables show as "✅ Set"
4. Click "Send Test Email" to verify everything works

## Step 6: Domain Verification

1. In Mailgun dashboard, check your domain status
2. It should show "Active" once DNS records are properly configured
3. This may take up to 24-48 hours for DNS propagation

## Step 7: Testing Forms

Once setup is complete, test all forms:

1. **Raise Issue Form** (`/raise-issue`)
   - Submit a test issue report
   - Check your email for the formatted issue report

2. **Join Team Form** (in Join Movement section)
   - Submit a test application
   - Check your email for the application details

3. **Volunteer Form** (in Join Movement section)
   - Submit a test volunteer registration
   - Check your email for volunteer details

## Troubleshooting

### Common Issues:

1. **"Domain not verified" error**
   - Check DNS records are correctly configured
   - Wait for DNS propagation (up to 48 hours)

2. **"API key invalid" error**
   - Verify you're using the Private API Key, not Public
   - Check for any extra spaces in the .env file

3. **Emails not being received**
   - Check spam/junk folder
   - Verify recipient email is correct
   - Test with a different email address

4. **Forms not submitting**
   - Check browser console for errors
   - Verify all environment variables are set
   - Test the email service using the test widget

### Email Template Customization

The email templates are in `src/utils/emailService.ts`. You can customize:
- Email subject lines
- HTML formatting
- Content structure
- Styling

## Security Notes

1. **Never commit `.env` file to version control**
2. **Use environment variables for all sensitive data**
3. **Regularly rotate API keys**
4. **Monitor email usage in Mailgun dashboard**

## Production Deployment

When deploying to production:

1. **Remove EmailTest component** from App.tsx
2. **Set environment variables** in your hosting platform
3. **Test all forms** after deployment
4. **Monitor email delivery** in Mailgun dashboard

## Free Tier Limits

Mailgun free tier includes:
- 5,000 emails per month for first 3 months
- 1,000 emails per month after that
- Email validation for first 100 emails

For higher volume, consider upgrading to a paid plan.

## Support

If you encounter issues:
1. Check Mailgun documentation: [documentation.mailgun.com](https://documentation.mailgun.com)
2. Contact Mailgun support
3. Review this setup guide again

---

**Remember**: Replace all placeholder values (yourdomain.com, API keys, etc.) with your actual values!
