import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'

const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setsidebar] = useState(false)

  return (
    <div className='flex min-h-screen'>

      {/* Left Sidebar */}
      <div className='w-64 border-r border-gray-200 p-4'>

        <img
          src={assets.logo}
          alt="logo"
          className='w-40 cursor-pointer mb-4'
          onClick={() => navigate('/')}
        />

        {
          sidebar ? (
            <X
              className='w-7 h-7 text-gray-700 cursor-pointer mb-4'
              onClick={() => setsidebar(false)}
            />
          ) : (
            <Menu
              className='w-7 h-7 text-gray-700 cursor-pointer mb-4'
              onClick={() => setsidebar(true)}
            />
          )
        }

        {sidebar && (
          <div className='flex flex-col gap-3 mt-4'>

            <button
              onClick={() => navigate('/ai')}
              className='text-left hover:text-primary'
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate('/ai/write-article')}
              className='text-left hover:text-primary'
            >
              Write Article
            </button>

            <button
              onClick={() => navigate('/ai/blog-titles')}
              className='text-left hover:text-primary'
            >
              Blog Titles
            </button>

            <button
              onClick={() => navigate('/ai/generate-images')}
              className='text-left hover:text-primary'
            >
              Generate Images
            </button>

            <button
              onClick={() => navigate('/ai/remove-background')}
              className='text-left hover:text-primary'
            >
              Remove Background
            </button>

            <button
              onClick={() => navigate('/ai/remove-object')}
              className='text-left hover:text-primary'
            >
              Remove Object
            </button>

            <button
              onClick={() => navigate('/ai/review-resume')}
              className='text-left hover:text-primary'
            >
              Review Resume
            </button>

            <button
              onClick={() => navigate('/ai/community')}
              className='text-left hover:text-primary'
            >
              Community
            </button>

          </div>
        )}

      </div>

      {/* Main Content */}
      <div className='flex-1 p-6'>
        <Outlet />
      </div>

    </div>
  )
}

export default Layout