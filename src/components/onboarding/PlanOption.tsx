interface PlanOptionProps {
    active: boolean;
    onClick: () => void;
    title: string;
    price: string;
    description: string;
}

export function PlanOption({ active, onClick, title, price, description }: PlanOptionProps) {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`w-full p-6 rounded-[2rem] border-2 transition-all text-left flex justify-between items-center group ${active ? 'border-church-accent bg-church-50 shadow-lg' : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
        >
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                    <p className="font-black text-lg">{title}</p>
                    {active && <span className="text-[10px] font-black uppercase bg-church-accent px-2 py-0.5 rounded-full">Selected</span>}
                </div>
                <p className="text-slate-500 text-sm leading-tight">{description}</p>
            </div>
            <div className="text-right">
                <span className="text-2xl font-black tracking-tighter">${price}</span>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">/m</p>
            </div>
        </button>
    )
}
