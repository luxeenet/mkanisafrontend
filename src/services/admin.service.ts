import api from './api';

export const superAdminService = {
    analytics: () => api.get('/admin/analytics'),
    tenants: {
        list: () => api.get('/admin/tenants'),
        update: (id: string, data: any) => api.patch(`/admin/tenants/${id}`, data),
        suspend: (id: string) => api.post(`/admin/tenants/${id}/suspend`),
    },
    subscriptions: {
        list: () => api.get('/admin/subscriptions'),
    }
};
