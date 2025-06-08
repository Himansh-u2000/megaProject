import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login, logout } from '../store/authSlice'
import authService from '../appwrite/auth'

function AppLayout({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      try {
        const userData = await authService.getCurrentuser()
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      } catch (error) {
        dispatch(logout())
      }
    })()
  }, [dispatch])

  return children
}

export default AppLayout
