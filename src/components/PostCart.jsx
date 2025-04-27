import React from 'react'
import { Link } from 'react-router'
import appwriteService from '../appwrite/config'

function PostCart({
  $id,
  title, 
  featuredImage
}) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className='rounded-xl'/>
          <h2 className='text-xl font-bold'>{title}</h2>
        </div>
      </div>
    </Link>
  )
}

export default PostCart 