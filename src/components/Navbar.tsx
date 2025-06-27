import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/Navbar.css';
// Lazy load TopBar component
const TopBar = lazy(() => import('./TopBar'));

const Navbar: React.FC = () => {
  const { t } = useTranslation();
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
    { id: 'hero', text: t('navbar.home') },
    { id: 'key-issues', text: t('navbar.keyIssues') },
    { id: 'media', text: t('navbar.media') },
    { id: 'join', text: t('navbar.joinMovement'), className: 'btn-join' },
    { id: 'contact', text: t('navbar.contactUs') }
  ];
  return (
    <header>
      <Suspense fallback={<div style={{ height: '40px' }}></div>}>
        <TopBar />
      </Suspense>
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
      >        {/* Only render progress bar after initial load */}
        <div
          className="scroll-progress"
          style={{
            transformOrigin: "left"
          }}
        >
          <div
            style={{
              transform: `scaleX(${scrollYProgress.get()})`,
              transformOrigin: "left"
            }}
            className="scroll-progress-inner"
          />
        </div>
        <motion.a
          href="/"
          className="logo"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src="/images/logo/apala-mahesh-logo.png" 
            alt="आपला महेश" 
            className="brand-logo-img" 
            width="58" 
            height="58" 
          />
          <span className="logo-text" style={{ color: '#111', background: 'none', WebkitBackgroundClip: 'unset' }}>आपला महेश</span>
        </motion.a>
        {isMenuActive && (
          <div
            className={`mobile-menu-overlay${isMenuActive ? ' active' : ''}`}
            aria-hidden={!isMenuActive}
            tabIndex={-1}
            onClick={() => setIsMenuActive(false)}
          />
        )}
        <ul
          className={`nav-links ${isMenuActive ? 'active' : ''}`}
        >          {navItems.map(({ id, text, className }) => (
            <li
              key={id}
              className={activeSection === id ? 'active' : ''}
            >
              <a
                href={`#${id}`}
                onClick={handleNavClick}
                className={className}
              >
                {text}
                <span className={`nav-underline${activeSection === id ? ' active' : ''}`}></span>
              </a>
            </li>
          ))}
        </ul>
        <motion.button
          className="menu-toggle"
          aria-label="Toggle menu"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={isMenuActive ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </motion.button>
      </motion.nav>
    </header>
  );
};

export default Navbar;
