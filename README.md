### شرح سريع للمشروع “سِدره”
- **ماهو المشروع**: منصة إعلامية رقمية عربية لعرض المقالات والحلقات والبرامج، بواجهة عربية يمين-يسار وهوية هادئة وأنيقة.
- **التقنيات**: React + Vite + Tailwind CSS، بدون TypeScript وبحد أدنى من الاعتمادات .
- **البنية**:
  - **الصفحات**: `src/pages/` فيها `Home`, `Articles`, `ArticleDetail`, `Series`, `Episodes`, `About`, `Join`.
  - **المكوّنات**: `src/components/` مثل `Header`, `Footer`, `ArticleCard`, `EpisodeCard`, `SeriesCard`, `Button`, `ScrollToTop`, `Logo`.
  - **التوجيه**: `src/routes/` فيها `PublicRoutes.jsx` للموقع العام و`DashboardRoutes.jsx` للوحة التحكم.
  - **لوحات التحكم بحسب الدور**: `src/dashboard/` (`AdminDashboard`, `AuthorDashboard`, `EditorDashboard`, `EditorInChiefDashboard`, `OwnerDashboard`, و`Unauthorized`).
  - **أدوات**: `src/utils/auth.js` (وظائف مصادقة بسيطة)، `src/utils/images.js`.
- **الهوية والتصميم**: حديثة/عربية، هادئة، مساحات بيضاء واضحة، زوايا مستديرة خفيفة، ظلال ناعمة، خط عربي مستدير سهل القراءة، وإنجليزي بسيط عند الحاجة .

### لوحة ألوان مختصرة (أرقام دقيقة)
- **Primary (أساسي)**: `#6D8751` — rgb(109, 135, 81)
- **Primary/Dark (أغمق)**: `#4F6340` — rgb(79, 99, 64)
- **Primary/Light (أفتح)**: `#94AE78` — rgb(148, 174, 120)
- **Accent (رملي/ذهبي هادئ)**: `#C9B897` — rgb(201, 184, 151)
- **Background (خلفية عامة)**: `#F7F6F2` — rgb(247, 246, 242)
- **Surface (سطح البطاقات)**: `#FFFFFF` — rgb(255, 255, 255)
- **Text (نصي أساسي)**: `#1B1D17` — rgb(27, 29, 23)
- **Text/Muted (نصي ثانوي)**: `#6E756B` — rgb(110, 117, 107)

### استخدام سريع
- **الواجهة** يمين-يسار، اللون الأساسي للأزرار والعناصر البارزة، الخلفيات فاتحة، النص داكن واضح. حافظ على هدوء الألوان ومساحة بيضاء مريحة.

- قدّمت وصف مختصر للهيكل والهوية مع لوحة ألوان دقيقة (Hex + RGB).

# سِدره - منصة الثقافة 

## 📖 وصف الموقع

**سِدره** هي منصة إعلامية  تركز على المحتوى الثقافي والفكري. نقدم مقالات وحلقات وسلسلة تثري الفكر والثقافة في المملكة العربية السعودية والعالم العربي.

### ✨ المميزات الرئيسية

- **مقالات ثقافية**: محتوى متنوع يغطي الثقافة والفكر والأدب
- **حلقات إذاعية**: برامج صوتية تثري المعرفة
- **سلسلة متخصصة**: مجموعات منظمة من المحتوى حول مواضيع محددة
- **تصميم عصري**: واجهة أنيقة باللون الأخضر السعودي (#6D8751)
- **دعم كامل للعربية**: تصميم من اليمين لليسار مع خطوط عربية جميلة

### 🛠️ التقنيات المستخدمة

- **React 19** مع Vite
- **Tailwind CSS** للتصميم
- **خطوط Noto Sans Arabic** للعربية
- **أنيميشن متقدم** للتفاعل

---

# Sidra -  Cultural & Intellectual Platform

## 📖 Website Description

**Sidra** is a  media platform focused on cultural and intellectual content. We provide articles, episodes, and series that enrich thought and culture in Saudi Arabia and the Arab world.

### ✨ Key Features

- **Cultural Articles**: Diverse content covering culture, thought, and literature
- **Radio Episodes**: Audio programs that enrich knowledge
- **Specialized Series**: Organized content groups around specific topics
- **Modern Design**: Elegant interface with Saudi green color (#6D8751)
- **Full Arabic Support**: Right-to-left design with beautiful Arabic fonts

### 🛠️ Technologies Used

- **React 19** with Vite
- **Tailwind CSS** for design
- **Noto Sans Arabic** fonts for Arabic
- **Advanced animations** for interaction

## 🚀 Getting Started

```bash
npm install
npm run dev
```

