import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { House, SquarePen, Hash, Images, Eraser, Scissors, FileText, Users} from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  {to: '/ai', label: 'Dashboard', Icon:House},
  {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
  {to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash},
  {to: '/ai/generate-images', label: 'Generate Images', Icon: Images},
  {to: '/ai/remove-background', label: 'remove-background', Icon: Eraser},
  {to: '/ai/remove-object', label: 'remove-object', Icon: Scissors},
  {to: '/ai/review-resume', label: 'review-resume', Icon: FileText},
  {to: '/ai/community', label: 'community', Icon: Users}



]

const Sidebar = ({ sidebar }) => {

  const { user, isLoaded } = useUser()

  console.log("USER:", user)

  if (!isLoaded) {
    return (
      <div className="w-64 bg-white border-r border-gray-200">
        Loading...
      </div>
    )
  }

  return (
    <div
      className={`w-64 bg-white border-r border-gray-200 flex flex-col justify-between items-center
      max-sm:absolute max-sm:top-16 max-sm:bottom-0
      ${sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'}
      transition-all duration-300 ease-in-out`}
    >

      <div className="my-7 w-full">

        <img
          src={user?.imageUrl || "https://ui-avatars.com/api/?name=User"}
          alt="User"
          className="w-14 h-14 rounded-full mx-auto object-cover"
        />

        <h1 className="mt-1 text-center">
          {user?.fullName || "User"}
        </h1>
        <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
          {navItems.map(({to, label, Icon})=>(
            <NavLink key={to} to={to} end={to==='/ai'}  className={({isActive})=>`px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : ''}`}>
                {({ isActive })=>(
                  <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`}/>
                  {label}
                  </>
                )}
            </NavLink>
          ))}
        </div>

      </div>

      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-betweer'>
        <div></div>

      </div>

    </div>
  )
}

export default Sidebar