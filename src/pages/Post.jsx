import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
        setLoading(false);
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  console.log("Post Data", post);
  if (post?.featuredImage) {
    console.log("img: ", appwriteService.getFilePreview(post.featuredImage));
  } else {
    console.log("img: No image available");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Container>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              {/* Loading Animation */}
              <div className="relative w-16 h-16 mx-auto mb-4">
                <div className="absolute inset-0 w-16 h-16 border-4 border-green-200 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Loading Post...</h2>
              <p className="text-gray-500">Please wait while we fetch your content</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Container>
        <div className="py-8 sm:py-12">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Article
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
          </div>

          {/* Featured Image Section */}
          <div className="relative mb-8 sm:mb-12">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              {post?.featuredImage ? (
                <div className="relative group">
                  <img
                    src={appwriteService.getFilePreview(post.featuredImage)}
                    alt={post.title}
                    className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ) : (
                <div className="h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-16 h-16 text-green-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-green-600 font-medium">No Image Available</p>
                  </div>
                </div>
              )}

              {/* Author Actions */}
              {isAuthor && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <div className="flex space-x-3">
                    <Link to={`/edit-post/${post.$id}`}>
                      <Button className="bg-gray-300 hover:bg-white text-green-600 border border-green-200  px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm hover:text-bl">
                        <div className="flex items-center space-x-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          <span>Edit</span>
                        </div>
                      </Button>
                    </Link>
                    <Button
                      onClick={deletePost}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                    >
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Delete</span>
                      </div>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              <div className="p-6 sm:p-8 lg:p-12">
                {/* Article Meta */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Published by</p>
                      <p className="font-medium text-gray-900">Author</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Status</p>
                    <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      {post.status || 'Published'}
                    </div>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg prose-green max-w-none">
                  <div className="content-styles text-gray-700 leading-relaxed">
                    {parse(post.content)}
                  </div>
                </div>

                {/* Article Footer */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500">
                        <p>Thank you for reading!</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="inline-flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Like
                      </button>
                      <div className="flex items-center space-x-4">
                        {/* WhatsApp */}
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = encodeURIComponent(post.title);
                            window.open(
                              `https://api.whatsapp.com/send?text=${text}%20${encodeURIComponent(
                                url
                              )}`,
                              "_blank"
                            );
                          }}
                          className="inline-flex items-center px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M17.472 14.382a7.993 7.993 0 01-3.897 2.041l-.176.032-2.316.287-.675 2.078 1.378.718c.094.049.214.094.352.094.434 0 2.285-.348 3.306-1.667 1.027-1.328 1.027-3.105.028-4.452zm-3.145-9.937C10.315 4.445 6.22 8.368 6.22 8.368s-.688 2.184.065 3.103c.744.896 2.447 2.606 2.447 2.606s2.54 1.782 4.998 1.277c.416-.092 1.488-.383 2.271-1.165.784-.784 1.07-1.948 1.068-2.18-.002-1.153-1.089-2.717-1.589-3.19-.5-.474-1.277-.833-1.277-.833s-.617-1.297-1.11-1.87z" />
                          </svg>
                          WhatsApp
                        </button>

                        {/* Twitter */}
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const text = encodeURIComponent(post.title);
                            window.open(
                              `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                                url
                              )}&text=${text}`,
                              "_blank"
                            );
                          }}
                          className="inline-flex items-center px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 8v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                          </svg>
                          Twitter
                        </button>

                        {/* Email */}
                        <button
                          onClick={() => {
                            const url = window.location.href;
                            const subject = encodeURIComponent(post.title);
                            const body = encodeURIComponent(`${post.title} - ${url}`);
                            window.location.href = `mailto:?subject=${subject}&body=${body}`;
                          }}
                          className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 12h.01M8 12h.01M12 12h.01M21 16V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8m18 0a2 2 0 01-2 2H5a2 2 0 01-2-2"
                            />
                          </svg>
                          Email
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 text-center">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Back to All Posts
            </Link>
          </div>
        </div>
      </Container>

      {/* Custom Styles for Content */}
      <style jsx>{`
        .content-styles h1,
        .content-styles h2,
        .content-styles h3,
        .content-styles h4,
        .content-styles h5,
        .content-styles h6 {
          color: #1f2937;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .content-styles h1 {
          font-size: 2.25rem;
          line-height: 2.5rem;
        }
        
        .content-styles h2 {
          font-size: 1.875rem;
          line-height: 2.25rem;
        }
        
        .content-styles h3 {
          font-size: 1.5rem;
          line-height: 2rem;
        }
        
        .content-styles p {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        
        .content-styles ul,
        .content-styles ol {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        
        .content-styles li {
          margin-bottom: 0.5rem;
        }
        
        .content-styles blockquote {
          border-left: 4px solid #10b981;
          background-color: #f0fdf4;
          padding: 1rem;
          margin: 1.5rem 0;
          border-radius: 0.5rem;
        }
        
        .content-styles code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-family: 'Monaco', 'Consolas', monospace;
        }
        
        .content-styles pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1rem 0;
        }
        
        .content-styles a {
          color: #10b981;
          text-decoration: underline;
        }
        
        .content-styles a:hover {
          color: #059669;
        }
        
        .content-styles img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
        
        .content-styles table {
          width: 100%;
          border-collapse: collapse;
          margin: 1rem 0;
        }
        
        .content-styles th,
        .content-styles td {
          border: 1px solid #d1d5db;
          padding: 0.75rem;
          text-align: left;
        }
        
        .content-styles th {
          background-color: #f9fafb;
          font-weight: 600;
        }
      `}</style>
    </div>
  ) : null;
}