import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import GlobalPresencePage from './pages/GlobalPresencePage';
import QualityPage from './pages/QualityPage';
import CSRPage from './pages/CSRPage';
import ContactPage from './pages/ContactPage';
import CentreOfExcellencePage from './pages/CentreOfExcellencePage';
import OurJourneyPage from './pages/OurJourneyPage';
import Footer from './components/Footer';
import ExpandableFAB from './components/ExpandableFAB';

function App() {
  // Voiceflow integration is now handled through the ExpandableFAB component

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/global-presence" element={<GlobalPresencePage />} />
            <Route path="/quality" element={<QualityPage />} />
            <Route path="/csr" element={<CSRPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/centre-of-excellence" element={<CentreOfExcellencePage />} />
            <Route path="/our-journey" element={<OurJourneyPage />} />
          </Routes>
        </main>
        <Footer />
        {/* Expandable FAB replaces individual action buttons */}
        <ExpandableFAB />
      </div>
    </Router>
  );
}

export default App;