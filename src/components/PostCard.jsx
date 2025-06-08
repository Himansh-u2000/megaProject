import React from 'react'
import { Link } from 'react-router'
import appwriteService from '../appwrite/config'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="block group">
      <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden h-full">
        <div className="relative mb-4 md:mb-6 rounded-xl md:rounded-2xl overflow-hidden">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className='w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300'
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="space-y-2 md:space-y-3">
          <h2 className='text-lg md:text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-200 line-clamp-2 leading-tight'>
            {title}
          </h2>
          <div className="flex items-center text-green-500 font-medium group-hover:text-red-600 transition-colors duration-200">
            <span className="text-sm md:text-base">Read more</span>
            <svg className="ml-2 w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default PostCard