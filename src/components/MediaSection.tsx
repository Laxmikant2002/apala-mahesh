import React from 'react';
import { motion } from 'framer-motion';
import '../styles/MediaSection.css'; // Ensure you have the correct path to your CSS file

const MediaSection: React.FC = () => {
  return (
    <motion.section
      id="media"
      className="media-section"
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
        Our Media
      </motion.h2>
      <div className="media-subsections">
        {/* Photos Subsection */}
        <motion.div
          className="media-subsection"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <h3 className="subsection-title">Photos</h3>
          <div className="media-grid">
            {[{
              src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              alt: "Students studying in a classroom",
              caption: "Community workshop on educational reforms"
            }, {
              src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              alt: "Students in a library",
              caption: "Library improvement initiative"
            }, {
              src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              alt: "Students participating in group discussion",
              caption: "Student forum on educational challenges"
            }, {
              src: "https://images.unsplash.com/photo-1492538368677-f6e0afe31dcc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
              alt: "Students at a campus event",
              caption: "Awareness campaign at university campus"
            }].map((photo, idx) => (
              <motion.div
                className="media-item photo-item"
                key={photo.src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <img src={photo.src} alt={photo.alt} />
                <div className="media-caption">{photo.caption}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Videos Subsection */}
        <motion.div
          className="media-subsection"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.18 }}
        >
          <h3 className="subsection-title">Videos</h3>
          <div className="media-grid">
            {[{
              src: "https://www.youtube.com/embed/jG1UFoHgAgk",
              title: "Educational Reform Initiative",
              caption: "Our campaign for educational reform"
            }, {
              src: "https://www.youtube.com/embed/y_ZmM7zPLyI",
              title: "Student Voices Documentary",
              caption: "Student voices: Challenges and aspirations"
            }].map((video, idx) => (
              <motion.div
                className="media-item video-item"
                key={video.src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="video-container">
                  <iframe
                    src={video.src}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="media-caption">{video.caption}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MediaSection;
