import React from 'react'

const LoadingSpinner = ({ size = 'md', text = 'جاري التحميل...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  return (
    <div className={`flex flex-col items-center justify-center p-6 ${className}`}>
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200 border-t-[#6D8751] mb-3`}></div>
      {text && (
        <p className={`text-gray-600 font-arabic ${textSizes[size]} text-center`}>
          {text}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner
