import React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';
import './Services.css';

const Services = () => {
    const [listRef, listVisible] = useAnimateOnScroll();

    const servicesList = [
        {
            id: 'kinesitherapie',
            title: 'Kinésithérapie',
            description: 'La kinésithérapie est une discipline paramédicale qui utilise des techniques actives ou passives et la rééducation pour maintenir ou rétablir les capacités fonctionnelles.',
            features: ['Rééducation fonctionnelle', 'Renforcement musculaire', 'Drainage lymphatique', 'Massages thérapeutiques'],
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><path d="M20 8v6" /><path d="M23 11h-6" />
                </svg>
            )
        },
        {
            id: 'physiotherapie',
            title: 'Physiothérapie',
            description: 'La physiothérapie vise à traiter les incapacités physiques résultant de blessures ou de maladies par des moyens physiques (chaleur, froid, électricité, ultrasons).',
            features: ['Électrothérapie', 'Ultrasons', 'Thermothérapie', 'Cryothérapie'],
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
            )
        },
        {
            id: 'traumatologie',
            title: 'Traumatologie',
            description: 'Rééducation spécialisée après un accident, une fracture ou une opération chirurgicale pour retrouver une mobilité optimale.',
            features: ['Rééducation post-opératoire', 'Traitement des fractures', 'Entorses et luxations', 'Réathlétisation'],
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 20V10" /><path d="M12 20V4" /><path d="M6 20v-6" />
                </svg>
            )
        },
        {
            id: 'rhumatologie',
            title: 'Rhumatologie',
            description: 'Prise en charge des douleurs articulaires chroniques, de l\'arthrose et des rhumatismes inflammatoires pour améliorer le confort de vie.',
            features: ['Arthrose', 'Arthrite', 'Douleurs dorsales', 'Sciatique'],
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                </svg>
            )
        },
        {
            id: 'neurologie',
            title: 'Neurologie',
            description: 'Rééducation des patients atteints de troubles du système nerveux central ou périphérique (AVC, Parkinson, SEP).',
            features: ['AVC', 'Maladie de Parkinson', 'Sclérose en plaques', 'Paraplégie/Tétraplégie'],
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
            )
        },
        {
            id: 'amincissement',
            title: 'Amincissement',
            description: 'Programmes personnalisés alliant soins manuels et technologies pour une remise en forme et un remodelage de la silhouette.',
            features: ['Cryolipolyse', 'Drainage lymphatique', 'Suivi nutritionnel', 'Tonification'],
            icon: (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
            )
        }
    ];

    return (
        <div className="services-page">
            <PageHeader
                title="Nos Services"
                subtitle="Des soins complets et personnalisés pour votre rétablissement"
                breadcrumb={[
                    { label: 'Accueil', link: '/' },
                    { label: 'Services' }
                ]}
            />

            <section ref={listRef} className="section services-list-section">
                <div className="container">
                    <div className="services-list-grid">
                        {servicesList.map((service, index) => (
                            <div
                                key={service.id}
                                id={service.id}
                                className={`service-item card ${listVisible ? 'visible' : ''}`}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="service-icon-wrapper">
                                    {service.icon}
                                </div>
                                <div className="service-content">
                                    <h3 className="service-title">{service.title}</h3>
                                    <p className="service-description">{service.description}</p>
                                    <ul className="service-features">
                                        {service.features.map((feature, i) => (
                                            <li key={i}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link to="/rendez-vous" className="btn btn-secondary service-btn">
                                        Prendre Rendez-vous
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="service-cta">
                <div className="container">
                    <div className="service-cta-content">
                        <h2>Besoin d'un conseil personnalisé ?</h2>
                        <p>Notre équipe est à votre écoute pour définir le protocole de soin le plus adapté à votre pathologie.</p>
                        <Link to="/contact" className="btn btn-white">Contactez-nous</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;
