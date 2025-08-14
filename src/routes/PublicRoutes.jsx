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
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ArticlesList from '../components/reader/ArticlesList'
import ReaderArticleDetail from '../components/reader/ArticleDetail'

const PublicRoutes = () => {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header />
      <main>
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
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default PublicRoutes
