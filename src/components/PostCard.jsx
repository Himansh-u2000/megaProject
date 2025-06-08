import React from 'react'
import { Link } from 'react-router'
import appwriteService from '../appwrite/config'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="relative bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full">
        {/* Image Section */}
        <div className="relative h-64 md:h-72 overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Content overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <h2 className='text-lg md:text-xl font-bold mb-2 md:mb-3 line-clamp-2 leading-tight group-hover:text-green-300 transition-colors duration-300'>
              {title}
            </h2>

            <div className="flex items-center text-green-400 font-medium group-hover:text-green-300 transition-all duration-300">
              <span className="text-sm md:text-base">Read more</span>
              <svg className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* Shimmer effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out"></div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard