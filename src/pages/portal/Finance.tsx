import { useState } from 'react'
import {
    Search,
    ArrowUpRight,
    Filter,
    Download,
    Wallet,
    Smartphone,
    Building2,
    ShieldCheck,
    FileSpreadsheet,
    Printer,
    Users,
    Clock
} from 'lucide-react'
import { PortalLayout } from '../../layouts/PortalLayout'

interface Transaction {
    id: string;
    member_name: string;
    type: string;
    amount: number;
    currency: string;
    status: string;
    created_at: string;
    method: string;
}

export default function FinancePage({ tenantName }: { tenantName: string }) {
    const [view, setView] = useState<'overview' | 'ussd-config' | 'reports'>('overview');
    const [transactions] = useState<Transaction[]>([
        { id: '1', member_name: 'Aminata Juma', type: 'SADAKA', amount: 50000, currency: 'TZS', status: 'SUCCESS', created_at: new Date().toISOString(), method: 'M-PESA' },
        { id: '2', member_name: 'John Mndeme', type: 'TITHES', amount: 20000, currency: 'TZS', status: 'SUCCESS', created_at: new Date().toISOString(), method: 'Airtel Money' },
        { id: '3', member_name: 'Sarah Mwita', type: 'BUILDING_FUND', amount: 150000, currency: 'TZS', status: 'SUCCESS', created_at: new Date().toISOString(), method: 'Bank Transfer' },
        { id: '4', member_name: 'David Lyimo', type: 'SADAKA', amount: 10000, currency: 'TZS', status: 'PENDING', created_at: new Date().toISOString(), method: 'USSD *150#' },
    ]);

    return (
        <PortalLayout tenantName={tenantName}>
            <div className="p-8 lg:p-12 space-y-10 font-sans">

                {/* Finance Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Wallet className="text-church-900" size={18} />
                            <span className="text-church-900 font-black text-[10px] uppercase tracking-[0.3em]">Financial Orchestration</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">
                            Treasury <span className="text-church-700">& Fintech</span>
                        </h1>
                        <p className="text-slate-400 font-bold mt-2 text-lg italic italic">"Transparent stewardship for the kingdom's growth."</p>
                    </div>

                    <div className="flex bg-white p-1.5 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-50">
                        <TabButton active={view === 'overview'} onClick={() => setView('overview')} label="Cash Flow" icon={<TrendingUp size={16} />} />
                        <TabButton active={view === 'ussd-config'} onClick={() => setView('ussd-config')} label="Gateway Config" icon={<Smartphone size={16} />} />
                        <TabButton active={view === 'reports'} onClick={() => setView('reports')} label="Audits" icon={<FileSpreadsheet size={16} />} />
                    </div>
                </div>

                {view === 'overview' && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Status Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            <FinanceStatCard
                                title="Net Collections"
                                value="TZS 12.4M"
                                subValue="+15.5% vs LW"
                                icon={<ArrowUpRight size={24} />}
                                color="emerald"
                            />
                            <FinanceStatCard
                                title="Pending Pledges"
                                value="TZS 1.2M"
                                subValue="8 items outstanding"
                                icon={<Clock size={24} />}
                                color="amber"
                            />
                            <FinanceStatCard
                                title="Gateway Volume"
                                value="TZS 8.4M"
                                subValue="92 successful txns"
                                icon={<Smartphone size={24} />}
                                color="indigo"
                            />
                            <FinanceStatCard
                                title="Avg. Stewardship"
                                value="TZS 45k"
                                subValue="Per active member"
                                icon={<Users size={24} />}
                                color="purple"
                            />
                        </div>

                        {/* Transactions Table Section */}
                        <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                                <div>
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Live Ledger</h3>
                                    <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">Verified Transaction Stream</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search txns..."
                                            className="pl-12 pr-6 py-3.5 bg-slate-50 border-transparent focus:border-church-900 rounded-2xl outline-none font-bold text-xs w-64 transition-all"
                                        />
                                    </div>
                                    <button className="p-3.5 bg-slate-900 text-white rounded-2xl hover:scale-105 transition-all shadow-lg shadow-slate-900/20">
                                        <Filter size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] text-slate-400 tracking-[0.25em] font-black uppercase bg-slate-50/50 rounded-2xl">
                                            <th className="px-8 py-5 first:rounded-l-2xl">Partner</th>
                                            <th className="px-8 py-5">Purpose</th>
                                            <th className="px-8 py-5">Method</th>
                                            <th className="px-8 py-5">Value (TZS)</th>
                                            <th className="px-8 py-5">Health</th>
                                            <th className="px-8 py-5 last:rounded-r-2xl text-right">Verification</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {transactions.map((tx) => (
                                            <TxRow key={tx.id} tx={tx} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'ussd-config' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* USSD Gateway Identity */}
                        <div className="bg-slate-900 p-12 lg:p-16 rounded-[4rem] text-white relative overflow-hidden group shadow-2xl">
                            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                                <div className="absolute top-0 right-0 w-64 h-64 border-2 border-white/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                <div className="absolute bottom-0 left-0 w-96 h-96 border-2 border-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-12">
                                    <div className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl text-emerald-400">
                                        <Smartphone size={28} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-white uppercase text-xs tracking-[0.2em] italic">Merchant Gateway</h4>
                                        <p className="text-slate-500 font-bold text-[10px] uppercase">White-Label USSD</p>
                                    </div>
                                </div>

                                <h2 className="text-5xl lg:text-6xl font-black tracking-tighter mb-8 italic">
                                    Piga <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">*150*00#02#</span>
                                </h2>

                                <div className="space-y-6 mb-12">
                                    <ConfigItem label="Channel Status" value="Operational" status="active" />
                                    <ConfigItem label="Settlement Cycle" value="Real-time (T+0)" status="active" />
                                    <ConfigItem label="Gateway Nodes" value="Airtel, Mixx, M-Pesa, Halopesa" status="active" />
                                </div>

                                <button className="w-full bg-emerald-500 text-slate-900 py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all">
                                    View Detailed Integration Specs
                                </button>
                            </div>
                        </div>

                        {/* Financial White-Label Support */}
                        <div className="bg-white p-12 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white flex flex-col justify-between">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Automated Payouts</h3>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-10 italic">Seamless church-to-bank orchestration</p>

                                <div className="space-y-8">
                                    <BankCard name="CRDB Bank PLC" branch="City Center" active />
                                    <BankCard name="NMB Bank" branch="Corporate" />
                                </div>
                            </div>

                            <div className="mt-12 bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 italic font-medium text-slate-500 text-sm leading-relaxed">
                                "Financial data is processed automatically through encrypted USSD callbacks, ensuring 99.9% reconciliation accuracy for every Shiling donated."
                            </div>
                        </div>
                    </div>
                )}

                {view === 'reports' && (
                    <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-14">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Financial Audits</h3>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2 italic">White-label branded document engine</p>
                            </div>
                            <div className="flex gap-4">
                                <ReportButton label="Export Excel" icon={<FileSpreadsheet size={18} />} color="emerald" />
                                <ReportButton label="Generate PDF" icon={<Download size={18} />} color="indigo" />
                                <ReportButton label="Print Registry" icon={<Printer size={18} />} color="slate" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ReportArchiveCard title="Monthly Stewardship Ledger" date="Feb 2026" />
                            <ReportArchiveCard title="Annual Spiritual Pledges" date="FY 2025" />
                            <ReportArchiveCard title="Gateway Reconciliation" date="Jan 2026" />
                            <ReportArchiveCard title="Bulk SMS Billing Audit" date="Jan 2026" />
                        </div>
                    </div>
                )}

            </div>
        </PortalLayout>
    )
}

function TabButton({ active, onClick, label, icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-church-900 text-white shadow-xl shadow-church-900/20' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'
                }`}
        >
            {icon}{label}
        </button>
    )
}

function FinanceStatCard({ title, value, subValue, icon, color }: any) {
    const accents: any = {
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        amber: 'bg-amber-50 text-amber-600 border-amber-100',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        purple: 'bg-purple-50 text-purple-600 border-purple-100'
    };
    return (
        <div className="bg-white p-10 rounded-[3rem] border border-slate-50 shadow-xl shadow-slate-200/30 group hover:-translate-y-2 transition-all duration-500">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border ${accents[color]} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <h4 className="text-3xl font-black text-slate-900 tracking-tighter mb-1 italic">{value}</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{title}</p>
            <div className="pt-4 border-t border-slate-50 italic text-[11px] font-bold text-slate-400">
                {subValue}
            </div>
        </div>
    )
}

function TxRow({ tx }: { tx: Transaction }) {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors group">
            <td className="px-8 py-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black group-hover:bg-church-900 transition-all">
                        {tx.member_name[0]}
                    </div>
                    <div>
                        <p className="font-black text-slate-800 text-lg leading-none mb-1.5">{tx.member_name}</p>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(tx.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </td>
            <td className="px-8 py-8">
                <p className="text-sm font-black text-slate-500 italic uppercase tracking-tighter">{tx.type}</p>
            </td>
            <td className="px-8 py-8">
                <div className="flex items-center gap-2 text-slate-400">
                    <Smartphone size={14} />
                    <p className="text-xs font-bold">{tx.method}</p>
                </div>
            </td>
            <td className="px-8 py-8">
                <p className="font-black text-slate-900 text-lg">TZS {tx.amount.toLocaleString()}</p>
            </td>
            <td className="px-8 py-8">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-sm ${tx.status === 'SUCCESS' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${tx.status === 'SUCCESS' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`}></div>
                    {tx.status}
                </div>
            </td>
            <td className="px-8 py-8 text-right">
                <p className="text-[10px] font-black text-slate-300 uppercase underline decoration-indigo-200 underline-offset-4 cursor-pointer hover:text-indigo-500">Ref: #TX-912{tx.id}</p>
            </td>
        </tr>
    )
}

function ConfigItem({ label, value, status }: any) {
    return (
        <div className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all">
            <div>
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-lg font-black text-white">{value}</p>
            </div>
            {status === 'active' && <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]"></div>}
        </div>
    )
}

function BankCard({ name, branch, active }: any) {
    return (
        <div className={`p-8 rounded-[2.5rem] border-2 transition-all flex justify-between items-center ${active ? 'border-church-900 bg-church-50/50 shadow-xl shadow-slate-100' : 'border-slate-50 opacity-60'}`}>
            <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${active ? 'bg-church-900 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Building2 size={24} />
                </div>
                <div>
                    <h4 className="font-black text-slate-900 text-lg leading-none mb-1.5">{name}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{branch} Branch</p>
                </div>
            </div>
            {active && <ShieldCheck className="text-church-900" size={24} />}
        </div>
    )
}

function ReportButton({ label, icon, color }: any) {
    const colors: any = {
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-600 hover:text-white',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 hover:bg-indigo-600 hover:text-white',
        slate: 'bg-slate-50 text-slate-900 border-slate-100 hover:bg-slate-900 hover:text-white'
    };
    return (
        <button className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all shadow-sm ${colors[color]}`}>
            {icon}{label}
        </button>
    )
}

function ReportArchiveCard({ title, date }: any) {
    return (
        <div className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-5">
                <div className="p-4 bg-white rounded-2xl text-slate-400 group-hover:text-church-900 group-hover:shadow-lg transition-all">
                    <FileSpreadsheet size={24} />
                </div>
                <div>
                    <h4 className="font-black text-slate-900 mb-1">{title}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{date}</p>
                </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button className="p-3 bg-white text-slate-400 hover:text-indigo-500 rounded-xl shadow-sm"><Download size={18} /></button>
                <button className="p-3 bg-white text-slate-400 hover:text-slate-900 rounded-xl shadow-sm"><Printer size={18} /></button>
            </div>
        </div>
    )
}

function TrendingUp(props: any) { return <ArrowUpRight {...props} /> }
