import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PublicRoutes from './routes/PublicRoutes'
import DashboardRoutes from './routes/DashboardRoutes'
import DevToolbar from './components/DevToolbar'
import './App.css'

// Component to conditionally render header/footer
const AppContent = () => {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {!isDashboard && <Header />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/*" element={<PublicRoutes />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
        </Routes>
      </main>
      {!isDashboard && <Footer />}
      <DevToolbar />
    </div>
  )
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  )
}

export default App
