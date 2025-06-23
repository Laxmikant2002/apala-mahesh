import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import KeyIssues from './components/KeyIssues';
import MediaSection from './components/MediaSection';
import JoinMovement from './components/JoinMovement';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import IssueDetail from './components/IssueDetail';
import RaiseIssue from './components/RaiseIssue';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />        <Routes>
          <Route path="/issues/:issueId" element={<IssueDetail />} />
          <Route path="/raise-issue" element={<RaiseIssue />} />
          <Route path="/" element={
            <>
              <Hero />
              <div className="content">
                <KeyIssues />
                <MediaSection />
                <JoinMovement />
                <ContactUs />
              </div>
            </>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
