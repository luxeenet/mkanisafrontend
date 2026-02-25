import type { ReactNode } from 'react'

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="p-10 rounded-3xl bg-slate-50 border border-transparent hover:border-church-100 hover:bg-white transition-all hover:shadow-2xl hover:shadow-church-900/5 group">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg mb-8 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <h3 className="text-2xl font-black text-church-900 mb-4 tracking-tight">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{description}</p>
        </div>
    )
}
