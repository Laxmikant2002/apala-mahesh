import React, { useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import './TopBar.css';

interface Language {
  code: string;
  name: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'mr', name: 'मराठी' }
];

const TopBar: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState('en');
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const scrollThreshold = 50;
    const scrollDelta = 10;

    if (currentScrollY < lastScrollY || currentScrollY < scrollThreshold) {
      // Scrolling up or near top
      setIsHidden(false);
    } else if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
      // Scrolling down and past threshold
      if (currentScrollY - lastScrollY > scrollDelta) {
        setIsHidden(true);
      }
    }

    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Track scroll position
  useMotionValueEvent(scrollY, "change", (latest) => {
    handleScroll();
  });

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLang(e.target.value);
    // Here you would typically implement language change logic
    console.log('Language changed to:', e.target.value);
  };

  return (
    <motion.div 
      className={`top-bar ${isHidden ? 'hidden' : ''}`}
      initial={{ y: -40 }}
      animate={{ 
        y: isHidden ? -40 : 0,
        opacity: isHidden ? 0 : 1
      }}
      transition={{
        duration: 0.3,
        ease: "easeInOut"
      }}
    >
      <motion.div 
        className="top-bar-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.select
          className="language-selector"
          value={selectedLang}
          onChange={handleLanguageChange}
          aria-label="Select language"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </motion.select>
        <div className="social-icons">
          {[
            { href: "https://facebook.com", icon: "facebook-f", label: "Facebook" },
            { href: "https://twitter.com", icon: "twitter", label: "Twitter" },
            { href: "https://instagram.com", icon: "instagram", label: "Instagram" },
            { href: "https://linkedin.com", icon: "linkedin-in", label: "LinkedIn" }
          ].map(({ href, icon, label }) => (
            <motion.a
              key={icon}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ y: -2, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <i className={`fab fa-${icon}`}></i>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TopBar;
