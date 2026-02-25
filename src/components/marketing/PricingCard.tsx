import { CheckCircle2 } from 'lucide-react'

interface PricingCardProps {
    title: string;
    price: string;
    features: string[];
    featured?: boolean;
}

export function PricingCard({ title, price, features, featured = false }: PricingCardProps) {
    return (
        <div className={`p-10 rounded-[3rem] transition-all relative ${featured ? 'bg-church-900 text-white shadow-2xl scale-105 z-10' : 'bg-white text-church-900 border border-slate-100'
            }`}>
            {featured && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-church-accent text-church-900 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">Most Popular</span>
            )}
            <h4 className="text-xl font-black mb-2">{title}</h4>
            <div className="flex items-baseline gap-1 mb-8">
                <span className="text-4xl font-black tracking-tighter">${price}</span>
                {price !== 'Custom' && <span className="text-sm opacity-60">/month</span>}
            </div>
            <ul className="space-y-4 mb-10">
                {features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 size={18} className={featured ? 'text-church-accent' : 'text-church-600'} />
                        {f}
                    </li>
                ))}
            </ul>
            <button
                onClick={() => window.location.href = '/onboarding'}
                className={`w-full py-4 rounded-full font-black transition-all active:scale-95 ${featured ? 'bg-church-accent text-church-900 hover:bg-yellow-500' : 'bg-church-900 text-white hover:bg-church-800'
                    }`}>
                Subscribe Now
            </button>
        </div>
    )
}
