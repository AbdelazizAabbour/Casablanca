import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getServices = () => api.get('/services');
export const getService = (id) => api.get(`/services/${id}`);

export const getDoctors = () => api.get('/doctors');
export const getDoctor = (id) => api.get(`/doctors/${id}`);

export const sendContactMessage = (data) => api.post('/contact', data);
export const createAppointment = (data) => api.post('/appointments', data);

export const adminLogin = (credentials) => api.post('/admin/login', credentials);
export const adminLogout = () => api.post('/admin/logout');
export const googleOAuthLogin = (token) => api.post('/admin/google-login', { token });

// Admin Dashboard
export const getDashboardStats = () => api.get('/admin/dashboard');
export const getAppointments = () => api.get('/admin/appointments');
export const updateAppointmentStatus = (id, status) => api.patch(`/admin/appointments/${id}`, { status });
export const getMessages = () => api.get('/admin/messages');
export const updateMessageStatus = (id, is_read) => api.patch(`/admin/messages/${id}`, { is_read });
export const deleteMessage = (id) => api.delete(`/admin/messages/${id}`);
export const getPatients = () => api.get('/admin/patients');
export const getUsers = () => api.get('/admin/users');

export default api;
