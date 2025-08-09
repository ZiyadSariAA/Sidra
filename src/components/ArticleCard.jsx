import React from 'react'
import { Link } from 'react-router-dom'

const ArticleCard = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="block h-full">
      <article className="bg-white rounded-lg border border-gray-100 hover:shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
        {/* صورة المقالة */}
        <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden flex-shrink-0">
          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          )}
        </div>
        
        {/* محتوى المقالة */}
        <div className="p-6 flex-1 flex flex-col">
          {/* العنوان */}
          <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight hover:text-[#6D8751] transition-colors duration-300 line-clamp-2">
            {article.title}
          </h3>
          
          {/* الوصف */}
          <p className="text-gray-600 text-sm leading-relaxed mb-4 hover:text-gray-800 transition-colors duration-300 flex-1 line-clamp-3">
            {article.excerpt}
          </p>
          
          {/* معلومات الكاتب والتاريخ */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-3 space-x-reverse">
              {article.authorImage && (
                <img 
                  src={article.authorImage} 
                  alt={article.author}
                  className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-200"
                />
              )}
              <span className="text-sm text-gray-700 hover:text-[#6D8751] transition-colors duration-300">{article.author}</span>
            </div>
            
            <div className="text-xs text-gray-500 hover:text-[#6D8751] transition-colors duration-300">
              {article.date}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default ArticleCard 