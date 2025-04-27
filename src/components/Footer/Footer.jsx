import React from 'react'
import Logo from '../Logo'
import { NavLink } from 'react-router-dom'
// import { a } from 'react-router'

function Footer() {
  return (
    <div className="footer bg-gray-800 text-white">
      <div className="footer-top flex flex-col items-center py-8">
        <Logo />
        <nav className="footer-nav mt-4">
          <ul className="flex flex-wrap justify-center gap-4">
            <li><NavLink to="/about" className="hover:text-gray-400">About Us</NavLink></li>
            <li><NavLink to="/services" className="hover:text-gray-400">Services</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-gray-400">Contact</NavLink></li>
            <li><NavLink to="/privacy-policy" className="hover:text-gray-400">Privacy Policy</NavLink></li>
            <li><NavLink to="/terms" className="hover:text-gray-400">Terms of Service</NavLink></li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom border-t border-gray-700 py-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        <div className="social-links flex justify-center gap-4 mt-2">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">LinkedIn</a>
        </div>
      </div>
    </div>
  )
}

export default Footer