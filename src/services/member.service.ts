import api from './api';

export const memberService = {
    profile: () => api.get('/member/profile'),
    donations: () => api.get('/member/donations'),
    certificates: () => api.get('/member/certificates'),
};
