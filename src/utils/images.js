// صور افتراضية للمقالات
export const defaultArticleImages = [
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop'
]

// صور افتراضية للمذيعين
export const defaultHostImages = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
]

// صور افتراضية للحلقات الإذاعية
export const defaultEpisodeImages = [
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1485579149621-3123dd979885?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1516280440614-37939bb1d5e9?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop'
]

// دالة للحصول على صورة عشوائية
export const getRandomImage = (imageArray) => {
  return imageArray[Math.floor(Math.random() * imageArray.length)]
}

// دالة للحصول على صورة افتراضية للمقالة
export const getDefaultArticleImage = (index = 0) => {
  return defaultArticleImages[index % defaultArticleImages.length]
}

// دالة للحصول على صورة افتراضية للمذيع
export const getDefaultHostImage = (index = 0) => {
  return defaultHostImages[index % defaultHostImages.length]
}

// دالة للحصول على صورة افتراضية للحلقة
export const getDefaultEpisodeImage = (index = 0) => {
  return defaultEpisodeImages[index % defaultEpisodeImages.length]
} 