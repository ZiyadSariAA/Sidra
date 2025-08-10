import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import Overview from './common/Overview'
import Work from './common/Work'
import Content from './common/Content'
import Analytics from './common/Analytics'
import Settings from './common/Settings'

const GenericDashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/overview" element={<Overview />} />
        <Route path="/work" element={<Work />} />
        <Route path="/content" element={<Content />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/overview" replace />} />
      </Routes>
    </DashboardLayout>
  )
}

export default GenericDashboard
