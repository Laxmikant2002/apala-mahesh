# Quick Email Test Setup

## 🚀 How to Test Your Email Configuration

### Step 1: Add the Test Form to Your App

Open `src/App.tsx` and add this line after the other lazy imports:

```tsx
const EmailTestForm = lazy(() => import('./components/EmailTestForm'));
```

Then add a test route in your Routes section:

```tsx
<Route path="/email-test" element={<EmailTestForm />} />
```

### Step 2: Configure Email Provider

Edit your `.env` file and add ONE of these options:

#### Option A: Brevo (Recommended)
```env
REACT_APP_BREVO_API_KEY=your_brevo_api_key_here
```

#### Option B: Gmail SMTP
```env
REACT_APP_GMAIL_USER=your_gmail@gmail.com
REACT_APP_GMAIL_APP_PASSWORD=your_gmail_app_password
```

### Step 3: Test It

1. **Restart your server:**
   ```bash
   npm start
   ```

2. **Visit the test page:**
   ```
   http://localhost:3000/email-test
   ```

3. **Click "Quick Test Email" or fill the form**

4. **Check admin email:** `nsuimahaforyou@gmail.com`

## ✅ Your Forms Are Already Working!

Your existing forms already send emails to admin:

- **Contact Form** → http://localhost:3000#contact
- **Raise Issue Form** → http://localhost:3000/raise-issue
- **Join Movement Form** → http://localhost:3000#join

Just configure an email provider in `.env` and restart the server.

## 🔧 Email Provider Setup

### Brevo (Free - 300 emails/day)
1. Go to https://www.brevo.com
2. Create account
3. Go to **Account → SMTP & API → API Keys**
4. Create new API key
5. Add to `.env` file

### Gmail (For testing)
1. Enable 2-Factor Authentication
2. Go to **Google Account → Security → App passwords**
3. Generate password for "Mail"
4. Add credentials to `.env` file

---

**💡 Remember:** Restart server after changing `.env` file!
