import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import GenericDashboard from '../dashboard/GenericDashboard'

const DashboardRoutes = () => {
  return (
    <Routes>
      {/* Generic Dashboard Routes */}
      <Route path="/*" element={<GenericDashboard />} />
      
      {/* Redirect /dashboard to /dashboard/overview */}
      <Route path="/" element={<Navigate to="/overview" replace />} />
    </Routes>
  )
}

export default DashboardRoutes
