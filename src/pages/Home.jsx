import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import EpisodeCard from '../components/EpisodeCard'
import SeriesCard from '../components/SeriesCard'
import Button from '../components/Button'
import AuthModal from '../components/auth/AuthModal'
import { getDefaultArticleImage, getDefaultHostImage, getDefaultEpisodeImage } from '../utils/images'

const Home = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [visibleArticles, setVisibleArticles] = useState(4);
  const [visibleEpisodes, setVisibleEpisodes] = useState(4);
  const [visibleSeries, setVisibleSeries] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  
  // Refs for intersection observer
  const articlesRef = useRef(null);
  const episodesRef = useRef(null);
  const seriesRef = useRef(null);

  // بيانات تجريبية للمقالات
  const articles = [
    {
      id: 1,
      title: "كيف يدمّر مزاجك قرارك الاستثماري",
      excerpt: "في هذه المقالة، نتحدث عن السلوك النفسي للمستثمر، كيف يتأثر استثماره بسبب «فخاخ نفسية» يقع فيها دون وعي",
      author: "أحمد محمد",
      authorImage: getDefaultHostImage(0),
      date: "5 أغسطس 2025",
      image: getDefaultArticleImage(0)
    },
    {
      id: 2,
      title: "مستقبل التعليم في العصر الرقمي",
      excerpt: "كيف يغير الذكاء الاصطناعي مستقبل التعليم في العالم العربي",
      author: "فاطمة علي",
      authorImage: getDefaultHostImage(1),
      date: "4 أغسطس 2025",
      image: getDefaultArticleImage(1)
    },
    {
      id: 3,
      title: "النرجسية الرقمية وصورتك المثالية الزائفة",
      excerpt: "لماذا يدمن الشباب منصات التواصل الاجتماعي؟ وكيف تؤثر على صورتنا الذاتية",
      author: "خالد القحطاني",
      authorImage: getDefaultHostImage(2),
      date: "3 أغسطس 2025",
      image: getDefaultArticleImage(2)
    },
    {
      id: 4,
      title: "الأدب العربي المعاصر: أصوات جديدة",
      excerpt: "استكشاف للأدب العربي المعاصر وأبرز الأصوات الجديدة في الشعر والرواية",
      author: "د. محمد العتيبي",
      authorImage: getDefaultHostImage(0),
      date: "أغسطس 2025",
      image: getDefaultArticleImage(3)
    },
    // إضافة المزيد من المقالات للتجربة
    {
      id: 5,
      title: "التقنية والثقافة: توازن ضروري",
      excerpt: "كيف نحافظ على هويتنا الثقافية في عصر التقنية المتسارع",
      author: "د. سارة أحمد",
      authorImage: getDefaultHostImage(1),
      date: "2 أغسطس 2025",
      image: getDefaultArticleImage(4)
    },
    {
      id: 6,
      title: "الفن الإسلامي: جماليات الروح",
      excerpt: "رحلة في عالم الفن الإسلامي وأسرار جمالياته الخالدة",
      author: "أ. علي حسن",
      authorImage: getDefaultHostImage(2),
      date: "1 أغسطس 2025",
      image: getDefaultArticleImage(5)
    }
  ]

  // بيانات تجريبية للحلقات الإذاعية
  const episodes = [
    {
      id: 1,
      title: "كيف يدمّر مزاجك قرارك الاستثماري",
      excerpt: "في هذه الحلقة، نتحدث عن السلوك النفسي للمستثمر، كيف يتأثر استثماره بسبب «فخاخ نفسية» يقع فيها دون وعي",
      host: "أحمد محمد",
      hostImage: getDefaultHostImage(0),
      date: "5 أغسطس 2025",
      duration: "45:30",
      image: getDefaultEpisodeImage(0)
    },
    {
      id: 2,
      title: "لماذا تقدم الخليج وتأخر اليمن",
      excerpt: "خرج ضياء من اليمن إلى روسيا للدراسة، ثم أمريكا وكندا، لفهم الأوضاع في اليمن",
      host: "فاطمة علي",
      hostImage: getDefaultHostImage(1),
      date: "4 أغسطس 2025",
      duration: "52:15",
      image: getDefaultEpisodeImage(1)
    },
    {
      id: 3,
      title: "النرجسية الرقمية وصورتك المثالية الزائفة",
      excerpt: "لماذا يدمن الشباب منصات التواصل الاجتماعي؟ وكيف تؤثر على صورتنا الذاتية",
      host: "خالد القحطاني",
      hostImage: getDefaultHostImage(2),
      date: "3 أغسطس 2025",
      duration: "38:45",
      image: getDefaultEpisodeImage(2)
    },
    {
      id: 4,
      title: "مستقبل التقنية في العالم العربي",
      excerpt: "كيف ستشكل التقنيات الجديدة مستقبل الاقتصاد في العالم العربي",
      host: "د. فاطمة الزهراني",
      hostImage: getDefaultHostImage(1),
      date: "يوليو 2025",
      duration: "40:00",
      image: getDefaultEpisodeImage(3)
    },
    // إضافة المزيد من الحلقات
    {
      id: 5,
      title: "الأدب العربي في العصر الرقمي",
      excerpt: "كيف يتكيف الأدب العربي مع التحديات الرقمية الجديدة",
      host: "د. محمد العتيبي",
      hostImage: getDefaultHostImage(0),
      date: "يوليو 2025",
      duration: "35:20",
      image: getDefaultEpisodeImage(4)
    },
    {
      id: 6,
      title: "تاريخ الفنون الإسلامية",
      excerpt: "رحلة في تاريخ الفنون الإسلامية وأثرها على الحضارة العالمية",
      host: "أ. علي حسن",
      hostImage: getDefaultHostImage(2),
      date: "يونيو 2025",
      duration: "48:15",
      image: getDefaultEpisodeImage(5)
    }
  ]

  // بيانات تجريبية للسلسلة
  const series = [
    {
      id: 1,
      title: "تاريخ السعودية الحديث",
      excerpt: "سلسلة تتعمق في تاريخ المملكة العربية السعودية من عهد الملك عبدالعزيز حتى اليوم",
      author: "د. محمد العتيبي",
      authorImage: getDefaultHostImage(0),
      date: "أغسطس 2025",
      episodesCount: 12,
      image: getDefaultArticleImage(3)
    },
    {
      id: 2,
      title: "تاريخ العرب الحديث",
      excerpt: "سلسلة تتعمق في تاريخ العالم العربي الحديث وأهم المحطات التاريخية",
      author: "د. فاطمة الزهراني",
      authorImage: getDefaultHostImage(1),
      date: "يوليو 2025",
      episodesCount: 8,
      image: getDefaultArticleImage(4)
    },
    {
      id: 3,
      title: "اقتصاد المستقبل",
      excerpt: "كيف ستشكل التقنيات الجديدة مستقبل الاقتصاد في المملكة والعالم العربي",
      author: "أ. خالد الشمري",
      authorImage: getDefaultHostImage(2),
      date: "يونيو 2025",
      episodesCount: 10,
      image: getDefaultArticleImage(5)
    },
    // إضافة المزيد من السلسلة
    {
      id: 4,
      title: "الفنون الإسلامية",
      excerpt: "سلسلة تتعمق في الفنون الإسلامية وأثرها على الحضارة العالمية",
      author: "د. أحمد الفني",
      authorImage: getDefaultHostImage(0),
      date: "مايو 2025",
      episodesCount: 6,
      image: getDefaultArticleImage(0)
    },
    {
      id: 5,
      title: "الأدب المعاصر",
      excerpt: "استكشاف للأدب العربي المعاصر وأبرز الأصوات الجديدة",
      author: "د. فاطمة الأدبية",
      authorImage: getDefaultHostImage(1),
      date: "أبريل 2025",
      episodesCount: 9,
      image: getDefaultArticleImage(1)
    }
  ]

  // Intersection Observer للتحميل التدريجي
  const observerCallback = useCallback((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsLoading(true);
        
        // محاكاة التحميل التدريجي
        setTimeout(() => {
          if (entry.target === articlesRef.current) {
            setVisibleArticles(prev => Math.min(prev + 2, articles.length));
          } else if (entry.target === episodesRef.current) {
            setVisibleEpisodes(prev => Math.min(prev + 2, episodes.length));
          } else if (entry.target === seriesRef.current) {
            setVisibleSeries(prev => Math.min(prev + 2, series.length));
          }
          setIsLoading(false);
        }, 500);
        
        observer.unobserve(entry.target);
      }
    });
  }, [articles.length, episodes.length, series.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '100px'
    });

    if (articlesRef.current) observer.observe(articlesRef.current);
    if (episodesRef.current) observer.observe(episodesRef.current);
    if (seriesRef.current) observer.observe(seriesRef.current);

    return () => observer.disconnect();
  }, [observerCallback]);

  // عرض المقالات المرئية فقط
  const visibleArticlesData = articles.slice(0, visibleArticles);
  const visibleEpisodesData = episodes.slice(0, visibleEpisodes);
  const visibleSeriesData = series.slice(0, visibleSeries);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-white mobile-spacing">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="responsive-title-xl text-gray-900 mobile-mb animate-fade-in">
              سِدرة
              <span className="responsive-title-lg block text-[#6D8751] mt-2 sm:mt-4 animate-slide-up">منصة الثقافة والفكر العربي</span>
            </h1>
            <p className="responsive-body-lg text-gray-700 max-w-3xl mx-auto mobile-mb animate-fade-in-delay">
              منصة إعلامية عربية تركز على المحتوى الثقافي والفكري، 
              نقدم مقالات وحلقات وسلسلة تثري الفكر والثقافة
            </p>
          </div>
        </div>
      </section>

      {/* المقالات المميزة */}
      <section className="mobile-spacing">
        <div className="responsive-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mobile-mb">
            <h2 className="responsive-title-md text-gray-900 mb-4 sm:mb-0">المقالات المميزة</h2>
            <Link to="/articles" className="hidden sm:block">
              <Button variant="ghost" className="font-medium">
                عرض جميع المقالات
              </Button>
            </Link>
          </div>
          
          <div className="responsive-grid">
            {visibleArticlesData.map((article, index) => (
              <div key={article.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          
          {/* Loading indicator */}
          {isLoading && visibleArticles < articles.length && (
            <div className="text-center mt-8">
              <div className="inline-flex items-center px-4 py-2 text-[#6D8751]">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التحميل...
              </div>
            </div>
          )}
          
          {/* زر عرض المزيد للأجهزة المحمولة */}
          <div className="text-center mt-8 sm:hidden">
            <Link to="/articles">
              <Button variant="primary" className="font-medium w-full sm:w-auto">
                عرض جميع المقالات
              </Button>
            </Link>
          </div>
          
          {/* Intersection Observer trigger */}
          {visibleArticles < articles.length && (
            <div ref={articlesRef} className="h-10" />
          )}
        </div>
      </section>

      {/* السلسلة */}
      <section className="bg-white mobile-spacing">
        <div className="responsive-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mobile-mb">
            <h2 className="responsive-title-md text-gray-900 mb-4 sm:mb-0">السلسلة</h2>
            <Link to="/series" className="hidden sm:block">
              <Button variant="ghost" className="font-medium">
                عرض جميع السلسلة
              </Button>
            </Link>
          </div>
          
          <div className="responsive-grid">
            {visibleSeriesData.map((seriesItem, index) => (
              <div key={seriesItem.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <SeriesCard series={seriesItem} />
              </div>
            ))}
          </div>
          
          {/* Loading indicator */}
          {isLoading && visibleSeries < series.length && (
            <div className="text-center mt-8">
              <div className="inline-flex items-center px-4 py-2 text-[#6D8751]">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التحميل...
              </div>
            </div>
          )}
          
          {/* زر عرض المزيد للأجهزة المحمولة */}
          <div className="text-center mt-8 sm:hidden">
            <Link to="/series">
              <Button variant="primary" className="font-medium w-full sm:w-auto">
                عرض جميع السلسلة
              </Button>
            </Link>
          </div>
          
          {/* Intersection Observer trigger */}
          {visibleSeries < series.length && (
            <div ref={seriesRef} className="h-10" />
          )}
        </div>
      </section>

      {/* الحلقات الإذاعية */}
      <section className="bg-gray-50 mobile-spacing">
        <div className="responsive-container">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mobile-mb">
            <h2 className="responsive-title-md text-gray-900 mb-4 sm:mb-0">الحلقات الجديدة</h2>
            <Link to="/episodes" className="hidden sm:block">
              <Button variant="ghost" className="font-medium">
                عرض جميع الحلقات
              </Button>
            </Link>
          </div>
          
          <div className="responsive-grid">
            {visibleEpisodesData.map((episode, index) => (
              <div key={episode.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <EpisodeCard episode={episode} />
              </div>
            ))}
          </div>
          
          {/* Loading indicator */}
          {isLoading && visibleEpisodes < episodes.length && (
            <div className="text-center mt-8">
              <div className="inline-flex items-center px-4 py-2 text-[#6D8751]">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                جاري التحميل...
              </div>
            </div>
          )}
          
          {/* زر عرض المزيد للأجهزة المحمولة */}
          <div className="text-center mt-8 sm:hidden">
            <Link to="/episodes">
              <Button variant="primary" className="font-medium w-full sm:w-auto">
                عرض جميع الحلقات
              </Button>
            </Link>
          </div>
          
          {/* Intersection Observer trigger */}
          {visibleEpisodes < episodes.length && (
            <div ref={episodesRef} className="h-10" />
          )}
        </div>
      </section>

      {/* قسم الإحصائيات */}
      <section className="bg-white py-20">
        <div className="responsive-container">
          <div className="text-center mb-16">
            <h2 className="responsive-title-md text-gray-900 mb-4">
              إحصائيات سِدرة
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              أرقام تعكس ثقة مجتمعنا في محتوانا الثقافي والفكري
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#6D8751] to-[#5a6f42] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 19 16.5 19c-1.746 0-3.332-.523-4.5-1.253" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-[#6D8751] mb-3 group-hover:text-[#5a6f42] transition-colors">500+</div>
              <div className="text-gray-700 text-lg font-medium group-hover:text-[#6D8751] transition-colors">مقالة منشورة</div>
            </div>
            
            <div className="group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#6D8751] to-[#5a6f42] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-[#6D8751] mb-3 group-hover:text-[#5a6f42] transition-colors">50+</div>
              <div className="text-gray-700 text-lg font-medium group-hover:text-[#6D8751] transition-colors">حلقة إذاعية</div>
            </div>
            
            <div className="group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#6D8751] to-[#5a6f42] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="text-4xl font-bold text-[#6D8751] mb-3 group-hover:text-[#5a6f42] transition-colors">100K+</div>
              <div className="text-gray-700 text-lg font-medium group-hover:text-[#6D8751] transition-colors">قارئ شهرياً</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="text-center py-16">
        <Link
          to="/articles"
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-[#6D8751] hover:bg-[#5a6f42] transition-all duration-300 hover:scale-105 shadow-lg"
        >
          اقرأ المقالات
          <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  )
}

export default Home 