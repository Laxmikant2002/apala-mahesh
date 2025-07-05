import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  
  // Detect if running in production/Vercel for performance optimizations
  const isProduction = process.env.NODE_ENV === 'production';
  
  // Handle navigation to raise issue page - Mobile-optimized with React Router
  const handleRaiseIssue = useCallback((issueId: string, e: React.MouseEvent) => {
    console.log('🔄 Raise Issue clicked for:', issueId);
    
    // Prevent any default behaviors
    e.preventDefault();
    e.stopPropagation();
    
    try {
      // Show immediate feedback
      const button = e.currentTarget as HTMLButtonElement;
      const originalText = button.innerHTML;
      button.innerHTML = '🔄 Loading...';
      button.disabled = true;
      
      // Navigate to the raise issue page
      const targetPath = '/raise-issue';
      console.log('🚀 Navigating to:', targetPath);
      
      // Use React Router navigate for smooth client-side routing
      navigate(targetPath);
      
      // Reset button after navigation starts
      setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
      }, 500);
      
    } catch (error) {
      console.error('❌ Navigation error:', error);
      // Fallback to direct navigation if React Router fails
      window.location.href = '/raise-issue';
    }
  }, [navigate]);

  // Handle learn more external links
  const handleLearnMore = useCallback((url: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  }, []);
  
  const initialIssues: KeyIssue[] = useMemo(() => [
    {
      id: 1,
      title: t('keyIssues.issues.paperLeak.title'),
      shortDescription: t('keyIssues.issues.paperLeak.shortDescription'),
      fullDescription: t('keyIssues.issues.paperLeak.fullDescription'),
      imageUrl: "/images/media/student-protest1.jpg",
      learnMoreUrl: "#paper-leak",
      issueId: "stop-paper-leak"
    },
    {
      id: 2,
      title: t('keyIssues.issues.studentUnion.title'),
      shortDescription: t('keyIssues.issues.studentUnion.shortDescription'),
      fullDescription: t('keyIssues.issues.studentUnion.fullDescription'),
      imageUrl: "/images/media/student-protest2.jpg",
      learnMoreUrl: "#student-unions",
      issueId: "student-union-elections"
    },
    {
      id: 3,
      title: t('keyIssues.issues.mentalHealth.title'),
      shortDescription: t('keyIssues.issues.mentalHealth.shortDescription'),
      fullDescription: t('keyIssues.issues.mentalHealth.fullDescription'),
      imageUrl: "/images/media/student-protest3.jpg",
      learnMoreUrl: "#academic-pressure",
      issueId: "academic-pressure-and-mental-health"
    },
  ], [t]);
  
  const additionalIssues: KeyIssue[] = useMemo(() => [
    {
      id: 4,
      title: t('keyIssues.issues.financial.title'),
      shortDescription: t('keyIssues.issues.financial.shortDescription'),
      fullDescription: t('keyIssues.issues.financial.fullDescription'),
      imageUrl: "/images/media/student-protest4.jpg",
      learnMoreUrl: "#financial-barriers",
      issueId: "financial-barriers"
    },
    {
      id: 5,
      title: t('keyIssues.issues.infrastructure.title'),
      shortDescription: t('keyIssues.issues.infrastructure.shortDescription'),
      fullDescription: t('keyIssues.issues.infrastructure.fullDescription'),
      imageUrl: "/images/media/student-protest5.jpg",
      learnMoreUrl: "#infrastructure-issues",
      issueId: "inadequate-educational-infrastructure"
    },
    {
      id: 6,
      title: t('keyIssues.issues.examStress.title'),
      shortDescription: t('keyIssues.issues.examStress.shortDescription'),
      fullDescription: t('keyIssues.issues.examStress.fullDescription'),
      imageUrl: "/images/media/student-protest6.jpg",
      learnMoreUrl: "#exam-issues",
      issueId: "exam-related-issues"
    },
    {
      id: 7,
      title: t('keyIssues.issues.college.title'),
      shortDescription: t('keyIssues.issues.college.shortDescription'),
      fullDescription: t('keyIssues.issues.college.fullDescription'),
      imageUrl: "/images/media/student-protest7.jpg",
      learnMoreUrl: "#college-issues",
      issueId: "college-related-issues"
    },
    {
      id: 8,
      title: t('keyIssues.issues.library.title'),
      shortDescription: t('keyIssues.issues.library.shortDescription'),
      fullDescription: t('keyIssues.issues.library.fullDescription'),
      imageUrl: "/images/media/student-protest8.jpg",
      learnMoreUrl: "#library-issues",
      issueId: "library-issues"
    },
    {
      id: 9,
      title: t('keyIssues.issues.university.title'),
      shortDescription: t('keyIssues.issues.university.shortDescription'),
      fullDescription: t('keyIssues.issues.university.fullDescription'),
      imageUrl: "/images/media/student-protest9.jpg",
      learnMoreUrl: "#university-issues",
      issueId: "university-related-issues"
    }
  ], [t]);
  
  // Combine issues based on showMore state
  const keyIssues = useMemo(() => 
    showMore ? [...initialIssues, ...additionalIssues] : initialIssues,
    [showMore, initialIssues, additionalIssues]
  );
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
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="key-issues-header"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
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
              initial={isProduction ? false : { opacity: 0 }}
              whileInView={isProduction ? {} : { opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={isProduction ? {} : { 
                duration: 0.2, 
                delay: idx < 3 ? idx * 0.05 : 0
              }}
            >
              <div className="issue-card">
                <div className="issue-card-image">
                  <LazyImage 
                    src={issue.imageUrl} 
                    alt={issue.title} 
                    width={400} 
                    height={300}
                  />
                  <div className="issue-overlay">
                    <h3>{issue.title}</h3>
                    <p>{issue.shortDescription}</p>
                  </div>
                </div>
                <div className="issue-card-footer">
                  <p>{issue.fullDescription}</p>
                  <div className="issue-card-actions">
                    <button 
                      className="learn-more-button" 
                      onClick={(e) => handleLearnMore(issue.learnMoreUrl, e)}
                      type="button"
                    >
                      {t('keyIssues.learnMore')} <span className="arrow">&#8594;</span>
                    </button>
                    <button 
                      className="raise-issue" 
                      onClick={(e) => handleRaiseIssue(issue.issueId, e)}
                      type="button"
                      data-issue-id={issue.issueId}
                    >
                      {t('keyIssues.raiseIssue')} <span className="arrow">&#8594;</span>
                    </button>
                  </div>
                </div>
              </div>
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

export default React.memo(KeyIssues);
