import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import '../styles/JoinMovement.css'; // Ensure you have the appropriate CSS file

const JoinMovement: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sppu');
  
  return (
    <motion.section
      id="join"
      className="join-movement-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h2 className="section-title">{t('joinMovement.title', 'Join Our Movement')}</h2>
        <div className="section-subtitle">{t('joinMovement.subtitle', 'Support Students and Make a Difference')}</div>
      </motion.header>
      <div className="section-content">
        <div className="tabs-container">
          <div 
            className={`tab ${activeTab === 'sppu' ? 'active' : ''}`}
            onClick={() => setActiveTab('sppu')}
          >
            {t('joinMovement.sppu', 'Support SPPU Students')}
          </div>
          <div 
            className={`tab ${activeTab === 'work' ? 'active' : ''}`}
            onClick={() => setActiveTab('work')}
          >
            {t('joinMovement.workForUs', 'Work For Us')}
          </div>
          <div 
            className={`tab ${activeTab === 'volunteer' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteer')}
          >
            {t('joinMovement.volunteerWithUs', 'Volunteer With Us')}
          </div>
        </div>
        
        {[
          { key: 'sppuSupport', jsx: (
            <div className={`info-card sppu-card ${activeTab === 'sppu' ? 'active' : ''}`}>
              <h3>Join Our Movement to Support SPPU Students</h3>
              <div className="card-content">
                <div className="card-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
                    alt="Students at university campus"
                    className="card-image"
                  />
                </div>
                <div className="sppu-description">
                  <p>
                    The "Carry On" Facility is a temporary policy introduced by the Maharashtra Government and implemented by SPPU for the 2024-25 academic year. This student-friendly initiative allows engineering students with backlogs to progress to the next academic year, reducing educational delays and academic pressure.
                  </p>
                  <p>
                    Join our movement to spread awareness and provide support to students navigating this process.
                  </p>
                  
                  <h4>Benefits to Students</h4>
                  <ul className="benefits-list">
                    <li>Prevents the loss of an academic year</li>
                    <li>Reduces academic pressure on students</li>
                    <li>Promotes a student-friendly approach to education</li>
                    <li>Allows focus on both current and backlog subjects</li>
                  </ul>
                </div>
                
                <form className="sppu-form">
                  <h4>Join Our Support Network</h4>
                  <div className="form-group">
                    <label htmlFor="sppu-name">Full Name <span className="required">*</span></label>
                    <input type="text" id="sppu-name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sppu-email">Email Address <span className="required">*</span></label>
                    <input type="email" id="sppu-email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sppu-college">College/University <span className="required">*</span></label>
                    <input type="text" id="sppu-college" name="college" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="sppu-message">How would you like to help? <span className="required">*</span></label>
                    <textarea id="sppu-message" name="message" rows={4} required></textarea>
                  </div>
                  <button type="submit" className="form-submit">Join Movement</button>
                </form>
              </div>
            </div>
          ) },
          
          { key: 'workForUs', jsx: (
            <div className={`info-card work-card ${activeTab === 'work' ? 'active' : ''}`}>
              <h3>Work For Us</h3>
              <div className="card-content">
                <div className="card-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
                    alt="Team working together"
                    className="card-image"
                  />
                </div>
                <div className="work-description">
                  <p>
                    We at the Indian National Congress (INC), are committed to providing the best quality services for our supporters, volunteers, donors, candidates and of course, our beloved constituents.
                  </p>
                  <p>
                    The INC believes in an inclusive and prosperous India that does not discriminate on the basis of religion, gender, caste, class, race, ethnicity, language, region or creed. The same principles that the founders of our country envisaged for this great nation, that helped us unite as a people and throw off the yoke of oppressive imperialism.
                  </p>
                  <p>
                    Our work environment, recruitment policies, training, assessment and career growth prospects are all, a reflection of these very same high ideals.
                  </p>
                  <p>
                    If you would like to work with us in furthering this dream of peaceful co-existence and help us defeat those that champion divisive politics, while at the same time developing your career in a friendly and invigorating environment, then you have come to the right place.
                  </p>
                  <p>
                    Please share your resume with us, and we will get back to you shortly.
                  </p>
                </div>
                
                <form className="work-form">
                  <h4>Details</h4>
                  <div className="form-group">
                    <label htmlFor="work-name">Name <span className="required">*</span></label>
                    <input type="text" id="work-name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work-email">Email Address <span className="required">*</span></label>
                    <input type="email" id="work-email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work-phone">Phone Number <span className="required">*</span></label>
                    <input type="tel" id="work-phone" name="phone" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work-comments">Comments</label>
                    <textarea id="work-comments" name="comments" rows={4}></textarea>
                  </div>
                  <button type="submit" className="form-submit">Submit</button>
                </form>
              </div>
            </div>
          ) },
          
          { key: 'volunteerWithUs', jsx: (
            <div className={`info-card volunteer-card ${activeTab === 'volunteer' ? 'active' : ''}`}>
              <h3>Volunteer With Us</h3>
              <div className="card-content">
                <div className="card-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1000&auto=format&fit=crop"
                    alt="Volunteers working together"
                    className="card-image"
                  />
                </div>
                <div className="volunteer-description">
                  <p>
                    Indian National Congress greatly values the unwavering support of all its volunteers. Your dedication and selfless contributions are pillars of strength to our cause. Sign up as a volunteer to provide your invaluable support to our mission of a secular, democratic, just and inclusive India.
                  </p>
                  <p>
                    Sign up by sharing your contact details with us, and an organizer will get in touch with you soon.
                  </p>
                </div>
                
                <form className="volunteer-form">
                  <h4>Details</h4>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="volunteer-fname">First name <span className="required">*</span></label>
                      <input type="text" id="volunteer-fname" name="firstName" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="volunteer-mname">Middle name <span className="required">*</span></label>
                      <input type="text" id="volunteer-mname" name="middleName" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="volunteer-lname">Last name <span className="required">*</span></label>
                      <input type="text" id="volunteer-lname" name="lastName" required />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="volunteer-phone">Phone Number <span className="required">*</span></label>
                      <input type="tel" id="volunteer-phone" name="phone" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="volunteer-state">State</label>
                      <input type="text" id="volunteer-state" name="state" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="volunteer-email">Email Address <span className="required">*</span></label>
                      <input type="email" id="volunteer-email" name="email" required />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="volunteer-contribution">Tell us how you can contribute?</label>
                    <textarea id="volunteer-contribution" name="contribution" rows={4}></textarea>
                  </div>
                  <button type="submit" className="form-submit">Submit</button>
                </form>
              </div>
            </div>
          ) },
        ].map((card, idx) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            {card.jsx}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default JoinMovement;
