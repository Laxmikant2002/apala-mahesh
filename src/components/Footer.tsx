import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Footer.css';

const Footer: React.FC = () => {

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
        <motion.div 
          className="developer-credit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          variants={childVariants}
        >
          <p>Developed by <motion.a 
              href="https://portfolio-website-21goe9m59-laxmikant2002s-projects.vercel.app/" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ color: '#22c55e' }}
            >
              Laxmikant Shinde
            </motion.a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
