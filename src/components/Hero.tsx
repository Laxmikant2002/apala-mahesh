import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LazyImage from './LazyImage';
import '../styles/Hero.css';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="hero-container" id="hero" aria-label="Hero section">
      <div className="hero-background">
        <picture>
          <source srcSet="/images/hero-background-1.jpg" media="(max-width: 768px)" />
          <LazyImage
            src="/images/hero-background.jpg"
            alt="Education for all - Hero background"
            priority={true}
            className="hero-bg-image"
          />
        </picture>
      </div>
      <div className="overlay" aria-hidden="true"></div>
      <div className="hero-content">
        <h1>{t('hero.title')}</h1>
        <p className="hero-subtitle">{t('hero.subtitle')}</p>

        {/* Hidden SEO content for search engines */}
        <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
          <h2>Aapla Mahesh - आपला महेश</h2>
          <p>Maharashtra Student Help Desk for educational rights, student welfare, and social justice. Join our movement to solve student issues and create positive change in Maharashtra's education system.</p>
          <p>Keywords: Maharashtra students, education rights, student help, student welfare, educational support, Maharashtra education system, student movement, social justice, student issues resolution</p>
        </div>

        <nav className="hero-cta" aria-label="Hero call to action">
          <a href="#join" className="cta-primary">{t('joinMovement.joinButton')}</a>
          <Link to="/raise-issue" className="cta-secondary">{t('hero.raiseIssue')}</Link>
        </nav>
      </div>
    </section>
  );
};

export default Hero;
