import React, { useState, useRef, useEffect } from 'react';
import '../styles/LazyImage.css';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  priority?: boolean;
}

const FALLBACK_IMAGE = '/images/media/image-not-found.png';

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(priority ? src : '');
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) return; // Skip intersection observer for priority images

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !imageSrc) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, imageSrc, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setImageSrc(FALLBACK_IMAGE);
  };

  return (
    <div className={`lazy-image-container ${className || ''}`} style={{ width, height }}>
      {!isLoaded && !hasError && (
        <div className="image-skeleton" style={{ width, height }}>
          <div className="skeleton-animation"></div>
        </div>
      )}
      <img 
        ref={imgRef}
        src={imageSrc || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InRyYW5zcGFyZW50Ii8+PC9zdmc+'} 
        alt={alt} 
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        width={width} 
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        style={{ 
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default LazyImage;
