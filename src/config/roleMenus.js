export const roleMenus = {
  // Default menu for all roles
  default: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard', icon: '📊' },
    { key: 'write', label: 'كتابة مقال', path: '/dashboard/write', icon: '✍️' },
    { key: 'my-articles', label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' },
    { key: 'profile', label: 'الملف الشخصي', path: '/dashboard/profile', icon: '👤' },
  ],

  // Author menu (basic access)
  writer: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard', icon: '📊' },
    { key: 'write', label: 'كتابة مقال جديد', path: '/dashboard/write', icon: '✍️' },
    { key: 'my-articles', label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' },
    { key: 'profile', label: 'الملف الشخصي', path: '/dashboard/profile', icon: '👤' },
  ],

  // Editor menu (can review content)
  editor: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard', icon: '📊' },
    { key: 'editor', label: 'مراجعة المقالات', path: '/dashboard/editor', icon: '📋' },
    { key: 'write', label: 'كتابة مقال جديد', path: '/dashboard/write', icon: '✍️' },
    { key: 'my-articles', label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' },
    { key: 'profile', label: 'الملف الشخصي', path: '/dashboard/profile', icon: '👤' },
  ],

  // Editor-in-Chief menu (can manage editors)
  'editor-in-chief': [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard', icon: '📊' },
    { key: 'chief', label: 'لوحة رئيس التحرير', path: '/dashboard/chief', icon: '🎯' },
    { key: 'editor', label: 'مراجعة المقالات', path: '/dashboard/editor', icon: '📋' },
    { key: 'write', label: 'كتابة مقال جديد', path: '/dashboard/write', icon: '✍️' },
    { key: 'my-articles', label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' },
    { key: 'profile', label: 'الملف الشخصي', path: '/dashboard/profile', icon: '👤' },
  ],

  // Admin menu (full access)
  admin: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard', icon: '📊' },
    { key: 'chief', label: 'لوحة رئيس التحرير', path: '/dashboard/chief', icon: '🎯' },
    { key: 'editor', label: 'مراجعة المقالات', path: '/dashboard/editor', icon: '📋' },
    { key: 'write', label: 'كتابة مقال جديد', path: '/dashboard/write', icon: '✍️' },
    { key: 'my-articles', label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' },
    { key: 'profile', label: 'الملف الشخصي', path: '/dashboard/profile', icon: '👤' },
  ],

  // Owner menu (highest access)
  owner: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard', icon: '📊' },
    { key: 'chief', label: 'لوحة رئيس التحرير', path: '/dashboard/chief', icon: '🎯' },
    { key: 'editor', label: 'مراجعة المقالات', path: '/dashboard/editor', icon: '📋' },
    { key: 'write', label: 'كتابة مقال جديد', path: '/dashboard/write', icon: '✍️' },
    { key: 'my-articles', label: 'مقالاتي', path: '/dashboard/my-articles', icon: '📝' },
    { key: 'profile', label: 'الملف الشخصي', path: '/dashboard/profile', icon: '👤' },
  ],
}
