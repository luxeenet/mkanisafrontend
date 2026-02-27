import { useState } from 'react';
import { Shield, CheckCircle2, AlertCircle, Loader2, ArrowRight, Lock } from 'lucide-react';
import { onboardingService } from '../../services/onboarding.service';
import { Link } from 'react-router-dom';

const AdminSetup = () => {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleInitialize = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await onboardingService.setupAdmin();
            setResult(response.data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to initialize system.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />
            </div>

            <div className="w-full max-w-xl z-10">
                <div className="bg-white rounded-[3.5rem] shadow-2xl shadow-slate-200/50 p-12 border border-slate-100">
                    <div className="mb-10 text-center">
                        <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-900/20">
                            <Shield className="text-white" size={32} />
                        </div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-3">System Setup</h1>
                        <p className="text-slate-500 font-medium">Initialize the M-KANISA Platform Administrator</p>
                    </div>

                    {!result && !error && (
                        <div className="space-y-8">
                            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
                                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4 ml-1">Setup Requirements</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-4 text-slate-600 font-bold bg-white p-4 rounded-2xl shadow-sm">
                                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <span>Database connectivity active</span>
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-600 font-bold bg-white p-4 rounded-2xl shadow-sm">
                                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 size={18} />
                                        </div>
                                        <span>One-time initialization permission</span>
                                    </li>
                                </ul>
                            </div>

                            <button
                                onClick={handleInitialize}
                                disabled={loading}
                                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-6 rounded-3xl font-black text-lg transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin" size={24} />
                                        Initializing Platform...
                                    </>
                                ) : (
                                    <>
                                        <ArrowRight size={24} />
                                        Initialize Platform
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {error && (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <AlertCircle size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-4">{error}</h2>
                            <p className="text-slate-500 font-bold mb-8">
                                It seems the system is already configured or there was a database error.
                            </p>
                            <Link
                                to="/login"
                                className="inline-flex items-center gap-2 text-slate-900 font-black hover:gap-4 transition-all"
                            >
                                Go to Login <ArrowRight size={20} />
                            </Link>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mb-1 tracking-tight">Setup Successful</h2>
                                <p className="text-slate-500 font-bold">Platform has been initialized</p>
                            </div>

                            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
                                        <Lock size={12} />
                                        Root Credentials
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-2">Identifier</p>
                                            <p className="text-xl font-bold font-mono bg-white/5 p-4 rounded-2xl border border-white/10 uppercase tracking-widest">{result.credentials.identifier}</p>
                                        </div>
                                        <div>
                                            <p className="text-slate-400 text-xs font-black uppercase tracking-wider mb-2">Password</p>
                                            <p className="text-xl font-bold font-mono bg-white/5 p-4 rounded-2xl border border-white/10 uppercase tracking-widest">{result.credentials.password}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                            </div>

                            <Link
                                to="/login"
                                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 py-6 rounded-[2rem] font-black text-lg transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                            >
                                Continue to Dashboard
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    )}
                </div>

                <p className="text-center mt-8 text-slate-400 font-black text-xs uppercase tracking-[0.2em]">
                    M-KANISA &copy; 2026 &bull; Secure Initialization Node
                </p>
            </div>
        </div>
    );
};

export default AdminSetup;
