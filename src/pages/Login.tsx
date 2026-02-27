import { useState, useEffect } from 'react'
import {
    Search,
    ChevronRight,
    Church,
    Loader2,
    ArrowRight,
    Mail,
    Lock,
    ShieldCheck,
    Users,
    Globe
} from 'lucide-react'
import { onboardingService } from '../services/onboarding.service'
import { useAuth } from '../hooks/useAuth.tsx'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [view, setView] = useState<'search' | 'login'>('search')
    const [query, setQuery] = useState('')
    const [churches, setChurches] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<'member' | 'admin'>('member')

    const { login } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (query.length > 2) {
            const delayDebounceFn = setTimeout(() => {
                searchChurches()
            }, 500)
            return () => clearTimeout(delayDebounceFn)
        } else {
            setChurches([])
        }
    }, [query])

    const searchChurches = async () => {
        setLoading(true)
        try {
            const response = await onboardingService.searchChurches(query)
            setChurches(response.data)
        } catch (err) {
            console.error('Search failed', err)
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            let currentTenantId = localStorage.getItem('tenantId');

            // If No tenantId (main domain) and trying to login as Super Admin
            if (!currentTenantId && identifier.includes('admin@mkanisa.com')) {
                try {
                    const res = await onboardingService.resolveTenant('system');
                    currentTenantId = res.data.id;
                    localStorage.setItem('tenantId', currentTenantId as string);
                } catch (err) {
                    console.error('System tenant not found.');
                    throw new Error('System not initialized. Please visit /setup-admin first.');
                }
            }

            if (!currentTenantId) {
                throw new Error('Tenant context missing. If you are a church admin, please use your church-specific link.');
            }

            await login({
                phoneNumber: identifier,
                email: identifier,
                password,
                role
            })

            if (identifier.includes('admin@mkanisa.com')) {
                navigate('/admin')
            } else if (role === 'admin') {
                navigate('/')
            } else {
                navigate('/member')
            }
        } catch (err: any) {
            console.error('Login error:', err);
            const message = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
            alert(message);
        } finally {
            setLoading(false)
        }
    }



    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-church-accent/5 rounded-full blur-[120px]"></div>

            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100 min-h-[700px] relative z-10 animate-fade-in">

                {/* Left Side: Branding & Info */}
                <div className="bg-slate-900 p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-64 h-64 border-4 border-white/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 border-4 border-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-16">
                            <div className="w-12 h-12 bg-church-accent rounded-2xl flex items-center justify-center text-slate-900 shadow-xl shadow-church-accent/20">
                                <Church size={28} />
                            </div>
                            <span className="text-3xl font-black tracking-tighter">M-KANISA</span>
                        </div>

                        <div className="space-y-8">
                            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                                One Portal. <br />
                                <span className="text-church-accent">Infinite Faith.</span>
                            </h1>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm">
                                Empowering churches with a modern, cloud-native management ecosystem.
                            </p>
                        </div>
                    </div>

                    <div className="relative z-10 pt-12 border-t border-slate-800">
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <p className="text-4xl font-black text-white">500+</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Churches Trust Us</p>
                            </div>
                            <div>
                                <p className="text-4xl font-black text-white">99.9%</p>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Uptime Guaranteed</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Forms */}
                <div className="p-12 lg:p-16 flex flex-col">
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-12 shadow-inner">
                        <button
                            onClick={() => setView('search')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all ${view === 'search' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <Search size={18} /> Discovery
                        </button>
                        <button
                            onClick={() => setView('login')}
                            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-black transition-all ${view === 'login' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-500 hover:text-slate-700'}`}
                        >
                            <ShieldCheck size={18} /> Account Login
                        </button>
                    </div>

                    {view === 'search' ? (
                        <div className="flex-1 flex flex-col animate-slide-up">
                            <div className="mb-10">
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Find Your Community</h2>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Portal Search & Discovery</p>
                            </div>

                            <div className="relative mb-8 group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-church-accent transition-colors" size={24} />
                                <input
                                    type="text"
                                    placeholder="Enter your church name..."
                                    className="w-full pl-14 pr-6 py-5 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-church-accent/30 focus:bg-white outline-none font-bold text-slate-700 transition-all shadow-sm"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </div>

                            <div className="flex-1 space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {loading && (
                                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                                        <Loader2 className="animate-spin text-church-900" size={32} />
                                        <p className="text-slate-400 text-xs font-black uppercase tracking-tighter">Scanning registry...</p>
                                    </div>
                                )}

                                {churches.length > 0 ? churches.map((church) => {
                                    const baseDomain = import.meta.env.VITE_BASE_DOMAIN || 'mkanisa.pamtok.com';

                                    const protocol = window.location.protocol;
                                    const portalUrl = `${protocol}//${church.slug}.${baseDomain}`;


                                    return (
                                        <button
                                            key={church.id}
                                            onClick={() => window.location.href = portalUrl}
                                            className="w-full p-5 rounded-2xl border border-slate-100 hover:border-church-accent/50 hover:bg-slate-50 transition-all flex justify-between items-center group text-left shadow-sm hover:shadow-md"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-slate-900 text-church-accent rounded-xl flex items-center justify-center font-black">
                                                    {church.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-800 text-lg group-hover:text-slate-900">{church.name}</p>
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <Globe size={12} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest">{church.slug}.{baseDomain}</span>
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-inner group-hover:bg-slate-900 group-hover:text-white transition-all">
                                                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                                            </div>
                                        </button>
                                    );
                                }) : !loading && query.length > 2 && (
                                    <div className="text-center py-12 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-100">
                                        <p className="text-slate-400 font-black italic">No churches found in our heavenly records.</p>
                                        <p className="text-[10px] text-slate-300 mt-1 uppercase font-bold">Try different keywords</p>
                                    </div>
                                )}

                                {!loading && query.length <= 2 && (
                                    <div className="flex flex-col items-center justify-center py-12 opacity-30">
                                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                            <Search size={32} className="text-slate-400" />
                                        </div>
                                        <p className="text-slate-400 font-bold">Waiting for your search...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col animate-slide-up">
                            <div className="mb-10">
                                <h2 className="text-3xl font-black text-slate-900 mb-2">Welcome Back</h2>
                                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Secure Cloud Gateway</p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="flex gap-4 mb-4">
                                        <button
                                            type="button"
                                            onClick={() => setRole('member')}
                                            className={`flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${role === 'member' ? 'border-church-accent bg-church-accent/5 text-slate-900' : 'border-slate-50 text-slate-400 hover:border-slate-100'}`}
                                        >
                                            <Users size={20} />
                                            <span className="font-black text-sm">Member</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setRole('admin')}
                                            className={`flex-1 flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${role === 'admin' ? 'border-church-900 bg-slate-900 text-white' : 'border-slate-50 text-slate-400 hover:border-slate-100'}`}
                                        >
                                            <ShieldCheck size={20} />
                                            <span className="font-black text-sm">Admin</span>
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email or Phone Number</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={20} />
                                            <input
                                                type="text"
                                                required
                                                placeholder="e.g. 255712345678 or admin@mkanisa.com"
                                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-slate-200 focus:bg-white outline-none font-bold text-slate-700 transition-all shadow-sm"
                                                value={identifier}
                                                onChange={(e) => setIdentifier(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center px-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Password</label>
                                            <button type="button" className="text-[10px] font-black uppercase text-indigo-500 hover:underline">Forgot?</button>
                                        </div>
                                        <div className="relative group">
                                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-slate-900 transition-colors" size={20} />
                                            <input
                                                type="password"
                                                required
                                                placeholder="••••••••"
                                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-slate-200 focus:bg-white outline-none font-bold text-slate-700 transition-all shadow-sm"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all active:scale-[0.98] shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={20} />
                                    ) : (
                                        <>
                                            Authenticate <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    )}

                    <div className="mt-auto pt-8 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-widest text-slate-300">
                        <p>© 2026 M-KANISA</p>
                        <div className="flex gap-4">
                            <button className="hover:text-slate-500">Security</button>
                            <button className="hover:text-slate-500">Privacy</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
