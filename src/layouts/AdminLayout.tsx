import React from 'react'
import { NavLink } from 'react-router-dom'
import {
    Building2,
    Settings,
    BarChart3,
    ShieldCheck,
    Globe,
    LogOut,
    Bell,
    Search,
    Zap
} from 'lucide-react'

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('isSuperAdmin');
        window.location.href = '/login';
    };

    return (
        <div className="flex h-screen bg-slate-50 font-sans">
            {/* Super Admin Vertical Sidebar */}
            <aside className="w-72 bg-slate-900 text-white flex flex-col shrink-0 overflow-y-auto border-r border-slate-800">
                <div className="p-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tight text-white uppercase italic">M-KANISA</h1>
                            <p className="text-[10px] text-indigo-400 font-black tracking-widest uppercase">Global Admin</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-6 space-y-2 py-4">
                    <div className="pb-4">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">Platform Control</p>
                        <AdminSidebarLink to="/admin" icon={<BarChart3 size={20} />} label="Global Overview" />
                        <AdminSidebarLink to="/admin/tenants" icon={<Building2 size={20} />} label="Tenant Management" />
                    </div>

                    <div className="pb-4">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4 ml-2">System Ops</p>
                        <AdminSidebarLink to="/admin/finances" icon={<Zap size={20} />} label="Revenue & Fintech" />
                        <AdminSidebarLink to="/admin/domains" icon={<Globe size={20} />} label="Domain Control" />
                        <AdminSidebarLink to="/admin/settings" icon={<Settings size={20} />} label="Platform Settings" />
                    </div>
                </nav>

                <div className="p-6 border-t border-slate-800 bg-slate-900/50">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-indigo-400">
                            LX
                        </div>
                        <div>
                            <p className="text-sm font-black text-white">Luxeenet Admin</p>
                            <p className="text-xs text-slate-500 font-bold">System Superuser</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all font-black text-sm uppercase tracking-wider"
                    >
                        <LogOut size={18} />
                        Logout System
                    </button>
                </div>
            </aside>

            {/* Main Global Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Global Header */}
                <header className="h-24 bg-white border-b border-slate-200 flex items-center justify-between px-10 shrink-0">
                    <div className="flex items-center gap-8">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search churches, members, transactions..."
                                className="pl-12 pr-6 py-3.5 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 focus:bg-white rounded-2xl outline-none text-sm w-96 font-medium transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <button className="p-3 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl transition-all relative">
                                <Bell size={22} />
                                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-indigo-500 rounded-full border-2 border-white"></span>
                            </button>
                        </div>

                        <div className="h-10 w-[1px] bg-slate-200 mx-2"></div>

                        <button className="flex items-center gap-3 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95">
                            Platform Status: ONLINE
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        </button>
                    </div>
                </header>

                {/* Scrollable Global Body */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}

function AdminSidebarLink({ to, icon, label }: { to: string, icon: any, label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${isActive
                    ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 font-black scale-[1.02]'
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white font-bold'
                }`
            }
        >
            <div className="shrink-0">{icon}</div>
            <span className="truncate">{label}</span>
        </NavLink>
    )
}
