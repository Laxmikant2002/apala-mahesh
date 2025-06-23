import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './IssueDetail.css'; // We can reuse the same CSS

const RaiseIssue: React.FC = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instituteName, setInstituteName] = useState('');
  const [issueTitle, setIssueTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [submitStatus, setSubmitStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
  }>({
    submitted: false,
    success: false,
    message: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !issueTitle || !description) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.'
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Please enter a valid email address.'
      });
      return;
    }
    
    // In a real app, you would send the form data to a server here
    console.log('Submitting generic issue:', {
      name,
      email,
      instituteName,
      issueTitle,
      description,
      location
    });
    
    // Show success message
    setSubmitStatus({
      submitted: true,
      success: true,
      message: 'Thank you for reporting this issue. We will review it and take appropriate action.'
    });
    
    // Reset form
    setName('');
    setEmail('');
    setInstituteName('');
    setIssueTitle('');
    setDescription('');
    setLocation('');
  };
  
  return (
    <section className="issue-detail-section">
      <div className="issue-detail-container">
        <div className="issue-header" style={{ padding: '20px 30px' }}>
          <h2 className="issue-title">Raise an Issue</h2>
          <p className="issue-description">
            Help us address educational challenges by sharing your experience. 
            Your report will be reviewed by our team and may be used to advocate for change.
          </p>
        </div>
        
        <div className="issue-form-container">
          {submitStatus.submitted && (
            <div className={`form-message ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <form className="issue-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name *</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Your Email *</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="instituteName">Institute/College/Organization Name</label>
              <input
                type="text"
                id="instituteName"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                placeholder="Enter your institute, college, or organization name"
                aria-label="Institute, College, or Organization Name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State (optional)"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="issueTitle">Issue Title *</label>
              <input
                type="text"
                id="issueTitle"
                value={issueTitle}
                onChange={(e) => setIssueTitle(e.target.value)}
                placeholder="Enter a brief title for the issue"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Describe Your Experience *</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                placeholder="Please describe how this issue has affected you or others you know"
                required
              ></textarea>
            </div>
            
            <div className="form-actions">
              <Link to="/" className="back-link">Back to Home</Link>
              <button type="submit" className="submit-button">Submit Report</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RaiseIssue;