import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar - Professional responsive navigation with glassmorphism
 */
const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const navLinks = [
        { path: '/', label: 'Accueil' },
        { path: '/a-propos', label: 'À propos' },
        { path: '/services', label: 'Services' },
        { path: '/equipe', label: 'Équipe' },
        { path: '/contact', label: 'Contact' },
    ];

    const isAdmin = location.pathname.startsWith('/admin');
    if (isAdmin) return null; // Hide navbar on admin pages

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Logo */}
                <Link to="/" className="navbar-logo" id="navbar-logo">
                    <div className="logo-icon">
                        <img src="/logo.png" alt="Cabinet Hannit Logo" style={{ width: '40px', height: '40px' }} />
                    </div>
                    <div className="logo-text">
                        <span className="logo-name">Cabinet Hannit</span>
                        <span className="logo-tagline">Kinésithérapie</span>
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <ul className="navbar-links">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* CTA Button + Phone */}
                <div className="navbar-actions">
                    <a href="tel:+212644574537" className="nav-phone">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <span>+212 644 574 537</span>
                    </a>
                    <Link to="/rendez-vous" className="btn btn-primary nav-cta" id="nav-appointment-btn">
                        Rendez-vous
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className={`navbar-toggle ${menuOpen ? 'open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                    id="mobile-menu-toggle"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                <ul className="mobile-links">
                    {navLinks.map((link, i) => (
                        <li key={link.path} style={{ animationDelay: `${i * 0.05}s` }}>
                            <Link
                                to={link.path}
                                className={`mobile-link ${location.pathname === link.path ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                    <li style={{ animationDelay: '0.25s' }}>
                        <Link to="/rendez-vous" className="btn btn-primary mobile-cta">
                            Prendre Rendez-vous
                        </Link>
                    </li>
                </ul>
                <div className="mobile-contact">
                    <a href="tel:+212644574537" className="mobile-phone">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        +212 644 574 537
                    </a>
                </div>
            </div>

            {/* Mobile Overlay */}
            {menuOpen && <div className="mobile-overlay" onClick={() => setMenuOpen(false)} />}
        </nav>
    );
};

export default Navbar;
