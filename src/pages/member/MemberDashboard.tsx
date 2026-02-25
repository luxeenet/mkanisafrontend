import { useEffect, useState } from 'react'
import {
    Heart,
    FileText,
    ArrowRight,
    Download,
    Star,
    Sparkles,
    Award,
    Clock,
    User,
    BookOpen,
    Smartphone,
    CreditCard,
    AlertCircle
} from 'lucide-react'
import MemberLayout from '../../layouts/MemberLayout'
import { memberService } from '../../services/member.service'

export default function MemberDashboard() {
    const [profile, setProfile] = useState<any>(null);
    const [donations, setDonations] = useState<any[]>([]);

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const [profileRes, donationsRes] = await Promise.all([
                    memberService.profile(),
                    memberService.donations()
                ]);
                setProfile(profileRes.data);
                setDonations(donationsRes.data);
            } catch (err) {
                console.error('Failed to fetch member data', err);
            }
        };
        fetchMemberData();
    }, []);

    const totalGiving = donations.reduce((sum, d) => sum + parseFloat(d.amount), 0);

    return (
        <MemberLayout>
            <div className="p-8 lg:p-12 space-y-10 bg-slate-50/50 min-h-screen font-sans">

                {/* Spiritual Welcome Hero */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000"></div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-amber-500 fill-amber-500" size={20} />
                            <span className="text-church-900 font-black text-[10px] uppercase tracking-[0.3em]">Spiritual Home Portal</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">
                            Shalom, <span className="text-transparent bg-clip-text bg-gradient-to-r from-church-900 to-church-600">{profile?.full_name?.split(' ')[0] || 'Member'}</span>
                        </h1>
                        <p className="text-slate-400 font-bold max-w-lg text-lg leading-relaxed italic">
                            "May your journey today be filled with grace and purpose."
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 relative z-10">
                        <div className="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 flex items-center gap-4 hover:bg-white hover:shadow-xl transition-all group/stat">
                            <div className="p-3 bg-white rounded-2xl shadow-sm text-church-900 transition-all group-hover/stat:scale-110">
                                <Award size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Category</p>
                                <p className="text-sm font-black text-slate-900">{profile?.category || 'Active'} Member</p>
                            </div>
                        </div>
                        <div className="bg-slate-50 px-6 py-4 rounded-3xl border border-slate-100 flex items-center gap-4 hover:bg-white hover:shadow-xl transition-all group/stat">
                            <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-500 transition-all group-hover/stat:scale-110">
                                <Star size={20} fill="currentColor" />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Level</p>
                                <p className="text-sm font-black text-slate-900">Silver Partner</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Neno la Mungu - Daily Bread Section */}
                <div className="bg-gradient-to-br from-church-900 to-slate-900 rounded-[4rem] p-10 lg:p-16 text-white relative overflow-hidden group shadow-2xl">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 border-2 border-white/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 border-2 border-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    <div className="relative z-10 max-w-3xl">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-white/10 backdrop-blur-xl rounded-2xl text-amber-400">
                                <BookOpen size={24} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-church-400">Neno la Mungu • Daily Inspiration</span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-6 leading-tight">
                            "Mpendwa, nakutakia ufanisi katika mambo yote na afya yako, kama vile roho yako ifanikiwavyo."
                        </h2>
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-church-400"></div>
                            <p className="text-church-400 font-bold uppercase text-[10px] tracking-widest italic">3 Yohana 1:2</p>
                        </div>
                    </div>
                </div>

                {/* Core Interaction Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Stewardship & USSD Section */}
                    <div className="bg-white p-12 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white relative overflow-hidden group">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">Automated Giving</h3>
                                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Stewardship via USSD & Banking</p>
                            </div>
                            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <Smartphone size={28} />
                            </div>
                        </div>

                        <div className="space-y-6 mb-10">
                            <div className="p-8 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
                                <div className="absolute right-0 top-0 p-6 opacity-10">
                                    <Smartphone size={100} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-emerald-400">Mobile Money Instruction</p>
                                <h4 className="text-4xl font-black tracking-tighter mb-4 italic">Piga <span className="text-emerald-400">*150*00#02#</span></h4>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    Follow the menu prompts to contribute Sadaka and service offerings directly to the church.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <PaymentMethodCard icon={<CreditCard size={18} />} label="M-PESA" />
                                <PaymentMethodCard icon={<Smartphone size={18} />} label="Airtel Money" />
                                <PaymentMethodCard icon={<Smartphone size={18} />} label="HaloPesa" />
                                <PaymentMethodCard icon={<BookOpen size={18} />} label="Bank Transfer" />
                            </div>
                        </div>

                        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100/50 flex items-start gap-4">
                            <AlertCircle className="text-amber-600 shrink-0" size={20} />
                            <p className="text-xs font-bold text-amber-800 leading-relaxed">
                                Subscription Fee: TZS 1,000/month. Join today to stay connected with your church family and receive the Daily Byte of God.
                            </p>
                        </div>
                    </div>

                    {/* Account Identity */}
                    <div className="bg-slate-900 p-12 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-900/40 text-white flex flex-col justify-between group">
                        <div>
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight mb-1 italic">Identity Portal</h3>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Digital Verification</p>
                                </div>
                                <div className="p-4 bg-white/10 text-church-400 rounded-2xl group-hover:rotate-6 transition-transform">
                                    <User size={28} />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6 mb-10">
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Registration #</p>
                                    <p className="text-lg font-black text-white">{profile?.registration_number || 'MK-2024-88'}</p>
                                </div>
                                <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Stewardship</p>
                                    <p className="text-lg font-black text-emerald-400">TZS {totalGiving.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => window.location.href = '/member/profile'}
                            className="w-full flex items-center justify-between p-6 rounded-3xl bg-white text-slate-900 font-black text-xs uppercase tracking-[0.2em] group/btn transition-all hover:bg-church-400"
                        >
                            Refine Profile Details
                            <div className="bg-slate-900 p-2 rounded-xl text-white group-hover/btn:scale-110 transition-all">
                                <ArrowRight size={18} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Secondary Data Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Giving History Ledger */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between px-4">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Financial Footprint</h3>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 italic">A legacy of contribution</p>
                            </div>
                            <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-church-900 transition-all underline underline-offset-8 decoration-slate-200">Export PDF Ledger</button>
                        </div>

                        <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/40 border border-white overflow-hidden">
                            <div className="divide-y divide-slate-50">
                                {donations.length > 0 ? (
                                    donations.slice(0, 5).map((d) => (
                                        <DonationRow
                                            key={d.id}
                                            type={d.type || 'General Offertory'}
                                            date={new Date(d.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            amount={parseFloat(d.amount).toLocaleString()}
                                            status={d.status}
                                        />
                                    ))
                                ) : (
                                    <div className="p-20 text-center">
                                        <div className="bg-slate-50 w-20 h-20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
                                            <Heart size={32} />
                                        </div>
                                        <p className="text-slate-400 font-bold italic">Your stewardship history will bloom here soon.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Spiritual Credentials */}
                    <div className="space-y-8">
                        <div className="px-4">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight text-center lg:text-left leading-none">Credentials</h3>
                            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.3em] mt-2 text-center lg:text-left italic">Verified Church Proof</p>
                        </div>

                        <div className="space-y-4">
                            <DocCard title="Partner Certificate" date="Jan 2026" icon={<Award className="text-amber-500" />} />
                            <DocCard title="Baptism Certificate" date="Aug 2024" icon={<FileText className="text-indigo-500" />} />

                            <div className="bg-church-900 p-10 rounded-[4rem] border border-white/10 mt-10 relative overflow-hidden group shadow-2xl shadow-church-900/40">
                                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                    <Sparkles size={150} className="text-white" />
                                </div>
                                <div className="relative z-10 flex flex-col items-center text-center">
                                    <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 text-amber-400 shadow-xl shadow-black/20">
                                        <Star size={32} fill="currentColor" />
                                    </div>
                                    <h4 className="text-2xl font-black text-white mb-2 tracking-tight italic">Elite Partner</h4>
                                    <p className="text-church-400 text-xs font-bold leading-relaxed mb-8">Get exclusive access to episcopal conferences and session recordings.</p>
                                    <button className="w-full bg-church-400 text-slate-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-church-400/20 hover:scale-105 active:scale-95 transition-all">
                                        View Partner Benefits
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MemberLayout>
    )
}

function DonationRow({ type, date, amount, status }: any) {
    return (
        <div className="flex items-center justify-between p-8 hover:bg-slate-50/50 transition-all group">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center font-black group-hover:bg-church-900 group-hover:text-white transition-all shadow-sm">
                    {type[0]}
                </div>
                <div>
                    <p className="font-black text-slate-800 text-lg leading-none mb-2">{type}</p>
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 tracking-widest uppercase">
                        <Clock size={12} /> {date}
                    </div>
                </div>
            </div>
            <div className="text-right">
                <p className="font-black text-slate-900 text-xl tracking-tight mb-2 italic underline underline-offset-4 decoration-slate-100">TZS {amount}</p>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg ${status === 'Success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-slate-50 text-slate-400 border border-slate-100'
                    }`}>
                    {status}
                </span>
            </div>
        </div>
    )
}

function DocCard({ title, date, icon }: any) {
    return (
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex items-center justify-between group hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:shadow-lg transition-all">
                    {icon}
                </div>
                <div>
                    <p className="text-md font-black text-slate-800 tracking-tight leading-none mb-1">{title}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{date}</p>
                </div>
            </div>
            <button className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                <Download size={18} />
            </button>
        </div>
    )
}

function PaymentMethodCard({ icon, label }: any) {
    return (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-slate-900 transition-colors cursor-default">
            {icon}
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </div>
    );
}
