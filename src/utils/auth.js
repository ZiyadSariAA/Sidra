// Authentication utility functions

export const checkUserRole = () => {
  // TODO: Implement actual authentication logic
  // This should check localStorage, cookies, or API for user session
  const user = localStorage.getItem('user')
  if (!user) return null
  
  try {
    const userData = JSON.parse(user)
    return userData.role
  } catch (error) {
    return null
  }
}

export const isAuthenticated = () => {
  return checkUserRole() !== null
}

export const hasPermission = (requiredRole) => {
  const userRole = checkUserRole()
  if (!userRole) return false
  
  const roleHierarchy = {
    'owner': 5,
    'admin': 4,
    'editor-in-chief': 3,
    'editor': 2,
    'author': 1
  }
  
  return roleHierarchy[userRole] >= roleHierarchy[requiredRole]
}

export const login = (userData) => {
  // TODO: Implement actual login logic
  localStorage.setItem('user', JSON.stringify(userData))
}

export const logout = () => {
  localStorage.removeItem('user')
}

export const getCurrentUser = () => {
  const user = localStorage.getItem('user')
  if (!user) return null
  
  try {
    return JSON.parse(user)
  } catch (error) {
    return null
  }
}

// Development helper functions for testing
export const createTestUser = (role = 'author') => {
  const testUsers = {
    'author': { name: 'أحمد الكاتب', role: 'author', email: 'ahmed@example.com' },
    'editor': { name: 'فاطمة المحررة', role: 'editor', email: 'fatima@example.com' },
    'editor-in-chief': { name: 'محمد رئيس التحرير', role: 'editor-in-chief', email: 'mohammed@example.com' },
    'admin': { name: 'علي المدير', role: 'admin', email: 'ali@example.com' },
    'owner': { name: 'سارة المالكة', role: 'owner', email: 'sara@example.com' }
  }
  
  const userData = testUsers[role] || testUsers.author
  login(userData)
  return userData
}

export const clearTestUser = () => {
  logout()
}
