import axios from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to automatically attach authorization bearer token
api.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global auth error handling & automatic logout fallback
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== 'undefined') {
            const currentPath = window.location.pathname;
            const status = error.response?.status;
            const errorMsg = error.response?.data?.message || error.message || '';

            // Detect invalid session, 401 Unauthorized, or profile database coercion failure
            const isProfileError = errorMsg.includes('Cannot coerce the result') || 
                                   errorMsg.includes('single JSON object') ||
                                   errorMsg.includes('JWT') ||
                                   errorMsg.includes('token');

            if (status === 401 || (isProfileError && currentPath !== '/login' && currentPath !== '/signup')) {
                console.warn('Session or Profile error detected. Triggering automatic logout fallback...');
                localStorage.removeItem('token');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
