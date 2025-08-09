import React from 'react'

const Logo = ({ className = "h-8" }) => {
  return (
    <div className="flex items-center hover:scale-105 transition-transform duration-300">
      <img 
        src="/assets/logo.svg" 
        alt="سِدره" 
        className={`${className} w-auto object-contain`}
        onError={(e) => {
          console.error('Logo failed to load:', e.target.src);
          // Fallback to favicon if logo fails
          e.target.src = '/assets/favicon.svg';
        }}
        onLoad={() => {
          console.log('Logo loaded successfully');
        }}
      />
    </div>
  )
}

export default Logo 