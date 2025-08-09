import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from '../dashboard/AdminDashboard'
import EditorInChiefDashboard from '../dashboard/EditorInChiefDashboard'
import EditorDashboard from '../dashboard/EditorDashboard'
import AuthorDashboard from '../dashboard/AuthorDashboard'
import OwnerDashboard from '../dashboard/OwnerDashboard'
import Unauthorized from '../dashboard/Unauthorized'

const DashboardRoutes = () => {
  // TODO: Add authentication and role checking logic here
  const userRole = 'admin' // This should come from authentication context
  
  const checkPermission = (requiredRole) => {
    const roleHierarchy = {
      'owner': 5,
      'admin': 4,
      'editor-in-chief': 3,
      'editor': 2,
      'author': 1
    }
    
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
  }

  return (
    <Routes>
      <Route 
        path="/dashboard/owner" 
        element={
          checkPermission('owner') ? <OwnerDashboard /> : <Unauthorized />
        } 
      />
      <Route 
        path="/dashboard/admin" 
        element={
          checkPermission('admin') ? <AdminDashboard /> : <Unauthorized />
        } 
      />
      <Route 
        path="/dashboard/editor-in-chief" 
        element={
          checkPermission('editor-in-chief') ? <EditorInChiefDashboard /> : <Unauthorized />
        } 
      />
      <Route 
        path="/dashboard/editor" 
        element={
          checkPermission('editor') ? <EditorDashboard /> : <Unauthorized />
        } 
      />
      <Route 
        path="/dashboard/author" 
        element={
          checkPermission('author') ? <AuthorDashboard /> : <Unauthorized />
        } 
      />
      <Route path="/dashboard" element={<Navigate to="/dashboard/author" replace />} />
    </Routes>
  )
}

export default DashboardRoutes
