import React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, width, height }) => {
  return (
    <img 
      src={src} 
      alt={alt} 
      className={className || ''} 
      loading="lazy"
      width={width} 
      height={height}
      onError={(e) => {
        // If image fails to load, use a placeholder
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop
        target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
      }}
    />
  );
};

export default LazyImage;
