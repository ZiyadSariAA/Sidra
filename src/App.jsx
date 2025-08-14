import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PublicRoutes from './routes/PublicRoutes'
import DashboardRoutes from './routes/DashboardRoutes'
import ScrollToTop from './components/ScrollToTop'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={<PublicRoutes />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
