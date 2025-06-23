import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div className="content">
        <section id="key-issue" style={{ minHeight: '100vh', padding: '80px 20px 20px' }}>
          <h1>Key Issue Section</h1>
          <p>This is the Header Key Issue section of our website.</p>
        </section>
        
        <section id="media" style={{ minHeight: '100vh', padding: '80px 20px 20px' }}>
          <h1>Media Section</h1>
          <p>This section contains our media content including videos, photos, and articles.</p>
        </section>
        
        <section id="join" style={{ minHeight: '100vh', padding: '80px 20px 20px' }}>
          <h1>Join Our Movement</h1>
          <p>Learn how you can join our movement and make a difference.</p>
        </section>
        
        <section id="infocus" style={{ minHeight: '100vh', padding: '80px 20px 20px' }}>
          <h1>Infocus</h1>
          <p>Currently in focus: Special highlights and featured content.</p>
        </section>
      </div>
    </div>
  );
}

export default App;
