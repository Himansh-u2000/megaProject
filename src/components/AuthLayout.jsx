import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(true)
  const authStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    // Wait until Redux is loaded (i.e., hydration complete)
    const checkAuth = () => {
      if (authentication && !authStatus) {
        navigate('/login')
      } else if (!authentication && authStatus) {
        navigate('/')
      }
      setLoader(false)
    }

    checkAuth()
  }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
