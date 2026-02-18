import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { createAppointment } from '../services/api';
import './Appointment.css';

const Appointment = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: ''
    });
    const [status, setStatus] = useState({ type: '', message: '' });
    const [loading, setLoading] = useState(false);

    const services = [
        'Kinésithérapie',
        'Physiothérapie',
        'Traumatologie',
        'Rhumatologie',
        'Neurologie',
        'Amincissement',
        'Autre'
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await createAppointment(formData);
            setStatus({
                type: 'success',
                message: 'Votre demande de rendez-vous a bien été envoyée. Nous vous confirmerons la date et l\'heure par téléphone sous peu.'
            });
            setFormData({
                name: '', email: '', phone: '', service: '',
                date: '', time: '', message: ''
            });
        } catch (error) {
            console.error('Error booking appointment:', error);
            setStatus({
                type: 'error',
                message: 'Une erreur est survenue lors de la réservation. Veuillez réessayer ou nous contacter par téléphone.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="appointment-page">
            <PageHeader
                title="Prendre Rendez-vous"
                subtitle="Réservez votre consultation en ligne facilement"
                breadcrumb={[
                    { label: 'Accueil', link: '/' },
                    { label: 'Rendez-vous' }
                ]}
            />

            <section className="section appointment-section">
                <div className="container">
                    <div className="appointment-grid">
                        {/* Intro Content */}
                        <div className="appointment-intro animate-fadeInLeft">
                            <span className="section-subtitle">Consultation</span>
                            <h2 className="section-title">Votre santé ne peut pas attendre</h2>
                            <p className="lead-text">
                                Remplissez le formulaire ci-contre pour demander un rendez-vous. Notre équipe
                                administrative vous contactera rapidement pour confirmer votre consultation.
                            </p>

                            <div className="appointment-steps">
                                <div className="step-item">
                                    <span className="step-number">1</span>
                                    <h4>Remplissez le formulaire</h4>
                                    <p>Indiquez vos coordonnées et vos préférences de date.</p>
                                </div>
                                <div className="step-item">
                                    <span className="step-number">2</span>
                                    <h4>Confirmation</h4>
                                    <p>Nous vous appelons pour confirmer le créneau horaire.</p>
                                </div>
                                <div className="step-item">
                                    <span className="step-number">3</span>
                                    <h4>Consultation</h4>
                                    <p>Présentez-vous au cabinet 10 minutes avant votre heure.</p>
                                </div>
                            </div>

                            <div className="appointment-info-box">
                                <h4>Heures d'ouverture</h4>
                                <ul className="info-hours">
                                    <li><span>Lun - Ven:</span> <strong>09:00 - 18:00</strong></li>
                                    <li><span>Samedi:</span> <strong>10:00 - 15:00</strong></li>
                                    <li><span>Dimanche:</span> <strong>Fermé</strong></li>
                                </ul>
                            </div>
                        </div>

                        {/* Booking Form */}
                        <div className="appointment-form-card card animate-fadeInRight delay-2">
                            <form onSubmit={handleSubmit}>
                                <h3 className="form-title">Formulaire de Réservation</h3>

                                {status.message && (
                                    <div className={`alert alert-${status.type}`}>
                                        {status.message}
                                    </div>
                                )}

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name" className="form-label">Nom complet *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-input"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone" className="form-label">Téléphone *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            className="form-input"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="06 00 00 00 00"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-input"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="service" className="form-label">Service souhaité *</label>
                                        <select
                                            id="service"
                                            name="service"
                                            className="form-select"
                                            required
                                            value={formData.service}
                                            onChange={handleChange}
                                        >
                                            <option value="">Sélectionnez un service</option>
                                            {services.map((s, i) => (
                                                <option key={i} value={s}>{s}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="date" className="form-label">Date souhaitée *</label>
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            className="form-input"
                                            required
                                            value={formData.date}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="time" className="form-label">Heure souhaitée</label>
                                        <input
                                            type="time"
                                            id="time"
                                            name="time"
                                            className="form-input"
                                            value={formData.time}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">Message / Symptômes</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-textarea"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Décrivez brièvement vos symptômes ou laissez un message..."
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                    {loading ? 'Envoi en cours...' : 'Confirmer la demande'}
                                </button>
                                <p className="form-note">* Champs obligatoires</p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Appointment;
