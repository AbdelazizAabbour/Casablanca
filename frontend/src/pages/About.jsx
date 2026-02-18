import React, { useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';
import './About.css';

const About = () => {
    const [visionRef, visionVisible] = useAnimateOnScroll();
    const [teamRef, teamVisible] = useAnimateOnScroll();
    const [valuesRef, valuesVisible] = useAnimateOnScroll();

    return (
        <div className="about-page">
            <PageHeader
                title="À Propos de Nous"
                subtitle="Votre partenaire santé de confiance à Casablanca depuis 2017"
                breadcrumb={[
                    { label: 'Accueil', link: '/' },
                    { label: 'À Propos' }
                ]}
            />

            {/* Intro Section */}
            <section className="section about-intro">
                <div className="container">
                    <div className="about-intro-grid">
                        <div className="about-intro-content animate-fadeInLeft">
                            <span className="section-subtitle">Notre Histoire</span>
                            <h2 className="section-title">L'excellence au service de votre santé</h2>
                            <p className="lead-text">
                                Cabinet Hannit a été fondé avec une vision claire : offrir des soins de kinésithérapie
                                et de physiothérapie d'excellence dans un cadre chaleureux et professionnel.
                            </p>
                            <p>
                                Depuis notre ouverture en 2017, nous nous sommes engagés à placer le patient au cœur
                                de notre démarche thérapeutique. Notre fondatrice, Asmaa Hannit, a voulu créer un espace
                                où chaque patient bénéficie d'une prise en charge personnalisée, alliant techniques
                                manuelles traditionnelles et technologies de pointe.
                            </p>
                            <p>
                                Nous croyons fermement que la guérison passe par une écoute attentive et une compréhension
                                globale des besoins de chacun. C'est pourquoi notre approche est résolument humaine et
                                interdisciplinaire.
                            </p>
                        </div>
                        <div className="about-intro-image animate-fadeInRight delay-2">
                            <img
                                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=700&fit=crop"
                                alt="Cabinet Hannit Salle de Soin"
                                className="rounded-image shadow-lg"
                            />
                            <div className="about-badge">
                                <span className="badge-year">2017</span>
                                <span className="badge-text">Année de fondation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section ref={visionRef} className={`section vision-section ${visionVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="vision-grid">
                        <div className="vision-card">
                            <div className="vision-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M2 12h5l3 5 3-9 3 5h5M22 12h-2" />
                                </svg>
                            </div>
                            <h3>Notre Mission</h3>
                            <p>
                                Améliorer la qualité de vie de nos patients en leur redonnant mobilité et autonomie
                                grâce à des soins de rééducation de haute qualité.
                            </p>
                        </div>
                        <div className="vision-card">
                            <div className="vision-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 16v-4M12 8h.01" />
                                </svg>
                            </div>
                            <h3>Notre Vision</h3>
                            <p>
                                Devenir la référence en kinésithérapie à Casablanca en innovant constamment
                                et en maintenant les plus hauts standards de pratique médicale.
                            </p>
                        </div>
                        <div className="vision-card">
                            <div className="vision-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                                </svg>
                            </div>
                            <h3>Nos Valeurs</h3>
                            <p>
                                Empathie, Professionnalisme, Innovation et Intégrité guident chacune de nos
                                actions et interactions avec nos patients.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values/Why Choose Us */}
            <section ref={valuesRef} className={`section values-section ${valuesVisible ? 'visible' : ''}`}>
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Pourquoi Nous Choisir</span>
                        <h2 className="section-title">Votre santé mérite le meilleur</h2>
                    </div>

                    <div className="values-grid">
                        {[
                            {
                                title: 'Expertise Reconnue',
                                desc: 'Une équipe diplômée et continuellement formée aux dernières techniques.',
                                image: 'https://images.unsplash.com/photo-1576091160550-2187d80a18f7?w=500&h=350&fit=crop'
                            },
                            {
                                title: 'Équipement Moderne',
                                desc: 'Utilisation de technologies de pointe pour optimiser votre rétablissement.',
                                image: 'https://images.unsplash.com/photo-1516549655169-df83a25a836b?w=500&h=350&fit=crop'
                            },
                            {
                                title: 'Cadre Apaisant',
                                desc: 'Un environnement calme et accueillant favorisant la guérison et le bien-être.',
                                image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=350&fit=crop'
                            }
                        ].map((item, i) => (
                            <div key={i} className="value-item">
                                <div className="value-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="value-content">
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
