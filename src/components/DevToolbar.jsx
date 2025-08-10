import React, { useState } from 'react'
import { createTestUser, clearTestUser, getCurrentUser } from '../utils/auth'

const DevToolbar = () => {
  const [selectedRole, setSelectedRole] = useState('author')
  const currentUser = getCurrentUser()

  const handleRoleChange = (role) => {
    setSelectedRole(role)
    createTestUser(role)
    // Force re-render
    window.location.reload()
  }

  const handleLogout = () => {
    clearTestUser()
    window.location.reload()
  }

  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg z-50 border border-gray-100">
      <div className="text-sm font-medium mb-2 font-arabic">أدوات التطوير</div>
      
      {currentUser ? (
        <div className="space-y-2">
          <div className="text-xs text-gray-300 font-arabic">
            مسجل كـ: {currentUser.name} ({currentUser.role})
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-2 py-1 text-xs bg-red-600 hover:bg-red-700 rounded hover:scale-105 transition-all duration-200"
          >
            تسجيل الخروج
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs text-gray-300 mb-2 font-arabic">اختبر الأدوار المختلفة:</div>
          <select
            value={selectedRole}
            onChange={(e) => handleRoleChange(e.target.value)}
            className="w-full px-2 py-1 text-xs bg-gray-700 rounded text-white border border-gray-100"
          >
            <option value="author">كاتب</option>
            <option value="editor">محرر</option>
            <option value="editor-in-chief">رئيس التحرير</option>
            <option value="admin">مدير</option>
            <option value="owner">مالك</option>
          </select>
          <button
            onClick={() => handleRoleChange(selectedRole)}
            className="w-full px-2 py-1 text-xs bg-[#6D8751] hover:bg-[#5a6f42] rounded hover:scale-105 transition-all duration-200"
          >
            تسجيل كـ {selectedRole}
          </button>
        </div>
      )}
    </div>
  )
}

export default DevToolbar
