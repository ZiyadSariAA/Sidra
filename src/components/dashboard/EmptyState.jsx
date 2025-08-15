import React from 'react'

const EmptyState = ({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  onAction, 
  showAction = true,
  className = '' 
}) => {
  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
        <span className="text-4xl">{icon}</span>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2 font-arabic">
        {title}
      </h3>
      
      <p className="text-gray-500 font-arabic mb-6 max-w-md mx-auto">
        {description}
      </p>
      
      {showAction && actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 text-sm font-medium text-white bg-[#6D8751] hover:bg-[#5a6f42] rounded-xl transition-all duration-300 font-arabic shadow-sm hover:shadow-md hover:scale-105"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export default EmptyState
