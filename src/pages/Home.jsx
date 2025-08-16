import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
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

  // بيانات الكاروسيل
  const slides = [
    {
      id: 'logo-feedback',
      title: 'اللوقو المقترح',
      subtitle: 'شعار سِدرة الجديد - نريد سماع رأيك',
      ctaText: 'شارك رأيك',
      ctaHref: '/about',
      imageUrl: '/assets/logo.svg',
      alt: 'شعار سِدرة المقترح',
      theme: 'light'
    },
    {
      id: 'interns',
      title: 'تم الافتتاح – نحتاج متدربين!',
      subtitle: 'انضم لرحلة بناء منصة عربية حديثة.',
      ctaText: 'قدّم الآن',
      ctaHref: '/join',
      imageUrl: '/assets/6x4 (2)_page-0001.jpg',
      alt: 'إعلان فرص التدريب',
      theme: 'dark'
    }
  ];

  // Fallback image and data guard
  const FALLBACK = "/assets/6x4 (2)_page-0001.jpg";
  
  const items = Array.isArray(slides) && slides.length ? slides : [{
    id: "fallback",
    title: "أهلاً بك في سدرة",
    subtitle: "منصة عربية للثقافة والفكر.",
    ctaText: "استكشف",
    ctaHref: "/articles",
    imageUrl: FALLBACK,
    alt: "Sidrah hero banner",
    theme: "dark"
  }];

  // Debug: تأكد من البيانات
  console.log('Slides:', slides);
  console.log('Items:', items);

  // Helper to handle image error
  const withFallback = (e) => {
    if (e?.target && e.target.src !== window.location.origin + FALLBACK) {
      e.target.src = FALLBACK;
    }
  };

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
      <section className="bg-white pt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl overflow-hidden shadow-sm ring-1 ring-[#6D8751]/15">
            <Swiper
              dir="rtl"
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              pagination={{ clickable: true }}
              loop={true}
              speed={550}
              className="h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[420px]"
            >
              {items.map((slide, idx) => (
                <SwiperSlide key={`${slide.id}-${idx}`}>
                  <div className="relative w-full h-full">
                    <img
                      src={slide.imageUrl || FALLBACK}
                      alt={slide.alt || slide.title || "Promo"}
                      className="w-full h-full object-cover object-center"
                      loading="eager"
                      onError={(e) => {
                        if (e.target.src !== FALLBACK) {
                          e.target.src = FALLBACK;
                        }
                      }}
                    />
                    {/* تعتيم أسود ناعم */}
                    <div className="absolute inset-0 bg-black/70 lg:bg-black/65" />
                    {/* المحتوى */}
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full text-white px-6 sm:px-10">
                        <div className="max-w-2xl ms-auto lg:me-8">
                          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-tight">
                            {slide.title}
                          </h2>
                          {slide.subtitle && (
                            <p className="mt-3 text-base sm:text-lg text-white/90">
                              {slide.subtitle}
                            </p>
                          )}
                          {slide.ctaText && (
                            <Link
                              to={slide.ctaHref}
                              className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-[#6D8751] hover:bg-[#5A6F42] transition"
                              aria-label={slide.ctaText}
                            >
                              {slide.ctaText}
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
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

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  )
}

export default Home 