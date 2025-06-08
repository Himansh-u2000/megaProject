import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from '../index'
import { useCallback, useEffect } from "react";
import appwriteService from '../../appwrite/config'
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export default function PostForm({
  post
}) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.slug || '',
      content: post?.content || '',
      status: post?.status || 'active'
    }
  })

  const navigate = useNavigate()
  const userData = useSelector(state => state.user?.userData)
  console.log("UserData", userData)

  const submit = async (data) => {
    if (post) {
      const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : null

      if (file) {
        appwriteService.deleteFile(post.featuredImage)
      }
      const dbPost = await appwriteService.updatePost(
        post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined
      }
      )

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`)
      }
    } else {
      const file = data.image?.[0] ? await appwriteService.uploadFile(data.image[0]) : undefined

      if (file) {
        const fileId = file.$id
        data.featuredImage = fileId
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData?.$id,
        })
        if (dbPost) {
          alert("Post Created Successfully")
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === 'string') {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')    // Remove special characters
        .replace(/\s+/g, '-')            // Replace spaces with hyphens
        .replace(/-+/g, '-')             // Collapse multiple hyphens
        .replace(/^-+|-+$/g, '');        // Trim hyphens from start/end
    }

    return '';
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title), { shouldValidate: true })
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, slugTransform, setValue])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            {post ? 'Edit Your Post' : 'Create New Post'}
          </h1>
          <p className="text-green-600 text-lg">
            {post ? 'Update your existing content' : 'Share your thoughts with the world'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
          <form onSubmit={handleSubmit(submit)} className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
                    Post Details
                  </h2>

                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        label="Title"
                        placeholder="Enter an engaging title..."
                        className="w-full bg-white/70 border-green-200 focus:border-green-400 focus:ring focus:ring-green-200 rounded-lg transition-all duration-200"
                        {...register("title", { required: true })}
                      />
                    </div>

                    <div className="relative">
                      <Input
                        label="Slug"
                        placeholder="url-friendly-slug"
                        className="w-full bg-white/70 border-green-200 focus:border-green-400 focus:ring focus:ring-green-200 rounded-lg transition-all duration-200"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                          setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                      />
                      <div className="text-xs text-green-600 mt-1">
                        Auto-generated from title or customize it
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
                    Content
                  </h2>
                  <div className="bg-white/70 rounded-lg overflow-hidden border border-green-200">
                    <RTE
                      label="Write your content"
                      name="content"
                      control={control}
                      defaultValue={getValues("content")}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Media & Settings */}
              <div className="space-y-6">
                {/* Featured Image Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
                    Featured Image
                  </h2>

                  <div className="space-y-4">
                    <div className="relative">
                      <Input
                        label="Upload Image"
                        type="file"
                        className="w-full bg-white/70 border-green-200 focus:border-green-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-green-100 file:text-green-700 hover:file:bg-green-200 transition-all duration-200"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                      />
                    </div>

                    {post && (
                      <div className="relative group">
                        <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100 border border-green-200">
                          <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/10 rounded-lg transition-colors duration-300"></div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Action Section */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-2 h-6 bg-green-500 rounded-full mr-3"></div>
                    Publish Settings
                  </h2>

                  <div className="space-y-4">
                    <Select
                      options={["active", "inactive"]}
                      label="Status"
                      className="w-full bg-white/70 border-green-200 focus:border-green-400 focus:ring focus:ring-green-200 rounded-lg"
                      {...register("status", { required: true })}
                    />

                    <Button
                      type="submit"
                      className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${post
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                        : 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800'
                        }`}
                    >
                      <div className="flex items-center justify-center space-x-2">
                        {post ? (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            <span>Update Post</span>
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                            </svg>
                            <span>Publish Post</span>
                          </>
                        )}
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Tips Section */}
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 text-teal-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Quick Tips
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Use compelling titles to grab attention
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      High-quality images improve engagement
                    </li>
                    <li className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      Keep your content well-structured
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}