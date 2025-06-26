import React from 'react';
import { motion } from 'framer-motion';
import '../styles/ContactUs.css';

const ContactUs: React.FC = () => {

  return (
    <motion.section
      id="contact"
      className="contact-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Contact Us
      </motion.h2>
      <div className="contact-container">
        <motion.div
          className="contact-info"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {[{
            icon: 'fas fa-map-marker-alt',
            title: 'Our Address',
            text: (<p>Congress Bhavan, Gaothan,<br />Shivajinagar, Pune,<br />Maharashtra 411005</p>)
          }, {
            icon: 'fas fa-envelope',
            title: 'Email Us',
            text: (<p>nsuimahaforyou@gmail.com</p>)
          }, {
            icon: 'fas fa-phone-alt',
            title: 'Call Us',
            text: (<p>+91 87670 14943<br />+91 89992 33209</p>)
          }].map((card, idx) => (
            <motion.div
              className="contact-card"
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="contact-icon">
                <i className={card.icon}></i>
              </div>
              <div className="contact-details">
                <h3>{card.title}</h3>
                {card.text}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default ContactUs;
