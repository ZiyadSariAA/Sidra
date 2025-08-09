import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import Button from '../components/Button'
import { getDefaultArticleImage, getDefaultHostImage } from '../utils/images'

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('الكل')

  // بيانات تجريبية للمقالات
  const articles = [
    {
      id: 1,
      title: "كيف يدمّر مزاجك قرارك الاستثماري",
      excerpt: "في هذه المقالة، نتحدث عن السلوك النفسي للمستثمر، كيف يتأثر استثماره بسبب «فخاخ نفسية» يقع فيها دون وعي",
      author: "أحمد محمد",
      authorImage: getDefaultHostImage(0),
      date: "5 أغسطس 2025",
      image: getDefaultArticleImage(0),
      category: "اقتصاد",
      readTime: "8 دقائق"
    },
    {
      id: 2,
      title: "مستقبل التعليم في العصر الرقمي",
      excerpt: "كيف يغير الذكاء الاصطناعي مستقبل التعليم في العالم العربي",
      author: "فاطمة علي",
      authorImage: getDefaultHostImage(1),
      date: "4 أغسطس 2025",
      image: getDefaultArticleImage(1),
      category: "ثقافة",
      readTime: "12 دقيقة"
    },
    {
      id: 3,
      title: "النرجسية الرقمية وصورتك المثالية الزائفة",
      excerpt: "لماذا يدمن الشباب منصات التواصل الاجتماعي؟ وكيف تؤثر على صورتنا الذاتية",
      author: "خالد القحطاني",
      authorImage: getDefaultHostImage(2),
      date: "3 أغسطس 2025",
      image: getDefaultArticleImage(2),
      category: "تقنية",
      readTime: "10 دقائق"
    },
    {
      id: 4,
      title: "تاريخ الخط العربي: من النقش إلى الرقمنة",
      excerpt: "رحلة في عالم الخط العربي، من بداياته في النقش على الحجر إلى عصر الرقمنة والتقنيات الحديثة",
      author: "د. سارة الأحمد",
      authorImage: getDefaultHostImage(0),
      date: "2 أغسطس 2025",
      image: getDefaultArticleImage(3),
      category: "فنون",
      readTime: "15 دقيقة"
    },
    {
      id: 5,
      title: "الذكاء الاصطناعي في التعليم: فرص وتحديات",
      excerpt: "كيف يغير الذكاء الاصطناعي مستقبل التعليم في المملكة والعالم العربي",
      author: "أ. محمد الشمري",
      authorImage: getDefaultHostImage(1),
      date: "1 أغسطس 2025",
      image: getDefaultArticleImage(4),
      category: "تقنية",
      readTime: "11 دقيقة"
    },
    {
      id: 6,
      title: "الأدب العربي المعاصر: أصوات جديدة",
      excerpt: "استكشاف للأدب العربي المعاصر وأبرز الأصوات الجديدة في الشعر والرواية",
      author: "د. فاطمة الزهراني",
      authorImage: getDefaultHostImage(2),
      date: "31 يوليو 2025",
      image: getDefaultArticleImage(5),
      category: "أدب",
      readTime: "9 دقائق"
    }
  ]

  // تصفية المقالات حسب البحث والفئة
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'الكل' || article.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // الحصول على الفئات الفريدة
  const categories = ['الكل', ...new Set(articles.map(article => article.category))]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-white mobile-spacing">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="responsive-title-xl text-gray-900 mobile-mb animate-fade-in">
              المقالات
              <span className="responsive-title-lg block text-[#6D8751] mt-2 sm:mt-4 animate-slide-up">اكتشف محتوى ثري ومتنوع</span>
            </h1>
            <p className="responsive-body-lg text-gray-700 max-w-3xl mx-auto mobile-mb animate-fade-in-delay">
              مقالات ثقافية وفكرية تثري عقلك وتوسع مداركك
            </p>

            {/* البحث والتصفية */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث في المقالات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-80 px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] outline-none transition-colors"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D8751] focus:border-[#6D8751] outline-none transition-colors"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* عرض المقالات */}
      <section className="mobile-spacing">
        <div className="responsive-container">
          {filteredArticles.length > 0 ? (
            <>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mobile-mb">
                <h2 className="responsive-title-md text-gray-900 mb-2 sm:mb-0">
                  {filteredArticles.length} مقالة {selectedCategory !== 'الكل' && `في ${selectedCategory}`}
                </h2>
                <div className="responsive-body text-gray-600">
                  {searchTerm && `نتائج البحث عن: "${searchTerm}"`}
                </div>
              </div>
              
              <div className="responsive-grid">
                {filteredArticles.map((article, index) => (
                  <div key={article.id} style={{ animationDelay: `${index * 0.1}s` }}>
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="text-4xl sm:text-6xl mb-4">📚</div>
              <h3 className="responsive-title-md text-gray-900 mb-4">لا توجد نتائج</h3>
              <p className="responsive-body text-gray-600 mb-6 max-w-md mx-auto">
                {searchTerm 
                  ? `لم نجد مقالات تطابق "${searchTerm}"`
                  : 'لا توجد مقالات في هذه الفئة'
                }
              </p>
              <Button 
                variant="primary" 
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('الكل')
                }}
                className="w-full sm:w-auto"
              >
                عرض جميع المقالات
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Articles
