import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import CaseStudie from './pages/CaseStudie'; // Renamed for consistency
import Discover from './pages/Discover';
import OurWork from './pages/OurWork';
import Insights from './pages/Insights';
import LetsTalk from './pages/LetsTalk'; // Ensure this exists

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<LetsTalk />} />
        <Route path="/case-study" element={<CaseStudie />} /> {/* Corrected path */}
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </Router>
  );
}

export default App;
