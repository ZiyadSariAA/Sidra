import React from 'react'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:scale-105 active:scale-95'
  
  const variants = {
    primary: 'border-2 border-[#6D8751] text-[#6D8751] hover:bg-[#6D8751] hover:text-white focus:ring-[#6D8751] shadow-sm',
    secondary: 'border-2 border-[#6D8751] text-[#6D8751] hover:bg-[#6D8751] hover:text-white focus:ring-[#6D8751] shadow-sm',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:border-[#6D8751] hover:text-[#6D8751] focus:ring-[#6D8751]',
    ghost: 'text-[#6D8751] hover:text-[#5A6F42] hover:bg-opacity-10 focus:ring-[#6D8751]'
  }
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button 