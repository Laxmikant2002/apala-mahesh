// Comprehensive test script for all forms in Aapla Mahesh website
// This will test: Join Team, Volunteer, Issue Report, Key Issues, and Contact forms

const FormData = require("form-data");
const Mailgun = require("mailgun.js");

// Load environment variables
require('dotenv').config();

async function testAllForms() {
  console.log('🧪 Testing All Forms Email Integration...\n');

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

  const tests = [
    {
      name: "Join Team Form",
      formType: "join",
      emoji: "👥",
      data: {
        name: "Mahesh Kamble",
        email: "mahesh.test@example.com",
        subject: "Application for Core Team Member",
        message: "I am interested in joining the Aapla Mahesh team as a core member. I have experience in student activism and community organizing.",
        additionalData: {
          position: "Core Team Member",
          skills: "Leadership, Communication, Event Management",
          experience: "2 years in student organizations"
        }
      }
    },
    {
      name: "Volunteer Form",
      formType: "volunteer",
      emoji: "🤝",
      data: {
        name: "Priya Sharma",
        email: "priya.volunteer@example.com",
        subject: "Volunteer Application",
        message: "I would like to volunteer for the Aapla Mahesh movement. I am passionate about student rights and social justice.",
        additionalData: {
          university: "Mumbai University",
          availability: "Weekends and Evenings",
          skills: "Social Media, Content Writing, Event Coordination"
        }
      }
    },
    {
      name: "Issue Report Form",
      formType: "issue",
      emoji: "🚨",
      data: {
        name: "Rahul Patil",
        email: "rahul.student@example.com",
        subject: "Fee Hike Without Proper Notice",
        message: "Our college has increased fees by 30% without giving proper notice or justification. Students are facing financial difficulties.",
        additionalData: {
          instituteName: "ABC Engineering College",
          location: "Pune, Maharashtra"
        }
      }
    },
    {
      name: "Key Issues Form",
      formType: "issue",
      emoji: "🎯",
      data: {
        name: "Sneha Desai",
        email: "sneha.activist@example.com",
        subject: "Lack of Mental Health Support in Colleges",
        message: "Many students are struggling with mental health issues but colleges lack proper counseling services and support systems.",
        additionalData: {
          instituteName: "XYZ Arts College",
          location: "Mumbai, Maharashtra"
        }
      }
    },
    {
      name: "Contact Form",
      formType: "contact",
      emoji: "📧",
      data: {
        name: "Arjun Mehta",
        email: "arjun.query@example.com",
        subject: "Media Collaboration Inquiry",
        message: "I am a journalist interested in covering the Aapla Mahesh movement. Would like to schedule an interview.",
        additionalData: {}
      }
    }
  ];

  // Function to generate email content based on form type
  function generateEmailContent(formType, data) {
    const { name, email, subject, message, additionalData } = data;
    
    let emailSubject = '';
    let emailBody = '';
    
    switch (formType) {
      case 'issue':
        emailSubject = `🚨 New Issue Reported: ${subject}`;
        emailBody = `
          <h2>New Issue Report from Aapla Mahesh Website</h2>
          <p><strong>Reporter:</strong> ${name} (${email})</p>
          <p><strong>Issue Title:</strong> ${subject}</p>
          <p><strong>Institute:</strong> ${additionalData?.instituteName || 'Not specified'}</p>
          <p><strong>Location:</strong> ${additionalData?.location || 'Not specified'}</p>
          <p><strong>Description:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>This email was sent from the Aapla Mahesh website issue form.</small></p>
        `;
        break;
        
      case 'join':
        emailSubject = `👥 New Team Application: ${name}`;
        emailBody = `
          <h2>New Team Application from Aapla Mahesh Website</h2>
          <p><strong>Applicant:</strong> ${name} (${email})</p>
          <p><strong>Position:</strong> ${additionalData?.position || 'Not specified'}</p>
          <p><strong>Skills:</strong> ${additionalData?.skills || 'Not specified'}</p>
          <p><strong>Experience:</strong> ${additionalData?.experience || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>This email was sent from the Aapla Mahesh website join form.</small></p>
        `;
        break;
        
      case 'volunteer':
        emailSubject = `🤝 New Volunteer Application: ${name}`;
        emailBody = `
          <h2>New Volunteer Application from Aapla Mahesh Website</h2>
          <p><strong>Volunteer:</strong> ${name} (${email})</p>
          <p><strong>University/College:</strong> ${additionalData?.university || 'Not specified'}</p>
          <p><strong>Available Time:</strong> ${additionalData?.availability || 'Not specified'}</p>
          <p><strong>Skills:</strong> ${additionalData?.skills || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>This email was sent from the Aapla Mahesh website volunteer form.</small></p>
        `;
        break;
        
      case 'contact':
        emailSubject = `📧 Contact Form: ${subject}`;
        emailBody = `
          <h2>New Contact Form Submission from Aapla Mahesh Website</h2>
          <p><strong>Name:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr>
          <p><small>This email was sent from the Aapla Mahesh website contact form.</small></p>
        `;
        break;
    }

    const textVersion = emailBody.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');

    return { subject: emailSubject, html: emailBody, text: textVersion };
  }

  // Test each form
  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    console.log(`${test.emoji} Test ${i + 1}: Testing ${test.name}...`);
    
    try {
      const emailContent = generateEmailContent(test.formType, test.data);
      
      const messageData = {
        from: `Aapla Mahesh <noreply@${domain}>`,
        to: recipientEmail,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text
      };

      const result = await mg.messages.create(domain, messageData);
      
      console.log(`✅ ${test.name} email sent successfully!`);
      console.log(`📧 Message ID: ${result.id}`);
      console.log(`📤 Status: ${result.message}`);
      console.log(`📋 Subject: ${emailContent.subject}`);
      
    } catch (error) {
      console.error(`❌ Failed to send ${test.name} email:`);
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response:', error.response.data);
      }
    }
    
    console.log('\n' + '-'.repeat(60) + '\n');
    
    // Add a small delay between tests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('🎉 All Form Tests Complete! 🎉');
  console.log('📬 Please check your inbox at:', recipientEmail);
  console.log('\n📊 Test Summary:');
  console.log(`✅ Tested ${tests.length} different form types:`);
  tests.forEach((test, index) => {
    console.log(`   ${test.emoji} ${index + 1}. ${test.name}`);
  });
  console.log('\n📝 Note: If using sandbox domain, make sure the recipient email is authorized in Mailgun dashboard.');
}

// Run all form tests
testAllForms().catch(console.error);
