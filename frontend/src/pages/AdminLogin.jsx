import React, { useState, useEffect } from 'react';
import { adminLogin, googleOAuthLogin } from '../services/api';
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    // Handle Google OAuth Callback
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        const token = query.get('token');
        const errorMsg = query.get('error');

        if (token) {
            localStorage.setItem('admin_token', token);
            window.location.href = '/admin/dashboard';
        } else if (errorMsg) {
            setError('Google Login Failed: ' + errorMsg);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await adminLogin({ email, password });
            localStorage.setItem('admin_token', response.data.token);
            window.location.href = '/admin/dashboard';
        } catch (err) {
            setError('Identifiants invalides. Veuillez réessayer.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to Laravel Socialite endpoint
        window.location.href = 'http://localhost:8000/api/auth/google';
    };

    return (
        <div className="admin-login-page">
            <div className="login-container">
                <div className="login-card animate-fadeInUp">
                    <div className="login-header">
                        <div className="admin-logo">
                            <img src="/logo.png" alt="Cabinet Hannit" style={{ width: '60px', height: '60px' }} />
                        </div>
                        <h2>Espace Administration</h2>
                        <p>Connectez-vous pour gérer le cabinet</p>
                    </div>

                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="admin@cabinethannit.ma"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                className="form-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                            />
                        </div>
                        <button type="submit" style={{ width: '100%' }} className="btn btn-primary btn-block animate-fadeInUp animate-delay-100" disabled={loading}>
                            {loading ? 'Connexion...' : 'Se connecter'}
                        </button>
                    </form>

                    <div className="login-divider">
                        <span>OU</span>
                    </div>

                    <button onClick={handleGoogleLogin} style={{ width: '100%' }} className="btn google-btn btn-block animate-fadeInUp animate-delay-100">
                        <svg width="18" height="18" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continuer avec Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
