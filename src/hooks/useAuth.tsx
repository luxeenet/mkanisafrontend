import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import authService from '../services/auth.service';

interface AuthContextType {
    user: any;
    loading: boolean;
    login: (credentials: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem('accessToken');
            const tenantId = localStorage.getItem('tenantId');

            if (token && tenantId) {
                try {
                    const res = await authService.getCurrentUser();
                    setUser(res.data);
                } catch (err) {
                    console.error('Session expired or invalid. Logging out.');
                    authService.logout();
                }
            }
            setLoading(false);
        };
        initAuth();
    }, []);


    const login = async (credentials: any) => {
        const data = await authService.login(credentials);
        setUser(data.user);
        if (data.user.is_super_admin) {
            localStorage.setItem('isSuperAdmin', 'true');
        }
    };


    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
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
