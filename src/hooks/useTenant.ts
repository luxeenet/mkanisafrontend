import { useState, useEffect } from 'react';
import { onboardingService } from '../services/onboarding.service';

export interface Tenant {
    id: string;
    name: string;
    slug: string;
    settings: any;
}

export function useTenant() {
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState(true);
    const [isSubdomain, setIsSubdomain] = useState(false);

    useEffect(() => {
        const resolve = async () => {
            const hostname = window.location.hostname;
            const baseDomain = import.meta.env.VITE_BASE_DOMAIN || 'mkanisa.pamtok.com';

            // Clean baseDomain from port if present for hostname comparison
            const baseHostname = baseDomain.split(':')[0];

            let slug = '';

            // Handle production custom domain or local development subdomains
            if (hostname !== baseHostname && hostname.endsWith(baseHostname)) {
                slug = hostname.replace(`.${baseHostname}`, '');
            }
            // Fallback for Vercel default domains (e.g., mkanisafrontend.vercel.app)
            else if (hostname.includes('vercel.app') && hostname !== 'mkanisafrontend.vercel.app') {
                slug = hostname.split('.')[0];
            }


            if (slug && slug !== hostname) {
                setIsSubdomain(true);
                try {
                    const response = await onboardingService.resolveTenant(slug);
                    setTenant(response.data);
                    localStorage.setItem('tenantId', response.data.id);
                } catch (err) {
                    console.error('Failed to resolve tenant slug:', slug, err);
                    setTenant(null);
                }
            } else {
                // If no subdomain, try to resolve the "system" tenant for Super Admin logins
                setIsSubdomain(false);
                try {
                    const response = await onboardingService.resolveTenant('system');
                    setTenant(response.data);
                    localStorage.setItem('tenantId', response.data.id);
                } catch (err) {
                    console.error('Failed to resolve system tenant:', err);
                    setTenant(null);
                }
            }

            setLoading(false);
        };

        resolve();
    }, []);

    return { tenant, loading, isSubdomain };
}
