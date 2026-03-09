import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://mkanisaapi.pamtok.com/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const tenantId = localStorage.getItem('tenantId');
    const token = localStorage.getItem('accessToken');

    if (tenantId) {
        config.headers['X-Tenant-ID'] = tenantId;
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            const currentPath = window.location.pathname;
            // Avoid infinite redirect loop and don't clear tenantId
            localStorage.removeItem('accessToken');

            if (currentPath !== '/login' && !currentPath.includes('/auth/login')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
