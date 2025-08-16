import React from 'react'
import { Link } from 'react-router-dom'
import { SiLinkedin, SiYoutube, SiInstagram, SiX } from "react-icons/si"
import { LuSparkles, LuTarget, LuHandshake, LuSprout, LuMail, LuGlobe, LuSmartphone } from "react-icons/lu"
import Button from '../components/Button'

const About = () => {
  const values = [
    {
      icon: LuSprout,
      title: "النمو الفكري",
      description: "نسعى لتوفير محتوى يثري العقل ويفتح آفاقاً جديدة للفكر والثقافة"
    },
    {
      icon: LuHandshake,
      title: "التواصل المجتمعي",
      description: "نربط المفكرين والكتاب بالقراء لنخلق حواراً ثقافياً مستمراً"
    },
    {
      icon: LuTarget,
      title: "الأصالة والحداثة",
      description: "نحترم تراثنا الثقافي ونواكب العصر بفكر متجدد ومحتوى عصري"
    },
    {
      icon: LuSparkles,
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

  const brandIcon = {
    linkedin: SiLinkedin,
    youtube: SiYoutube,
    instagram: SiInstagram,
    x: SiX,
  }

  const socialPlatforms = [
    {
      name: "X (تويتر)",
      handle: "@sidra_sa",
      url: "https://x.com/sidra_sa",
      platformKey: "x",
      followers: "25K+"
    },
    {
      name: "إنستغرام",
      handle: "@sidra_sa",
      url: "https://instagram.com/sidra_sa",
      platformKey: "instagram",
      followers: "15K+"
    },
    {
      name: "يوتيوب",
      handle: "سِدرة",
      url: "https://youtube.com/@sidra_sa",
      platformKey: "youtube",
      followers: "10K+"
    },
    {
      name: "لينكد إن",
      handle: "سِدرة",
      url: "https://linkedin.com/company/sidra_sa",
      platformKey: "linkedin",
      followers: "5K+"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* 1. Intro / Hero Section */}
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

      {/* 2. Vision Section */}
      <section className="py-16 bg-gray-50">
        <div className="responsive-container">
            <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">رؤيتنا</h2>
              <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              نسعى لأن نكون المنصة الرائدة في المحتوى الثقافي والفكري في العالم العربي، 
              ونطمح لأن نصل إلى كل عائلة عربية ونثري حياتها بمحتوى هادف ومفيد
                </p>
              </div>
              
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#6D8751] rounded-full flex items-center justify-center mx-auto mb-6">
                <LuTarget className="w-8 h-8 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">الريادة</h3>
              <p className="text-gray-600 leading-relaxed">أن نكون الأفضل في مجال المحتوى الثقافي والفكري</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#6D8751] rounded-full flex items-center justify-center mx-auto mb-6">
                <LuSparkles className="w-8 h-8 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">التميز</h3>
              <p className="text-gray-600 leading-relaxed">نقدم محتوى عالي الجودة ومفيد يلبي احتياجات القارئ</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#6D8751] rounded-full flex items-center justify-center mx-auto mb-6">
                <LuHandshake className="w-8 h-8 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">التواصل</h3>
              <p className="text-gray-600 leading-relaxed">نحافظ على علاقة قوية ومستمرة مع جمهورنا</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission Section */}
      <section className="py-16 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">مهمتنا</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نؤمن بدورنا الأساسي في إثراء المشهد الثقافي والفكري في العالم العربي
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-[#6D8751] rounded-full flex items-center justify-center mx-auto mb-6">
                  <LuTarget className="w-8 h-8 text-white" aria-hidden />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">هدفنا الأساسي</h3>
              </div>
              <div className="space-y-6 text-right">
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-2 h-2 bg-[#6D8751] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">تقديم محتوى ثقافي وفكري عالي الجودة يلبي احتياجات القارئ العربي المعاصر</p>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-2 h-2 bg-[#6D8751] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">بناء جسر تواصل بين المفكرين والكتاب والقراء لخلق حوار ثقافي مستمر</p>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-2 h-2 bg-[#6D8751] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">الحفاظ على الهوية العربية الأصيلة مع مواكبة العصر والتطورات الحديثة</p>
                </div>
                <div className="flex items-start space-x-4 space-x-reverse">
                  <div className="w-2 h-2 bg-[#6D8751] rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-lg text-gray-700">توفير منصة رقمية متطورة تصل إلى أكبر عدد ممكن من القراء العرب</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">قيمنا</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نؤمن بقيم أساسية تشكل هويتنا وتوجه عملنا في خدمة الثقافة والفكر
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Icon className="w-12 h-12 text-[#6D8751] mx-auto mb-4" aria-hidden />
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. تابعنا على المنصات الرقمية */}
      <section className="py-16 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">تابعنا على المنصات الرقمية</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              انضم إلى مجتمع سِدرة الرقمي وكن أول من يعرف عن أحدث المحتوى والأخبار
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => {
              const Icon = brandIcon[platform.platformKey];
              const iconColor = platform.platformKey === 'linkedin' ? 'text-[#0A66C2]' :
                               platform.platformKey === 'youtube' ? 'text-[#FF0000]' :
                               platform.platformKey === 'instagram' ? 'text-[#E4405F]' :
                               'text-black';
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className={`w-12 h-12 ${iconColor}`} aria-hidden />
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
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. معلومات التواصل */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">معلومات التواصل</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              نحن متاحون للتواصل معكم عبر مختلف القنوات
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#6D8751] rounded-full flex items-center justify-center mx-auto mb-6">
                <LuMail className="w-8 h-8 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">البريد الإلكتروني</h3>
              <p className="text-[#6D8751] font-medium text-lg">info@sidra.com</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#6D8751] rounded-full flex items-center justify-center mx-auto mb-6">
                <LuGlobe className="w-8 h-8 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">الموقع الإلكتروني</h3>
              <p className="text-[#6D8751] font-medium text-lg">www.sidra.com</p>
            </div>
            
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-[#6D8751] rounded-full flex items-center justify-center mx-auto mb-6">
                <LuSmartphone className="w-8 h-8 text-white" aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">شبكات التواصل</h3>
              <p className="text-[#6D8751] font-medium text-lg">@sidra_platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Story / Background */}
      <section className="py-16 bg-white">
        <div className="responsive-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">قصة سِدرة – من نحن؟</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
          </div>
          
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">من نحن؟</h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  سِدرة منصة إعلامية عربية في طور التأسيس عام 2025. بدأت فكرتنا من شغف بتقديم محتوى أصيل يعكس الهوية السعودية والعربية بروح حديثة.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  نسعى أن نكون مساحة ناشئة تجمع المقالات، الصوتيات، والمرئيات تدريجيًا مع التركيز على الجودة والعمق. اسم "سِدرة" مستوحى من الشجرة العربية الأصيلة، رمز البدايات والجذور القوية التي تنمو مع الوقت.
                </p>
              </div>
              
              <div className="relative">
                <div className="bg-[#6D8751] rounded-2xl p-8 text-white text-center">
                  <LuSprout className="w-20 h-20 mx-auto mb-4 text-white" aria-hidden />
                  <h4 className="text-2xl font-bold mb-2">سِدرة</h4>
                  <p className="text-lg opacity-90">شجرة المعرفة والثقافة</p>
                </div>
              </div>
              </div>
          </div>
        </div>
      </section>

      {/* 8. Team Section */}
      <section className="py-16 bg-gray-50">
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
    </div>
  )
}

export default About
