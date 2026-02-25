import api from './api';

export const onboardingService = {
    register: (data: any) => api.post('/onboarding/register', data),
    searchChurches: (q: string) => api.get(`/onboarding/churches?q=${q}`),
    resolveTenant: (slug: string) => api.get(`/onboarding/resolve/${slug}`),
    setupAdmin: () => api.post('/onboarding/setup-admin'),
};
