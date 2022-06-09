import { MenuIcon, UserCircleIcon } from '@heroicons/react/solid'
import React from 'react'

function Menu() {
  return (
    <div className="flex space-x-4 justify-end">
    <form className="flex items-center" action="">
      <button className="hidden sm:inline-flex">Logout</button>
    </form>
    <div className="flex items-center space-x-2 border-2 p-2 rounded-full cursor-pointer">
      <MenuIcon className="h-6" />
      <UserCircleIcon className="h-6 text-gray-500" />
    </div>
  </div>
  )
}

export default Menu