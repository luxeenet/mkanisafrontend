import {
    MessageSquare,
    Users,
    ShieldCheck,
    ChevronRight,
    ArrowRight,
    Menu,
    X,
    Church
} from 'lucide-react'
import { useState } from 'react'
import { FeatureCard } from '../components/marketing/FeatureCard'
import { PricingCard } from '../components/marketing/PricingCard'

export default function Home() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen font-sans">
            {/* Navigation */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-church-900 rounded-xl flex items-center justify-center text-church-accent shadow-lg shadow-church-900/20">
                                <Church size={24} />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-church-900">M-KANISA</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8">
                            <a href="#features" className="text-slate-600 hover:text-church-900 font-medium transition-colors">Features</a>
                            <a href="/admin" className="text-slate-600 hover:text-indigo-600 font-bold transition-colors">Super Admin</a>
                            <a href="/member" className="text-slate-600 hover:text-emerald-600 font-bold transition-colors">Member Portal</a>
                            <a href="/login" className="text-church-900 font-black hover:underline transition-all underline-offset-4 decoration-church-accent">Portal Login</a>
                            <button
                                onClick={() => window.location.href = '/onboarding'}
                                className="bg-church-900 text-white px-6 py-3 rounded-full font-bold hover:bg-church-800 transition-all shadow-xl shadow-church-900/10 active:scale-95"
                            >
                                Join Now <ArrowRight size={18} className="inline ml-2" />
                            </button>
                        </div>

                        <div className="md:hidden">
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-church-900">
                                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-b border-slate-100 p-4 animate-fade-in">
                        <div className="flex flex-col gap-4">
                            <a href="#features" className="text-slate-600 font-medium">Features</a>
                            <a href="#pricing" className="text-slate-600 font-medium">Pricing</a>
                            <a href="/login" className="text-church-900 font-black">Portal Login</a>
                            <button
                                onClick={() => window.location.href = '/onboarding'}
                                className="bg-church-900 text-white px-6 py-3 rounded-full font-bold"
                            >
                                Join Now
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 overflow-hidden bg-mesh">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-church-100 text-church-900 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-fade-in">
                        <span className="bg-church-accent w-2 h-2 rounded-full animate-pulse"></span>
                        Building the modern church experience
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-church-900 mb-8 leading-[0.9]">
                        Simplify Your <br />
                        <span className="text-church-accent">Church Portal.</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-12 leading-relaxed">
                        The all-in-one digital platform for churches to manage memberships, finances,
                        communication, and more. All through a personalized, white-labeled portal.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <button
                            onClick={() => window.location.href = '/onboarding'}
                            className="bg-church-900 text-white px-10 py-5 rounded-full text-lg font-black hover:bg-church-800 transition-all shadow-2xl shadow-church-900/20 active:scale-95 flex items-center justify-center group"
                        >
                            Get Started for Free
                            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="bg-white text-church-900 border-2 border-church-900 px-10 py-5 rounded-full text-lg font-black hover:bg-slate-50 transition-all active:scale-95">
                            Watch Demo
                        </button>
                    </div>
                </div>

                {/* Floating Shapes */}
                <div className="absolute top-1/4 -left-20 w-64 h-64 bg-church-200/40 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-0 -right-20 w-80 h-80 bg-church-300/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-church-900 mb-4">Why M-KANISA?</h2>
                        <p className="text-slate-500 text-lg">Powerful tools designed for the modern congregation.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <FeatureCard
                            icon={<Users size={32} className="text-church-600" />}
                            title="Membership Management"
                            description="Keep track of every member with a centralized, searchable database. Group by departments and families."
                        />
                        <FeatureCard
                            icon={<ShieldCheck size={32} className="text-church-600" />}
                            title="Financial Transparency"
                            description="Securely track tithes, offerings, and donations. Generate instant reports and financial summaries."
                        />
                        <FeatureCard
                            icon={<MessageSquare size={32} className="text-church-600" />}
                            title="Bulk SMS Engine"
                            description="Reach your members instantly with personalized bulk SMS. Schedule messages for services and events."
                        />
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-church-900 mb-4">Choose Your Plan</h2>
                        <p className="text-slate-500 text-lg">Scalable solutions for churches of all sizes.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <PricingCard
                            title="Kagash"
                            price="0"
                            features={['Up to 50 Members', 'Basic Financial Tracking', 'Manual Backups']}
                        />
                        <PricingCard
                            title="Portal"
                            price="49"
                            featured
                            features={['Unlimited Members', 'Detailed Analytics', 'Bulk SMS Integration', 'Automated Backups']}
                        />
                        <PricingCard
                            title="Global"
                            price="Custom"
                            features={['Multi-branch Support', 'Whitelabel Domain', 'Dedicated Account Manager', 'Custom API access']}
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-church-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center items-center gap-2 mb-8">
                        <div className="w-8 h-8 bg-church-accent rounded-lg flex items-center justify-center text-church-900 font-black text-xl">M</div>
                        <span className="text-2xl font-black tracking-tighter">M-KANISA</span>
                    </div>
                    <p className="text-church-300 mb-12">&copy; 2026 M-KANISA. All rights reserved.</p>
                    <div className="flex justify-center gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
