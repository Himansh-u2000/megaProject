import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ]

  return (
    <header className='py-3 md:py-4 shadow-lg bg-green-600'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='flex-shrink-0'>
            <Link to='/' className='hover:scale-105 transition-transform duration-200'>
              <Logo width='60px' />
            </Link>
          </div>
          <ul className='hidden md:flex items-center space-x-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-4 lg:px-6 py-2 text-white font-medium rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-105 hover:shadow-lg text-sm lg:text-base'
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              className='text-white p-2 rounded-lg bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200'
              onClick={() => {
                const menu = document.getElementById('mobile-menu');
                menu.classList.toggle('hidden');
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div id="mobile-menu" className='hidden md:hidden mt-4 pb-2'>
          <ul className='flex flex-col space-y-2'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      document.getElementById('mobile-menu').classList.add('hidden');
                    }}
                    className='w-full text-left px-4 py-3 text-white font-medium rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-all duration-200'
                  >{item.name}</button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className='pt-2'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </div>
      </Container>
    </header>
  )
}

export default Header