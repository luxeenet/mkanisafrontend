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
            const parts = hostname.split('.');

            // Subdomain logic:
            // Local: [slug].localhost:5173 -> parts: [[slug], 'localhost']
            // Prod: [slug].mkanisa.pamtok.com -> parts: [[slug], 'mkanisa', 'pamtok', 'com']

            let slug = '';

            if (hostname.includes('localhost')) {
                if (parts.length > 1 && parts[0] !== 'localhost') {
                    slug = parts[0];
                }
            } else if (hostname.includes('pamtok.com')) {
                // If the hostname is mkanisa.pamtok.com, parts.length is 3.
                // If it's church.mkanisa.pamtok.com, parts.length is 4.
                if (parts.length >= 4) {
                    slug = parts[0];
                }
            }

            if (slug) {
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
                setIsSubdomain(false);
                setTenant(null);
            }
            setLoading(false);
        };

        resolve();
    }, []);

    return { tenant, loading, isSubdomain };
}
