import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { emailService } from '../utils/emailService';
import '../styles/JoinMovement.css'; // Ensure you have the appropriate CSS file

const JoinMovement: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('sppu');
  
  // Form states for work application
  const [workForm, setWorkForm] = useState({
    name: '',
    email: '',
    phone: '',
    comments: ''
  });
  
  // Form states for volunteer registration
  const [volunteerForm, setVolunteerForm] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    phone: '',
    university: '',
    year: '',
    skills: '',
    availability: ''
  });
  
  // Submission status
  const [submitStatus, setSubmitStatus] = useState<{
    submitted: boolean;
    success: boolean;
    message: string;
    loading: boolean;
    formType: string;
  }>({
    submitted: false,
    success: false,
    message: '',
    loading: false,
    formType: ''
  });
  
  const handleWorkFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!workForm.name || !workForm.email || !workForm.phone) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.',
        loading: false,
        formType: 'work'
      });
      return;
    }

    setSubmitStatus({
      submitted: true,
      success: false,
      message: 'Sending your application...',
      loading: true,
      formType: 'work'
    });

    try {
      const result = await emailService.sendEmail({
        name: workForm.name,
        email: workForm.email,
        subject: 'Team Application - ' + workForm.name,
        message: workForm.comments || 'No additional comments provided.',
        formType: 'join',
        additionalData: {
          phone: workForm.phone,
          position: 'Team Member',
          experience: workForm.comments
        }
      });

      if (result.success) {
        setSubmitStatus({
          submitted: true,
          success: true,
          message: 'Thank you for your application! We will get back to you shortly.',
          loading: false,
          formType: 'work'
        });
        
        // Reset form
        setWorkForm({ name: '', email: '', phone: '', comments: '' });
      } else {
        setSubmitStatus({
          submitted: true,
          success: false,
          message: result.message,
          loading: false,
          formType: 'work'
        });
      }
    } catch (error) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'An error occurred. Please try again later.',
        loading: false,
        formType: 'work'
      });
    }
  };

  const handleVolunteerFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!volunteerForm.firstName || !volunteerForm.lastName || !volunteerForm.email) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'Please fill in all required fields.',
        loading: false,
        formType: 'volunteer'
      });
      return;
    }

    setSubmitStatus({
      submitted: true,
      success: false,
      message: 'Sending your volunteer registration...',
      loading: true,
      formType: 'volunteer'
    });

    try {
      const fullName = `${volunteerForm.firstName} ${volunteerForm.middleName} ${volunteerForm.lastName}`.trim();
      const result = await emailService.sendEmail({
        name: fullName,
        email: volunteerForm.email,
        subject: 'Volunteer Registration - ' + fullName,
        message: `Skills: ${volunteerForm.skills || 'Not specified'}\nAvailability: ${volunteerForm.availability || 'Not specified'}`,
        formType: 'volunteer',
        additionalData: {
          phone: volunteerForm.phone,
          university: volunteerForm.university,
          year: volunteerForm.year,
          skills: volunteerForm.skills,
          availability: volunteerForm.availability
        }
      });

      if (result.success) {
        setSubmitStatus({
          submitted: true,
          success: true,
          message: 'Thank you for volunteering! We will contact you soon.',
          loading: false,
          formType: 'volunteer'
        });
        
        // Reset form
        setVolunteerForm({
          firstName: '', middleName: '', lastName: '', email: '', 
          phone: '', university: '', year: '', skills: '', availability: ''
        });
      } else {
        setSubmitStatus({
          submitted: true,
          success: false,
          message: result.message,
          loading: false,
          formType: 'volunteer'
        });
      }
    } catch (error) {
      setSubmitStatus({
        submitted: true,
        success: false,
        message: 'An error occurred. Please try again later.',
        loading: false,
        formType: 'volunteer'
      });
    }
  };

  return (
    <motion.section
      id="join"
      className="join-movement-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="join-divider"></div>
      <motion.header
        className="section-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <h2 className="section-title">{t('joinMovement.title', 'Maharashtra Student Help Desk')}</h2>
        <div className="section-subtitle">{t('joinMovement.subtitle', 'Supporting Maharashtra Students and Educational Initiatives')}</div>
      </motion.header>
      <div className="section-content">
        <div className="tabs-container">
          <div 
            className={`tab ${activeTab === 'Maharashtra' ? 'active' : ''}`}
            onClick={() => setActiveTab('Maharashtra')}
          >
            {t('joinMovement.Maharashtra', 'Maharashtra Carry On Facility')}
          </div>
          <div 
            className={`tab ${activeTab === 'work' ? 'active' : ''}`}
            onClick={() => setActiveTab('work')}
          >
            {t('joinMovement.workForUs', 'Join Our Team')}
          </div>
          <div 
            className={`tab ${activeTab === 'volunteer' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteer')}
          >
            {t('joinMovement.volunteerWithUs', 'Student Volunteers')}
          </div>
        </div>
        
        {[
          { key: 'Maharashtra Support', jsx: (
            <div className={`info-card sppu-card ${activeTab === 'Maharashtra' ? 'active' : ''}`}>
              <h3>Join Our Movement to Support Maharashtra Students</h3>
              <div className="card-content">
                <div className="card-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
                    alt="Students at university campus"
                    className="card-image"
                  />
                </div>
                <div className="Maharashtra-description">
                  <p>
                    The "Carry On" Facility is a temporary policy introduced by the Maharashtra Government and implemented by SPPU for the 2022-23 combine passing and 2023-24 academic year. This student-friendly initiative allows engineering students with backlogs to progress to the next academic year, reducing educational delays and academic pressure.
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
              </div>
            </div>
          ) },
          
          { key: 'workForUs', jsx: (
            <div className={`info-card work-card ${activeTab === 'work' ? 'active' : ''}`}>
              <h3>Join the Maharashtra Student Help Desk Team</h3>
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
                    We at the Maharashtra Student Help Desk are committed to providing the best quality guidance and support services for students throughout Maharashtra, especially those at SPPU and affiliated institutions.
                  </p>
                  <p>
                    Our organization believes in an inclusive and supportive educational environment that helps students navigate complex university policies, academic requirements, and administrative procedures. We aim to make education more accessible to all, regardless of background.
                  </p>
                  <p>
                    Our work environment, recruitment policies, training, and career growth prospects are designed to attract passionate individuals who care deeply about student welfare and educational equity.
                  </p>
                  <p>
                    If you would like to work with us in improving the educational experience of Maharashtra's students and help us create a more supportive academic environment, then you have come to the right place.
                  </p>
                  <p>
                    Please share your resume with us, and we will get back to you shortly.
                  </p>
                </div>
                
                <form className="work-form" onSubmit={handleWorkFormSubmit}>
                  <h4>Application Details</h4>
                  
                  {submitStatus.submitted && submitStatus.formType === 'work' && (
                    <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="work-name">Full Name <span className="required">*</span></label>
                    <input 
                      type="text" 
                      id="work-name" 
                      value={workForm.name}
                      onChange={(e) => setWorkForm({...workForm, name: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work-email">Email Address <span className="required">*</span></label>
                    <input 
                      type="email" 
                      id="work-email" 
                      value={workForm.email}
                      onChange={(e) => setWorkForm({...workForm, email: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work-phone">Phone Number <span className="required">*</span></label>
                    <input 
                      type="tel" 
                      id="work-phone" 
                      value={workForm.phone}
                      onChange={(e) => setWorkForm({...workForm, phone: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="work-comments">Experience with Student Support</label>
                    <textarea 
                      id="work-comments" 
                      value={workForm.comments}
                      onChange={(e) => setWorkForm({...workForm, comments: e.target.value})}
                      rows={4}
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="form-submit"
                    disabled={submitStatus.loading && submitStatus.formType === 'work'}
                  >
                    {submitStatus.loading && submitStatus.formType === 'work' ? 'Sending...' : 'Apply Now'}
                  </button>
                </form>
              </div>
            </div>
          ) },
          
          { key: 'volunteerWithUs', jsx: (
            <div className={`info-card volunteer-card ${activeTab === 'volunteer' ? 'active' : ''}`}>
              <h3>Student Volunteer Program</h3>
              <div className="card-content">
                <div className="card-image-container">
                  <img 
                    src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=1000&auto=format&fit=crop"
                    alt="Student volunteers working together"
                    className="card-image"
                  />
                </div>
                <div className="volunteer-description">
                  <p>
                    The Maharashtra Student Help Desk greatly values the support of student volunteers from across universities. Your participation and contributions help fellow students navigate educational challenges. Sign up as a volunteer to provide peer support, share knowledge about university policies, and help create a more inclusive academic environment.
                  </p>
                  <p>
                    Sign up by sharing your contact details with us, and a coordinator will get in touch with you soon.
                  </p>
                </div>
                
                <form className="volunteer-form" onSubmit={handleVolunteerFormSubmit}>
                  <h4>Student Volunteer Registration</h4>
                  
                  {submitStatus.submitted && submitStatus.formType === 'volunteer' && (
                    <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
                      {submitStatus.message}
                    </div>
                  )}
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="volunteer-fname">First name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="volunteer-fname" 
                        value={volunteerForm.firstName}
                        onChange={(e) => setVolunteerForm({...volunteerForm, firstName: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="volunteer-mname">Middle name</label>
                      <input 
                        type="text" 
                        id="volunteer-mname" 
                        value={volunteerForm.middleName}
                        onChange={(e) => setVolunteerForm({...volunteerForm, middleName: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="volunteer-lname">Last name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="volunteer-lname" 
                        value={volunteerForm.lastName}
                        onChange={(e) => setVolunteerForm({...volunteerForm, lastName: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="volunteer-phone">Phone Number</label>
                      <input 
                        type="tel" 
                        id="volunteer-phone" 
                        value={volunteerForm.phone}
                        onChange={(e) => setVolunteerForm({...volunteerForm, phone: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="volunteer-university">University/College</label>
                      <input 
                        type="text" 
                        id="volunteer-university" 
                        value={volunteerForm.university}
                        onChange={(e) => setVolunteerForm({...volunteerForm, university: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="volunteer-email">Email Address <span className="required">*</span></label>
                      <input 
                        type="email" 
                        id="volunteer-email" 
                        value={volunteerForm.email}
                        onChange={(e) => setVolunteerForm({...volunteerForm, email: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="volunteer-skills">Skills & Expertise</label>
                    <input 
                      type="text" 
                      id="volunteer-skills" 
                      value={volunteerForm.skills}
                      onChange={(e) => setVolunteerForm({...volunteerForm, skills: e.target.value})}
                      placeholder="e.g., Academic counseling, Language skills, Technical support"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="volunteer-availability">Available Time</label>
                    <input 
                      type="text" 
                      id="volunteer-availability" 
                      value={volunteerForm.availability}
                      onChange={(e) => setVolunteerForm({...volunteerForm, availability: e.target.value})}
                      placeholder="e.g., Weekends, Evenings, 5 hours/week"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className="form-submit"
                    disabled={submitStatus.loading && submitStatus.formType === 'volunteer'}
                  >
                    {submitStatus.loading && submitStatus.formType === 'volunteer' ? 'Registering...' : 'Register as Volunteer'}
                  </button>
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
