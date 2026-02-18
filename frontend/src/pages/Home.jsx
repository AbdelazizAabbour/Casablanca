import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices, getDoctors } from '../services/api';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';
import './Home.css';

/* ── Inline SVG Icons ── */
const icons = {
    trauma: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
        </svg>
    ),
    rhuma: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
        </svg>
    ),
    neuro: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    ),
    kine: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6" /><path d="M23 11h-6" />
        </svg>
    ),
    physio: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    ),
    amincissement: (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
    ),
    phone: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    check: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    ),
    clock: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    ),
    location: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
    ),
    star: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    ),
};

const specialties = [
    { icon: icons.trauma, title: 'Traumatologique', desc: 'Rééducation après blessures et traumatismes' },
    { icon: icons.rhuma, title: 'Rhumatologique', desc: 'Traitement des maladies articulaires' },
    { icon: icons.neuro, title: 'Neurologiques', desc: 'Rééducation neurologique spécialisée' },
];

const servicesData = [
    { icon: icons.amincissement, title: 'Amincissement', desc: 'Programme d\'amincissement personnalisé avec des techniques modernes et un suivi professionnel.' },
    { icon: icons.physio, title: 'Physiothérapie', desc: 'Traitement et prévention des troubles physiques par des méthodes naturelles et manuelles.' },
    { icon: icons.kine, title: 'Kinésithérapie', desc: 'Rééducation fonctionnelle complète pour retrouver mobilité et bien-être au quotidien.' },
    { icon: icons.trauma, title: 'Traumatologie', desc: 'Prise en charge spécialisée des blessures traumatiques et rééducation post-opératoire.' },
    { icon: icons.rhuma, title: 'Rhumatologie', desc: 'Soulagement des douleurs articulaires et musculaires par des soins adaptés.' },
    { icon: icons.neuro, title: 'Neurologie', desc: 'Rééducation neurologique pour les troubles du système nerveux central et périphérique.' },
];

const testimonials = [
    { name: 'Fatima Z.', text: 'Un cabinet exceptionnel ! L\'équipe est très professionnelle et attentionnée. Je recommande vivement pour tout type de rééducation.', rating: 5 },
    { name: 'Mohammed A.', text: 'Après mon accident, Cabinet Hannit m\'a aidé à retrouver ma mobilité. Les soins sont de qualité et le suivi est excellent.', rating: 5 },
    { name: 'Sara M.', text: 'Très satisfaite des séances de physiothérapie. L\'ambiance est chaleureuse et les résultats sont au rendez-vous.', rating: 5 },
];

const faqs = [
    { q: 'Comment prendre rendez-vous ?', a: 'Vous pouvez prendre rendez-vous en ligne via notre site, par téléphone au +212 644 574 537, ou directement au cabinet.' },
    { q: 'Quels types de soins proposez-vous ?', a: 'Nous proposons la kinésithérapie, la physiothérapie, la rééducation traumatologique, rhumatologique, neurologique, ainsi que des programmes d\'amincissement.' },
    { q: 'Les séances sont-elles remboursées ?', a: 'Oui, nos séances sont prises en charge par la plupart des mutuelles et assurances maladie. Contactez-nous pour plus de détails.' },
    { q: 'Quelle est la durée d\'une séance ?', a: 'Une séance dure généralement entre 30 et 60 minutes selon le type de traitement et les besoins du patient.' },
];

const Home = () => {
    const [servicesRef, servicesVisible] = useAnimateOnScroll();
    const [aboutRef, aboutVisible] = useAnimateOnScroll();
    const [ctaRef, ctaVisible] = useAnimateOnScroll();
    const [statsRef, statsVisible] = useAnimateOnScroll();
    const [testimonialsRef, testimonialsVisible] = useAnimateOnScroll();
    const [hoursRef, hoursVisible] = useAnimateOnScroll();
    const [faqRef, faqVisible] = useAnimateOnScroll();

    const [openFaq, setOpenFaq] = useState(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const [touchStart, setTouchStart] = useState(null);

    const [touchEnd, setTouchEnd] = useState(null);

    // Minimum swipe distance (pixels)
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe) {
            nextTestimonial();
        } else if (isRightSwipe) {
            prevTestimonial();
        }
    };




    // Variable pour l'image (facile à changer pour l'hébergement)
    const heroImage = `${import.meta.env.BASE_URL}hero.jpeg`;

    return (
        <div className="home-page">
            {/* ════════ Hero Section ════════ */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-pattern"></div>
                    <div className="hero-gradient-orb hero-orb-1"></div>
                    <div className="hero-gradient-orb hero-orb-2"></div>
                    <div className="hero-gradient-orb hero-orb-3"></div>
                </div>

                <div className="container hero-content">
                    <div className="hero-text">
                        <div className="hero-badge animate-fadeInDown">
                            <span className="hero-badge-dot"></span>
                            Cabinet de Kinésithérapie à Casablanca
                        </div>
                        <h1 className="hero-title animate-fadeInUp">
                            Cabinet <span className="gradient-text">Hannit</span>
                            <br />
                            <span className="hero-title-sub">Le meilleur pour votre santé</span>
                        </h1>
                        <p className="hero-description animate-fadeInUp delay-2">
                            L'information, l'utilisation et la connaissance croissante de la
                            physiothérapie sont parmi les facteurs les plus importants pour votre
                            bien-être. Nous mettons notre expertise à votre service.
                        </p>
                        <div className="hero-actions animate-fadeInUp delay-3">
                            <Link to="/rendez-vous" className="btn btn-primary btn-lg" id="hero-appointment-btn">
                                Prendre Rendez-vous
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                </svg>
                            </Link>
                            <Link to="/services" className="btn btn-secondary btn-lg" id="hero-services-btn">
                                Nos Services
                            </Link>
                        </div>
                    </div>

                    <div className="hero-visual animate-scaleIn delay-3">
                        <div className="hero-image-wrapper">
                            <img
                                src={heroImage}
                                alt="Cabinet de kinésithérapie moderne"
                                className="hero-image"
                            />
                            <div className="hero-floating-card hero-card-1">
                                <div className="floating-card-icon">{icons.check}</div>
                                <div>
                                    <strong>+2000</strong>
                                    <span>Patients satisfaits</span>
                                </div>
                            </div>
                            <div className="hero-floating-card hero-card-2">
                                <div className="floating-card-icon accent">{icons.clock}</div>
                                <div>
                                    <strong>Depuis 2017</strong>
                                    <span>À votre service</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Specialty cards */}
                <div className="container">
                    <div className="hero-specialties">
                        {specialties.map((spec, i) => (
                            <div key={i} className={`specialty-card animate-fadeInUp delay-${i + 2}`}>
                                <div className="specialty-icon">{spec.icon}</div>
                                <h3 className="specialty-title">{spec.title}</h3>
                                <p className="specialty-desc">{spec.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ About Preview Section ════════ */}
            <section ref={aboutRef} className={`section about-preview ${aboutVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="about-grid">
                        <div className="about-images">
                            <div className="about-img-main">
                                <img
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=600&fit=crop"
                                    alt="Cabinet Hannit intérieur"
                                />
                            </div>
                            <div className="about-img-secondary">
                                <img
                                    src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=300&h=350&fit=crop"
                                    alt="Soins de kinésithérapie"
                                />
                            </div>
                            <div className="about-experience-badge">
                                <span className="experience-number">8+</span>
                                <span className="experience-text">Années d'expérience</span>
                            </div>
                        </div>
                        <div className="about-content">
                            <span className="section-subtitle">À propos de nous</span>
                            <h2 className="section-title">Les gens nous font confiance</h2>
                            <p className="about-highlight">
                                Parce que nos patients sont notre famille
                            </p>
                            <p className="about-description">
                                Cabinet Hannit a été fondée en 2017 par Asmaa HANNIT, kinésithérapeute.
                                Sa vision et son rêve de créer un environnement de travail interdisciplinaire
                                où le professionnel n'est plus un thérapeute isolé, mais bien un membre d'une
                                équipe synergique, l'ont amené à créer cette clinique.
                            </p>
                            <ul className="about-features">
                                <li>
                                    <span className="feature-icon">{icons.check}</span>
                                    Équipe de professionnels qualifiés
                                </li>
                                <li>
                                    <span className="feature-icon">{icons.check}</span>
                                    Équipements modernes et de pointe
                                </li>
                                <li>
                                    <span className="feature-icon">{icons.check}</span>
                                    Suivi personnalisé pour chaque patient
                                </li>
                                <li>
                                    <span className="feature-icon">{icons.check}</span>
                                    Approche thérapeutique holistique
                                </li>
                            </ul>
                            <Link to="/a-propos" className="btn btn-primary" id="home-about-btn">
                                En savoir plus
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════ Stats Section ════════ */}
            <section ref={statsRef} className={`stats-section ${statsVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="stats-grid">
                        {[
                            { number: '2000+', label: 'Patients Traités' },
                            { number: '8+', label: 'Ans d\'expérience' },
                            { number: '6', label: 'Services Spécialisés' },
                            { number: '98%', label: 'Satisfaction' },
                        ].map((stat, i) => (
                            <div key={i} className="stat-item">
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ Services Section ════════ */}
            <section ref={servicesRef} className={`section services-section ${servicesVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Nos Services</span>
                        <h2 className="section-title">Découvrez nos services</h2>
                        <p className="section-description">
                            Des soins de qualité adaptés à vos besoins, dispensés par une équipe de professionnels passionnés.
                        </p>
                    </div>

                    <div className="services-grid">
                        {servicesData.map((service, i) => (
                            <div key={i} className="service-card card">
                                <div className="service-card-icon">{service.icon}</div>
                                <h3 className="service-card-title">{service.title}</h3>
                                <p className="service-card-desc">{service.desc}</p>
                                <Link to="/services" className="service-card-link">
                                    En savoir plus
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Emergency CTA */}
                    <div className="emergency-cta">
                        <a href="tel:+212644574537" className="emergency-link">
                            {icons.phone}
                            <div>
                                <span className="emergency-number">+212 644 574 537</span>
                                <span className="emergency-text">Appelez-nous pour obtenir une aide d'urgence</span>
                            </div>
                        </a>
                    </div>
                </div>
            </section>

            {/* ════════ Testimonials Section ════════ */}
            <section ref={testimonialsRef} className={`section testimonials-section ${testimonialsVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Témoignages</span>
                        <h2 className="section-title">Ce que disent nos patients</h2>
                    </div>
                    <div
                        className="testimonials-carousel-wrapper"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >

                        <div className="testimonials-carousel" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                            {testimonials.map((t, i) => (
                                <div key={i} className="testimonial-slide">
                                    <div className="testimonial-card card">
                                        <div className="testimonial-stars">
                                            {Array.from({ length: t.rating }, (_, j) => (
                                                <span key={j} className="star">{icons.star}</span>
                                            ))}
                                        </div>
                                        <p className="testimonial-text">"{t.text}"</p>
                                        <div className="testimonial-author">
                                            <div className="testimonial-avatar">{t.name.charAt(0)}</div>
                                            <div className="testimonial-meta">
                                                <span className="testimonial-name">{t.name}</span>
                                                <span className="testimonial-status">Patient Vérifié</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="carousel-controls">
                            <button className="carousel-btn prev" onClick={prevTestimonial} aria-label="Précédent">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button className="carousel-btn next" onClick={nextTestimonial} aria-label="Suivant">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="carousel-dots">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`dot ${currentTestimonial === i ? 'active' : ''}`}
                                    onClick={() => setCurrentTestimonial(i)}
                                    aria-label={`Aller au témoignage ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ════════ Working Hours Section ════════ */}
            <section ref={hoursRef} className={`section hours-section ${hoursVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="hours-grid">
                        <div className="hours-content">
                            <span className="section-subtitle">Horaires</span>
                            <h2 className="section-title">Heures d'ouverture</h2>
                            <p className="hours-description">
                                Nous sommes disponibles pour vous accueillir du lundi au samedi.
                                N'hésitez pas à nous contacter pour prendre rendez-vous.
                            </p>
                            <div className="hours-list">
                                {[
                                    { day: 'Lundi', hours: '9h00 - 18h00' },
                                    { day: 'Mardi', hours: '9h00 - 18h00' },
                                    { day: 'Mercredi', hours: '9h00 - 18h00' },
                                    { day: 'Jeudi', hours: '9h00 - 18h00' },
                                    { day: 'Vendredi', hours: '9h00 - 18h00' },
                                    { day: 'Samedi', hours: '10h00 - 15h00' },
                                    { day: 'Dimanche', hours: 'Fermé', closed: true },
                                ].map((item, i) => (
                                    <div key={i} className={`hours-row ${item.closed ? 'closed' : ''}`}>
                                        <span className="hours-day">{item.day}</span>
                                        <span className="hours-dots"></span>
                                        <span className="hours-time">{item.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="hours-info">
                            <div className="info-card">
                                <div className="info-card-icon">{icons.location}</div>
                                <h4>Notre Adresse</h4>
                                <p>32, Bd Chefchaouni, Résidence Dar Dounia, 1er Étage, App N°3, Casablanca</p>
                            </div>
                            <div className="info-card">
                                <div className="info-card-icon">{icons.phone}</div>
                                <h4>Téléphone</h4>
                                <p><a href="tel:+212644574537">+212 644 574 537</a></p>
                                <p><a href="tel:+212522342569">+212 522 342 569</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════ FAQ Section ════════ */}
            <section ref={faqRef} className={`section faq-section ${faqVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">FAQ</span>
                        <h2 className="section-title">Questions Fréquentes</h2>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, i) => (
                            <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <span>{faq.q}</span>
                                    <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="6 9 12 15 18 9" />
                                    </svg>
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════ CTA Section ════════ */}
            <section ref={ctaRef} className={`cta-section ${ctaVisible ? 'visible' : ''}`}>
                <div className="cta-bg">
                    <div className="cta-pattern"></div>
                </div>
                <div className="container cta-content">
                    <h2 className="cta-title">Ne perdez pas votre temps</h2>
                    <p className="cta-subtitle">Prenez rendez-vous en ligne dès maintenant</p>
                    <div className="cta-actions">
                        <Link to="/rendez-vous" className="btn btn-white btn-lg" id="home-cta-appointment">
                            Prendre Rendez-vous
                        </Link>
                        <a href="tel:+212644574537" className="btn btn-outline-white btn-lg">
                            {icons.phone}
                            Appelez-nous
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
