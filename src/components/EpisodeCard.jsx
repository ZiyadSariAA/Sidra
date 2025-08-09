import React from 'react'
import PlayIcon from '/assets/play.svg'

const EpisodeCard = ({ episode }) => {
  return (
    <article className="bg-white rounded-lg border border-gray-100 hover:shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* صورة الحلقة */}
      <div className="aspect-video bg-gray-200 rounded-t-lg overflow-hidden relative">
        {episode.image && (
          <img 
            src={episode.image} 
            alt={episode.title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        )}
        
        {/* زر التشغيل */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button className="bg-[#6D8751] bg-opacity-90 hover:bg-opacity-100 text-white rounded-full p-3 transition-all duration-300 transform hover:scale-110">
            <img src={PlayIcon} alt="تشغيل" className="w-6 h-6" />
          </button>
        </div>
        
        {/* مدة الحلقة */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {episode.duration}
        </div>
      </div>
      
      {/* محتوى الحلقة */}
      <div className="p-6">
        {/* العنوان */}
        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-tight hover:text-[#6D8751] transition-colors duration-300">
          {episode.title}
        </h3>
        
        {/* الوصف */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 hover:text-gray-800 transition-colors duration-300">
          {episode.excerpt}
        </p>
        
        {/* معلومات المذيع والتاريخ */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 space-x-reverse">
            {episode.hostImage && (
              <img 
                src={episode.hostImage} 
                alt={episode.host}
                className="w-8 h-8 rounded-full hover:scale-110 transition-transform duration-200"
              />
            )}
            <span className="text-sm text-gray-700 hover:text-[#6D8751] transition-colors duration-300">{episode.host}</span>
          </div>
          
          <div className="text-xs text-gray-500 hover:text-[#6D8751] transition-colors duration-300">
            {episode.date}
          </div>
        </div>
      </div>
    </article>
  )
}

export default EpisodeCard 