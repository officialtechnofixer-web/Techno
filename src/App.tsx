import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

/* Components */
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Team from "./components/Team";
import ServiceCalculator from "./components/ServiceCalculator";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import LoadingSpinner from "./components/LoadingSpinner";
import ProgressBar from "./components/ProgressBar";
import BackToTop from "./components/BackToTop";
import MouseTrail from "./components/MouseTrail";

/* Pages */
import ShopPage from "./pages/ShopPage";
import QuotationPage from "./pages/QuotationPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // Retry for dynamically loaded content
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      <ProgressBar />
      <MouseTrail />
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Services />
              <Team />
              <ServiceCalculator />
              <Contact />
              <Footer />
            </>
          }
        />

        <Route path="/shop" element={<ShopPage />} />
        <Route path="/quotation" element={<QuotationPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />

        <Route path="/login" element={<Navigate to="/auth/login" replace />} />
        <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
      </Routes>

      <WhatsAppFloat />
      <BackToTop />
    </div>
  );
}

export default App;