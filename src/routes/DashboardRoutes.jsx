import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import RoleBasedDashboard from '../components/dashboard/RoleBasedDashboard'
import WriteArticle from '../components/dashboard/WriteArticle'
import Profile from '../components/dashboard/Profile'
import MyArticles from '../components/dashboard/MyArticles'
import EditArticle from '../components/dashboard/EditArticle'
import EditorDashboard from '../components/dashboard/EditorDashboard'
import ViewArticle from '../components/dashboard/ViewArticle'
import ChiefEditorDashboard from '../components/dashboard/ChiefEditorDashboard'
import ProtectedRoute from '../components/auth/ProtectedRoute'

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        {/* Main Dashboard - Block readers from accessing via URL */}
        <Route path="/" element={
          <ProtectedRoute requiredRole={['writer', 'editor', 'editor-in-chief', 'admin']}>
            <RoleBasedDashboard />
          </ProtectedRoute>
        } />
        
        {/* Write Article */}
        <Route path="/write" element={
          <ProtectedRoute>
            <WriteArticle />
          </ProtectedRoute>
        } />
        
        {/* User Profile */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        
        {/* My Articles */}
        <Route path="/my-articles" element={
          <ProtectedRoute>
            <MyArticles />
          </ProtectedRoute>
        } />
        
        {/* Edit Article */}
        <Route path="/edit-article/:articleId" element={
          <ProtectedRoute>
            <EditArticle />
          </ProtectedRoute>
        } />
        
        {/* Editor Dashboard */}
        <Route path="/editor" element={
          <ProtectedRoute requiredRole={['editor', 'editor-in-chief']}>
            <EditorDashboard />
          </ProtectedRoute>
        } />
        
        {/* View Article */}
        <Route path="/view-article/:articleId" element={
          <ProtectedRoute>
            <ViewArticle />
          </ProtectedRoute>
        } />
        
        {/* Chief Editor Dashboard */}
        <Route path="/chief" element={
          <ProtectedRoute requiredRole="editor-in-chief">
            <ChiefEditorDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </DashboardLayout>
  )
}

export default DashboardRoutes
