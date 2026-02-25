import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    BarChart3,
    Heart,
    BookOpen,
    Calendar,
    User,
    LogOut,
    ArrowLeft,
    Bell,
    Wallet
} from 'lucide-react'

interface MemberLayoutProps {
    children: React.ReactNode;
}

export default function MemberLayout({ children }: MemberLayoutProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 font-sans">
            {/* Mobile-Friendly Top Bar */}
            <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50 shadow-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2.5 bg-slate-50 text-slate-500 rounded-xl hover:bg-slate-100 transition-all md:hidden"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                                <Heart size={18} fill="currentColor" />
                            </div>
                            M-KANISA
                        </h1>
                        <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-widest pl-1">Member Access</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-all relative">
                        <Bell size={22} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-slate-700 cursor-pointer hover:bg-slate-200 transition-all">
                        M
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Desktop) */}
                <aside className="hidden md:flex w-72 bg-white border-r border-slate-200 flex-col p-6 space-y-2">
                    <MemberSidebarLink to="/member" icon={<BarChart3 size={20} />} label="Overview" />
                    <MemberSidebarLink to="/member/donations" icon={<Wallet size={20} />} label="My Donations" />
                    <MemberSidebarLink to="/member/events" icon={<Calendar size={20} />} label="Events & Service" />
                    <MemberSidebarLink to="/member/sermons" icon={<BookOpen size={20} />} label="Sermons" />
                    <MemberSidebarLink to="/member/profile" icon={<User size={20} />} label="My Profile" />

                    <div className="mt-auto pt-6 border-t border-slate-50">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all font-bold"
                        >
                            <LogOut size={20} />
                            Sign Out
                        </button>
                    </div>
                </aside>

                {/* Global Body */}
                <main className="flex-1 overflow-y-auto bg-slate-50">
                    <div className="max-w-5xl mx-auto pb-24 md:pb-8">
                        {children}
                    </div>
                </main>
            </div>

            {/* Bottom Navigation (Mobile) */}
            <nav className="md:hidden fixed bottom-6 left-6 right-6 h-20 bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl flex items-center justify-around px-4 z-50">
                <MobileNavLink to="/member" icon={<BarChart3 size={22} />} />
                <MobileNavLink to="/member/donations" icon={<Wallet size={22} />} />
                <div className="flex flex-col items-center -translate-y-8 animate-in slide-in-from-bottom-4">
                    <button className="w-16 h-16 bg-slate-900 text-white rounded-[1.5rem] shadow-2xl shadow-slate-900/40 flex items-center justify-center active:scale-90 transition-all">
                        <PlusIcon customSize={24} />
                    </button>
                </div>
                <MobileNavLink to="/member/events" icon={<Calendar size={22} />} />
                <MobileNavLink to="/member/profile" icon={<User size={22} />} />
            </nav>
        </div>
    )
}

function MemberSidebarLink({ to, icon, label }: { to: string, icon: any, label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all ${isActive
                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20 font-black'
                    : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900 font-bold'
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    )
}

function MobileNavLink({ to, icon }: { to: string, icon: any }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `p-3 rounded-2xl transition-all ${isActive
                    ? 'text-slate-900 scale-110'
                    : 'text-slate-300'
                }`
            }
        >
            {icon}
        </NavLink>
    )
}

function PlusIcon({ customSize = 24 }: { customSize?: number }) {
    return (
        <svg width={customSize} height={customSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    )
}
