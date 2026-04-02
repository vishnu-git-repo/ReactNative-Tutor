import React, { createContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkAuthService, loginService, logoutService } from '../api/authService';
import { ILoginService, IUser } from '../ifaces/login';
import { ApiResponse } from '../lib/utils';

type AuthContextType = {
    user: IUser | null;
    authLoading: boolean;
    signIn: (data: ILoginService) => Promise<void>;
    signOut: () => Promise<void>;
    checkAuth: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
    user: null,
    authLoading: true,
    signIn: async () => { },
    signOut: async () => { },
    checkAuth: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [authLoading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);


    const signIn = async (payload: ILoginService) => {
        try {
            const res = await loginService(payload);

            const userData = res?.data?.data; // adjust based on API

            if (!userData) {
                throw new Error('User not received');
            }

            setUser(userData);
        } catch (err: any) {
            console.log('Login error:', err?.response?.data || err.message);
            throw err;
        }
    };

    const signOut = async () => {
        try {
            const res = await logoutService();
            setUser(null);
        } catch (err) {
            console.log('Logout error:', err);
        }
    };

    const checkAuth = async () => {
    try {
        const res = await checkAuthService();
        setUser(res?.data?.data);
    } catch (err) {
        setUser(null);
    } finally {
        setLoading(false);
    }
};

    return (
        <AuthContext.Provider value={{ user, authLoading, signIn, signOut, checkAuth }}>
            {children ?? null}
        </AuthContext.Provider>
    );
};