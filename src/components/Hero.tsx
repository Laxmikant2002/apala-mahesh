import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LazyImage from './LazyImage';
import '../styles/Hero.css'; // Assuming you have a CSS file for styling

const Hero: React.FC = () => {
  const { t } = useTranslation();
  // Initialize with null to prevent SSR issues, then set actual value in useEffect
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Set initial state based on window width
    const checkMobile = () => {
      return typeof window !== 'undefined' && window.innerWidth <= 768;
    };

    const handleResize = () => {
      const mobile = checkMobile();
      setIsMobile(mobile);
    };

    // Set initial state
    setIsMobile(checkMobile());
    setIsLoaded(true);
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render until we know the screen size
  if (isMobile === null || !isLoaded) {
    return (
      <div className="hero-container" id="hero">
        <div className="hero-background">
          <LazyImage 
            src="/images/hero-background.jpg"
            alt="Education for all - Hero background"
            priority={true}
            className="hero-bg-image"
          />
        </div>
        <div className="overlay"></div>
        <div className="hero-content">
          <h1>{t('hero.title')}</h1>
          <p className="hero-subtitle">{t('hero.subtitle')}</p>
          <div className="hero-cta">
            <a href="#join" className="cta-primary">{t('joinMovement.joinButton')}</a>
            <Link to="/raise-issue" className="cta-secondary">{t('hero.raiseIssue')}</Link>
          </div>
        </div>
      </div>
    );
  }

  // Determine the background image based on screen size
  const backgroundImage = isMobile ? "/images/hero-background-1.jpg" : "/images/hero-background.jpg";

  return (
    <div className="hero-container" id="hero">
      <div className="hero-background">
        <LazyImage 
          src={backgroundImage}
          alt="Education for all - Hero background"
          priority={true}
          className="hero-bg-image"
          key={backgroundImage} // Force re-render when image changes
        />
      </div>
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>
        
        {/* Hidden SEO content for search engines */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}>
          <h2>Aapla Mahesh - आपला महेश</h2>
          <p>Maharashtra Student Help Desk for educational rights, student welfare, and social justice. Join our movement to solve student issues and create positive change in Maharashtra's education system.</p>
          <p>Keywords: Maharashtra students, education rights, student help, student welfare, educational support, Maharashtra education system, student movement, social justice, student issues resolution</p>
        </div>
        
        <div className="hero-cta">
          <a href="#join" className="cta-primary">{t('joinMovement.joinButton')}</a>
          <Link to="/raise-issue" className="cta-secondary">{t('hero.raiseIssue')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
