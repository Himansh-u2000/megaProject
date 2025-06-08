import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { Link } from 'react-router'

function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  if (posts.length === 0) {
    return (
      <div className='w-full py-8 md:py-16 mt-4 md:mt-8 text-center bg-gradient-to-br from-green-50 to-red-50 min-h-[70vh] flex items-center px-4'>
        <Container>
          <div className="flex flex-wrap justify-center">
            <div className="p-4 md:p-8 w-full max-w-2xl">
              <div className="bg-white rounded-2xl md:rounded-3xl shadow-xl p-6 md:p-12 border border-green-100">
                <div className="text-4xl md:text-6xl mb-4 md:mb-6">📝</div>
                <h1 className='text-2xl md:text-4xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-green-600 to-red-600 bg-clip-text text-transparent'>
                  Welcome to Our Blog!
                </h1>
                <p className="text-base md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed">
                  Discover amazing stories and insights. Login to start reading posts from our community.
                </p>
                <Link
                  to="login"
                  className="inline-block px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-green-500 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 text-sm md:text-base">
                  Login to read posts
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-8 md:py-12 min-h-[80vh] bg-gradient-to-br from-green-50 via-green-100 to-red-50 px-4'>
      <Container>
        <div className="mb-8 md:mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-red-600 bg-clip-text text-transparent mb-2 md:mb-4">
            Latest Posts
          </h1>
          <p className="text-base md:text-xl text-gray-600">Discover amazing content from our community</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {posts.map((post) => (
            <div key={post.$id} className="transform hover:scale-105 transition-all duration-200">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home