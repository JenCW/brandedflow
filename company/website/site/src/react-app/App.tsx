import { BrowserRouter as Router, Routes, Route } from "react-router";
import Navigation from "@/react-app/components/Navigation";
import Footer from "@/react-app/components/Footer";
import CursorGlow from "@/react-app/components/CursorGlow";
import NoiseBackground from "@/react-app/components/NoiseBackground";
import ScrollToTop from "@/react-app/components/ScrollToTop";
import HomePage from "@/react-app/pages/Home";
import AboutPage from "@/react-app/pages/About";
import ServicesPage from "@/react-app/pages/Services";
import PortfolioPage from "@/react-app/pages/Portfolio";
import CaseStudiesPage from "@/react-app/pages/CaseStudies";
import LocalSEOPage from "@/react-app/pages/LocalSEO";
import FAQPage from "@/react-app/pages/FAQ";
import ContactPage from "@/react-app/pages/Contact";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <CursorGlow />
        <NoiseBackground />
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/orange-county" element={<LocalSEOPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
