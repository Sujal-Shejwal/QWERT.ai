import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn , useUser } from '@clerk/clerk-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setsidebar] = useState(false)
  const {user} = useUser()

  return user ? (
    <div className='min-h-screen flex flex-col'>

      {/* Top Navbar */}
      <div className='h-16 border-b border-gray-200 px-4 flex items-center justify-between bg-white'>

        <img className='cursor-pointer w-32 sm:w-44'
          src={assets.logo}
          alt="logo"
          className='w-40 cursor-pointer'
          onClick={() => navigate('/')}
        />

        {
          sidebar ? (
            <X
              className='w-6 h-6 text-gray-600 cursor-pointer sm:hidden'
              onClick={() => setsidebar(false)}
            />
          ) : (
            <Menu
              className='w-7 h-7 text-gray-600 cursor-pointer sm:hidden'
              onClick={() => setsidebar(true)}
            />
          )
        }

      </div>

      {/* Main Area */}
      <div className='flex flex-1'>

        <Sidebar
          sidebar={sidebar}
          setSidebar={setsidebar}
        />

        <div className='flex-1 bg-[#F4F7FB] p-6'>
          <Outlet />
        </div>

      </div>

    </div>
  ) :(
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout