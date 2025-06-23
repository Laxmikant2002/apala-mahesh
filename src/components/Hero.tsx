import React from 'react';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero-container" id="hero">
      <div className="hero-content">
        <h1>Welcome to Our Movement</h1>
        <p className="hero-subtitle">Join us in making a difference for a better tomorrow</p>
        <div className="hero-cta">
          <a href="#join" className="cta-primary">Join Now</a>
          <a href="#key-issue" className="cta-secondary">Learn More</a>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Hero;
