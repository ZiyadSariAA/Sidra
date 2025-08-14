// تعريف الأدوار المتاحة في النظام
export const ROLES = {
  'reader': 'قارئ',
  'writer': 'كاتب',
  'editor': 'محرر',
  'editor-in-chief': 'رئيس التحرير',
  'admin': 'مدير',
  'owner': 'مالك'
};

// تعريف صلاحيات كل دور
export const ROLE_PERMISSIONS = {
  'reader': {
    canRead: true,
    canWrite: false,
    canEdit: false,
    canPublish: false,
    canManageUsers: false,
    canManageSystem: false
  },
  'writer': {
    canRead: true,
    canWrite: true,
    canEdit: false,
    canPublish: false,
    canManageUsers: false,
    canManageSystem: false
  },
  'editor': {
    canRead: true,
    canWrite: true,
    canEdit: true,
    canPublish: false,
    canManageUsers: false,
    canManageSystem: false
  },
  'editor-in-chief': {
    canRead: true,
    canWrite: true,
    canEdit: true,
    canPublish: true,
    canManageUsers: true,
    canManageSystem: false
  },
  'admin': {
    canRead: true,
    canWrite: true,
    canEdit: true,
    canPublish: true,
    canManageUsers: true,
    canManageSystem: true
  },
  'owner': {
    canRead: true,
    canWrite: true,
    canEdit: true,
    canPublish: true,
    canManageUsers: true,
    canManageSystem: true
  }
};

// دالة للتحقق من وجود دور معين
export const hasRole = (userRole, requiredRole) => {
  if (!userRole || !requiredRole) return false;
  
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(userRole);
  }
  
  return userRole === requiredRole;
};

// دالة للتحقق من الصلاحيات
export const hasPermission = (userRole, permission) => {
  if (!userRole || !permission) return false;
  
  const permissions = ROLE_PERMISSIONS[userRole];
  if (!permissions) return false;
  
  return permissions[permission] || false;
};

// دالة للحصول على اسم الدور المعروض
export const getRoleDisplayName = (role) => {
  console.log('getRoleDisplayName called with role:', role, 'type:', typeof role); // للتأكد من القيمة
  
  if (!role) {
    console.log('Role is falsy, returning غير محدد');
    return 'غير محدد';
  }
  if (role === '') {
    console.log('Role is empty string, returning غير محدد');
    return 'غير محدد';
  }
  if (role === 'undefined' || role === 'null') {
    console.log('Role is undefined/null string, returning غير محدد');
    return 'غير محدد';
  }
  
  const displayName = ROLES[role];
  console.log('Found display name:', displayName, 'for role:', role);
  
  return displayName || 'غير محدد';
};

// دالة للحصول على صلاحيات الدور
export const getRolePermissions = (role) => {
  return ROLE_PERMISSIONS[role] || {};
};

// دالة للتحقق من أن المستخدم يمكنه الكتابة
export const canWrite = (userRole) => {
  return hasPermission(userRole, 'canWrite');
};

// دالة للتحقق من أن المستخدم يمكنه التحرير
export const canEdit = (userRole) => {
  return hasPermission(userRole, 'canEdit');
};

// دالة للتحقق من أن المستخدم يمكنه النشر
export const canPublish = (userRole) => {
  return hasPermission(userRole, 'canPublish');
};

// دالة للتحقق من أن المستخدم يمكنه إدارة المستخدمين
export const canManageUsers = (userRole) => {
  return hasPermission(userRole, 'canManageUsers');
};

// دالة للتحقق من أن المستخدم يمكنه إدارة النظام
export const canManageSystem = (userRole) => {
  return hasPermission(userRole, 'canManageSystem');
};
