import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import About from '../pages/About'
import Articles from '../pages/Articles'
import ArticleDetail from '../pages/ArticleDetail'
import Episodes from '../pages/Episodes'
import Series from '../pages/Series'
import Join from '../pages/Join'
import UnifiedAuth from '../components/auth/UnifiedAuth'
import ArticlesList from '../components/reader/ArticlesList'
import ReaderArticleDetail from '../components/reader/ArticleDetail'
import ReaderDashboard from '../pages/ReaderDashboard'
import Account from '../pages/Account'

const PublicRoutes = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main className="pt-16">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/join" element={<Join />} />
          
          {/* Articles */}
          <Route path="/articles" element={<Articles />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          
          {/* Episodes & Series */}
          <Route path="/episodes" element={<Episodes />} />
          <Route path="/series" element={<Series />} />
          
          {/* Reader Routes */}
          <Route path="/reader/articles" element={<ArticlesList />} />
          <Route path="/reader/article/:articleId" element={<ReaderArticleDetail />} />
          <Route path="/reader-dashboard" element={<ReaderDashboard />} />
          <Route path="/account" element={<Account />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<UnifiedAuth />} />
          <Route path="/register" element={<UnifiedAuth />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default PublicRoutes
