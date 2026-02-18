import React, { useState, useEffect } from 'react';
import './GoToTop.css';

/**
 * GoToTop - Fixed button to scroll back to the top
 */
const GoToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > 400);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            id="go-to-top-btn"
            className={`go-to-top ${visible ? 'visible' : ''}`}
            onClick={scrollToTop}
            aria-label="Retour en haut"
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="18 15 12 9 6 15" />
            </svg>
        </button>
    );
};

export default GoToTop;
