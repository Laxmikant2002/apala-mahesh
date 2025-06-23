import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals, { isLowEndDevice } from './utils/performance';
// Import i18n configuration
import './i18n/i18n';

// Disable unnecessary animations on low-end devices
if (isLowEndDevice()) {
  document.documentElement.classList.add('reduce-motion');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Report web vitals to console for debugging performance issues
reportWebVitals((metric: any) => {
  // Log vital metrics to console in development
  console.log(metric.name, metric.value);
  
  // Could send to analytics service in production
  // if (process.env.NODE_ENV === 'production') { ... }
});
