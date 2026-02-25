import { useEffect, useState } from 'react'
import {
    Search,
    UserPlus
} from 'lucide-react'
import { PortalLayout } from '../../layouts/PortalLayout'
import { portalService } from '../../services/portal.service'
import { MemberTable } from '../../components/portal/MemberTable'
import { AddMemberModal } from '../../components/portal/AddMemberModal'
import type { Member } from '../../types'

export default function MembersPage({ tenantName }: { tenantName: string }) {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMember, setNewMember] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: 'MALE'
    });

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const response = await portalService.members.list({ q: searchTerm });
            setMembers(response.data.data || []);
        } catch (err) {
            console.error('Failed to fetch members', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [searchTerm]);

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await portalService.members.create(newMember);
            setShowAddModal(false);
            setNewMember({ firstName: '', lastName: '', email: '', phoneNumber: '', gender: 'MALE' });
            fetchMembers();
        } catch (err) {
            alert('Failed to add member');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this member?')) return;
        try {
            await portalService.members.delete(id);
            fetchMembers();
        } catch (err) {
            alert('Failed to delete member');
        }
    };

    return (
        <PortalLayout tenantName={tenantName}>
            <div className="px-8 py-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-church-900 tracking-tight">Members</h1>
                        <p className="text-slate-500 font-medium">Manage your church congregation and directories.</p>
                    </div>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center justify-center gap-2 bg-church-accent text-church-900 px-6 py-3 rounded-2xl font-black shadow-lg shadow-church-accent/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <UserPlus size={20} />
                        Register New Member
                    </button>
                </div>

                {/* Search and Filters */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-church-accent transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, email or phone..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-transparent focus:border-church-accent rounded-xl outline-none font-medium transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="px-4 py-3 bg-slate-50 border-2 border-transparent rounded-xl outline-none font-bold text-slate-600 focus:border-church-accent cursor-pointer transition-all">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Inactive</option>
                        </select>
                    </div>
                </div>

                {/* Members Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                    <MemberTable
                        members={members}
                        loading={loading}
                        onDelete={handleDelete}
                    />
                </div>

                {/* Floating Add Member Modal */}
                <AddMemberModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onSubmit={handleAddMember}
                    formData={newMember}
                    setFormData={setNewMember}
                />
            </div>
        </PortalLayout>
    )
}
