import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/TopBar.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'mr', name: 'मराठी' }
];

const TopBar: React.FC = () => {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setSelectedLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="top-bar minimal">
      <div className="top-bar-right minimal">
        <select
          className="language-selector minimal"
          value={selectedLang}
          onChange={handleLanguageChange}
          aria-label="Language"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        <div className="social-icons minimal">
          {[
            { href: "https://www.facebook.com/share/1DnFRqiX7s/?mibextid=wwXIfr", icon: "facebook-f", label: "Facebook" },
            { href: "https://twitter.com", icon: "twitter", label: "Twitter" },
            { href: "https://www.instagram.com/mahesh_kamble_inc_offical_?igsh=dDkydGY5b2tzN3Z2&utm_source=qr", icon: "instagram", label: "Instagram" },
            { href: "https://www.youtube.com/@%E0%A4%86%E0%A4%AA%E0%A4%B2%E0%A4%BE_%E0%A4%AE%E0%A4%B9%E0%A5%87%E0%A4%B6", icon: "youtube", label: "YouTube" }
          ].map(({ href, icon, label }) => (
            <a
              key={icon}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={`social-icon minimal`}
            >
              <i className={`fab fa-${icon}`}></i>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
