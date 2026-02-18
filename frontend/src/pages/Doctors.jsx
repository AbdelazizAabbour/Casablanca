import React from 'react';
import PageHeader from '../components/PageHeader';
import useAnimateOnScroll from '../hooks/useAnimateOnScroll';
import './Doctors.css';

const Doctors = () => {
    const [teamRef, teamVisible] = useAnimateOnScroll();

    const teamMembers = [
        {
            name: 'Asmaa Hannit',
            role: 'Fondatrice & Kinésithérapeute',
            speciality: 'Rééducation fonctionnelle, Thérapie manuelle',
            bio: 'Diplômée en kinésithérapie, Asmaa a fondé le cabinet en 2017 avec pour mission d\'offrir des soins personnalisés et de qualité.',
            image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&h=600&fit=crop'
        },
        {
            name: 'Dr. Sarah Bennani',
            role: 'Médecin Physique',
            speciality: 'Réadaptation, Traumatologie du sport',
            bio: 'Spécialiste en médecine physique et réadaptation, elle supervise les protocoles de soins pour les sportifs de haut niveau.',
            image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=500&h=600&fit=crop'
        },
        {
            name: 'Youssef El Amrani',
            role: 'Kinésithérapeute',
            speciality: 'Neurologie, Rééducation respiratoire',
            bio: 'Passionné par la neurologie, Youssef accompagne les patients atteints de pathologies neurologiques vers plus d\'autonomie.',
            image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=500&h=600&fit=crop'
        }
    ];

    return (
        <div className="doctors-page">
            <PageHeader
                title="Notre Équipe"
                subtitle="Des professionnels passionnés et dévoués à votre santé"
                breadcrumb={[
                    { label: 'Accueil', link: '/' },
                    { label: 'Équipe' }
                ]}
            />

            <section ref={teamRef} className="section team-section">
                <div className="container">
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className={`team-card card animate-fadeInUp delay-${index + 1}`}
                                style={{ transitionDelay: `${index * 0.2}s` }}
                            >
                                <div className="team-image-wrapper">
                                    <img src={member.image} alt={member.name} className="team-image" />
                                    <div className="team-overlay">
                                        <div className="team-social">
                                            <a href="#" aria-label="LinkedIn"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
                                            <a href="#" aria-label="Twitter"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-content">
                                    <h3 className="team-name">{member.name}</h3>
                                    <span className="team-role">{member.role}</span>
                                    <p className="team-speciality">{member.speciality}</p>
                                    <p className="team-bio">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Doctors;
