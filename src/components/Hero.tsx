import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LazyImage from './LazyImage';
import '../styles/Hero.css'; // Assuming you have a CSS file for styling

const Hero: React.FC = () => {
  const { t } = useTranslation();
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
};

export default Hero;
