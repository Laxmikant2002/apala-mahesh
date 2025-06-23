import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './KeyIssues.css';

interface KeyIssue {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  learnMoreUrl: string;
  issueId: string; // URL-friendly ID for routing
}

const KeyIssues: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  
  const initialIssues: KeyIssue[] = [
    {      id: 1,
      title: "Academic Pressure and Mental Health",
      shortDescription: "63.5% of students report stress due to academic pressure",
      fullDescription: "The intense academic environment in India, driven by competitive exams, leads to anxiety and depression among students.",
      imageUrl: "https://images.unsplash.com/photo-1560785496-3c9d27877182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      learnMoreUrl: "#academic-pressure",
      issueId: "academic-pressure-and-mental-health"
    },
    {      id: 2,
      title: "Financial Barriers",
      shortDescription: "Only 4% of higher education students benefit from education loans",
      fullDescription: "Rising tuition costs and limited financial aid force many students to abandon higher education.",
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      learnMoreUrl: "#financial-barriers",
      issueId: "financial-barriers"
    },    {      id: 3,
      title: "Inadequate Educational Infrastructure",
      shortDescription: "Class 10 dropout rate reached 20.6% in 2021-22",
      fullDescription: "Overcrowded classrooms and poor infrastructure hinder effective learning and contribute to high dropout rates.",
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      learnMoreUrl: "#infrastructure-issues",
      issueId: "inadequate-educational-infrastructure"
    }
  ];
  
  const additionalIssues: KeyIssue[] = [
    {
      id: 4,
      title: "Exam-related Issues",
      shortDescription: "52% of students experience extreme stress during exams",
      fullDescription: "The competitive exam culture in India causes significant stress, compounded by rote learning and other systemic issues.",
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
      learnMoreUrl: "#exam-issues",
      issueId: "exam-related-issues"
    },
    {
      id: 5,
      title: "College-related Issues",
      shortDescription: "74% of first-year students feel overwhelmed by academic workload",
      fullDescription: "College students face academic pressure, financial stress, and challenges in social and cultural adjustment.",
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
      learnMoreUrl: "#college-issues",
      issueId: "college-related-issues"
    },
    {
      id: 6,
      title: "Library Issues",
      shortDescription: "Many libraries face infrastructure and funding challenges",
      fullDescription: "Limited access to up-to-date resources and poor infrastructure in libraries hinder students' ability to study effectively.",
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2030&auto=format&fit=crop",
      learnMoreUrl: "#library-issues",
      issueId: "library-issues"
    },    {
      id: 7,
      title: "University-related Issues",
      shortDescription: "Administrative inefficiencies are common complaints among students",
      fullDescription: "Bureaucratic hurdles, inadequate support systems, and poor infrastructure in universities create significant challenges.",
      imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
      learnMoreUrl: "#university-issues",
      issueId: "university-related-issues"
    }
  ];
  
  // Combine issues based on showMore state
  const keyIssues = showMore ? [...initialIssues, ...additionalIssues] : initialIssues;
  // Placeholder functions for navigation (to be implemented with a carousel library if needed)
  const nextSlide = () => {
    // Placeholder for next slide functionality
    console.log("Next slide clicked");
  };

  const prevSlide = () => {
    // Placeholder for previous slide functionality
    console.log("Previous slide clicked");
  };
  return (
    <section className="key-issues-section" id="key-issues">
      <div className="key-issues-header">
        <h2>KEY ISSUES</h2>
        <div className="key-issues-navigation">
          <button className="nav-arrow prev" onClick={prevSlide} aria-label="Previous issue">
            &#8592;
          </button>
          <button className="nav-arrow next" onClick={nextSlide} aria-label="Next issue">
            &#8594;
          </button>
        </div>
      </div>      <div className="key-issues-container">
        {keyIssues.map((issue) => (
          <div className="issue-card-wrapper" key={issue.id}>
            <Link to={`/issues/${issue.issueId}`} className="issue-card-link">
              <div className="issue-card">
                <div className="issue-card-image">
                  <img src={issue.imageUrl} alt={issue.title} />
                  <div className="issue-overlay">
                    <h3>{issue.title}</h3>
                    <p>{issue.shortDescription}</p>
                  </div>
                </div>            
                <div className="issue-card-footer">
                  <p>{issue.fullDescription}</p>
                  <div className="issue-card-actions">
                    <a 
                      href={issue.learnMoreUrl} 
                      className="learn-more" 
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open(issue.learnMoreUrl, '_blank');
                      }}
                    >
                      Learn More <span className="arrow">&#8594;</span>
                    </a>
                    <button 
                      className="raise-issue" 
                      onClick={(e) => {
                        // This is redundant since the parent Link will handle navigation
                        // But it's here to make it clear this is clickable
                        e.stopPropagation(); // Don't trigger parent Link click
                        window.location.href = `/issues/${issue.issueId}`;
                      }}
                    >
                      Raise Issue <span className="arrow">&#8594;</span>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="view-more-container">
        <button 
          className="view-more-button" 
          onClick={() => setShowMore(!showMore)}
          aria-expanded={showMore}
        >
          {showMore ? 'View Less' : 'View More'}
        </button>
      </div>
    </section>
  );
};

export default KeyIssues;
