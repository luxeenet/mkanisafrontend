import { Mail, Phone, Trash2, MoreVertical } from 'lucide-react'
import type { Member } from '../../types'

interface MemberTableProps {
    members: Member[];
    loading: boolean;
    onDelete: (id: string) => void;
}

export function MemberTable({ members, loading, onDelete }: MemberTableProps) {
    if (loading) {
        return (
            <div className="h-64 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-church-900"></div>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="text-[10px] text-slate-400 tracking-[0.2em] font-black uppercase bg-slate-50/50">
                        <th className="px-8 py-5">Full Name</th>
                        <th className="px-8 py-5">Contact Details</th>
                        <th className="px-8 py-5">Status</th>
                        <th className="px-8 py-5">Joined Date</th>
                        <th className="px-8 py-5 text-right whitespace-nowrap">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {members.length > 0 ? members.map((member) => (
                        <tr key={member.id} className="group hover:bg-slate-50/50 transition-colors">
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-church-50 flex items-center justify-center text-church-900 font-black">
                                        {member.first_name[0]}{member.last_name[0]}
                                    </div>
                                    <div>
                                        <p className="font-black text-church-900 text-base">{member.first_name} {member.last_name}</p>
                                        <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{member.id.substring(0, 8)}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                        <Mail size={14} className="text-slate-400" />
                                        {member.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                                        <Phone size={14} className="text-slate-400" />
                                        {member.phone_number}
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-5">
                                <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${member.status === 'ACTIVE'
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-slate-50 text-slate-500'
                                    }`}>
                                    {member.status || 'ACTIVE'}
                                </span>
                            </td>
                            <td className="px-8 py-5 text-sm font-bold text-slate-500">
                                {new Date(member.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex items-center justify-end gap-2">
                                    <button
                                        onClick={() => onDelete(member.id)}
                                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button className="p-2 text-slate-300 hover:text-church-900 hover:bg-slate-100 rounded-lg transition-all">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-medium italic">
                                No members found. Try adjusting your search or add a new member.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}
