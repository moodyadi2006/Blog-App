

function Button({ children,
  type = 'button',
  bgColor = 'bg-blue-500',
  textColor = 'text-white',
  className = '',
  ...props //We have also given properties assigned by the user and spreaded them and many properties can be assigned by the user
}) {
  return (
    <button className={`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor} `}  {...props}> 
      {children}
    </button>
  )
}

export default Button