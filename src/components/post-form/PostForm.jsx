import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from '../index'
import { useCallback, useEffect } from "react";
import appwriteService from '../../appwrite/config'
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import React, { useCallback } from 'react'

export default function PostForm({
  post
}) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slut: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  const navigate = useNavigate()
  const userData = useSelector(state => state.user.userData)

  const submit = async (data) => {
    if (post) {
      const file = data.images[0] ? appwriteService.uploadFile(data.image[0]) : null

      if (file) {
        appwriteService.deleteFile(post.featuredImage)
      }
      const dbPost = await appwriteService.updatePost(
        post.$id, {
          ...data,
          featuredImage: file ? file.$id : undefined
        }
      )

      if(dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    }else{
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : undefined

      if(file) {
        const fileId = file.$id 
        data.featuredImage = fileId
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,

        })
        if(dbPost){
          navigate(`post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if(value && typeof value === 'string') return value
      .trim()
      .toLowerCase()
      .replace(/^[a-zA-Z\d\s]+/g, "-")
      .replace(/\s/g, '-')

    return ''
  }, [])

  useEffect(()=>{
    const subscription = watch((value, {name}) => {
      if(name === 'title'){
        setValue('slug', slugTransform(value.title, {shouldValidate: true}))
      }
    })

    return () => {
      subscription.unsubcribe()
    }
  },[watch, slugTransform, setValue])
  return (
    <div>PostForm</div>
  )
}
