import React from 'react';
import { motion } from 'framer-motion';
import '../styles/MediaSection.css';
import LazyImage from './LazyImage';

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
      <div className="media-divider"></div>
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
              src: "/images/media/student-protest1.jpg",
              alt: "Students protesting with flags and banners"
            }, {
              src: "/images/media/student-protest2.jpg",
              alt: "Student rally at Savitribai Phule Pune University"
            }, {
              src: "/images/media/student-protest3.jpg",
              alt: "Students holding protest signs"
            }, {
              src: "/images/media/student-protest4.jpg",
              alt: "Student union gathering at university"
            }, {
              src: "/images/media/student-protest5.jpg",
              alt: "SPPU students at awareness campaign"
            }, {
              src: "/images/media/student-protest6.jpg",
              alt: "Educational reform movement"
            }, {
              src: "/images/media/student-protest7.jpg",
              alt: "Student volunteers gathering"
            }, {
              src: "/images/media/student-protest8.jpg",
              alt: "Campus protest for student issues",
            },{
              src: "/images/media/student-protest9.jpg",
              alt: "Students at a peaceful protest"
            }].map((photo, idx) => (
              <motion.div
                className="media-item photo-item"
                key={photo.src}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <LazyImage src={photo.src} alt={photo.alt} />
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
                <div className="video-title">{video.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MediaSection;
