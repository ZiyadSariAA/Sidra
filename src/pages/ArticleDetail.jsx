import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDefaultArticleImage, getDefaultHostImage } from '../utils/images'

const ArticleDetail = () => {
  const { id } = useParams()

  // قاعدة بيانات تجريبية للمقالات
  const articlesData = {
    1: {
      id: 1,
      title: "كيف يدمّر مزاجك قرارك الاستثماري",
      content: `
        <p class="mb-6 text-gray-700 leading-relaxed">
          في هذه المقالة، نتحدث عن السلوك النفسي للمستثمر، كيف يتأثر استثماره بسبب «فخاخ نفسية» يقع فيها دون وعي. 
          كثير من المستثمرين يقعون في أخطاء نفسية تؤثر على قراراتهم الاستثمارية، مما يؤدي إلى خسائر كبيرة.
        </p>
        
        <h2 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">الفخاخ النفسية في الاستثمار</h2>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          هناك عدة فخاخ نفسية يقع فيها المستثمرون، منها:
        </p>
        
        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2 mr-4">
          <li>فخ التأكيد: البحث عن معلومات تؤكد آراءنا المسبقة</li>
          <li>فخ القطيع: اتباع الجماعة دون تحليل</li>
          <li>فخ الخسارة: الخوف من الخسارة أكثر من الرغبة في الربح</li>
          <li>فخ الثقة الزائدة: الاعتقاد بأننا أفضل من الآخرين</li>
        </ul>
        
        <h2 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">كيف نتجنب هذه الفخاخ؟</h2>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          لتجنب هذه الفخاخ النفسية، يجب على المستثمر:
        </p>
        
        <ol class="list-decimal list-inside mb-6 text-gray-700 space-y-2 mr-4">
          <li>التعليم المستمر والقراءة</li>
          <li>وضع خطة استثمارية واضحة</li>
          <li>التنويع في الاستثمارات</li>
          <li>التحكم في المشاعر</li>
          <li>استشارة خبراء في المجال</li>
        </ol>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          في النهاية، الاستثمار ليس مجرد أرقام وإحصائيات، بل هو علم نفسي معقد يتطلب فهماً عميقاً للسلوك البشري.
          كلما فهم المستثمر هذه الفخاخ النفسية، كلما كان أكثر قدرة على اتخاذ قرارات استثمارية سليمة.
        </p>
      `,
      excerpt: "في هذه المقالة، نتحدث عن السلوك النفسي للمستثمر، كيف يتأثر استثماره بسبب «فخاخ نفسية» يقع فيها دون وعي",
      author: "أحمد محمد",
      authorImage: getDefaultHostImage(0),
      date: "5 أغسطس 2025",
      image: getDefaultArticleImage(0),
      readTime: "8 دقائق",
      category: "اقتصاد",
      tags: ["استثمار", "علم النفس", "اقتصاد", "تطوير ذاتي"]
    },
    2: {
      id: 2,
      title: "مستقبل التعليم في العصر الرقمي",
      content: `
        <p class="mb-6 text-gray-700 leading-relaxed">
          كيف يغير الذكاء الاصطناعي مستقبل التعليم في العالم العربي؟ هذا السؤال يشغل بال الكثير من التربويين والمهتمين بمستقبل التعليم.
        </p>
        
        <h2 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">التقنيات الجديدة في التعليم</h2>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          مع تطور التقنيات الحديثة، أصبح التعليم أكثر تفاعلية وتخصيصاً:
        </p>
        
        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2 mr-4">
          <li>التعلم الذكي: استخدام الذكاء الاصطناعي لتخصيص المحتوى</li>
          <li>الواقع المعزز: تجربة تعليمية تفاعلية</li>
          <li>التعلم عن بعد: إمكانية التعلم من أي مكان</li>
          <li>البيانات الضخمة: تحليل أداء الطلاب</li>
        </ul>
        
        <h2 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">تحديات التعليم الرقمي</h2>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          رغم الفوائد العديدة، يواجه التعليم الرقمي تحديات:
        </p>
        
        <ol class="list-decimal list-inside mb-6 text-gray-700 space-y-2 mr-4">
          <li>الفجوة الرقمية بين المناطق</li>
          <li>الحاجة لتدريب المعلمين</li>
          <li>تكلفة التقنيات الحديثة</li>
          <li>حماية البيانات والخصوصية</li>
        </ol>
      `,
      excerpt: "كيف يغير الذكاء الاصطناعي مستقبل التعليم في العالم العربي",
      author: "فاطمة علي",
      authorImage: getDefaultHostImage(1),
      date: "4 أغسطس 2025",
      image: getDefaultArticleImage(1),
      readTime: "6 دقائق",
      category: "تقنية",
      tags: ["تعليم", "ذكاء اصطناعي", "تقنية", "مستقبل"]
    },
    3: {
      id: 3,
      title: "النرجسية الرقمية وصورتك المثالية الزائفة",
      content: `
        <p class="mb-6 text-gray-700 leading-relaxed">
          لماذا يدمن الشباب منصات التواصل الاجتماعي؟ وكيف تؤثر على صورتنا الذاتية؟ هذه الأسئلة أصبحت محور اهتمام الباحثين في علم النفس الاجتماعي.
        </p>
        
        <h2 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">النرجسية الرقمية</h2>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          النرجسية الرقمية هي ظاهرة حديثة تتمثل في:
        </p>
        
        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2 mr-4">
          <li>الاهتمام المفرط بالصورة الذاتية على الإنترنت</li>
          <li>البحث عن الإعجابات والتعليقات</li>
          <li>مقارنة النفس بالآخرين باستمرار</li>
          <li>إظهار حياة مثالية غير واقعية</li>
        </ul>
        
        <h2 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">تأثيرات النرجسية الرقمية</h2>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          هذه الظاهرة تؤثر على الصحة النفسية:
        </p>
        
        <ol class="list-decimal list-inside mb-6 text-gray-700 space-y-2 mr-4">
          <li>انخفاض الثقة بالنفس</li>
          <li>الاكتئاب والقلق</li>
          <li>مشاكل في العلاقات الاجتماعية</li>
          <li>إدمان الإنترنت</li>
        </ol>
      `,
      excerpt: "لماذا يدمن الشباب منصات التواصل الاجتماعي؟ وكيف تؤثر على صورتنا الذاتية",
      author: "خالد القحطاني",
      authorImage: getDefaultHostImage(2),
      date: "3 أغسطس 2025",
      image: getDefaultArticleImage(2),
      readTime: "7 دقائق",
      category: "علم نفس",
      tags: ["نفسية", "تواصل اجتماعي", "صحة نفسية", "شباب"]
    },
    4: {
      id: 4,
      title: "الأدب العربي المعاصر: أصوات جديدة",
      content: `
        <p class="mb-6 text-gray-700 leading-relaxed">
          استكشاف للأدب العربي المعاصر وأبرز الأصوات الجديدة في الشعر والرواية. كيف يتطور الأدب العربي في العصر الحديث؟
        </p>
        
        <h2 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">الأصوات الجديدة في الشعر</h2>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          الشعر العربي المعاصر يشهد تطورات مهمة:
        </p>
        
        <ul class="list-disc list-inside mb-6 text-gray-700 space-y-2 mr-4">
          <li>الشعر الحر والنثري</li>
          <li>الشعر الرقمي والتفاعلي</li>
          <li>الشعر النسوي المعاصر</li>
          <li>الشعر السياسي والاجتماعي</li>
        </ul>
        
        <h2 class="text-2xl font-semibold text-gray-900 mb-4 mt-8">الرواية العربية الحديثة</h2>
        
        <p class="mb-6 text-gray-700 leading-relaxed">
          الرواية العربية تشهد ازدهاراً كبيراً:
        </p>
        
        <ol class="list-decimal list-inside mb-6 text-gray-700 space-y-2 mr-4">
          <li>روايات الخيال العلمي</li>
          <li>الروايات التاريخية</li>
          <li>روايات الهجرة واللجوء</li>
          <li>الروايات النسوية</li>
        </ol>
      `,
      excerpt: "استكشاف للأدب العربي المعاصر وأبرز الأصوات الجديدة في الشعر والرواية",
      author: "د. محمد العتيبي",
      authorImage: getDefaultHostImage(0),
      date: "أغسطس 2025",
      image: getDefaultArticleImage(3),
      readTime: "10 دقائق",
      category: "أدب",
      tags: ["أدب", "شعر", "رواية", "ثقافة"]
    }
  }

  // الحصول على المقالة حسب ID
  const article = articlesData[parseInt(id)]

  // إذا لم توجد المقالة
  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">المقالة غير موجودة</h1>
          <p className="text-gray-600 mb-6">عذراً، المقالة التي تبحث عنها غير موجودة</p>
          <Link 
            to="/articles" 
            className="inline-block bg-[#6D8751] text-white px-6 py-3 rounded-lg hover:bg-[#5a6f42] transition-colors"
          >
            العودة للمقالات
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500">
                <li>
                  <Link to="/" className="hover:text-[#6D8751] transition-colors">
                    الرئيسية
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li>
                  <Link to="/articles" className="hover:text-[#6D8751] transition-colors">
                    مقالات
                  </Link>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900">{article.title}</li>
              </ol>
            </nav>

            {/* العنوان الرئيسي */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>

            {/* معلومات المقالة */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div className="flex items-center space-x-4 space-x-reverse mb-4 sm:mb-0">
                <img 
                  src={article.authorImage} 
                  alt={article.author}
                  className="w-12 h-12 rounded-full hover:scale-110 transition-transform duration-200"
                />
                <div>
                  <div className="font-semibold text-gray-900">{article.author}</div>
                  <div className="text-sm text-gray-500">{article.date}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 space-x-reverse">
                <span className="px-3 py-1 bg-[#6D8751] text-white text-sm rounded-full">
                  {article.category}
                </span>
                <span className="text-sm text-gray-500">
                  {article.readTime} قراءة
                </span>
              </div>
            </div>

            {/* صورة المقالة */}
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden mb-8">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* محتوى المقالة */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8">
              {/* المحتوى */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              {/* التصنيفات */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">التصنيفات:</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-[#6D8751] hover:text-white transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* معلومات الكاتب */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">عن الكاتب:</h3>
                <div className="flex items-center space-x-4 space-x-reverse">
                  <img 
                    src={article.authorImage} 
                    alt={article.author}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-lg">{article.author}</div>
                    <div className="text-gray-600">
                      {article.author === "أحمد محمد" && "كاتب ومحلل اقتصادي متخصص في علم النفس الاقتصادي والسلوك الاستثماري."}
                      {article.author === "فاطمة علي" && "باحثة في مجال التربية والتعليم، متخصصة في التقنيات التعليمية الحديثة."}
                      {article.author === "خالد القحطاني" && "أخصائي نفسي اجتماعي، متخصص في تأثيرات التكنولوجيا على الصحة النفسية."}
                      {article.author === "د. محمد العتيبي" && "أستاذ الأدب العربي المعاصر في جامعة الملك سعود، ناقد أدبي وباحث."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* مقالات ذات صلة */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">مقالات ذات صلة</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* مقالات ذات صلة تجريبية */}
              {Object.values(articlesData)
                .filter(relatedArticle => relatedArticle.id !== article.id)
                .slice(0, 2)
                .map(relatedArticle => (
                  <div key={relatedArticle.id} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-2 hover:text-[#6D8751] transition-colors">
                      <Link to={`/article/${relatedArticle.id}`}>{relatedArticle.title}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="text-xs text-gray-500">{relatedArticle.date}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ArticleDetail
