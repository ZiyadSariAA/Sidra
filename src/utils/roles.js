import { getCurrentUser } from './auth.js'

// Get current user role from authentication
export const getUserRole = () => {
  try {
    const currentUser = getCurrentUser()
    return currentUser?.role || 'author'
  } catch (error) {
    // Fallback during development
    console.warn('Auth not available, using default role: author')
    return 'author'
  }
}

// Check if user has specific role
export const hasRole = (requiredRole) => {
  const userRole = getUserRole()
  
  const roleHierarchy = {
    'owner': 5,
    'admin': 4,
    'editor-in-chief': 3,
    'editor': 2,
    'author': 1
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

// Get role display name in Arabic
export const getRoleDisplayName = (role) => {
  const roleNames = {
    'owner': 'مالك',
    'admin': 'مدير',
    'editor-in-chief': 'رئيس التحرير',
    'editor': 'محرر',
    'author': 'كاتب'
  }
  
  return roleNames[role] || 'مستخدم'
}
