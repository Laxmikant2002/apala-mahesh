import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero: React.FC = () => {
  return (
    <div className="hero-container" id="hero">
      <div className="hero-content">
        <h1>Welcome to Our Movement</h1>
        <p className="hero-subtitle">Join us in making a difference for a better tomorrow</p>
        <div className="hero-cta">
          <a href="#join" className="cta-primary">Join Now</a>
          <Link to="/raise-issue" className="cta-secondary">Raise Issue</Link>
        </div>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

export default Hero;
