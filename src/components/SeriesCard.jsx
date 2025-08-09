import React from 'react'

const SeriesCard = ({ series }) => {
  return (
    <article className="bg-white rounded-lg border border-gray-100 hover:shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* صورة السلسلة */}
      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
        {series.image && (
          <img 
            src={series.image} 
            alt={series.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        )}
        
        {/* عدد الحلقات */}
        <div className="absolute top-2 right-2 bg-[#6D8751] text-white text-xs px-2 py-1 rounded">
          {series.episodesCount} حلقة
        </div>
      </div>
      
      {/* محتوى السلسلة */}
      <div className="p-6">
        {/* العنوان */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight hover:text-[#6D8751] transition-colors duration-300">
          {series.title}
        </h3>
        
        {/* الوصف */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 hover:text-gray-800 transition-colors duration-300">
          {series.excerpt}
        </p>
        
        {/* معلومات الكاتب والتاريخ */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            {series.authorImage && (
              <img 
                src={series.authorImage} 
                alt={series.author}
                className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-200"
              />
            )}
            <span className="text-sm text-gray-700 hover:text-[#6D8751] transition-colors duration-300">{series.author}</span>
          </div>
          
          <div className="text-xs text-gray-500 hover:text-[#6D8751] transition-colors duration-300">
            {series.date}
          </div>
        </div>
      </div>
    </article>
  )
}

export default SeriesCard 