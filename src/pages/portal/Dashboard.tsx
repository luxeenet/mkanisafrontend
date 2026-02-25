import { useEffect, useState } from 'react'
import {
    Users,
    TrendingUp,
    MessageSquare,
    ChevronRight,
    Star,
    Calendar,
    ArrowUpRight,
    Zap,
    Heart
} from 'lucide-react'
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts'
import { PortalLayout } from '../../layouts/PortalLayout'
import { portalService } from '../../services/portal.service'

interface Analytics {
    members: number;
    totalCollections: number;
    currency: string;
}

export default function Dashboard({ tenantName }: { tenantName: string }) {
    const [analytics, setAnalytics] = useState<Analytics | null>(null);

    const donationData = [
        { name: 'Mon', amount: 450000 },
        { name: 'Tue', amount: 320000 },
        { name: 'Wed', amount: 680000 },
        { name: 'Thu', amount: 510000 },
        { name: 'Fri', amount: 920000 },
        { name: 'Sat', amount: 1200000 },
        { name: 'Sun', amount: 2500000 },
    ];

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const response = await portalService.analytics();
                setAnalytics(response.data);
            } catch (err) {
                console.error('Failed to fetch analytics', err);
            }
        };
        fetchAnalytics();
    }, []);

    return (
        <PortalLayout tenantName={tenantName}>
            <div className="p-8 lg:p-12 space-y-10 font-sans">

                {/* Church Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Star className="text-amber-500 fill-amber-500" size={16} />
                            <span className="text-church-900 font-black text-[10px] uppercase tracking-[0.3em]">Management Suite</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">
                            Amani <span className="text-church-700">Sanctuary</span>
                        </h1>
                        <p className="text-slate-400 font-bold mt-2 text-lg italic">"Nurturing faith through modern orchestration."</p>
                    </div>

                    <div className="flex bg-white p-2 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-50">
                        <button className="px-8 py-3 rounded-2xl bg-church-900 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-church-900/20 hover:scale-105 transition-all">
                            Quick Action
                        </button>
                    </div>
                </div>

                {/* Dashboard Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <StatusCard
                        title="Total Members"
                        value={analytics?.members.toLocaleString() || '1,245'}
                        icon={<Users size={24} />}
                        color="indigo"
                        trend="+12% this month"
                    />
                    <StatusCard
                        title="Giving & Tithes"
                        value={analytics ? `${analytics.currency} ${(analytics.totalCollections / 1000000).toFixed(1)}M` : 'TZS 8.4M'}
                        icon={<TrendingUp size={24} />}
                        color="emerald"
                        trend="+15.2% vs LW"
                    />
                    <StatusCard
                        title="SMS Credits"
                        value="8,402"
                        icon={<MessageSquare size={24} />}
                        color="purple"
                        trend="Low balance alert"
                    />
                    <StatusCard
                        title="Engagement"
                        value="84%"
                        icon={<Heart size={24} />}
                        color="rose"
                        trend="Active community"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Financial Growth Area */}
                    <div className="lg:col-span-2 bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-12 text-slate-50 group-hover:rotate-12 transition-transform duration-1000">
                            <TrendingUp size={200} strokeWidth={0.5} />
                        </div>

                        <div className="relative z-10 flex justify-between items-start mb-14">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Finances & Stewardship</h3>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
                                    <Calendar size={14} /> Weekly Collection Velocity
                                </p>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-500 font-black text-sm bg-emerald-50 px-4 py-2 rounded-2xl">
                                <ArrowUpRight size={18} />
                                24.5%
                            </div>
                        </div>

                        <div className="h-96 relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={donationData}>
                                    <defs>
                                        <linearGradient id="churchGold" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#1e1b4b" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#1e1b4b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 13, fontWeight: 900 }} dy={15} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', fontWeight: 800, padding: '20px' }}
                                    />
                                    <Area type="monotone" dataKey="amount" stroke="#1e1b4b" strokeWidth={5} fillOpacity={1} fill="url(#churchGold)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Quick Community Feed */}
                    <div className="bg-church-900 p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-church-900/40 text-white flex flex-col">
                        <div className="mb-12">
                            <h3 className="text-2xl font-black tracking-tight mb-2">Community Pulse</h3>
                            <p className="text-church-400 font-bold text-[10px] uppercase tracking-widest leading-relaxed">
                                Upcoming events and strategic spiritual tasks.
                            </p>
                        </div>

                        <div className="flex-1 space-y-6">
                            <PulseItem icon={<Zap size={18} />} title="Youth Concert" subtitle="Saturdays at 4:30 PM" />
                            <PulseItem icon={<Heart size={18} />} title="Outreach Program" subtitle="Community kitchen drive" />
                            <PulseItem icon={<Users size={18} />} title="Elder's Council" subtitle="Quarterly strategy meet" />
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black uppercase text-church-400 tracking-widest">Active Members</span>
                                <span className="text-sm font-black">94%</span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <div className="w-[94%] h-full bg-gradient-to-r from-amber-400 to-amber-200 shadow-[0_0_10px_#fbbf24]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Member Intelligence */}
                <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white">
                    <div className="flex justify-between items-center mb-12">
                        <div>
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight">Recent Onboardings</h3>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-2">New additions to the fold</p>
                        </div>
                        <button className="text-slate-400 hover:text-church-900 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 transition-all group">
                            Full Registry <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <MemberQuickRow name="Zuwena Hamisi" role="Member" time="2m ago" />
                        <MemberQuickRow name="Rashidi Bakari" role="Youth Group" time="15m ago" />
                        <MemberQuickRow name="Grace Malick" role="Member" time="1h ago" />
                        <MemberQuickRow name="Issa Mtemi" role="Volunteer" time="3h ago" />
                    </div>
                </div>

            </div>
        </PortalLayout>
    )
}

function StatusCard({ title, value, icon, color, trend }: { title: string, value: string, icon: React.ReactNode, color: 'indigo' | 'emerald' | 'purple' | 'rose', trend: string }) {
    const bgColor = {
        indigo: 'bg-indigo-50 text-indigo-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        purple: 'bg-purple-50 text-purple-600',
        rose: 'bg-rose-50 text-rose-600'
    }[color];

    return (
        <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-200/30 group hover:-translate-y-2 transition-all duration-500">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${bgColor} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h4 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{value}</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{title}</p>
            <div className="pt-4 border-t border-slate-50 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                <span className="text-[11px] font-bold text-slate-400">{trend}</span>
            </div>
        </div>
    )
}

function PulseItem({ icon, title, subtitle }: any) {
    return (
        <div className="flex items-center gap-6 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-church-900 transition-all shadow-lg">
                {icon}
            </div>
            <div>
                <p className="font-black text-lg tracking-tight leading-none mb-1.5">{title}</p>
                <p className="text-[10px] font-bold text-church-400 uppercase tracking-widest italic">{subtitle}</p>
            </div>
        </div>
    )
}

function MemberQuickRow({ name, role, time }: any) {
    return (
        <div className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
            <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-2xl flex items-center justify-center font-black group-hover:bg-church-900 transition-all">
                    {name[0]}
                </div>
                <div>
                    <p className="font-black text-slate-800 text-lg leading-none mb-1">{name}</p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role}</span>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-[10px] font-black text-slate-300 uppercase underline underline-offset-4 decoration-amber-200">{time}</span>
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all">
                    <ChevronRight size={18} className="text-church-900" />
                </div>
            </div>
        </div>
    )
}
