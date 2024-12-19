import React, { useId } from "react"

const Input = React.forwardRef(
  function Input({
    label,
    type = 'text',
    className = '',
    ...props
  }, ref) {
    const id = useId() //We have used this for accessibility purpose
    return (
      <div className="w-full">
        {label && <label
          className="block mb-1"
          htmlFor={id}>
          {label}
        </label>
        }
        <input type={type}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref} //This will give reference to parent Component, From parent also reference will be passed and from here state access will be taken
          {...props}
          id={id}
        />
      </div>
    )
  }
)

export default Input