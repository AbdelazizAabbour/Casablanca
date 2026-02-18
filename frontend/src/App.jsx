import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import GoToTop from './components/GoToTop';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Doctors = lazy(() => import('./pages/Doctors'));
const Contact = lazy(() => import('./pages/Contact'));
const Appointment = lazy(() => import('./pages/Appointment'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Loading component
const PageLoader = () => (
    <div className="loading-overlay">
        <div style={{ textAlign: 'center' }}>
            <div className="spinner" style={{ margin: '0 auto 16px' }}></div>
            <p style={{ color: 'var(--primary)', fontWeight: 500 }}>Chargement...</p>
        </div>
    </div>
);

import SplashScreen from './components/SplashScreen';

function App() {
    const [showSplash, setShowSplash] = React.useState(true);

    return (
        <Router>
            <SplashScreen onFinish={() => setShowSplash(false)} />
            {!showSplash && (
                <>
                    <ScrollToTop />
                    <div className="app animate-fadeIn">
                        <Navbar />
                        <main>
                            <Suspense fallback={<PageLoader />}>
                                <Routes>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/a-propos" element={<About />} />
                                    <Route path="/services" element={<Services />} />
                                    <Route path="/equipe" element={<Doctors />} />
                                    <Route path="/contact" element={<Contact />} />
                                    <Route path="/rendez-vous" element={<Appointment />} />
                                    <Route path="/admin/login" element={<AdminLogin />} />
                                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                </Routes>
                            </Suspense>
                        </main>
                        <Footer />
                        <GoToTop />
                    </div>
                </>
            )}
        </Router>
    );
}

export default App;
