import React, { useState, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/TopBar.css'; // Assuming you have a CSS file for styling

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
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');
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
    const newLang = e.target.value;
    setSelectedLang(newLang);
    i18n.changeLanguage(newLang);
    console.log('Language changed to:', newLang);
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
      >        <motion.select
          className="language-selector"
          value={selectedLang}
          onChange={handleLanguageChange}
          aria-label={t('topBar.language')}
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
            { href: "https://www.facebook.com/share/1DnFRqiX7s/?mibextid=wwXIfr", icon: "facebook-f", label: "Facebook", color: "facebook" },
            { href: "https://twitter.com", icon: "twitter", label: "Twitter", color: "twitter" },
            { href: "https://www.instagram.com/mahesh_kamble_inc_offical_?igsh=dDkydGY5b2tzN3Z2&utm_source=qr", icon: "instagram", label: "Instagram", color: "instagram" },
            { href: "https://www.youtube.com/@%E0%A4%86%E0%A4%AA%E0%A4%B2%E0%A4%BE_%E0%A4%AE%E0%A4%B9%E0%A5%87%E0%A4%B6", icon: "youtube", label: "YouTube", color: "youtube" }
          ].map(({ href, icon, label, color }) => (
            <motion.a
              key={icon}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`social-icon-${color}`}
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
