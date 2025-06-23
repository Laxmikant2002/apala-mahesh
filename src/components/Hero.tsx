import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Hero.css';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="hero-container" id="hero">
      <div className="hero-content">
        <h1>{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>
        <div className="hero-cta">
          <a href="#join" className="cta-primary">{t('joinMovement.joinButton')}</a>
          <Link to="/raise-issue" className="cta-secondary">{t('hero.raiseIssue')}</Link>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Hero;
