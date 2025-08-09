import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Articles from '../pages/Articles'
import ArticleDetail from '../pages/ArticleDetail'
import Series from '../pages/Series'
import Episodes from '../pages/Episodes'
import About from '../pages/About'
import Join from '../pages/Join'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<ArticleDetail />} />
      <Route path="/series" element={<Series />} />
      <Route path="/episodes" element={<Episodes />} />
      <Route path="/about" element={<About />} />
      <Route path="/join" element={<Join />} />
    </Routes>
  )
}

export default PublicRoutes
