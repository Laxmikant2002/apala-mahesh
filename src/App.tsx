import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './styles/loading.css';

// Critical components loaded immediately
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy load less critical components
const KeyIssues = lazy(() => import('./components/KeyIssues'));
const MediaSection = lazy(() => import('./components/MediaSection'));
const JoinMovement = lazy(() => import('./components/JoinMovement'));
const ContactUs = lazy(() => import('./components/ContactUs'));
const Footer = lazy(() => import('./components/Footer'));
const IssueDetail = lazy(() => import('./components/IssueDetail'));
const RaiseIssue = lazy(() => import('./components/RaiseIssue'));

function App() {  return (
    <Router>
      <div className="App">
        <Navbar />
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/issues/:issueId" element={<IssueDetail />} />
            <Route path="/raise-issue" element={<RaiseIssue />} />
            <Route path="/" element={
              <>
                <Hero />
                <div className="content">
                  <Suspense fallback={<div className="section-loading">Loading Key Issues...</div>}>
                    <KeyIssues />
                  </Suspense>
                  <Suspense fallback={<div className="section-loading">Loading Media Section...</div>}>
                    <MediaSection />
                  </Suspense>
                  <Suspense fallback={<div className="section-loading">Loading Join Movement...</div>}>
                    <JoinMovement />
                  </Suspense>
                  <Suspense fallback={<div className="section-loading">Loading Contact Form...</div>}>
                    <ContactUs />
                  </Suspense>
                </div>
              </>
            } />
          </Routes>
          <Suspense fallback={<div className="footer-loading">Loading Footer...</div>}>
            <Footer />
          </Suspense>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
