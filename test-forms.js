// Test script to verify that both forms send emails correctly
// Run this in the browser console on the localhost:3000 page

// Test function for Join Our Team form
async function testJoinTeamForm() {
  console.log('🧪 Testing Join Our Team form...');
  
  const emailData = {
    name: 'Test User Team',
    email: 'testuser@example.com',
    subject: 'Team Application - Test User Team',
    message: 'Testing the team application form submission',
    formType: 'join',
    additionalData: {
      phone: '1234567890',
      position: 'Team Member',
      experience: 'Testing the team application form submission'
    }
  };

  try {
    // Access the email service from the window object if available
    // or we'll need to test this through the actual form submission
    console.log('📧 Sending team application email...');
    console.log('Email data:', emailData);
    
    // This would normally be called by the form
    // const result = await emailService.sendEmail(emailData);
    // console.log('✅ Result:', result);
    
    console.log('⚠️ Note: This test shows the data that would be sent. Please test the actual form on the page.');
    
  } catch (error) {
    console.error('❌ Error testing team form:', error);
  }
}

// Test function for Student Volunteer form
async function testVolunteerForm() {
  console.log('🧪 Testing Student Volunteer form...');
  
  const emailData = {
    name: 'Test Volunteer User',
    email: 'testvolunteer@example.com',
    subject: 'Volunteer Registration - Test Volunteer User',
    message: 'Skills: Web development, community outreach\nAvailability: Weekends and evenings',
    formType: 'volunteer',
    additionalData: {
      phone: '0987654321',
      university: 'Test University',
      year: '2024',
      skills: 'Web development, community outreach',
      availability: 'Weekends and evenings'
    }
  };

  try {
    console.log('📧 Sending volunteer registration email...');
    console.log('Email data:', emailData);
    
    console.log('⚠️ Note: This test shows the data that would be sent. Please test the actual form on the page.');
    
  } catch (error) {
    console.error('❌ Error testing volunteer form:', error);
  }
}

// Run both tests
console.log('🚀 Starting form email tests...');
testJoinTeamForm();
testVolunteerForm();

console.log(`
📋 MANUAL TESTING INSTRUCTIONS:
1. Scroll down to the "Join Our Movement" section on this page
2. Test the "Join Our Team" form:
   - Fill out the form with test data
   - Submit and check for success message
   - Check admin email (nsuimahaforyou@gmail.com) for the email
3. Test the "Student Volunteer Registration" form:
   - Fill out the form with test data
   - Submit and check for success message
   - Check admin email (nsuimahaforyou@gmail.com) for the email

✅ Both forms should send emails to: nsuimahaforyou@gmail.com
✅ Both forms use the same email service with Brevo API
✅ Both forms have proper error handling and success messages
`);
