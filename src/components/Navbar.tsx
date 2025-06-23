import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './Navbar.css';
import TopBar from './TopBar';

const Navbar: React.FC = () => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY, scrollYProgress } = useScroll();

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 100;
    const scrollDelta = 10; // Minimum scroll amount to trigger hide/show

    // Update scroll state
    setIsScrolled(currentScrollY > scrollThreshold);

    // Show/hide navbar based on scroll direction
    if (currentScrollY < lastScrollY) {
      // Scrolling up
      setIsVisible(true);
    } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
      // Scrolling down and past threshold
      if (currentScrollY - lastScrollY > scrollDelta) {
        setIsVisible(false);
      }
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Track scroll position for progress indicator
  useMotionValueEvent(scrollY, "change", (latest) => {
    handleScroll();
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isMenuActive) {
      setIsMenuActive(false);
    }

    const href = e.currentTarget.getAttribute('href');
    
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        window.history.pushState(null, '', href);
        setActiveSection(targetId);
      }
    }
  };

  useEffect(() => {
    const handleSectionHighlight = () => {
      const sections = ['hero', 'key-issues', 'media', 'join', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleSectionHighlight);
    handleSectionHighlight();
    
    return () => {
      window.removeEventListener('scroll', handleSectionHighlight);
    };
  }, []);

  const navItems = [
    { id: 'hero', text: 'Home' },
    { id: 'key-issues', text: 'Key Issues' },
    { id: 'media', text: 'Media' },
    { id: 'join', text: 'Join Movement', className: 'btn-join' },
    { id: 'contact', text: 'Contact Us' }
  ];

  return (
    <header>
      <TopBar />
      <motion.nav
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      >
        <motion.div
          className="scroll-progress"
          style={{
            scaleX: scrollYProgress,
            transformOrigin: "left"
          }}
        />
        <motion.a
          href="/"
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Brand
        </motion.a>
        <motion.ul
          className={`nav-links ${isMenuActive ? 'active' : ''}`}
          initial={{ opacity: 1, x: 0 }}
          animate={{ 
            opacity: 1,
            x: 0,
            display: 'flex'
          }}
        >
          {navItems.map(({ id, text, className }) => (
            <motion.li
              key={id}
              className={activeSection === id ? 'active' : ''}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              <a
                href={`#${id}`}
                onClick={handleNavClick}
                className={className}
              >
                {text}
              </a>
            </motion.li>
          ))}
        </motion.ul>
        <motion.button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ☰
        </motion.button>
      </motion.nav>
    </header>
  );
};

export default Navbar;
