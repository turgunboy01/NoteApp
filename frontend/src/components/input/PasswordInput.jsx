import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
const PasswordInput = ({ value, onChange, placeholder }) => {
    
    const [isShowPassword, setIsShowPassword] = useState(false)

    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
    return (
        <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
            <input value={value} onChange={onChange} type={isShowPassword ? 'text' : 'password'} className='w-full text-sm bg-transparent mr-3 py-3 outline-none rounded' placeholder={placeholder || 'Password'} />
            {isShowPassword ?

                <FaRegEye onClick={() => toggleShowPassword()} size={22} className='text-primary cursor-pointer' />
                : <FaRegEyeSlash onClick={() => toggleShowPassword()} size={22} className='text-slate-400 cursor-pointer' />
            }
        </div>
    )
}

export default PasswordInput