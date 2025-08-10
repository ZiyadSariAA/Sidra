export const roleMenus = {
  // Default menu for all roles
  default: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard/overview', icon: '📊' },
    { key: 'work', label: 'العمل', path: '/dashboard/work', icon: '💼' },
    { key: 'content', label: 'المحتوى', path: '/dashboard/content', icon: '📝' },
    { key: 'analytics', label: 'التحليلات', path: '/dashboard/analytics', icon: '📈' },
    { key: 'settings', label: 'الإعدادات', path: '/dashboard/settings', icon: '⚙️' },
  ],

  // Author menu (basic access)
  author: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard/overview', icon: '📊' },
    { key: 'work', label: 'مسوداتي', path: '/dashboard/work', icon: '💼' },
    { key: 'content', label: 'مقالاتي', path: '/dashboard/content', icon: '📝' },
    { key: 'analytics', label: 'إحصائياتي', path: '/dashboard/analytics', icon: '📈' },
    { key: 'settings', label: 'إعداداتي', path: '/dashboard/settings', icon: '⚙️' },
  ],

  // Editor menu (can review content)
  editor: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard/overview', icon: '📊' },
    { key: 'work', label: 'مراجعة المحتوى', path: '/dashboard/work', icon: '💼' },
    { key: 'content', label: 'إدارة المحتوى', path: '/dashboard/content', icon: '📝' },
    { key: 'analytics', label: 'التحليلات', path: '/dashboard/analytics', icon: '📈' },
    { key: 'settings', label: 'الإعدادات', path: '/dashboard/settings', icon: '⚙️' },
  ],

  // Editor-in-Chief menu (can manage editors)
  editorInChief: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard/overview', icon: '📊' },
    { key: 'work', label: 'إدارة المراجعات', path: '/dashboard/work', icon: '💼' },
    { key: 'content', label: 'إدارة المحتوى', path: '/dashboard/content', icon: '📝' },
    { key: 'analytics', label: 'التحليلات', path: '/dashboard/analytics', icon: '📈' },
    { key: 'settings', label: 'إعدادات التحرير', path: '/dashboard/settings', icon: '⚙️' },
  ],

  // Admin menu (full access)
  admin: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard/overview', icon: '📊' },
    { key: 'work', label: 'إدارة النظام', path: '/dashboard/work', icon: '💼' },
    { key: 'content', label: 'إدارة المحتوى', path: '/dashboard/content', icon: '📝' },
    { key: 'analytics', label: 'التحليلات', path: '/dashboard/analytics', icon: '📈' },
    { key: 'settings', label: 'إعدادات النظام', path: '/dashboard/settings', icon: '⚙️' },
  ],

  // Owner menu (highest access)
  owner: [
    { key: 'overview', label: 'نظرة عامة', path: '/dashboard/overview', icon: '📊' },
    { key: 'work', label: 'إدارة الشركة', path: '/dashboard/work', icon: '💼' },
    { key: 'content', label: 'إدارة المحتوى', path: '/dashboard/content', icon: '📝' },
    { key: 'analytics', label: 'التحليلات', path: '/dashboard/analytics', icon: '📈' },
    { key: 'settings', label: 'إعدادات الشركة', path: '/dashboard/settings', icon: '⚙️' },
  ],
}
