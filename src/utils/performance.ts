import { useEffect } from 'react';

// Function to report web vitals for analytics
const reportWebVitals = (onPerfEntry: any) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry); // Cumulative Layout Shift
      getFID(onPerfEntry); // First Input Delay
      getFCP(onPerfEntry); // First Contentful Paint
      getLCP(onPerfEntry); // Largest Contentful Paint
      getTTFB(onPerfEntry); // Time To First Byte
    });
  }
};

// Hook to preload critical assets
export const usePreloadAssets = (urls: string[]) => {
  useEffect(() => {
    const preloadLinks = urls.map(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      if (url.endsWith('.js')) {
        link.as = 'script';
      } else if (url.endsWith('.css')) {
        link.as = 'style';
      } else if (url.match(/\.(jpe?g|png|gif|webp)$/)) {
        link.as = 'image';
      } else if (url.match(/\.(woff2?|ttf|otf)$/)) {
        link.as = 'font';
        link.crossOrigin = 'anonymous';
      }
      
      link.href = url;
      return link;
    });
    
    preloadLinks.forEach(link => document.head.appendChild(link));
    
    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [urls]);
};

// Function to detect slow connections
export const isLowEndDevice = () => {
  // Using window.navigator because TypeScript doesn't recognize navigator.connection
  const nav = window.navigator as any;
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  
  return (
    typeof connection !== 'undefined' && 
    (connection.effectiveType === 'slow-2g' || 
     connection.effectiveType === '2g' || 
     connection.saveData === true)
  );
};

export default reportWebVitals;
