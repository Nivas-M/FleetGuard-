'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
    login: () => {},
    logout: () => {},
    setUserSession: () => {},
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Load stored auth session on mount
        try {
            const storedToken = localStorage.getItem('token') || localStorage.getItem('accessToken');
            const storedUser = localStorage.getItem('user');

            if (storedToken) {
                setToken(storedToken);
            }
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to parse saved user session from localStorage:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const setUserSession = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        if (typeof window !== 'undefined') {
            if (userToken) {
                localStorage.setItem('token', userToken);
                localStorage.setItem('accessToken', userToken);
            }
            if (userData) {
                localStorage.setItem('user', JSON.stringify(userData));
            }
        }
    };

    const login = (userData, userToken) => {
        setUserSession(userData, userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        }
        if (router) {
            router.push('/login');
        }
    };

    const value = {
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        setUserSession,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default AuthContext;
