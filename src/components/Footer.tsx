import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">        <div className="footer-links">
          <a href="#hero">Home</a>
          <a href="#key-issues">Key Issues</a>
          <a href="#media">Media</a>
          <a href="#join">Join Movement</a>          <a href="#contact">Contact Us</a>
          <Link to="/raise-issue">Raise Issue</Link>
        </div>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
      <p className="copyright">© 2025 Student Movement. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
