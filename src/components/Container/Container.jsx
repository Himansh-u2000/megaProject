import React from 'react'

export default function Container({ children }) {
  return <div
    className='w-full mx-auto max-w-7xl px-4'
  >
    {children}
  </div>;
}
