import React from 'react'

const Logo = ({ className = "h-8" }) => {
  return (
    <div className="flex items-center hover:scale-105 transition-transform duration-300">
      <div className={`${className} flex items-center`}>
        <span className="text-2xl font-bold text-gray-900 tracking-wide">
          سِدرة
        </span>
        <span className="text-2xl font-bold text-[#6D8751] tracking-wide mr-1 rtl:ml-1 rtl:mr-0">
          .
        </span>
      </div>
    </div>
  )
}

export default Logo 