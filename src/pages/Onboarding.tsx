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
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1/onboarding/register'

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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const [paymentResult, setPaymentResult] = useState<any>(null)

    const handleRegister = async () => {
        setLoading(true)
        setError('')
        try {
            const response = await axios.post(API_URL, formData)
            console.log('Registration success:', response.data)
            setSuccess(true)
            setPaymentResult(response.data.paymentResult)

            // Store token and tenant info
            localStorage.setItem('accessToken', response.data.accessToken)
            localStorage.setItem('tenantId', response.data.tenant.id)
            localStorage.setItem('churchId', response.data.church.id)
            localStorage.setItem('churchName', formData.churchName)
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (success) {
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
                        onClick={() => window.location.href = `http://localhost:5173/?tenantId=${localStorage.getItem('tenantId')}`}
                        className="w-full bg-church-900 text-white py-4 rounded-xl font-black hover:bg-church-800 transition-all shadow-xl shadow-church-900/10 active:scale-95"
                    >
                        Access Your Portal
                    </button>
                    <p className="mt-6 text-xs text-slate-400">
                        Redirecting to your dashboard automatically in a few seconds...
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-12">
                <div className="w-8 h-8 bg-church-900 rounded-lg flex items-center justify-center text-church-accent">
                    <Church size={20} />
                </div>
                <span className="text-2xl font-black text-church-900">M-KANISA Onboarding</span>
            </div>

            <div className="max-w-2xl w-full bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row">
                {/* Sidebar Status */}
                <div className="bg-church-900 text-white p-10 md:w-64 flex flex-col gap-8">
                    <StepIndicator active={step >= 1} current={step === 1} icon={<Building2 size={20} />} label="Church Info" />
                    <StepIndicator active={step >= 2} current={step === 2} icon={<User size={20} />} label="Admin Setup" />
                    <StepIndicator active={step >= 3} current={step === 3} icon={<CreditCard size={20} />} label="Plans" />
                </div>

                {/* Form Content */}
                <div className="flex-1 p-10">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium">
                            {error}
                        </div>
                    )}

                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h3 className="text-2xl font-black text-church-900 mb-6 tracking-tight">Tell us about your church</h3>
                            <div className="space-y-4">
                                <Input label="Church Name" name="churchName" value={formData.churchName} onChange={handleChange} placeholder="e.g. Grace Community Church" />
                                <Input label="Location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g. Dar es Salaam, Tanzania" />
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h3 className="text-2xl font-black text-church-900 mb-6 tracking-tight">Create Admin Account</h3>
                            <div className="space-y-4">
                                <Input label="Full Name" name="adminName" value={formData.adminName} onChange={handleChange} placeholder="Your full name" />
                                <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="admin@church.com" />
                                <Input label="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="+255..." />
                                <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-fade-in">
                            <h3 className="text-2xl font-black text-church-900 mb-6 tracking-tight">Select Subscription</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <PlanOption
                                    selected={formData.planId === 'kagash-free'}
                                    onClick={() => setFormData({ ...formData, planId: 'kagash-free' })}
                                    name="Kagash (Free)"
                                    price="0"
                                />
                                <PlanOption
                                    selected={formData.planId === 'portal-monthly'}
                                    onClick={() => setFormData({ ...formData, planId: 'portal-monthly' })}
                                    name="Portal (Lite)"
                                    price="49"
                                />
                            </div>
                        </div>
                    )}

                    <div className="mt-12 flex justify-between gap-4">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-4 rounded-xl font-bold text-slate-500 hover:text-church-900 transition-colors flex items-center gap-2"
                            >
                                <ChevronLeft size={20} /> Back
                            </button>
                        )}
                        <button
                            disabled={loading}
                            onClick={() => step < 3 ? setStep(step + 1) : handleRegister()}
                            className="flex-1 bg-church-900 text-white py-4 rounded-xl font-black hover:bg-church-800 transition-all shadow-xl shadow-church-900/10 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : (
                                <>
                                    {step === 3 ? 'Complete Registration' : 'Continue'}
                                    {step < 3 && <ChevronRight size={20} />}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function StepIndicator({ active, current, icon, label }: { active: boolean, current: boolean, icon: any, label: string }) {
    return (
        <div className={`flex items-center gap-4 transition-all ${active ? 'opacity-100' : 'opacity-40'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${current ? 'bg-church-accent text-church-900' : 'bg-church-800 text-church-400'
                }`}>
                {icon}
            </div>
            <span className={`font-bold transition-all ${current ? 'scale-105' : ''}`}>{label}</span>
        </div>
    )
}

function Input({ label, ...props }: any) {
    return (
        <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 ml-1">{label}</label>
            <input
                className="w-full p-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-church-accent focus:bg-white transition-all outline-none font-medium placeholder:text-slate-300"
                {...props}
            />
        </div>
    )
}

function PlanOption({ name, price, selected, onClick }: { name: string, price: string, selected: boolean, onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`p-6 rounded-2xl border-2 transition-all flex justify-between items-center text-left ${selected ? 'border-church-accent bg-church-50 shadow-lg' : 'border-slate-100 hover:border-slate-200'
                }`}
        >
            <div>
                <p className="font-black text-church-900">{name}</p>
                <p className="text-sm text-slate-500">All features included</p>
            </div>
            <div className="text-right">
                <p className="text-xl font-black text-church-900">${price}</p>
                <p className="text-xs text-slate-400">/month</p>
            </div>
        </button>
    )
}
