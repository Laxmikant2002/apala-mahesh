import React from 'react';
import { motion } from 'framer-motion';
import '../styles/JoinMovement.css'; // Ensure you have the appropriate CSS file

const JoinMovement: React.FC = () => {
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
        <h2 className="section-title">"Carry On" Facility for Engineering Students</h2>
        <div className="section-subtitle">Savitribai Phule Pune University (SPPU)</div>
        <div className="update-date">Updated: February 2025</div>
      </motion.header>
      <div className="section-content">
        {[
          // Each info card as an object for animation
          { key: 'intro', jsx: (
            <div className="info-card intro-card">
              <h3>Join Our Movement to Support SPPU Students</h3>
              <div className="card-content">
                <div className="card-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
                    alt="Students at university campus"
                    className="card-image"
                  />
                </div>
                <p>
                  The "Carry On" Facility is a temporary policy introduced by the Maharashtra Government and implemented by SPPU for the 2024-25 academic year. This student-friendly initiative allows engineering students with backlogs to progress to the next academic year, reducing educational delays and academic pressure.
                </p>
                <p>
                  Join our movement to spread awareness and provide support to students navigating this process.
                </p>
                <a href="#contact-form" className="cta-button">Join Now</a>
              </div>
            </div>
          ) },
          { key: 'eligibility', jsx: (
            <div className="info-card">
              <h4>Eligibility Criteria</h4>
              <div className="card-content">
                <ul className="info-list">
                  <li>Applies to students from First Year (FE) to Final Year (BE) with failed previous semesters</li>
                  <li>Eligibility is based on Winter Semester 2024-25 exam results, not Summer Semester 2023-24</li>
                  <li>Students punished for malpractice (1 + 1) during Summer 2023 exams are ineligible</li>
                </ul>
                <div className="note-box">
                  <strong>Note:</strong> This is a one-time provision for 2024-25 and cannot be used as a precedent.
                </div>
              </div>
            </div>
          ) },
          { key: 'process', jsx: (
            <div className="info-card">
              <h4>Application Process</h4>
              <div className="card-content">
                <div className="process-item">
                  <div className="process-icon">1</div>
                  <div className="process-text">
                    <strong>Deadline:</strong> March 3, 2025
                  </div>
                </div>
                <div className="process-item">
                  <div className="process-icon">2</div>
                  <div className="process-text">
                    <strong>Required Documents:</strong> Winter Exam 2024-25 mark sheets
                  </div>
                </div>
                <div className="process-item">
                  <div className="process-icon">3</div>
                  <div className="process-text">
                    <strong>Submission:</strong> Applications must be submitted to respective colleges
                  </div>
                </div>
                <div className="process-item">
                  <div className="process-icon">4</div>
                  <div className="process-text">
                    <strong>Undertaking:</strong> Submit a signed undertaking by the college principal or director
                  </div>
                </div>
              </div>
            </div>
          ) },
          { key: 'schedule', jsx: (
            <div className="info-card">
              <h4>Examination Schedule</h4>
              <div className="card-content">
                <div className="card-image-container">
                  <img 
                    src="https://img.freepik.com/premium-photo/young-student-taking-exam-school-with-stress_53876-138989.jpg"
                    alt="Students taking examination"
                    className="card-image"
                  />
                </div>
                <div className="schedule-box">
                  <p><strong>Winter (Odd) and Summer (Even) semester exams are conducted together in 2025.</strong></p>
                  <p>Students must complete the winter semester syllabus independently.</p>
                </div>
              </div>
            </div>
          ) },
          { key: 'benefits', jsx: (
            <div className="info-card">
              <h4>Benefits to Students</h4>
              <div className="card-content">
                <ul className="benefit-list">
                  <li>Prevents the loss of an academic year</li>
                  <li>Reduces academic pressure on students</li>
                  <li>Promotes a student-friendly approach to education</li>
                  <li>Allows focus on both current and backlog subjects</li>
                </ul>
              </div>
            </div>
          ) },
          { key: 'tips', jsx: (
            <div className="info-card">
              <h4>Tips for Success</h4>
              <div className="card-content">
                <div className="tips-container">
                  <div className="tip-item">
                    <div className="tip-icon">📚</div>
                    <div className="tip-text">Plan a study schedule to manage workload</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🎯</div>
                    <div className="tip-text">Prioritize difficult subjects</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">📖</div>
                    <div className="tip-text">Utilize university resources (libraries, counseling)</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">📝</div>
                    <div className="tip-text">Stay consistent with academic submissions</div>
                  </div>
                  <div className="tip-item">
                    <div className="tip-icon">🧘</div>
                    <div className="tip-text">Prioritize mental and physical well-being</div>
                  </div>
                </div>
              </div>
            </div>
          ) },
          { key: 'reference', jsx: (
            <div className="info-card">
              <h4>Official Reference</h4>
              <div className="card-content">
                <p className="reference-text">
                  Maharashtra Government Order No. Miscellaneous-2025/E-970220/Special-3, dated February 10, 2025.
                </p>
                <div className="link-container">
                  <a 
                    href="http://www.unipune.ac.in" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cta-link"
                  >
                    Visit SPPU Website
                  </a>
                  <a href="#join-form" className="cta-link">Join Our Support Network</a>
                </div>
              </div>
            </div>
          ) },
          { key: 'contact', jsx: (
            <div className="info-card" id="contact-form">
              <h4>Join Our Movement</h4>
              <div className="card-content">
                <p>Fill out the form below to join our movement to support students and advocate for education reform.</p>
                <form className="join-form">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="university">University/College</label>
                    <input type="text" id="university" name="university" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">How would you like to contribute?</label>
                    <textarea id="message" name="message" rows={4}></textarea>
                  </div>
                  <button type="submit" className="form-submit">Join Now</button>
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
