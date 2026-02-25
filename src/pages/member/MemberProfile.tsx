import { useEffect, useState } from 'react'
import {
    User,
    Mail,
    Phone,
    Shield,
    Save,
    Camera,
    Loader2
} from 'lucide-react'
import MemberLayout from '../../layouts/MemberLayout'
import { memberService } from '../../services/member.service'

export default function MemberProfile() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await memberService.profile();
                setProfile(res.data);
            } catch (err) {
                console.error('Failed to fetch profile', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <MemberLayout>
                <div className="h-screen flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-slate-900" size={48} />
                    <p className="text-slate-400 font-bold">Opening your spiritual profile...</p>
                </div>
            </MemberLayout>
        );
    }

    return (
        <MemberLayout>
            <div className="p-6 md:p-10 max-w-4xl mx-auto">
                <div className="mb-10">
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">My Profile</h1>
                    <p className="text-slate-500 font-medium">Manage your account settings and preferences.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Left Column: Avatar & Meta */}
                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden group">
                            <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] mx-auto mb-6 flex items-center justify-center font-black text-4xl text-slate-400 group-hover:scale-105 transition-transform">
                                {profile?.fullName?.substring(0, 2).toUpperCase() || 'M'}
                                <div className="absolute bottom-0 right-0 p-2 bg-indigo-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                                    <Camera size={18} />
                                </div>
                            </div>
                            <h3 className="text-xl font-black text-slate-900">{profile?.fullName}</h3>
                            <p className="text-xs font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-lg inline-block mt-2">
                                {profile?.category || 'Active'} Member
                            </p>
                            <div className="mt-8 pt-8 border-t border-slate-50 flex justify-center gap-10">
                                <div>
                                    <p className="font-black text-slate-900">{profile?.registrationNumber || 'N/A'}</p>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Reg. Number</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:scale-[1.02] active:scale-95 transition-all">
                            <Shield size={18} />
                            Security Settings
                        </button>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                defaultValue={profile?.fullName}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-slate-700 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                            <input
                                                defaultValue={profile?.phoneNumber}
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-slate-700 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            defaultValue={profile?.email}
                                            className="w-full pl-12 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl outline-none font-bold text-slate-700 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-50 space-y-4">
                                    <h4 className="font-black text-slate-900 tracking-tight">Notification Settings</h4>
                                    <div className="space-y-3">
                                        <ToggleSetting label="Receive SMS Daily Bible Verse" active />
                                        <ToggleSetting label="Receive SMS Service Reminders" active />
                                        <ToggleSetting label="Receive Email Donation Receipts" active />
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <button className="flex items-center gap-3 bg-indigo-500 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                                        <Save size={20} />
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="bg-red-50 p-6 rounded-[2rem] border border-red-100 flex items-center justify-between">
                            <div>
                                <p className="font-black text-red-800 text-sm">Danger Zone</p>
                                <p className="text-red-500 text-xs font-medium">Deactivate or delete your member account.</p>
                            </div>
                            <button className="text-xs font-black text-red-700 uppercase tracking-widest hover:underline">
                                Deactivate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MemberLayout>
    )
}

function ToggleSetting({ label, active }: any) {
    return (
        <div className="flex items-center justify-between py-2">
            <span className="text-sm font-bold text-slate-600">{label}</span>
            <button className={`w-12 h-6 rounded-full p-1 transition-all ${active ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                <div className={`w-4 h-4 bg-white rounded-full transition-all ${active ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
        </div>
    )
}
