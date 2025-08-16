import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

const Join = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    message: '',
    cv: null
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      cv: e.target.files[0]
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
        message: '',
        cv: null
      })
    }, 2000)
  }

  const opportunities = [
    {
      title: "كاتب محتوى",
      description: "اكتب مقالات ثقافية وفكرية تثري عقول القراء",
      requirements: ["خبرة في الكتابة", "اهتمام بالثقافة والفكر", "إتقان اللغة العربية"],
      icon: "✍️",
      type: "دوام كامل"
    },
    {
      title: "مذيع/مذيعة",
      description: "قدم حلقات إذاعية ثقافية وفكرية متميزة",
      requirements: ["صوت واضح وجذاب", "خبرة في الإذاعة", "ثقافة عامة"],
      icon: "🎙️",
      type: "دوام كامل"
    },
    {
      title: "محرر محتوى",
      description: "حرر وتراجع المحتوى قبل النشر",
      requirements: ["خبرة في التحرير", "دقة في اللغة", "اهتمام بالتفاصيل"],
      icon: "📝",
      type: "دوام كامل"
    },
    {
      title: "مصمم جرافيك",
      description: "صمم المحتوى البصري للمنصة",
      requirements: ["خبرة في التصميم", "إتقان برامج التصميم", "ذوق فني"],
      icon: "🎨",
      type: "دوام كامل"
    },
    {
      title: "مدير وسائل التواصل",
      description: "أدر حساباتنا على منصات التواصل الاجتماعي",
      requirements: ["خبرة في إدارة السوشيال ميديا", "إتقان المحتوى الرقمي", "مهارات تواصل"],
      icon: "📱",
      type: "دوام جزئي"
    },
    {
      title: "مترجم محتوى",
      description: "ترجم المحتوى بين العربية والإنجليزية",
      requirements: ["إتقان اللغتين", "خبرة في الترجمة", "دقة في المعنى"],
      icon: "🌐",
      type: "دوام جزئي"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="responsive-container">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in">
              انضم إلينا
              <span className="block text-[#6D8751] animate-slide-up">كن جزءاً من رحلة سِدرة الثقافية</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed animate-fade-in-delay">
              نبحث عن مواهب متميزة لانضمامها لفريق سِدرة، 
              ساهم معنا في إثراء المشهد الثقافي والفكري في العالم العربي
            </p>
          </div>
        </div>
      </section>

      {/* تعريف بالشركة */}
      <section className="py-16 bg-gray-50">
        <div className="responsive-container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">من نحن</h2>
              <div className="w-24 h-1 bg-[#6D8751] mb-6"></div>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                سِدرة منصة إعلامية عربية رائدة تركز على المحتوى الثقافي والفكري. 
                نؤمن بقوة الكلمة المكتوبة والصوت المسموع في إثراء العقول وتطوير المجتمع.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                منذ تأسيسنا، عملنا على تقديم محتوى عالي الجودة يجمع بين الأصالة والحداثة، 
                ونسعى دائماً لتوسيع فريقنا بمواهب مبدعة ومتحمسة.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-[#6D8751]">50+</div>
                  <div className="text-sm text-gray-600">محتوى شهري</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg">
                  <div className="text-2xl font-bold text-[#6D8751]">100K+</div>
                  <div className="text-sm text-gray-600">متابع نشط</div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">لماذا سِدرة؟</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#6D8751] rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">بيئة عمل إبداعية</h4>
                    <p className="text-gray-600 text-sm">نشجع الإبداع والابتكار في كل ما نقدمه</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#6D8751] rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">تطوير مستمر</h4>
                    <p className="text-gray-600 text-sm">فرص تعليمية وتدريبية مستمرة</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#6D8751] rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">تأثير إيجابي</h4>
                    <p className="text-gray-600 text-sm">ساهم في إثراء الثقافة العربية</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-[#6D8751] rounded-full flex items-center justify-center text-white text-sm">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">مرونة في العمل</h4>
                    <p className="text-gray-600 text-sm">خيارات دوام كامل وجزئي</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* الفرص المتاحة */}
      <section className="py-16 bg-white">
        <div className="responsive-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">الفرص المتاحة</h2>
            <div className="w-24 h-1 bg-[#6D8751] mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اكتشف الفرص المتاحة للانضمام لفريق سِدرة وساهم في إثراء المحتوى الثقافي
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((opportunity, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{opportunity.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{opportunity.title}</h3>
                      <span className="text-xs bg-[#6D8751] text-white px-2 py-1 rounded-full">
                        {opportunity.type}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">{opportunity.description}</p>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">المتطلبات:</h4>
                      <ul className="space-y-1">
                        {opportunity.requirements.map((req, idx) => (
                          <li key={idx} className="text-gray-600 flex items-center gap-2 text-sm">
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
        <div className="responsive-container">
          <div className="max-w-3xl mx-auto">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-colors"
                  >
                    <option value="">اختر المجال</option>
                    <option value="كاتب محتوى">كاتب محتوى</option>
                    <option value="مذيع/مذيعة">مذيع/مذيعة</option>
                    <option value="محرر محتوى">محرر محتوى</option>
                    <option value="مصمم جرافيك">مصمم جرافيك</option>
                    <option value="مدير وسائل التواصل">مدير وسائل التواصل</option>
                    <option value="مترجم محتوى">مترجم محتوى</option>
                    <option value="آخر">آخر</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="cv" className="block text-gray-700 font-medium mb-2">
                  السيرة الذاتية (PDF)
                </label>
                <input
                  type="file"
                  id="cv"
                  name="cv"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#6D8751] file:text-white hover:file:bg-[#5A6F42]"
                />
                <p className="text-sm text-gray-500 mt-1">أقصى حجم: 5 ميجابايت</p>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#6D8751] focus:border-transparent transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا... تحدث عن خبراتك ودوافعك للانضمام لفريق سِدرة"
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
    </div>
  )
}

export default Join
