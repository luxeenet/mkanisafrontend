import { useState, type ChangeEvent } from 'react'
import {
    Building2,
    User,
    CreditCard,
    CheckCircle2,
    ChevronRight,
    ChevronLeft,
    Loader2,
    Church
} from 'lucide-react'
import { onboardingService } from '../services/onboarding.service'
import { PlanOption } from '../components/onboarding/PlanOption'

export default function Onboarding() {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        churchName: '',
        location: '',
        adminName: '',
        email: '',
        phoneNumber: '',
        password: '',
        planId: 'portal-monthly'
    })
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')
    const [paymentResult, setPaymentResult] = useState<any>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleRegister = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await onboardingService.register(formData)
            console.log('Registration success:', response.data)
            setSuccess(true)
            setPaymentResult(response.data.paymentResult)

            // Store token and tenant info
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('tenantId', response.data.tenant.id)
            localStorage.setItem('churchId', response.data.church.id)
            localStorage.setItem('churchName', formData.churchName)
            localStorage.setItem('tenantSlug', response.data.tenant.slug)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        const tenantSlug = localStorage.getItem('tenantSlug')
        const hostname = window.location.hostname

        // Using common dev subdomain fallback for localhost
        let portalUrl = `http://${tenantSlug}.localhost:5173`

        if (!hostname.includes('localhost')) {
            portalUrl = `https://${tenantSlug}.mkanisa.pamtok.com`
        }

        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-church-900">
                <div className="max-w-md w-full bg-white rounded-[2rem] p-10 shadow-2xl text-center animate-fade-in">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={40} />
                    </div>
                    <h2 className="text-3xl font-black mb-4 tracking-tight">Success!</h2>
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Your church portal for <strong>{formData.churchName}</strong> has been created.
                    </p>

                    {paymentResult && (
                        <div className="mb-8 p-6 bg-church-50 rounded-2xl border border-church-100 text-left">
                            <p className="text-sm font-black uppercase text-church-900 mb-2 flex items-center gap-2">
                                <CreditCard size={16} className="text-church-accent" />
                                Payment Initiated
                            </p>
                            <p className="text-sm text-slate-600 mb-2">
                                Please check your phone (**{formData.phoneNumber}**) for an M-Pesa STK push for **${paymentResult.transaction.amount}**.
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono">Ref: {paymentResult.transaction.internal_reference}</p>
                        </div>
                    )}

                    <button
                        onClick={() => window.location.href = portalUrl}
                        className="w-full bg-church-900 text-white py-4 rounded-xl font-black hover:bg-church-800 transition-all shadow-xl shadow-church-900/10 active:scale-95"
                    >
                        Access Your Portal
                    </button>
                    <p className="mt-6 text-xs text-slate-400">
                        Redirecting to <strong>{tenantSlug}.localhost</strong> automatically...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-church-900">
            <div className="max-w-xl w-full">
                <div className="flex items-center justify-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-church-900 rounded-xl flex items-center justify-center text-church-accent shadow-lg shadow-church-900/20">
                        <Church size={24} />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter">M-KANISA <span className="text-church-accent">JOIN</span></h1>
                </div>

                <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100 relative overflow-hidden">
                    {/* Step Indicator */}
                    <div className="flex gap-2 mb-10">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${step >= s ? 'bg-church-900' : 'bg-slate-100'}`} />
                        ))}
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold animate-shake">
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-2xl font-black mb-2">Church Information</h2>
                            <p className="text-slate-500 mb-8">Tell us about your congregation.</p>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Church Name</label>
                                    <div className="relative">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            name="churchName"
                                            value={formData.churchName}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-church-accent outline-none font-medium transition-all"
                                            placeholder="e.g. Grace Community Church"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Location</label>
                                    <div className="relative">
                                        <input
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-church-accent outline-none font-medium transition-all"
                                            placeholder="City, Region"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-2xl font-black mb-2">Administrator Setup</h2>
                            <p className="text-slate-500 mb-8">The primary account for the portal.</p>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            name="adminName"
                                            value={formData.adminName}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-church-accent outline-none font-medium transition-all"
                                            placeholder="Admin Name"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-church-accent outline-none font-medium transition-all"
                                            placeholder="Email"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                        <input
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-church-accent outline-none font-medium transition-all"
                                            placeholder="255..."
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-church-accent outline-none font-medium transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-right-4">
                            <h2 className="text-2xl font-black mb-2">Select Your Plan</h2>
                            <p className="text-slate-500 mb-8">Access the tools your church needs.</p>
                            <div className="space-y-4">
                                <PlanOption
                                    active={formData.planId === 'kagash-free'}
                                    onClick={() => setFormData({ ...formData, planId: 'kagash-free' })}
                                    title="Kagash Free"
                                    price="0"
                                    description="Great for testing and small churches."
                                />
                                <PlanOption
                                    active={formData.planId === 'portal-monthly'}
                                    onClick={() => setFormData({ ...formData, planId: 'portal-monthly' })}
                                    title="Portal Monthly"
                                    price="49"
                                    description="Unlimited members and full SMS features."
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-12 flex gap-4">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-8 py-4 rounded-xl border-2 border-slate-100 font-black flex items-center gap-2 hover:bg-slate-50 transition-all"
                            >
                                <ChevronLeft size={20} /> Back
                            </button>
                        )}
                        <button
                            onClick={step === 3 ? handleRegister : () => setStep(step + 1)}
                            disabled={loading}
                            className="flex-1 bg-church-900 text-white py-4 rounded-xl font-black hover:bg-church-800 transition-all shadow-xl shadow-church-900/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin" size={24} />
                            ) : (
                                <>
                                    {step === 3 ? 'Launch My Portal' : 'Continue'}
                                    <ChevronRight size={20} />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
