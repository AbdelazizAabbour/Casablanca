import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardStats, getAppointments, updateAppointmentStatus, adminLogout } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('appointments'); // appointments, patients, messages
    const [stats, setStats] = useState({ total_rdv: 0, pending_rdv: 0, today_rdv: 0 });
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [messages, setMessages] = useState([]);
    const [filter, setFilter] = useState('all'); // all, pending, confirmed, cancelled
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (!token) {
            navigate('/admin/login');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            // Mock Data
            const mockStats = { total_rdv: 124, pending_rdv: 5, today_rdv: 8 };
            const mockAppointments = [
                { id: 1, name: 'Mohammed B.', service: 'Traumatologie', date: '2026-02-18', time: '10:00', status: 'pending', phone: '0661234567', email: 'med@test.com' },
                { id: 2, name: 'Fatima Z.', service: 'Kinésithérapie', date: '2026-02-18', time: '11:00', status: 'confirmed', phone: '0661234567', email: 'fatima@test.com' },
                { id: 3, name: 'Karim A.', service: 'Physiothérapie', date: '2026-02-18', time: '14:30', status: 'pending', phone: '0661234567', email: 'karim@test.com' },
                { id: 4, name: 'Sara M.', service: 'Amincissement', date: '2026-02-19', time: '09:00', status: 'cancelled', phone: '0661234567', email: 'sara@test.com' },
                { id: 5, name: 'Yassine K.', service: 'Neurologie', date: '2026-02-19', time: '15:00', status: 'confirmed', phone: '0661234567', email: 'yass@test.com' },
            ];
            const mockPatients = [
                { id: 1, name: 'Mohammed B.', email: 'med@test.com', phone: '0661234567', last_visit: '2026-02-18' },
                { id: 2, name: 'Fatima Z.', email: 'fatima@test.com', phone: '0661234567', last_visit: '2026-02-18' },
                { id: 3, name: 'Karim A.', email: 'karim@test.com', phone: '0661234567', last_visit: '2026-02-18' },
            ];
            const mockMessages = [
                { id: 1, name: 'Ahmed T.', subject: 'Renseignement tarif', message: 'Bonjour, quel est le prix pour...', date: '2026-02-17', is_read: false },
                { id: 2, name: 'Laila R.', subject: 'Disponibilité', message: 'Avez-vous des créneaux le samedi ?', date: '2026-02-16', is_read: true },
            ];

            setStats(mockStats);
            setAppointments(mockAppointments);
            setPatients(mockPatients);
            setMessages(mockMessages);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        // API call placeholder
        setAppointments(prev => prev.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/admin/login');
    };

    const filteredAppointments = appointments.filter(app =>
        filter === 'all' ? true : app.status === filter
    );

    return (
        <div className="admin-dashboard">
            <div className="admin-sidebar">
                <div className="sidebar-header">
                    <h3>Cabinet Hannit</h3>
                    <span>Administration</span>
                </div>
                <nav className="sidebar-nav">
                    <button
                        className={`nav-item ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appointments')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        Rendez-vous
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'patients' ? 'active' : ''}`}
                        onClick={() => setActiveTab('patients')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                        Patients
                    </button>
                    <button
                        className={`nav-item ${activeTab === 'messages' ? 'active' : ''}`}
                        onClick={() => setActiveTab('messages')}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                        Messages
                    </button>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="logout-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                        Déconnexion
                    </button>
                </div>
            </div>

            <main className="admin-content">
                <header className="content-header">
                    <h1 className="page-title">Tableau de Bord</h1>
                    <div className="user-profile">
                        <div className="avatar">A</div>
                        <span>Admin</span>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="stats-cards">
                    <div className="stat-card">
                        <div className="stat-icon primary">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        </div>
                        <div className="stat-info">
                            <h3>{stats.total_rdv}</h3>
                            <p>Total Rendez-vous</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon warning">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                        </div>
                        <div className="stat-info">
                            <h3>{stats.pending_rdv}</h3>
                            <p>En Attente</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon success">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                        </div>
                        <div className="stat-info">
                            <h3>{stats.today_rdv}</h3>
                            <p>Aujourd'hui</p>
                        </div>
                    </div>
                </div>

                {/* Content Tabs */}

                {/* Appointments Tab */}
                {activeTab === 'appointments' && (
                    <div className="dashboard-card main-table animate-fadeInUp">
                        <div className="card-header">
                            <h2>Rendez-vous Récents</h2>
                            <div className="filter-tabs">
                                <button
                                    className={filter === 'all' ? 'active' : ''}
                                    onClick={() => setFilter('all')}
                                >Tous</button>
                                <button
                                    className={filter === 'pending' ? 'active' : ''}
                                    onClick={() => setFilter('pending')}
                                >En Attente</button>
                                <button
                                    className={filter === 'confirmed' ? 'active' : ''}
                                    onClick={() => setFilter('confirmed')}
                                >Confirmés</button>
                            </div>
                        </div>

                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Patient</th>
                                        <th>Service</th>
                                        <th>Date & Heure</th>
                                        <th>Téléphone</th>
                                        <th>Statut</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.map(app => (
                                        <tr key={app.id}>
                                            <td className="font-medium">{app.name}</td>
                                            <td>{app.service}</td>
                                            <td>
                                                <div className="datetime">
                                                    <span className="date">{app.date}</span>
                                                    <span className="time">{app.time}</span>
                                                </div>
                                            </td>
                                            <td>{app.phone}</td>
                                            <td>
                                                <span className={`status-badge ${app.status}`}>
                                                    {app.status === 'pending' ? 'En Attente' :
                                                        app.status === 'confirmed' ? 'Confirmé' : 'Annulé'}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="actions">
                                                    {app.status === 'pending' && (
                                                        <>
                                                            <button className="action-btn check" onClick={() => handleStatusChange(app.id, 'confirmed')} title="Confirmer">
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                                            </button>
                                                            <button className="action-btn cross" onClick={() => handleStatusChange(app.id, 'cancelled')} title="Annuler">
                                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Patients Tab */}
                {activeTab === 'patients' && (
                    <div className="dashboard-card animate-fadeInUp">
                        <div className="card-header">
                            <h2>Liste des Patients</h2>
                            <input type="text" placeholder="Rechercher..." className="search-input" style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ddd' }} />
                        </div>
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Nom</th>
                                        <th>Email</th>
                                        <th>Téléphone</th>
                                        <th>Dernière Visite</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {patients.map(p => (
                                        <tr key={p.id}>
                                            <td className="font-medium">{p.name}</td>
                                            <td>{p.email}</td>
                                            <td>{p.phone}</td>
                                            <td>{p.last_visit}</td>
                                            <td>
                                                <button className="action-btn view" title="Voir dossier">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Messages Tab */}
                {activeTab === 'messages' && (
                    <div className="dashboard-card animate-fadeInUp">
                        <div className="card-header">
                            <h2>Messages Reçus</h2>
                        </div>
                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>De</th>
                                        <th>Sujet</th>
                                        <th>Date</th>
                                        <th>État</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map(msg => (
                                        <tr key={msg.id}>
                                            <td className="font-medium">{msg.name}</td>
                                            <td>{msg.subject}</td>
                                            <td>{msg.date}</td>
                                            <td>
                                                {msg.is_read ? <span className="status-badge confirmed">Lu</span> : <span className="status-badge pending">Non lu</span>}
                                            </td>
                                            <td>
                                                <button className="action-btn view" title="Lire">
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminDashboard;
