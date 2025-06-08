import React from 'react'
import Logo from '../Logo'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div className="footer bg-green-600 text-white">
      <div className="footer-top flex flex-col items-center py-8 md:py-12 px-4">
        <div className="hover:scale-105 transition-transform duration-200">
          <Logo />
        </div>
        <nav className="footer-nav mt-4 md:mt-6 w-full">
          <ul className="flex flex-wrap justify-center gap-3 md:gap-6 text-center">
            <li>
              <NavLink
                to="/about"
                className="text-sm md:text-lg font-medium hover:text-yellow-300 transition-colors duration-200 hover:scale-105 inline-block px-2 py-1"
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                className="text-sm md:text-lg font-medium hover:text-yellow-300 transition-colors duration-200 hover:scale-105 inline-block px-2 py-1"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className="text-sm md:text-lg font-medium hover:text-yellow-300 transition-colors duration-200 hover:scale-105 inline-block px-2 py-1"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/privacy-policy"
                className="text-sm md:text-lg font-medium hover:text-yellow-300 transition-colors duration-200 hover:scale-105 inline-block px-2 py-1"
              >
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/terms"
                className="text-sm md:text-lg font-medium hover:text-yellow-300 transition-colors duration-200 hover:scale-105 inline-block px-2 py-1"
              >
                Terms of Service
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom border-t border-white/20 py-4 md:py-6 text-center px-4">
        <p className="text-sm md:text-lg mb-2 md:mb-4">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="social-links flex flex-wrap justify-center gap-3 md:gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-lg font-medium hover:text-blue-600 transition-all duration-200 hover:scale-110 px-2 md:px-3 py-1 rounded-full"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-lg font-medium hover:text-cyan-600 transition-all duration-200 hover:scale-110 px-2 md:px-3 py-1 rounded-full"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-lg font-medium hover:text-pink-600 transition-all duration-200 hover:scale-110 px-2 md:px-3 py-1 rounded-full"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm md:text-lg font-medium hover:text-blue-700 transition-all duration-200 hover:scale-110 px-2 md:px-3 py-1 rounded-full"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer