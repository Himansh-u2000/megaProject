import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import logout from '../../store/authSlice'

export default function LogoutBtn() {
  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button
      className='w-full md:w-auto px-4 md:px-6 py-2 text-white font-medium rounded-full bg-red-500/80 hover:bg-red-500 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg border border-white/20 text-sm md:text-base'
      onClick={logoutHandler}
    >
      Logout
    </button>
  )
}