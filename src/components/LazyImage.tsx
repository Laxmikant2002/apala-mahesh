import React from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const FALLBACK_IMAGE = '/images/media/image-not-found.png';

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
        const target = e.target as HTMLImageElement;
        target.onerror = null; // Prevent infinite loop
        target.src = FALLBACK_IMAGE;
      }}
    />
  );
};

export default LazyImage;
