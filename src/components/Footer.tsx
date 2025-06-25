import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState<{
    message: string;
    type: 'success' | 'error' | null;
  }>({ message: '', type: null });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setSubscriptionStatus({
        message: 'Please enter your email address',
        type: 'error'
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubscriptionStatus({
        message: 'Please enter a valid email address',
        type: 'error'
      });
      return;
    }

    setIsSubmitting(true);

  };

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.footer 
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={footerVariants}
    >
      <div className="footer-content">
        <div className="footer-grid">
          <motion.div className="footer-section" variants={childVariants}>
            <h3>Quick Links</h3>
            <nav className="footer-links" aria-label="Footer navigation">
              <motion.a href="#hero" variants={childVariants}>Home</motion.a>
              <motion.a href="#key-issues" variants={childVariants}>Key Issues</motion.a>
              <motion.a href="#media" variants={childVariants}>Media</motion.a>
              <motion.a href="#join" variants={childVariants}>Join Movement</motion.a>
              <motion.a href="#contact" variants={childVariants}>Contact Us</motion.a>
              <motion.div variants={childVariants}>
                <Link to="/raise-issue">Raise Issue</Link>
              </motion.div>
            </nav>
          </motion.div>

          <motion.div className="footer-section" variants={childVariants}>
            <h3>Connect With Us</h3>
            <div className="social-media" aria-label="Social media links">
              <motion.a 
                href="https://www.facebook.com/share/1DnFRqiX7s/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our Facebook page"
                className="social-facebook"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-facebook-f" aria-hidden="true"></i>
              </motion.a>
              <motion.a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our Twitter page"
                className="social-twitter"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-twitter" aria-hidden="true"></i>
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/mahesh_kamble_inc_offical_?igsh=dDkydGY5b2tzN3Z2&utm_source=qr" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our Instagram page"
                className="social-instagram"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-instagram" aria-hidden="true"></i>
              </motion.a>
              <motion.a 
                href="https://www.youtube.com/@%E0%A4%86%E0%A4%AA%E0%A4%B2%E0%A4%BE_%E0%A4%AE%E0%A4%B9%E0%A5%87%E0%A4%B6" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Visit our YouTube channel"
                className="social-youtube"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fab fa-youtube" aria-hidden="true"></i>
              </motion.a>
            </div>
          </motion.div>

          <motion.div className="footer-section" variants={childVariants}>
            <h3>Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email for newsletter"
                  disabled={isSubmitting}
                />
                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </motion.button>
              </div>
              {subscriptionStatus.message && (
                <motion.p 
                  className={`subscription-message ${subscriptionStatus.type}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                >
                  {subscriptionStatus.message}
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>

        <motion.div 
          className="footer-bottom"
          variants={childVariants}
        >
          <p className="copyright">© {new Date().getFullYear()} Student Movement. All rights reserved.</p>
          <div className="footer-legal">
            <motion.a 
              href="/privacy" 
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="/terms"
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.95 }}
            >
              Terms of Use
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
