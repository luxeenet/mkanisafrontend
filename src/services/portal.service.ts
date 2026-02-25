import api from './api';

export const portalService = {
    analytics: () => api.get('/church/analytics'),
    members: {
        list: (params?: any) => api.get('/church/members', { params }),
        create: (data: any) => api.post('/church/members', data),
        update: (id: string, data: any) => api.patch(`/church/members/${id}`, data),
        delete: (id: string) => api.delete(`/church/members/${id}`),
    },
    sms: {
        broadcast: (data: { message: string, recipients: string[] }) => api.post('/sms/broadcast', data)
    }
};
