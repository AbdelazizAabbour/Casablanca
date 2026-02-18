import React, { useEffect, useState } from 'react';
import './SplashScreen.css';
const heroImage = `${import.meta.env.BASE_URL}logo.png`;

const SplashScreen = ({ onFinish }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [animateLogo, setAnimateLogo] = useState(false);

    useEffect(() => {
        // Start animation after a brief delay
        const logoTimer = setTimeout(() => {
            setAnimateLogo(true);
        }, 500);

        // Hide splash screen after 3 seconds
        const finishTimer = setTimeout(() => {
            setIsVisible(false);
            if (onFinish) onFinish();
        }, 3000);

        return () => {
            clearTimeout(logoTimer);
            clearTimeout(finishTimer);
        };
    }, [onFinish]);

    if (!isVisible) return null;

    return (
        <div className={`splash-screen ${!isVisible ? 'fade-out' : ''}`}>
            <div className={`splash-content ${animateLogo ? 'animate' : ''}`}>
                <div className="splash-logo-container">
                    <img
                        src={heroImage}
                        alt="Cabinet Hannit Logo"
                        className="splash-logo"
                    />
                </div>
                <div className="splash-text">
                    <h1 className="splash-brand">Cabinet Hannit</h1>
                    <div className="splash-slogan-wrapper">
                        <p className="splash-slogan">Le meilleur pour votre santé</p>
                        <div className="splash-line"></div>
                    </div>
                </div>
            </div>

            <div className="splash-background-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
            </div>
        </div>
    );
};

export default SplashScreen;
