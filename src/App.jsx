import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import CaseStudie from './pages/CaseStudie'; // Check if this should be "CaseStudy"
import Discover from './pages/Discover';
import OurWork from './pages/OurWork';
import Insights from './pages/Insights';
import Contact from './pages/LetsTalk'; // Make sure this file exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/case-studie" element={<CaseStudie />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </Router>
  );
}

export default App;
