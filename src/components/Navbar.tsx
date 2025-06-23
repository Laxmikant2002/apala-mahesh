import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import TopBar from './TopBar';

const Navbar: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeSection, setActiveSection] = useState('hero'); // Set 'hero' as initially active
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Close the menu when a link is clicked on mobile
    if (isMenuActive) {
      setIsMenuActive(false);
    }

    // Get the href attribute
    const href = e.currentTarget.getAttribute('href');
    
    // Only apply smooth scroll for anchor links
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Update URL without page reload
        window.history.pushState(null, '', href);
        
        // Set active section
        setActiveSection(targetId);
      }
    }
  };
  // Add scroll event listener to highlight the current section and handle navbar transparency
  useEffect(() => {
    const handleScroll = () => {      // Handle scrolled state for navbar background
      const scrollThreshold = 70; // Height to trigger solid background
      setIsScrolled(window.scrollY > scrollThreshold);      // Handle active section highlighting
      const sections = ['hero', 'key-issues', 'media', 'join', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset to trigger a bit earlier
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);  return (
    <header>
      <TopBar />
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <a href="/" className="logo">Brand</a>        <ul className={`nav-links ${isMenuActive ? 'active' : ''}`}>
          <li className={activeSection === 'hero' ? 'active' : ''}>
            <a href="#hero" onClick={handleNavClick}>Home</a>
          </li>          <li className={activeSection === 'key-issues' ? 'active' : ''}>
            <a href="#key-issues" onClick={handleNavClick}>Key Issues</a>
          </li>
          <li className={`dropdown ${activeSection === 'media' ? 'active' : ''}`}>
            <a href="#media" aria-haspopup="true" onClick={handleNavClick}>Media</a>
            <ul className="dropdown-menu">
              <li><a href="#videos" onClick={handleNavClick}>Videos</a></li>
              <li><a href="#photos" onClick={handleNavClick}>Photos</a></li>
              <li><a href="#articles" onClick={handleNavClick}>Articles</a></li>
            </ul>
          </li>          
          <li className={activeSection === 'join' ? 'active' : ''}>
            <a href="#join" className="btn-join" onClick={handleNavClick}>Join Movement</a>
          </li>          <li>
            <Link to="/raise-issue">Raise Issue</Link>
          </li>
          <li className={activeSection === 'contact' ? 'active' : ''}>
            <a href="#contact" onClick={handleNavClick}>Contact Us</a>
          </li>
        </ul><button className="menu-toggle" aria-label="Toggle menu" onClick={toggleMenu}>
          ☰
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
