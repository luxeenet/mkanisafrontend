import { useEffect, useState } from 'react'
import {
    Building2,
    Users,
    CreditCard,
    Activity,
    Layers,
    MessageSquare,
    Zap
} from 'lucide-react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts'
import AdminLayout from '../../layouts/AdminLayout'
import { superAdminService } from '../../services/admin.service'

export default function SuperAdminDashboard() {
    const [analytics, setAnalytics] = useState<any>(null);
    const [view, setView] = useState<'overview' | 'sms-monitor' | 'subscriptions'>('overview');

    const platformMetrics = [
        { name: 'Jan', revenue: 4200000, activeUsers: 2400 },
        { name: 'Feb', revenue: 5800000, activeUsers: 3100 },
        { name: 'Mar', revenue: 5100000, activeUsers: 2900 },
        { name: 'Apr', revenue: 7600000, activeUsers: 4200 },
        { name: 'May', revenue: 8900000, activeUsers: 5100 },
        { name: 'Jun', revenue: 10500000, activeUsers: 6400 },
    ];

    useEffect(() => {
        const fetchGlobalAnalytics = async () => {
            try {
                const res = await superAdminService.analytics();
                setAnalytics(res.data);
            } catch (err) {
                console.error('Failed to fetch global analytics', err);
            }
        };
        fetchGlobalAnalytics();
    }, []);

    return (
        <AdminLayout>
            <div className="p-8 lg:p-12 space-y-10 bg-slate-50/50 min-h-screen font-sans">

                {/* Dynamic Hero Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-8 lg:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-200/60 border border-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-indigo-100 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Platform Core</span>
                            <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1">
                                <Activity size={10} /> Live Monitoring
                            </span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">
                            Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400">Environment</span>
                        </h1>
                        <p className="text-slate-400 font-bold max-w-lg text-lg leading-relaxed italic">
                            Platform orchestration: Monitoring {analytics?.tenants || '...'} churches.
                        </p>
                    </div>

                    <div className="flex bg-slate-50 p-1.5 rounded-3xl border border-slate-100 relative z-10">
                        <ViewTab active={view === 'overview'} onClick={() => setView('overview')} label="Overview" icon={<Layers size={14} />} />
                        <ViewTab active={view === 'sms-monitor'} onClick={() => setView('sms-monitor')} label="SMS Nodes" icon={<MessageSquare size={14} />} />
                        <ViewTab active={view === 'subscriptions'} onClick={() => setView('subscriptions')} label="Revenue" icon={<Zap size={14} />} />
                    </div>
                </div>

                {view === 'overview' && (
                    <>
                        {/* Performance Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                            <PremiumStatCard
                                title="Platform Revenue"
                                value={analytics ? `TZS ${(analytics.totalRevenue / 1000000).toFixed(1)}M` : '12.4M'}
                                subValue="Gross ecosystem volume"
                                icon={<CreditCard size={28} />}
                                trend="+15.5%"
                                color="indigo"
                            />
                            <PremiumStatCard
                                title="Active Tenants"
                                value={analytics?.tenants || '142'}
                                subValue="Verified church portals"
                                icon={<Building2 size={28} />}
                                trend="+4.2%"
                                color="emerald"
                            />
                            <PremiumStatCard
                                title="Subscription Yield"
                                value={`TZS ${(analytics ? analytics.tenants * 1000 : 142000).toLocaleString()}`}
                                subValue="Monthly SaaS fees (TZS 1k/ea)"
                                icon={<Zap size={28} />}
                                trend="Stable"
                                color="amber"
                            />
                            <PremiumStatCard
                                title="Global Members"
                                value={analytics?.members?.toLocaleString() || '18.5k'}
                                subValue="Total end-users"
                                icon={<Users size={28} />}
                                trend="+22.1%"
                                color="blue"
                            />
                        </div>

                        {/* Visual Analytics */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 bg-slate-900 p-8 lg:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-12 text-white/5 group-hover:scale-110 transition-transform duration-1000">
                                    <Activity size={300} strokeWidth={0.5} />
                                </div>
                                <div className="relative z-10 flex justify-between items-start mb-12">
                                    <div>
                                        <h3 className="text-2xl font-black text-white tracking-tight">Growth Velocity</h3>
                                        <p className="text-slate-500 font-bold text-sm uppercase tracking-widest mt-1">Monthly platform throughput</p>
                                    </div>
                                </div>
                                <div className="h-80 relative z-10">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={platformMetrics}>
                                            <defs>
                                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#475569', fontSize: 12, fontWeight: 900 }} dy={10} />
                                            <YAxis hide />
                                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '24px', color: '#fff', fontSize: '13px', fontWeight: 800, padding: '20px' }} />
                                            <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={5} fillOpacity={1} fill="url(#colorRev)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="bg-white p-8 lg:p-12 rounded-[3.5rem] shadow-xl border border-slate-100 flex flex-col">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Tenant Health</h3>
                                <div className="space-y-6 flex-1">
                                    <HealthStat label="API Gateways" percentage={98} color="emerald" />
                                    <HealthStat label="SMS Delivery" percentage={94} color="indigo" />
                                    <HealthStat label="USSD Uptime" percentage={99} color="amber" />
                                    <HealthStat label="SSL Deployment" percentage={100} color="emerald" />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {view === 'sms-monitor' && (
                    <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Global SMS Monitoring</h3>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Gateway Traffic & Usage Hub</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Peak</p>
                                    <p className="text-lg font-black text-slate-900 italic">4.2k Units / min</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            <GatewayNode label="Vodacom Tanzania" volume="1.2M" status="Active" />
                            <GatewayNode label="Airtel Tanzania" volume="840k" status="Active" />
                            <GatewayNode label="Tigo/Zantel" volume="650k" status="Maintenance" />
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] text-slate-400 tracking-[0.25em] font-black uppercase bg-slate-50/50 rounded-2xl">
                                        <th className="px-8 py-5 first:rounded-l-2xl">Tenant Name</th>
                                        <th className="px-8 py-5">Subdomain</th>
                                        <th className="px-8 py-5">Monthly Units</th>
                                        <th className="px-8 py-5">Unit Cost</th>
                                        <th className="px-8 py-5 last:rounded-r-2xl text-right">Last Peak</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <TenantSmsRow name="Amani Sanctuary" domain="amani" units="12,450" cost="TZS 124,500" time="Just now" />
                                    <TenantSmsRow name="City Pentecostal" domain="cityp" units="8,100" cost="TZS 81,000" time="15m ago" />
                                    <TenantSmsRow name="Grace Chapel" domain="grace" units="4,200" cost="TZS 42,000" time="1h ago" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {view === 'subscriptions' && (
                    <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Platform Subscriptions</h2>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Managed SaaS Yield Tracking</p>
                            </div>
                            <div className="bg-indigo-900 text-white px-8 py-4 rounded-2xl flex items-center gap-4">
                                <Zap className="text-amber-400" size={24} />
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Base Pricing</p>
                                    <p className="font-black text-xl italic leading-none">TZS 1,000 / Mo</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                            <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Subscription Health</p>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-black text-slate-600 italic">Active Subscriptions</span>
                                        <span className="text-lg font-black text-emerald-600">138 / 142</span>
                                    </div>
                                    <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="w-[97%] h-full bg-emerald-500 rounded-full"></div>
                                    </div>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">97% Retention Rate</p>
                                </div>
                            </div>
                            <div className="bg-indigo-50/50 p-8 rounded-[3rem] border border-indigo-100/50">
                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Yield Forecast</p>
                                <div className="flex items-end gap-2">
                                    <h4 className="text-5xl font-black text-indigo-900 tracking-tighter italic">TZS 1.6M</h4>
                                    <p className="text-indigo-400 font-bold mb-1.5 uppercase text-[10px]">Estimated / Q1 2026</p>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] text-slate-400 tracking-[0.25em] font-black uppercase bg-slate-50/50 rounded-2xl">
                                        <th className="px-8 py-5 first:rounded-l-2xl">Tenant</th>
                                        <th className="px-8 py-5">Plan</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5">Last Paid</th>
                                        <th className="px-8 py-5 last:rounded-r-2xl text-right">Invoice</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <SubscriptionRow name="Hope Fellowship" plan="Monthly (TZS 1,000)" status="Active" date="Feb 12, 2026" />
                                    <SubscriptionRow name="Victory Chapel" plan="Annual (TZS 12,000)" status="Active" date="Jan 05, 2026" />
                                    <SubscriptionRow name="Revival Center" plan="Monthly (TZS 1,000)" status="Expired" date="Dec 28, 2025" />
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </AdminLayout>
    )
}

function ViewTab({ active, onClick, label, icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
                }`}
        >
            {icon}{label}
        </button>
    )
}

function PremiumStatCard({ title, value, subValue, icon, trend, color }: any) {
    const accents: any = {
        indigo: 'bg-indigo-50 border-indigo-100 text-indigo-600',
        emerald: 'bg-emerald-50 border-emerald-100 text-emerald-600',
        blue: 'bg-blue-50 border-blue-100 text-blue-600',
        amber: 'bg-amber-50 border-amber-100 text-amber-600',
    };

    return (
        <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:-translate-y-2 transition-all duration-500">
            <div className={`p-4 rounded-2xl border mb-8 inline-flex items-center justify-center ${accents[color]} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div className="flex justify-between items-end">
                <div>
                    <h4 className="text-3xl font-black text-slate-900 tracking-tighter mb-1 italic">{value}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
                </div>
                <div className={`text-[10px] font-black px-3 py-1.5 rounded-full ${trend.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                    {trend}
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 italic text-[11px] font-medium text-slate-400">
                {subValue}
            </div>
        </div>
    )
}

function HealthStat({ label, percentage, color }: any) {
    const colorClass = color === 'emerald' ? 'bg-emerald-500' : color === 'indigo' ? 'bg-indigo-500' : 'bg-amber-500';
    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-500 italic">{label}</span>
                <span className="text-slate-900">{percentage}%</span>
            </div>
            <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full ${colorClass} transition-all duration-1000`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
}

function GatewayNode({ label, volume, status }: any) {
    return (
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow-xl transition-all group cursor-default">
            <div className="flex justify-between items-start mb-6">
                <h4 className="font-black text-slate-900 leading-tight">{label}</h4>
                <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-amber-500 shadow-[0_0_10px_#f59e0b]'}`}></div>
            </div>
            <div>
                <p className="text-3xl font-black text-slate-900 tracking-tighter italic">{volume}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Messages Units Processed</p>
            </div>
        </div>
    );
}

function TenantSmsRow({ name, domain, units, cost, time }: any) {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors group">
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 text-indigo-400 rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">{name[0]}</div>
                    <p className="font-black text-slate-800 text-sm leading-none">{name}</p>
                </div>
            </td>
            <td className="px-8 py-6 text-sm font-bold text-slate-400 italic">{domain}.mkanisa.com</td>
            <td className="px-8 py-6 font-black text-slate-900 text-sm">{units}</td>
            <td className="px-8 py-6 font-black text-emerald-600 text-sm underline decoration-emerald-100 underline-offset-4">{cost}</td>
            <td className="px-8 py-6 text-right text-[10px] font-black text-slate-400 uppercase">{time}</td>
        </tr>
    );
}

function SubscriptionRow({ name, plan, status, date }: any) {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors group">
            <td className="px-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 text-amber-400 rounded-xl flex items-center justify-center font-black group-hover:bg-indigo-600 group-hover:text-white transition-all">{name[0]}</div>
                    <p className="font-black text-slate-800 text-sm">{name}</p>
                </div>
            </td>
            <td className="px-8 py-6 text-xs font-bold text-slate-500 uppercase tracking-tighter">{plan}</td>
            <td className="px-8 py-6">
                <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${status === 'Active' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                    {status}
                </span>
            </td>
            <td className="px-8 py-6 font-bold text-slate-400 text-xs italic">{date}</td>
            <td className="px-8 py-6 text-right">
                <button className="text-slate-300 hover:text-indigo-600 transition-all underline decoration-slate-100 underline-offset-4 font-black text-[10px] uppercase">Export PDF</button>
            </td>
        </tr>
    );
}
