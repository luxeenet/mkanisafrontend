export interface Tenant {
    id: string;
    name: string;
    slug: string;
    settings?: any;
}

export interface Member {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    status: string;
    gender?: 'MALE' | 'FEMALE' | 'OTHER';
    created_at: string;
    updated_at?: string;
}

export interface Analytics {
    totalMembers: number;
    activeMembers: number;
    totalRevenue: number;
    smsSent: number;
}
