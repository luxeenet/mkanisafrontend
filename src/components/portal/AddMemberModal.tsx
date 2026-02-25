import type { FormEvent } from 'react'

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (e: FormEvent) => void;
    formData: {
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        gender: string;
    };
    setFormData: (data: any) => void;
}

export function AddMemberModal({ isOpen, onClose, onSubmit, formData, setFormData }: AddMemberModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-church-900/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-8 border-b border-slate-50">
                    <h2 className="text-2xl font-black text-church-900 mb-1">Add Member</h2>
                    <p className="text-slate-500 font-medium">Register a new congregant to your church.</p>
                </div>
                <form onSubmit={onSubmit} className="p-8 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">First Name</label>
                            <input
                                required
                                value={formData.firstName}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-church-accent rounded-2xl outline-none font-bold placeholder:text-slate-300 transition-all"
                                placeholder="e.g. John"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Last Name</label>
                            <input
                                required
                                value={formData.lastName}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-church-accent rounded-2xl outline-none font-bold placeholder:text-slate-300 transition-all"
                                placeholder="e.g. Doe"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Address</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-church-accent rounded-2xl outline-none font-bold placeholder:text-slate-300 transition-all"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Number</label>
                        <input
                            required
                            value={formData.phoneNumber}
                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-transparent focus:border-church-accent rounded-2xl outline-none font-bold placeholder:text-slate-300 transition-all"
                            placeholder="255..."
                        />
                    </div>
                    <div className="flex gap-4 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-8 py-4 rounded-2xl font-black text-slate-400 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-church-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-church-900/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Save Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
