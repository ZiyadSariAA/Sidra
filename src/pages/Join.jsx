import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Join = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // هنا يمكن إضافة منطق إرسال البيانات
    setTimeout(() => {
      setIsSubmitting(false)
      alert('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: '',
        message: ''
      })
    }, 2000)
  }

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
      handle: "سِدره",
      url: "https://youtube.com/@sidra_sa",
      icon: "📺",
      color: "bg-red-600 text-white",
      followers: "10K+"
    },
    {
      name: "لينكد إن",
      handle: "سِدره",
      url: "https://linkedin.com/company/sidra-sa",
      icon: "💼",
      color: "bg-blue-600 text-white",
      followers: "5K+"
    }
  ]

  const opportunities = [
    {
      title: "كاتب محتوى",
      description: "اكتب مقالات ثقافية وفكرية تثري عقول القراء",
      requirements: ["خبرة في الكتابة", "اهتمام بالثقافة والفكر", "إتقان اللغة العربية"],
      icon: "✍️"
    },
    {
      title: "مذيع/مذيعة",
      description: "قدم حلقات إذاعية ثقافية وفكرية متميزة",
      requirements: ["صوت واضح وجذاب", "خبرة في الإذاعة", "ثقافة عامة"],
      icon: "🎙️"
    },
    {
      title: "محرر محتوى",
      description: "حرر وتراجع المحتوى قبل النشر",
      requirements: ["خبرة في التحرير", "دقة في اللغة", "اهتمام بالتفاصيل"],
      icon: "📝"
    },
    {
      title: "مصمم جرافيك",
      description: "صمم المحتوى البصري للمنصة",
      requirements: ["خبرة في التصميم", "إتقان برامج التصميم", "ذوق فني"],
      icon: "🎨"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              انضم إلينا
              <span className="block text-[#6D8751] animate-slide-up">كن جزءاً من رحلة سِدره الثقافية</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-delay">
              نبحث عن مواهب متميزة لانضمامها لفريق سِدره، 
              ساهم معنا في إثراء المشهد الثقافي والفكري في العالم العربي
            </p>
          </div>
        </div>
      </section>

      {/* المنصات الرقمية */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">تابعنا على المنصات الرقمية</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              انضم إلى مجتمع سِدره الرقمي وكن أول من يعرف عن أحدث المحتوى والأخبار
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

      {/* الفرص المتاحة */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">الفرص المتاحة</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف الفرص المتاحة للانضمام لفريق سِدره وساهم في إثراء المحتوى الثقافي
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{opportunity.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{opportunity.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{opportunity.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">المتطلبات:</h4>
                      <ul className="space-y-1">
                        {opportunity.requirements.map((req, idx) => (
                          <li key={idx} className="text-gray-600 flex items-center gap-2">
                            <span className="w-2 h-2 bg-[#6D8751] rounded-full"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* نموذج الانضمام */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">انضم إلينا</h2>
              <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
              <p className="text-xl text-gray-600">
                املأ النموذج أدناه وسنتواصل معك قريباً
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 sm:p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                    الاسم الكامل *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mobile-form-input"
                    placeholder="أدخل اسمك الكامل"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    البريد الإلكتروني *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mobile-form-input"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                    رقم الجوال
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mobile-form-input"
                    placeholder="أدخل رقم جوالك"
                  />
                </div>
                
                <div>
                  <label htmlFor="category" className="block text-gray-700 font-medium mb-2">
                    المجال المطلوب *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="mobile-form-input"
                  >
                    <option value="">اختر المجال</option>
                    <option value="كاتب محتوى">كاتب محتوى</option>
                    <option value="مذيع/مذيعة">مذيع/مذيعة</option>
                    <option value="محرر محتوى">محرر محتوى</option>
                    <option value="مصمم جرافيك">مصمم جرافيك</option>
                    <option value="آخر">آخر</option>
                  </select>
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  رسالتك *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="mobile-form-input resize-none"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="font-semibold px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* معلومات التواصل */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-6">
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
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">الهاتف</h3>
              <p className="text-[#6D8751] font-medium">+966 11 123 4567</p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">العنوان</h3>
              <p className="text-[#6D8751] font-medium">الرياض، المملكة العربية السعودية</p>
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

export default Join
