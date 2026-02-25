import { useState } from 'react'
import {
    MessageSquare,
    Send,
    Users,
    History,
    CheckCircle2,
    Loader2,
    Calendar,
    Sparkles,
    Clock,
    Plus,
    LayoutGrid,
    Search,
    Zap
} from 'lucide-react'
import { PortalLayout } from '../../layouts/PortalLayout'
import { portalService } from '../../services/portal.service'

export default function SmsPage({ tenantName }: { tenantName: string }) {
    const [view, setView] = useState<'broadcast' | 'scheduler' | 'logs'>('broadcast');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [recipientsType, setRecipientsType] = useState<'all' | 'custom'>('all');
    const [customRecipients, setCustomRecipients] = useState('');

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);

        try {
            let recipients: string[] = [];
            if (recipientsType === 'all') {
                const membersRes = await portalService.members.list();
                recipients = membersRes.data.data.map((m: any) => m.phone_number);
            } else {
                recipients = customRecipients.split(',').map(r => r.trim()).filter(r => r);
            }

            if (recipients.length === 0) {
                alert('No recipients found');
                return;
            }

            await portalService.sms.broadcast({ message, recipients });
            setSuccess(true);
            setMessage('');
            setCustomRecipients('');
        } catch (err) {
            alert('Failed to send SMS');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PortalLayout tenantName={tenantName}>
            <div className="p-8 lg:p-12 space-y-10 font-sans">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <MessageSquare className="text-church-900" size={18} />
                            <span className="text-church-900 font-black text-[10px] uppercase tracking-[0.3em]">Communication Hub</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter">
                            Bulk <span className="text-church-700">SMS Engine</span>
                        </h1>
                        <p className="text-slate-400 font-bold mt-2 text-lg italic italic">"Delivering the Word to every palm instantly."</p>
                    </div>

                    <div className="flex bg-white p-1.5 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-50">
                        <TabButton active={view === 'broadcast'} onClick={() => setView('broadcast')} label="Broadcast" icon={<Send size={16} />} />
                        <TabButton active={view === 'scheduler'} onClick={() => setView('scheduler')} label="Neno Scheduler" icon={<Calendar size={16} />} />
                        <TabButton active={view === 'logs'} onClick={() => setView('logs')} label="History" icon={<History size={16} />} />
                    </div>
                </div>

                {view === 'broadcast' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Composer */}
                        <div className="lg:col-span-2 space-y-8">
                            <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white">
                                <form onSubmit={handleSend} className="space-y-10">
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-end">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Target Congregation</label>
                                            <span className="text-[10px] font-black text-indigo-500 cursor-pointer hover:underline">Manage Branches</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <SelectionCard
                                                active={recipientsType === 'all'}
                                                onClick={() => setRecipientsType('all')}
                                                label="All Partners"
                                                desc="Full registry broadcast"
                                                icon={<Users size={22} />}
                                            />
                                            <SelectionCard
                                                active={recipientsType === 'custom'}
                                                onClick={() => setRecipientsType('custom')}
                                                label="Custom List"
                                                desc="Selective numbers"
                                                icon={<LayoutGrid size={22} />}
                                            />
                                        </div>
                                    </div>

                                    {recipientsType === 'custom' && (
                                        <div className="space-y-3 animate-in fade-in slide-in-from-top-4">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Universal Phone Registry (CSV)</label>
                                            <textarea
                                                required
                                                value={customRecipients}
                                                onChange={(e) => setCustomRecipients(e.target.value)}
                                                className="w-full px-8 py-6 bg-slate-50 border-2 border-transparent focus:border-church-accent/30 focus:bg-white rounded-[2rem] outline-none font-bold text-slate-700 min-h-[120px] transition-all shadow-inner"
                                                placeholder="e.g., 255769141XXX, 255781234XXX..."
                                            />
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="flex justify-between px-1">
                                            <label className="text-xs font-black uppercase tracking-widest text-slate-400">Message Content</label>
                                            <span className={`text-[10px] font-black px-3 py-1 rounded-full ${message.length > 160 ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                                                {message.length} / 160 • Unit: {Math.ceil(message.length / 160) || 1}
                                            </span>
                                        </div>
                                        <textarea
                                            required
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            className="w-full px-8 py-8 bg-slate-50 border-2 border-transparent focus:border-church-accent/30 focus:bg-white rounded-[2.5rem] outline-none font-bold text-slate-700 min-h-[220px] transition-all shadow-inner text-lg leading-relaxed"
                                            placeholder="Introduce the holy word or church announcements here..."
                                        />
                                        <div className="flex items-center gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                                            <Sparkles className="text-indigo-500" size={18} />
                                            <p className="text-[10px] text-indigo-700 font-bold uppercase tracking-tight">Pro Tip: Use [Name] to personalize the message automatically.</p>
                                        </div>
                                    </div>

                                    {success && (
                                        <div className="flex items-center gap-4 p-6 bg-emerald-50 text-emerald-700 rounded-[2rem] border border-emerald-100 animate-in zoom-in-95">
                                            <div className="bg-white p-2 rounded-xl shadow-sm">
                                                <CheckCircle2 size={24} />
                                            </div>
                                            <div>
                                                <p className="font-black text-sm">Divine Message Sent!</p>
                                                <p className="text-[10px] font-bold uppercase tracking-widest">Broadcast is now in queue</p>
                                            </div>
                                        </div>
                                    )}

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full bg-church-900 text-white flex items-center justify-center gap-4 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-church-900/30 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all group"
                                    >
                                        {loading ? <Loader2 className="animate-spin" /> : <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                        {loading ? 'Queuing Messages...' : 'Send Broadcast Portal'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar Intelligence */}
                        <div className="space-y-10">
                            {/* Credits Card */}
                            <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl">
                                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                    <LayoutGrid size={200} />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl text-amber-400">
                                            <Zap size={20} />
                                        </div>
                                        <h4 className="font-black text-church-400 uppercase text-[10px] tracking-[0.2em]">Live Credit Vault</h4>
                                    </div>
                                    <p className="text-6xl font-black tracking-tighter mb-2 italic">8,452</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-10">Active SMS Balance</p>

                                    <div className="space-y-3">
                                        <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-church-400 transition-all shadow-xl shadow-black/20">
                                            Top Up Balance
                                        </button>
                                        <p className="text-center text-slate-500 text-[9px] font-black uppercase tracking-widest">Pricing: TZS 10 / unit</p>
                                    </div>
                                </div>
                            </div>

                            {/* Automation Status */}
                            <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/40">
                                <div className="flex items-center justify-between mb-8">
                                    <h4 className="font-black text-slate-900 text-sm">Automations</h4>
                                    <Sparkles className="text-amber-500" size={18} />
                                </div>
                                <div className="space-y-6">
                                    <AutomationToggle label="Daily Bible Verse" status="Active" time="Every 7:00 AM" />
                                    <AutomationToggle label="Service Reminders" status="Active" time="1h Before Service" />
                                    <AutomationToggle label="New Partner Welcome" status="Idle" time="On Register" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'scheduler' && (
                    <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Neno la Mungu Scheduler</h3>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Automated Spiritual Nourishment</p>
                            </div>
                            <button className="bg-church-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-church-900/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                                <Plus size={18} /> Schedule New Verse
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <ScheduledVerseCard
                                date="Tomorrow, 07:00 AM"
                                verse="John 3:16"
                                preview="Kwa maana jinsi hii Mungu aliupenda ulimwengu..."
                                status="Pending"
                            />
                            <ScheduledVerseCard
                                date="Friday, 07:00 AM"
                                verse="Psalm 23:1"
                                preview="Bwana ndiye mchungaji wangu, sitapungukiwa na kitu."
                                status="Draft"
                            />
                            <div className="border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center p-12 text-slate-300 hover:text-slate-400 hover:bg-slate-50 transition-all cursor-pointer group">
                                <Plus size={40} className="mb-4 group-hover:scale-110 transition-transform" />
                                <p className="font-black text-[10px] uppercase tracking-widest">Add Weekly Schedule</p>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'logs' && (
                    <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Log Audit Registry</h3>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2 italic">Verified SMS Transmissions</p>
                            </div>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search logs..."
                                    className="pl-12 pr-6 py-3.5 bg-slate-50 border-transparent focus:border-church-900 rounded-2xl outline-none font-bold text-xs w-64 transition-all"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-[10px] text-slate-400 tracking-[0.25em] font-black uppercase bg-slate-50/50 rounded-2xl">
                                        <th className="px-8 py-5 first:rounded-l-2xl">Transmission ID</th>
                                        <th className="px-8 py-5">Campaign Name</th>
                                        <th className="px-8 py-5">Recipients</th>
                                        <th className="px-8 py-5">Units Used</th>
                                        <th className="px-8 py-5 last:rounded-r-2xl text-right">Timestamp</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    <LogEntry id="TX-9901" name="Sunday Service Alert" count="1,245" units="1,245" time="2h ago" />
                                    <LogEntry id="TX-9895" name="Neno: Zaburi 23" count="1,245" units="1,245" time="Today, 07:00 AM" />
                                    <LogEntry id="TX-9852" name="Youth Seminar" count="84" units="168" time="Yesterday" />
                                    <LogEntry id="TX-9721" name="Admin Emergency" count="12" units="12" time="3 days ago" />
                                </tbody>
                            </table>
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

function SelectionCard({ active, onClick, label, desc, icon }: any) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 p-6 rounded-[2rem] border-2 transition-all text-left group ${active ? 'bg-church-50 border-church-900 text-church-900' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'
                }`}
        >
            <div className={`p-3 rounded-xl mb-4 inline-flex ${active ? 'bg-church-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
                {icon}
            </div>
            <p className="font-black text-sm tracking-tight leading-none mb-1">{label}</p>
            <p className="text-[10px] font-bold uppercase tracking-tight opacity-60">{desc}</p>
        </button>
    )
}

function AutomationToggle({ label, status, time }: any) {
    return (
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-sm transition-all border border-transparent hover:border-slate-50 group">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                <div>
                    <p className="text-xs font-black text-slate-900 leading-none mb-1.5">{label}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{time}</p>
                </div>
            </div>
            <div className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest border ${status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'
                }`}>
                {status}
            </div>
        </div>
    )
}

function ScheduledVerseCard({ date, verse, preview, status }: any) {
    return (
        <div className="bg-slate-50 p-8 rounded-[3rem] border border-slate-100 flex flex-col justify-between group hover:bg-white hover:shadow-xl transition-all duration-500 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                        <Clock size={14} /> {date}
                    </div>
                    <span className={`text-[9px] font-black px-2 py-1 rounded-lg uppercase tracking-widest ${status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'
                        }`}>{status}</span>
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 italic">"{preview}"</h4>
                <p className="text-[10px] font-black text-church-400 uppercase tracking-[0.2em]">— {verse}</p>
            </div>
            <div className="mt-10 pt-6 border-t border-slate-100 flex gap-2 relative z-10">
                <button className="flex-1 bg-white border border-slate-200 text-slate-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all">Edit Verse</button>
                <button className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"><Plus className="rotate-45" size={16} /></button>
            </div>
        </div>
    )
}

function LogEntry({ id, name, count, units, time }: any) {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors group">
            <td className="px-8 py-6 font-mono text-[10px] text-slate-400 font-bold">{id}</td>
            <td className="px-8 py-6">
                <p className="font-black text-slate-900 text-sm">{name}</p>
            </td>
            <td className="px-8 py-6">
                <div className="flex items-center gap-2 font-bold text-xs text-slate-500">
                    <Users size={14} className="text-slate-300" /> {count} Partners
                </div>
            </td>
            <td className="px-8 py-6">
                <p className="font-black text-church-900 text-sm">{units} Units</p>
            </td>
            <td className="px-8 py-6 text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase">{time}</p>
            </td>
        </tr>
    )
}
