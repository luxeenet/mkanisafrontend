import api from './api';

export const authService = {
    login: async (credentials: any) => {
        const response = await api.post('/auth/login', credentials);
        if (response.data.access_token) {
            localStorage.setItem('accessToken', response.data.access_token);
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isSuperAdmin');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
    },

    getCurrentUser: async () => {
        return api.get('/auth/me');
    }
};

export default authService;
