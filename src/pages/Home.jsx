import React from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'
import EpisodeCard from '../components/EpisodeCard'
import SeriesCard from '../components/SeriesCard'
import Button from '../components/Button'
import { getDefaultArticleImage, getDefaultHostImage, getDefaultEpisodeImage } from '../utils/images'

const Home = () => {
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
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-white mobile-spacing">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="responsive-title-xl text-gray-900 mobile-mb animate-fade-in">
              سِدره
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
            {articles.map((article, index) => (
              <div key={article.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
          
          {/* زر عرض المزيد للأجهزة المحمولة */}
          <div className="text-center mt-8 sm:hidden">
            <Link to="/articles">
              <Button variant="primary" className="font-medium w-full sm:w-auto">
                عرض جميع المقالات
              </Button>
            </Link>
          </div>
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
            {series.map((seriesItem, index) => (
              <div key={seriesItem.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <SeriesCard series={seriesItem} />
              </div>
            ))}
          </div>
          
          {/* زر عرض المزيد للأجهزة المحمولة */}
          <div className="text-center mt-8 sm:hidden">
            <Link to="/series">
              <Button variant="primary" className="font-medium w-full sm:w-auto">
                عرض جميع السلسلة
              </Button>
            </Link>
          </div>
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
            {episodes.map((episode, index) => (
              <div key={episode.id} style={{ animationDelay: `${index * 0.1}s` }}>
                <EpisodeCard episode={episode} />
              </div>
            ))}
          </div>
          
          {/* زر عرض المزيد للأجهزة المحمولة */}
          <div className="text-center mt-8 sm:hidden">
            <Link to="/episodes">
              <Button variant="primary" className="font-medium w-full sm:w-auto">
                عرض جميع الحلقات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* قسم الإحصائيات */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-[#6D8751] mb-2 hover:scale-110 transition-transform duration-300">500+</div>
              <div className="text-gray-600 hover:text-[#6D8751] transition-colors duration-300">مقالة منشورة</div>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-[#6D8751] mb-2 hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-gray-600 hover:text-[#6D8751] transition-colors duration-300">حلقة إذاعية</div>
            </div>
            <div className="hover:scale-110 transition-transform duration-300">
              <div className="text-3xl font-bold text-[#6D8751] mb-2 hover:scale-110 transition-transform duration-300">100K+</div>
              <div className="text-gray-600 hover:text-[#6D8751] transition-colors duration-300">قارئ شهرياً</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 