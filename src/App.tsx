import { Routes, Route, Navigate } from 'react-router-dom'
import { useTenant } from './hooks/useTenant'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import Login from './pages/Login'
import PortalDashboard from './pages/portal/Dashboard'
import MembersPage from './pages/portal/Members'
import FinancePage from './pages/portal/Finance'
import SmsPage from './pages/portal/Sms'
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard'
import AdminSetup from './pages/admin/AdminSetup'
import TenantManagement from './pages/admin/TenantManagement'
import MemberDashboard from './pages/member/MemberDashboard'
import MemberProfile from './pages/member/MemberProfile'
import CertificatesPage from './pages/portal/Certificates'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import { Loader2 } from 'lucide-react'

// Placeholder for missing components
const ComingSoon = ({ title }: { title: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-slate-50">
    <div className="text-center">
      <h2 className="text-2xl font-black text-slate-900 mb-2">{title}</h2>
      <p className="text-slate-500">This section is coming soon as part of the redesign.</p>
    </div>
  </div>
);

function App() {
  const { tenant, loading, isSubdomain } = useTenant();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-church-900" size={48} />
      </div>
    );
  }

  // If we are on a subdomain (e.g. church1.localhost), we show the Portal
  if (isSubdomain) {
    if (!tenant) {
      return (
        <div className="h-screen w-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
          <h1 className="text-4xl font-black text-church-900 mb-4">Church Not Found</h1>
          <p className="text-slate-600 mb-8">The portal you are looking for doesn't exist or has been moved.</p>
          <button
            onClick={() => window.location.href = window.location.origin}
            className="bg-church-900 text-white px-8 py-4 rounded-xl font-bold"
          >
            Back to M-KANISA
          </button>
        </div>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<ProtectedRoute><PortalDashboard tenantName={tenant.name} /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/members" element={<ProtectedRoute><MembersPage tenantName={tenant.name} /></ProtectedRoute>} />
        <Route path="/finance" element={<ProtectedRoute><FinancePage tenantName={tenant.name} /></ProtectedRoute>} />
        <Route path="/sms" element={<ProtectedRoute><SmsPage tenantName={tenant.name} /></ProtectedRoute>} />
        <Route path="/certificates" element={<ProtectedRoute><CertificatesPage tenantName={tenant.name} /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><ComingSoon title="Church Settings" /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  // Otherwise, show the Marketing site + Super Admin + Member Portal
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/login" element={<Login />} />
      <Route path="/setup-admin" element={<AdminSetup />} />

      {/* Super Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute requireAdmin><SuperAdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/tenants" element={<ProtectedRoute requireAdmin><TenantManagement /></ProtectedRoute>} />
      <Route path="/admin/finances" element={<ProtectedRoute requireAdmin><ComingSoon title="Platform Revenue" /></ProtectedRoute>} />
      <Route path="/admin/domains" element={<ProtectedRoute requireAdmin><ComingSoon title="Domain Control" /></ProtectedRoute>} />
      <Route path="/admin/settings" element={<ProtectedRoute requireAdmin><ComingSoon title="Global Settings" /></ProtectedRoute>} />

      {/* Member Portal Routes */}
      <Route path="/member" element={<ProtectedRoute><MemberDashboard /></ProtectedRoute>} />
      <Route path="/member/donations" element={<ProtectedRoute><ComingSoon title="My Donations" /></ProtectedRoute>} />
      <Route path="/member/events" element={<ProtectedRoute><ComingSoon title="Church Events" /></ProtectedRoute>} />
      <Route path="/member/sermons" element={<ProtectedRoute><ComingSoon title="Sermons" /></ProtectedRoute>} />
      <Route path="/member/profile" element={<ProtectedRoute><MemberProfile /></ProtectedRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
