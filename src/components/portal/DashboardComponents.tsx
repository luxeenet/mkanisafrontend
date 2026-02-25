
export function StatsCard({ title, value, trend, icon }: { title: string, value: string, trend: string, icon: any }) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-50 rounded-xl group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-500'
                    }`}>
                    {trend}
                </span>
            </div>
            <p className="text-slate-500 text-sm mb-1">{title}</p>
            <h4 className="text-2xl font-bold text-slate-800 tracking-tight">{value}</h4>
        </div>
    )
}

export function TransactionRow({ name, type, amount, status, date }: { name: string, type: string, amount: string, status: string, date: string }) {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 font-medium text-slate-800">{name}</td>
            <td className="px-6 py-4 text-slate-500">{type}</td>
            <td className="px-6 py-4 font-bold text-slate-800">TZS {amount}</td>
            <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${status === 'Success' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>{status}</span>
            </td>
            <td className="px-6 py-4 text-slate-400">{date}</td>
        </tr>
    )
}

export function SidebarItem({ icon, label, active = false, onClick }: { icon: any, label: string, active?: boolean, onClick?: () => void }) {
    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active ? 'bg-church-accent text-church-900 shadow-lg' : 'text-church-300 hover:bg-church-800 hover:text-white'
                }`}>
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    )
}
