import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router'

function EditPost() {
  const [post, setPost] = useState(null)
  const slug = useParams()
  const navigate = useNavigate()

  console.log("post: ", slug)
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug.slug).then((post) => {
        if (post) {
          setPost(post)
        }
      })
    } else {
      navigate('/')
    }
  }, [slug, navigate])
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm
          post={post}
          onSubmit={(post) => {
            appwriteService.updatePost(post).then(() => {
              navigate(`/post/${post.$id}`)
            }).catch((error) => {
              console.error('Error updating post: ', error)
            })
          }}
        />
      </Container>
    </div>
  ) : null
}

export default EditPost