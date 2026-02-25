import { useState, useEffect } from 'react'
import { Search, ChevronRight, Church, Loader2, ArrowRight } from 'lucide-react'
import axios from 'axios'

const API_URL = 'http://localhost:3000/api/v1/onboarding/churches'

export default function Login() {
    const [query, setQuery] = useState('')
    const [churches, setChurches] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (query.length > 2) {
            const delayDebounceFn = setTimeout(() => {
                searchChurches()
            }, 500)
            return () => clearTimeout(delayDebounceFn)
        } else {
            setChurches([])
        }
    }, [query])

    const searchChurches = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${API_URL}?q=${query}`)
            setChurches(response.data)
        } catch (err) {
            console.error('Search failed', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="flex items-center gap-2 mb-12">
                <div className="w-8 h-8 bg-church-900 rounded-lg flex items-center justify-center text-church-accent text-xl font-black shadow-lg shadow-church-900/20">
                    <Church size={20} />
                </div>
                <span className="text-2xl font-black text-church-900 tracking-tighter">M-KANISA <span className="text-church-accent">PORTALS</span></span>
            </div>

            <div className="max-w-md w-full animate-fade-in">
                <div className="bg-white rounded-[2rem] shadow-2xl p-8 mb-8 border border-slate-100">
                    <h2 className="text-xl font-black text-church-900 mb-2">Find Your Church</h2>
                    <p className="text-slate-500 text-sm mb-6">Search for your church to access your management dashboard.</p>

                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by church name..."
                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-church-accent outline-none font-medium transition-all"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {loading && <div className="text-center py-4"><Loader2 className="animate-spin inline text-church-900" /></div>}

                        {churches.length > 0 ? churches.map((church) => (
                            <button
                                key={church.id}
                                onClick={() => window.location.href = `http://localhost:5173/?tenantId=${church.id}`}
                                className="w-full p-4 rounded-xl border border-slate-100 hover:border-church-accent hover:bg-church-50 transition-all flex justify-between items-center group text-left"
                            >
                                <div>
                                    <p className="font-black text-church-900 group-hover:text-church-700">{church.name}</p>
                                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">portal: {church.slug}</p>
                                </div>
                                <div className="bg-white w-8 h-8 rounded-lg flex items-center justify-center shadow-sm border border-slate-50 group-hover:bg-church-900 group-hover:text-white transition-all">
                                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </button>
                        )) : !loading && query.length > 2 && (
                            <div className="text-center py-8">
                                <p className="text-slate-400 text-sm font-medium">No churches found.</p>
                                <p className="text-[10px] text-slate-300 mt-1 uppercase">Try searching for the official registered name</p>
                            </div>
                        )}

                        {!loading && query.length <= 2 && (
                            <div className="text-center py-8 border-2 border-dashed border-slate-50 rounded-2xl">
                                <p className="text-slate-300 text-sm font-medium">Start typing to search...</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-church-900 p-8 rounded-[2rem] text-white flex flex-col items-center gap-4 text-center">
                    <p className="text-church-300 text-sm font-medium">Want to register a new church?</p>
                    <button
                        onClick={() => window.location.href = '/onboarding'}
                        className="bg-white text-church-900 px-8 py-4 rounded-xl font-black hover:bg-church-accent transition-all active:scale-95 flex items-center gap-2 group"
                    >
                        Launch Your Portal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    )
}
