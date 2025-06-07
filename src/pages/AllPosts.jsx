import React, { useState, useEffect } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'

function AllPosts() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    }).catch((error) => {
      console.log('Error fetching posts: ', error)
    })
  }, [])
  return (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap min-h-[80vh]">
          {posts.map((post) => (
            <div
              className="p-2 w-1/4"
              key={post.$id}
            >
              <PostCard
                key={post.$id}
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

export default AllPosts