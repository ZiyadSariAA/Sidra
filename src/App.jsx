import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import PublicRoutes from './routes/PublicRoutes'
import DashboardRoutes from './routes/DashboardRoutes'
import './App.css'

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <Header />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/*" element={<PublicRoutes />} />
            
            {/* Dashboard Routes */}
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
