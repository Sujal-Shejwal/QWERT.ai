import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { House, SquarePen } from 'lucide-react'

const navItems = [
  {to: '/ai', label: 'Dashboard', Icon:House},
  {to: '/ai/write-article', label: 'Write Article', Icon: SquarePen},
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

        <h1 className="mt-2 text-center">
          {user?.fullName || "User"}
        </h1>

      </div>

    </div>
  )
}

export default Sidebar