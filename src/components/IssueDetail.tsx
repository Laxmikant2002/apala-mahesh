import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './IssueDetail.css';

// Interface for issue data
interface IssueDetailData {
  title: string;
  description: string;
  imageSrc: string;
}

// Map of issue IDs to their details
const issueDetails: Record<string, IssueDetailData> = {
  'academic-pressure-and-mental-health': {
    title: 'Academic Pressure and Mental Health',
    description: 'The intense academic environment in India, driven by competitive exams like JEE and NEET, places significant stress on students. Studies show that over 63.5% of high school students report stress due to academic pressure, with more than 12,500 student suicides linked to academic stress annually.',
    imageSrc: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  'financial-barriers': {
    title: 'Financial Barriers',
    description: 'Economic constraints limit access to quality education for many students. In 2023, education loans reached INR 90,000 crores, but only 4% of higher education students benefit. Private expenditure on education has increased by 1150% over the past decade.',
    imageSrc: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
  },
  'inadequate-educational-infrastructure': {
    title: 'Inadequate Educational Infrastructure',
    description: 'Overcrowded classrooms, lack of qualified teachers, and poor infrastructure in many schools hinder effective learning. The Class 10 dropout rate in 2021-22 was 20.6%, with states like Odisha (49.9%) and Bihar (42.1%) reporting significantly higher rates.',
    imageSrc: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
  },
  'exam-related-issues': {
    title: 'Exam-related Issues',
    description: 'The competitive and exam-centric culture causes significant stress, with 52% of students experiencing extreme stress during exams. The emphasis on rote learning limits critical thinking and practical skills.',
    imageSrc: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop'
  },
  'college-related-issues': {
    title: 'College-related Issues',
    description: '74% of first-year university students feel overwhelmed by academic workload. Depression and anxiety are common due to academic and social pressures, particularly for students from smaller towns adjusting to college life.',
    imageSrc: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop'
  },
  'library-issues': {
    title: 'Library Issues',
    description: 'Limited access to up-to-date resources, poor infrastructure, and lack of digital tools in libraries hinder students\' ability to study effectively. Many school libraries face infrastructure challenges and funding shortages that limit the ability to update collections.',
    imageSrc: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2030&auto=format&fit=crop'
  },
  'university-related-issues': {
    title: 'University-related Issues',
    description: 'Bureaucratic hurdles, inadequate support systems, and poor infrastructure in universities create significant challenges for students. Administrative inefficiencies are a common complaint, and many universities lack sufficient counseling and career guidance services.',
    imageSrc: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop'
  }
};

const IssueDetail: React.FC = () => {
  // Get the issue ID from URL params
  const { issueId } = useParams<{ issueId: string }>();
  
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instituteName, setInstituteName] = useState(''); // New state for institute name
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
  
  // Get issue details based on issueId
  const issue = issueId ? issueDetails[issueId] : null;
  
  if (!issue) {
    return (
      <div className="issue-detail-section">
        <div className="issue-not-found">
          <h2>Issue Not Found</h2>
          <p>Sorry, we couldn't find the issue you're looking for.</p>          <Link to="/" className="back-link">Back to Key Issues</Link>
        </div>
      </div>
    );
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !description) {
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
    console.log('Submitting issue:', {
      issueType: issue.title,
      name,
      email,
      instituteName, // Include institute name in the submission
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
    setInstituteName(''); // Reset institute name field
    setDescription('');
    setLocation('');
  };
  
  return (
    <section className="issue-detail-section">
      <div className="issue-detail-container">
        <div className="issue-header">
          <div className="issue-image-container">
            <img src={issue.imageSrc} alt={issue.title} className="issue-image" />
            <div className="issue-image-overlay"></div>
          </div>
          <h2 className="issue-title">{issue.title}</h2>
          <p className="issue-description">{issue.description}</p>
        </div>
        
        <div className="issue-form-container">
          <h3>Report This Issue</h3>
          <p className="form-intro">
            Help us address this issue by sharing your experience. Your report will be reviewed by our team and may be used to advocate for change.
          </p>
          
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
              <Link to="/" className="back-link">Back to Key Issues</Link>
              <button type="submit" className="submit-button">Submit Report</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default IssueDetail;
