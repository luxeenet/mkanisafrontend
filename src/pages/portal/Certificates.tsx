import { useState } from 'react'
import {
    Award,
    Search,
    Download,
    Eye,
    CheckCircle2,
    PenTool,
    Shield
} from 'lucide-react'
import { PortalLayout } from '../../layouts/PortalLayout'

export default function CertificatesPage({ tenantName }: { tenantName: string }) {
    const [view, setView] = useState<'registry' | 'studio'>('registry');

    return (
        <PortalLayout tenantName={tenantName}>
            <div className="p-8 lg:p-12 space-y-10 font-sans text-slate-900">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Award className="text-amber-500" size={18} />
                            <span className="text-church-900 font-black text-[10px] uppercase tracking-[0.3em]">Credentials & Recognition</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter">
                            Certificate <span className="text-church-700">Studio</span>
                        </h1>
                        <p className="text-slate-400 font-bold mt-2 text-lg italic italic">"Verifying spiritual milestones with digital excellence."</p>
                    </div>

                    <div className="flex bg-white p-1.5 rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-50">
                        <button
                            onClick={() => setView('registry')}
                            className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'registry' ? 'bg-church-900 text-white shadow-xl shadow-church-900/20' : 'text-slate-400 hover:text-slate-900'
                                }`}
                        >
                            Registry
                        </button>
                        <button
                            onClick={() => setView('studio')}
                            className={`px-8 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'studio' ? 'bg-church-900 text-white shadow-xl shadow-church-900/20' : 'text-slate-400 hover:text-slate-900'
                                }`}
                        >
                            Design Studio
                        </button>
                    </div>
                </div>

                {view === 'registry' && (
                    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Stats */}
                            <div className="lg:col-span-1 space-y-8">
                                <div className="bg-slate-900 p-10 rounded-[3.5rem] text-white relative overflow-hidden group shadow-2xl">
                                    <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                        <Shield size={200} />
                                    </div>
                                    <h4 className="font-black text-church-400 uppercase text-[10px] tracking-[0.2em] mb-8">Verified Issuance</h4>
                                    <p className="text-6xl font-black tracking-tighter mb-2 italic">1,204</p>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-10">Total Certificates Distributed</p>
                                    <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-church-400 transition-all">
                                        Quick Issue Member
                                    </button>
                                </div>

                                <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 space-y-6">
                                    <h4 className="font-black text-slate-900 text-sm mb-4">Live signatures</h4>
                                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-indigo-500 shadow-sm">
                                            <PenTool size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900 leading-none mb-1">Bishop Malick</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Signatory</p>
                                        </div>
                                        <div className="ml-auto w-2 h-2 rounded-full bg-emerald-500"></div>
                                    </div>
                                    <button className="w-full py-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:border-slate-300 hover:text-slate-500 transition-all">
                                        Manage Signatures
                                    </button>
                                </div>
                            </div>

                            {/* Main List */}
                            <div className="lg:col-span-2 bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white">
                                <div className="flex justify-between items-center mb-12">
                                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">Recent Issuance</h3>
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Member name or track #"
                                            className="pl-12 pr-6 py-3.5 bg-slate-50 border-transparent focus:border-church-900 rounded-2xl outline-none font-bold text-xs w-64 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <CertRow name="Zuwena Hamisi" type="Partner Certificate" date="Feb 12, 2026" id="CRT-99212" />
                                    <CertRow name="Rashidi Bakari" type="Baptism Certificate" date="Feb 10, 2026" id="CRT-99201" />
                                    <CertRow name="Grace Malick" type="Dedication Certificate" date="Jan 28, 2026" id="CRT-98150" />
                                    <CertRow name="Issa Mtemi" type="Partner Certificate" date="Jan 25, 2026" id="CRT-98122" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {view === 'studio' && (
                    <div className="bg-white p-10 lg:p-14 rounded-[4rem] shadow-2xl shadow-slate-200/40 border border-white animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-center mb-12">
                            <div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Design Templates</h3>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">White-Label Credential Engines</p>
                            </div>
                            <button className="bg-church-900 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-church-900/20 hover:scale-105 active:scale-95 transition-all">
                                + Create New Template
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            <TemplateCard title="Standard Partner" orientation="Landscape" active />
                            <TemplateCard title="Spiritual Dedication" orientation="Portrait" />
                            <TemplateCard title="Ministry Recognition" orientation="Landscape" />
                        </div>
                    </div>
                )}

            </div>
        </PortalLayout>
    )
}

function CertRow({ name, type, date, id }: any) {
    return (
        <div className="group flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all border border-transparent hover:border-slate-100">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-slate-300 group-hover:text-church-900 transition-all shadow-sm">
                    <Award size={24} />
                </div>
                <div>
                    <p className="font-black text-slate-900 text-lg leading-none mb-1.5">{name}</p>
                    <div className="flex items-center gap-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <span>{type}</span>
                        <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                        <span className="italic">{id}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right mr-4 hidden md:block">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Issued</p>
                    <p className="text-sm font-black text-slate-900">{date}</p>
                </div>
                <div className="flex gap-2">
                    <button className="p-3.5 bg-white text-slate-400 hover:text-indigo-500 rounded-xl shadow-sm transition-all"><Eye size={18} /></button>
                    <button className="p-3.5 bg-white text-slate-400 hover:text-church-900 rounded-xl shadow-sm transition-all"><Download size={18} /></button>
                </div>
            </div>
        </div>
    )
}

function TemplateCard({ title, orientation, active }: any) {
    return (
        <div className={`p-8 rounded-[3.5rem] border-4 transition-all group ${active ? 'border-church-900 bg-church-50/20' : 'border-slate-50 bg-white hover:border-slate-100'
            }`}>
            <div className={`aspect-[4/3] rounded-[2.5rem] mb-8 relative overflow-hidden shadow-2xl ${active ? 'bg-white' : 'bg-slate-50'
                }`}>
                {/* Mock Certificate Content */}
                <div className="absolute inset-0 p-8 flex flex-col items-center justify-center border-[12px] border-double border-slate-100 m-4">
                    <div className="w-12 h-12 bg-slate-100 rounded-full mb-4 opacity-40"></div>
                    <div className="w-40 h-2 bg-slate-100 rounded-full mb-2 opacity-40"></div>
                    <div className="w-32 h-2 bg-slate-100 rounded-full opacity-40"></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent flex items-end justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">Customize</button>
                </div>
            </div>
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="font-black text-slate-900 leading-none mb-1">{title}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">{orientation}</p>
                </div>
                {active && <CheckCircle2 className="text-church-900" size={20} />}
            </div>
        </div>
    )
}
