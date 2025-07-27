import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { Context } from '../Context'

export const Header = () => {
  const {isLoggedIn} = useContext(Context);
  return (
    <div className='pt-2 p-2 bg-[#ffbebe4e]'>
        <div className='flex justify-between items-center mx-10'>
            <div className='text-3xl'>D-Collab</div>
            {!isLoggedIn && <div className='flex gap-5'>
                <div className='p-2 py-3 rounded-2xl bg-red-500 w-20 text-center text-white'><Link to={'/user/login'}>Login</Link></div>
                <div className='p-2 py-3 rounded-2xl bg-red-500 w-20 text-center text-white'><Link to={'/user/register'}>Register</Link></div>
            </div>}
        </div>
    </div>
  )
}
