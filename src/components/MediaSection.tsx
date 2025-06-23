import React from 'react';
import './MediaSection.css';

const MediaSection: React.FC = () => {
  return (
    <section id="media" className="media-section">
      <h2 className="section-title">Our Media</h2>
      
      <div className="media-subsections">
        {/* Photos Subsection */}
        <div className="media-subsection">
          <h3 className="subsection-title">Photos</h3>
          <div className="media-grid">
            <div className="media-item photo-item">
              <img 
                src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Students studying in a classroom" 
              />
              <div className="media-caption">Community workshop on educational reforms</div>
            </div>
            
            <div className="media-item photo-item">
              <img 
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Students in a library" 
              />
              <div className="media-caption">Library improvement initiative</div>
            </div>
            
            <div className="media-item photo-item">
              <img 
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Students participating in group discussion" 
              />
              <div className="media-caption">Student forum on educational challenges</div>
            </div>
            
            <div className="media-item photo-item">
              <img 
                src="https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Students at a campus event" 
              />
              <div className="media-caption">Awareness campaign at university campus</div>
            </div>
          </div>
        </div>
        
        {/* Videos Subsection */}
        <div className="media-subsection">
          <h3 className="subsection-title">Videos</h3>
          <div className="media-grid">
            <div className="media-item video-item">
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/jG1UFoHgAgk" 
                  title="Educational Reform Initiative" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="media-caption">Our campaign for educational reform</div>
            </div>
            
            <div className="media-item video-item">
              <div className="video-container">
                <iframe 
                  src="https://www.youtube.com/embed/y_ZmM7zPLyI" 
                  title="Student Voices Documentary" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <div className="media-caption">Student voices: Challenges and aspirations</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaSection;
