import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/KeyIssues.css'; // Main styling
import '../styles/button-fixes.css'; // Additional button fixes for links
import LazyImage from './LazyImage';

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
  const { t } = useTranslation();
  const [showMore, setShowMore] = useState(false);
  
  const initialIssues: KeyIssue[] = [
    {
      id: 1,
      title: t('keyIssues.issues.paperLeak.title'),
      shortDescription: t('keyIssues.issues.paperLeak.shortDescription'),
      fullDescription: t('keyIssues.issues.paperLeak.fullDescription'),
      imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      learnMoreUrl: "#paper-leak",
      issueId: "stop-paper-leak"
    },
    {
      id: 2,
      title: t('keyIssues.issues.studentUnion.title'),
      shortDescription: t('keyIssues.issues.studentUnion.shortDescription'),
      fullDescription: t('keyIssues.issues.studentUnion.fullDescription'),
      imageUrl: "https://images.unsplash.com/photo-1494059980473-813e73ee784b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      learnMoreUrl: "#student-unions",
      issueId: "student-union-elections"
    },
    {
      id: 3,
      title: t('keyIssues.issues.mentalHealth.title'),
      shortDescription: t('keyIssues.issues.mentalHealth.shortDescription'),
      fullDescription: t('keyIssues.issues.mentalHealth.fullDescription'),
      imageUrl: "https://images.unsplash.com/photo-1560785496-3c9d27877182?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      learnMoreUrl: "#academic-pressure",
      issueId: "academic-pressure-and-mental-health"
    },
  ];
  
  const additionalIssues: KeyIssue[] = [
    {
      id: 4,
      title: t('keyIssues.issues.financial.title'),
      shortDescription: t('keyIssues.issues.financial.shortDescription'),
      fullDescription: t('keyIssues.issues.financial.fullDescription'),
      imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
      learnMoreUrl: "#financial-barriers",
      issueId: "financial-barriers"
    },
    {
      id: 5,
      title: t('keyIssues.issues.infrastructure.title'),
      shortDescription: t('keyIssues.issues.infrastructure.shortDescription'),
      fullDescription: t('keyIssues.issues.infrastructure.fullDescription'),
      imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
      learnMoreUrl: "#infrastructure-issues",
      issueId: "inadequate-educational-infrastructure"
    },
    {
      id: 6,
      title: t('keyIssues.issues.examStress.title'),
      shortDescription: t('keyIssues.issues.examStress.shortDescription'),
      fullDescription: t('keyIssues.issues.examStress.fullDescription'),
      imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
      learnMoreUrl: "#exam-issues",
      issueId: "exam-related-issues"
    },
    {
      id: 7,
      title: t('keyIssues.issues.college.title'),
      shortDescription: t('keyIssues.issues.college.shortDescription'),
      fullDescription: t('keyIssues.issues.college.fullDescription'),
      imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop",
      learnMoreUrl: "#college-issues",
      issueId: "college-related-issues"
    },
    {
      id: 8,
      title: t('keyIssues.issues.library.title'),
      shortDescription: t('keyIssues.issues.library.shortDescription'),
      fullDescription: t('keyIssues.issues.library.fullDescription'),
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2030&auto=format&fit=crop",
      learnMoreUrl: "#library-issues",
      issueId: "library-issues"
    },
    {
      id: 9,
      title: t('keyIssues.issues.university.title'),
      shortDescription: t('keyIssues.issues.university.shortDescription'),
      fullDescription: t('keyIssues.issues.university.fullDescription'),
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
    <div className="key-issues-section">
      <div className="key-issues-divider"></div>
      <motion.section 
        className="key-issues-section" 
        id="key-issues"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="key-issues-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <h2>{t('keyIssues.title')}</h2>
          <div className="key-issues-navigation">
            <button className="nav-arrow prev" onClick={prevSlide} aria-label={t('keyIssues.previousIssue')}>
              &#8592;
            </button>
            <button className="nav-arrow next" onClick={nextSlide} aria-label={t('keyIssues.nextIssue')}>
              &#8594;
            </button>
          </div>
        </motion.div>
        <div className="key-issues-container">
          {keyIssues.map((issue, idx) => (
            <motion.div 
              className="issue-card-wrapper" 
              key={issue.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.2, delay: idx < 3 ? 0 : idx * 0.05 }}
            >
              <Link to={`/issues/${issue.issueId}`} className="issue-card-link">
                <div className="issue-card">                <div className="issue-card-image">
                    <LazyImage src={issue.imageUrl} alt={issue.title} width={400} height={300} />
                    <div className="issue-overlay">
                      <h3>{issue.title}</h3>
                      <p>{issue.shortDescription}</p>
                    </div>
                  </div>                <div className="issue-card-footer">
                    <p>{issue.fullDescription}</p>
                    <div className="issue-card-actions">
                      <button 
                        className="learn-more-button" 
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          window.open(issue.learnMoreUrl, '_blank');
                        }}
                      >                        {t('keyIssues.learnMore')} <span className="arrow">&#8594;</span>
                      </button>
                      <button 
                        className="raise-issue" 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = `/issues/${issue.issueId}`;
                        }}
                      >
                        {t('keyIssues.raiseIssue')} <span className="arrow">&#8594;</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="view-more-container">
          <button 
            className="view-more-button" 
            onClick={() => setShowMore(!showMore)}
            aria-expanded={showMore}
          >
            {showMore ? t('keyIssues.viewLess') : t('keyIssues.viewMore')}
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default KeyIssues;
