import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'

const Navbar = () => {

  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  return (
<div className='sticky top-0 bg-white/80 backdrop-blur-md flex items-center justify-between h-16 px-4 sm:px-8 lg:px-20 xl:px-32'>
      <img
        src={assets.logo}
        alt="logo"
        className='w-28 sm:w-36 cursor-pointer'
        onClick={() => navigate('/')}
      />

      {
        user ? (
          <UserButton />
        ) : (
          <button
            onClick={openSignIn}
            className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-6 py-2'
          >
            Get Started
            <ArrowRight className='w-4 h-4' />
          </button>
        )
      }

    </div>
  )
}

export default Navbar