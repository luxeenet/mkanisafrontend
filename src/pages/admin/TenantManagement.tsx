import { useEffect, useState } from 'react'
import {
    Search,
    MoreVertical,
    CheckCircle2,
    XCircle,
    ShieldAlert,
    Edit2,
    ExternalLink,
    Plus,
    Loader2,
    Globe
} from 'lucide-react'
import AdminLayout from '../../layouts/AdminLayout'
import { superAdminService } from '../../services/admin.service'

interface Tenant {
    id: string;
    name: string;
    slug: string;
    domain: string;
    is_active: boolean;
    is_locked: boolean;
    sms_balance: number;
    created_at: string;
    subscription_status: string;
}

export default function TenantManagement() {
    const [tenants, setTenants] = useState<Tenant[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchTenants = async () => {
        try {
            setLoading(true);
            const res = await superAdminService.tenants.list();
            setTenants(res.data);
        } catch (err) {
            console.error('Failed to fetch tenants', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTenants();
    }, []);

    const handleSuspend = async (id: string, currentlyLocked: boolean) => {
        const action = currentlyLocked ? 'reactivate' : 'suspend';
        if (!confirm(`Are you sure you want to ${action} this tenant?`)) return;

        try {
            await superAdminService.tenants.suspend(id);
            fetchTenants();
        } catch (err) {
            alert(`Failed to ${action} tenant`);
        }
    };

    return (
        <AdminLayout>
            <div className="p-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Tenant Management</h1>
                        <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Global Church Registry & Control</p>
                    </div>
                    <button className="flex items-center justify-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] font-black shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all">
                        <Plus size={20} />
                        Provision New Tenant
                    </button>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 flex flex-col md:flex-row gap-6">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, slug or domain..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-slate-700 transition-all shadow-inner"
                        />
                    </div>
                    <div className="flex gap-4">
                        <select className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none font-black text-slate-500 text-xs uppercase tracking-widest focus:border-indigo-500 cursor-pointer shadow-sm">
                            <option>All Tiers</option>
                            <option>Premium</option>
                            <option>Basic</option>
                            <option>Free</option>
                        </select>
                        <select className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none font-black text-slate-500 text-xs uppercase tracking-widest focus:border-indigo-500 cursor-pointer shadow-sm">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Suspended</option>
                        </select>
                    </div>
                </div>

                {/* Tenant Registry Table */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    {loading ? (
                        <div className="h-96 flex flex-col items-center justify-center gap-4">
                            <Loader2 className="animate-spin text-indigo-600" size={48} />
                            <p className="text-slate-400 font-bold animate-pulse">Scanning Global Registry...</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-[10px] text-slate-400 tracking-[0.2em] font-black uppercase bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-10 py-6">Organization</th>
                                        <th className="px-10 py-6">Domain / URL</th>
                                        <th className="px-10 py-6">Tier</th>
                                        <th className="px-10 py-6">SMS Bal.</th>
                                        <th className="px-10 py-6">Status</th>
                                        <th className="px-10 py-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {tenants.map((tenant) => (
                                        <tr key={tenant.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                            <td className="px-10 py-7">
                                                <div className="flex items-center gap-5">
                                                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-indigo-400 flex items-center justify-center font-black text-xl shadow-lg group-hover:bg-indigo-600 group-hover:text-white transition-all">
                                                        {tenant.name[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-slate-800 text-lg leading-tight">{tenant.name}</p>
                                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{tenant.slug}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-7">
                                                <div className="flex items-center gap-2 group/link">
                                                    <Globe size={14} className="text-slate-300 group-hover/link:text-indigo-500 transition-colors" />
                                                    {(() => {
                                                        const baseDomain = import.meta.env.VITE_BASE_DOMAIN || 'mkanisa.pamtok.com';

                                                        const protocol = window.location.protocol;
                                                        const displayUrl = tenant.domain || `${tenant.slug}.${baseDomain}`;
                                                        const fullUrl = tenant.domain ? `https://${tenant.domain}` : `${protocol}//${tenant.slug}.${baseDomain}`;
                                                        return (
                                                            <a
                                                                href={fullUrl}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="text-sm font-bold text-slate-500 hover:text-indigo-600 hover:underline decoration-2 underline-offset-4 decoration-indigo-200"
                                                            >
                                                                {displayUrl}
                                                            </a>
                                                        );
                                                    })()}


                                                    <ExternalLink size={12} className="text-slate-300 opacity-0 group-hover/link:opacity-100 transition-all" />
                                                </div>
                                            </td>
                                            <td className="px-10 py-7">
                                                <span className="px-4 py-1.5 rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest shadow-sm border border-indigo-100">
                                                    {tenant.subscription_status || 'PREMIUM'}
                                                </span>
                                            </td>
                                            <td className="px-10 py-7">
                                                <p className="font-black text-slate-700">{tenant.sms_balance?.toLocaleString() || '0'}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Units Left</p>
                                            </td>
                                            <td className="px-10 py-7">
                                                <div className="flex items-center gap-2 font-black text-xs">
                                                    {tenant.is_locked ? (
                                                        <div className="flex items-center gap-2 text-red-500 bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                                                            <ShieldAlert size={14} />
                                                            LOCKED
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2 text-emerald-500 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                                                            <CheckCircle2 size={14} />
                                                            HEALTHY
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-10 py-7">
                                                <div className="flex items-center justify-end gap-3">
                                                    <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all shadow-sm hover:shadow-md">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleSuspend(tenant.id, tenant.is_locked)}
                                                        className={`p-3 rounded-2xl transition-all shadow-sm hover:shadow-md ${tenant.is_locked
                                                            ? 'text-emerald-500 hover:bg-emerald-50'
                                                            : 'text-red-400 hover:bg-red-50'
                                                            }`}
                                                    >
                                                        {tenant.is_locked ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
                                                    </button>
                                                    <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-2xl transition-all shadow-sm">
                                                        <MoreVertical size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-10 flex justify-between items-center text-slate-400">
                    <p className="text-sm font-bold">Showing 1 to {tenants.length} of 156 Registered Organizations</p>
                    <div className="flex gap-2">
                        <button className="px-6 py-2.5 rounded-xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest hover:bg-white transition-all">Previous</button>
                        <button className="px-6 py-2.5 rounded-xl border-2 border-slate-100 bg-indigo-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20">1</button>
                        <button className="px-6 py-2.5 rounded-xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest hover:bg-white transition-all">2</button>
                        <button className="px-6 py-2.5 rounded-xl border-2 border-slate-100 font-black text-xs uppercase tracking-widest hover:bg-white transition-all">Next</button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    )
}
