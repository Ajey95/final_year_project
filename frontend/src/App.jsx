import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import AdminLoginPage from './pages/AdminLoginPage'
import TherapyPage from './pages/TherapyPage'
import UserDashboard from './pages/UserDashboard'
import ProgressPage from './pages/ProgressPage'
import SettingsPage from './pages/SettingsPage'
import AdminPage from './pages/AdminPage'
import NotFound from './pages/NotFound'
import { useAuthStore } from './store/authStore'

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route 
          path="/therapy/:lessonId" 
          element={
            <ProtectedRoute>
              <TherapyPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/progress" 
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminPage />
            </AdminRoute>
          } 
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

// Protected route for authenticated users
function ProtectedRoute({ children }) {
  const { user, isAuthenticated, token } = useAuthStore()
  
  console.log('🔒 ProtectedRoute check:', {
    isAuthenticated,
    hasUser: !!user,
    hasToken: !!token,
    userEmail: user?.email,
    userRole: user?.role
  })
  
  // Check if user is authenticated AND has required data
  if (!isAuthenticated || !user || !token) {
    console.warn('⚠️ Not authenticated, redirecting to login')
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Admin route
function AdminRoute({ children }) {
  const { user, isAuthenticated, token } = useAuthStore()
  
  console.log('🛡️ AdminRoute check:', {
    isAuthenticated,
    hasUser: !!user,
    hasToken: !!token,
    userRole: user?.role
  })
  
  if (!isAuthenticated || !user || !token || user.role !== 'admin') {
    console.warn('⚠️ Not admin, redirecting to login')
    return <Navigate to="/login" replace />
  }
  
  return children
}

export default App
