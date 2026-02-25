import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
    Users,
    CreditCard,
    MessageSquare,
    LayoutDashboard,
    Settings,
    Bell,
    Search,
    UserPlus,
    LogOut,
    Award
} from 'lucide-react'

interface PortalLayoutProps {
    children: React.ReactNode;
    tenantName: string;
}

export function PortalLayout({ children, tenantName }: PortalLayoutProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('tenantId');
        localStorage.removeItem('churchId');
        window.location.href = '/login';
    };

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <aside className="w-64 bg-church-900 text-white flex flex-col shrink-0">
                <div className="p-6">
                    <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-church-accent rounded-lg flex items-center justify-center text-church-900">M</div>
                        M-KANISA
                    </h1>
                </div>

                <nav className="flex-1 px-4 space-y-2 py-4">
                    <SidebarNavLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" />
                    <SidebarNavLink to="/members" icon={<Users size={20} />} label="Members" />
                    <SidebarNavLink to="/finance" icon={<CreditCard size={20} />} label="Finance" />
                    <SidebarNavLink to="/sms" icon={<MessageSquare size={20} />} label="Bulk SMS" />
                    <SidebarNavLink to="/certificates" icon={<Award size={20} />} label="Certificates" />
                    <SidebarNavLink to="/settings" icon={<Settings size={20} />} label="Settings" />
                </nav>

                <div className="p-4 border-t border-church-800">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-church-300 hover:bg-church-800 hover:text-white transition-all"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
                    <div>
                        <h2 className="text-xl font-black text-church-900">{tenantName}</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Church Management Portal</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group hidden md:block">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-church-accent transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search anything..."
                                className="pl-10 pr-4 py-2 bg-slate-50 border-2 border-transparent focus:border-church-accent rounded-xl outline-none text-sm w-64 transition-all"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <button className="p-2.5 text-slate-400 hover:text-church-900 hover:bg-slate-50 rounded-xl transition-all relative">
                                <Bell size={20} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>

                            <button
                                onClick={() => navigate('/members')}
                                className="flex items-center gap-2 bg-church-900 text-white px-5 py-2.5 rounded-xl font-black text-sm hover:bg-church-800 transition-all shadow-lg shadow-church-900/10 active:scale-95"
                            >
                                <UserPlus size={18} />
                                Add Member
                            </button>
                        </div>

                        <div className="h-8 w-[1px] bg-slate-100 mx-2"></div>

                        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-church-900 uppercase">Admin</p>
                                <p className="text-[10px] text-slate-400 font-bold">Manage Account</p>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-church-50 border border-church-100 flex items-center justify-center text-church-900 font-black group-hover:bg-church-100 transition-all">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Scrollable Body */}
                <main className="flex-1 overflow-y-auto bg-[#f8fafc]">
                    {children}
                </main>
            </div>
        </div>
    )
}

function SidebarNavLink({ to, icon, label }: { to: string, icon: any, label: string }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${isActive
                    ? 'bg-church-accent text-church-900 shadow-lg font-black'
                    : 'text-church-300 hover:bg-church-800 hover:text-white font-medium'
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    )
}
