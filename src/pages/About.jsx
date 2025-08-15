import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const About = () => {
  const stats = [
    { number: "500+", label: "مقالة منشورة", icon: "📚" },
    { number: "50+", label: "حلقة إذاعية", icon: "🎙️" },
    { number: "100K+", label: "قارئ شهرياً", icon: "👥" },
    { number: "25+", label: "كاتب ومفكر", icon: "✍️" }
  ]

  const values = [
    {
      icon: "🌱",
      title: "النمو الفكري",
      description: "نسعى لتوفير محتوى يثري العقل ويفتح آفاقاً جديدة للفكر والثقافة"
    },
    {
      icon: "🤝",
      title: "التواصل المجتمعي",
      description: "نربط المفكرين والكتاب بالقراء لنخلق حواراً ثقافياً مستمراً"
    },
    {
      icon: "🎯",
      title: "الأصالة والحداثة",
      description: "نحترم تراثنا الثقافي ونواكب العصر بفكر متجدد ومحتوى عصري"
    },
    {
      icon: "🌟",
      title: "التميز والإبداع",
      description: "نقدم محتوى متميز يلبي احتياجات القارئ العربي المعاصر"
    }
  ]

  const team = [
    {
      name: "معاذ العتيبي",
      role: "المؤسس",
      bio: "مؤسس منصة سِدرة للثقافة والفكر العربي، كاتب ومفكر يسعى لإثراء المحتوى الثقافي في العالم العربي",
      image: "/assets/6x4 (2)_page-0001.jpg"
    }
  ]

  const socialPlatforms = [
    {
      name: "X (تويتر)",
      handle: "@sidra_sa",
      url: "https://x.com/sidra_sa",
      icon: "𝕏",
      color: "bg-black text-white",
      followers: "25K+"
    },
    {
      name: "إنستغرام",
      handle: "@sidra_sa",
      url: "https://instagram.com/sidra_sa",
      icon: "📷",
      color: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      followers: "15K+"
    },
    {
      name: "يوتيوب",
      handle: "سِدرة",
      url: "https://youtube.com/@sidra_sa",
      icon: "📺",
      color: "bg-red-600 text-white",
      followers: "10K+"
    },
    {
      name: "لينكد إن",
      handle: "سِدرة",
      url: "https://linkedin.com/company/sidra-sa",
      icon: "💼",
      color: "bg-blue-600 text-white",
      followers: "5K+"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              عن سِدرة
              <span className="block text-[#6D8751] animate-slide-up">منصة الثقافة والفكر العربي</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-delay">
              نافذة ثقافية عربية تفتح لك أبواب المعرفة والفكر، 
              نقدم محتوى ثري ومتنوع يثري عقلك ويوسع مداركك
            </p>
          </div>
        </div>
      </section>

      {/* قصة سِدرة */}
      <section className="py-16 bg-gray-50">
        <div className="responsive-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">قصة سِدرة</h2>
              <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">من نحن؟</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  سِدرة منصة إعلامية عربية تأسست عام 2023 بهدف إثراء المشهد الثقافي والفكري في العالم العربي. نحن نؤمن بقوة الكلمة المكتوبة والمسموعة في تشكيل الوعي وبناء المستقبل.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  نقدم محتوى متنوع يغطي الثقافة والفكر والأدب والتقنية والاقتصاد، من خلال مقالات وحلقات إذاعية وسلسلة متخصصة تثري عقول قرائنا ومستمعينا.
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-[#6D8751] rounded-2xl p-8 text-white text-center">
                  <div className="text-6xl mb-4">🌳</div>
                  <h4 className="text-2xl font-bold mb-2">سِدرة</h4>
                  <p className="text-lg opacity-90">شجرة المعرفة والثقافة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* قيمنا */}
      <section className="py-16 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">قيمنا</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نؤمن بقيم أساسية تشكل هويتنا وتوجه عملنا في خدمة الثقافة والفكر
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="py-16 bg-gray-50">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">إنجازاتنا</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center hover:scale-110 transition-transform duration-300">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#6D8751] mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* فريق العمل */}
      <section className="py-16 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">فريق سِدرة</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              فريق متخصص من الكتاب والمفكرين والمحررين يعملون لخدمة الثقافة والفكر
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <div 
                key={index} 
                className="bg-white rounded-3xl p-10 text-center hover:shadow-lg transition-all duration-300 border border-gray-100 group animate-fade-in"
              >
                <div className="relative mb-8">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-36 h-36 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300 border-2 border-gray-200 shadow-lg"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{member.name}</h3>
                <p className="text-[#6D8751] font-semibold mb-6 text-lg py-1 px-3 bg-gray-50 rounded-full inline-block">{member.role}</p>
                <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                <div className="w-16 h-1 bg-gray-300 mx-auto mt-6 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* تابعنا عبر المنصات */}
      <section className="py-16 bg-gray-50">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">تابعنا على المنصات الرقمية</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              انضم إلى مجتمع سِدرة الرقمي وكن أول من يعرف عن أحدث المحتوى والأخبار
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 rounded-full ${platform.color} flex items-center justify-center mx-auto mb-4 text-2xl font-bold`}>
                  {platform.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{platform.name}</h3>
                <p className="text-[#6D8751] font-medium mb-2">{platform.handle}</p>
                <p className="text-gray-600 mb-4">{platform.followers} متابع</p>
                <a 
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-[#6D8751] text-white px-4 py-2 rounded-lg hover:bg-[#5A6F42] transition-colors duration-300"
                >
                  تابعنا
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-[#6D8751] text-white">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">رؤيتنا</h2>
            <p className="text-xl leading-relaxed mb-8">
              نسعى لأن نكون المنصة الرائدة في المحتوى الثقافي والفكري في العالم العربي، 
              ونطمح لأن نصل إلى كل عائلة عربية ونثري حياتها بمحتوى هادف ومفيد
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold mb-2">الريادة</h3>
                <p>أن نكون الأفضل في مجال المحتوى الثقافي</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold mb-2">التميز</h3>
                <p>نقدم محتوى عالي الجودة ومفيد</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-2">التواصل</h3>
                <p>نحافظ على علاقة قوية مع جمهورنا</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* معلومات التواصل */}
      <section id="contact" className="py-16 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">معلومات التواصل</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">📧</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">البريد الإلكتروني</h3>
              <p className="text-[#6D8751] font-medium">info@sidra.com</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">الموقع الإلكتروني</h3>
              <p className="text-[#6D8751] font-medium">www.sidra.com</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">شبكات التواصل</h3>
              <p className="text-[#6D8751] font-medium">@sidra_platform</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
