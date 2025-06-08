import { Bird } from 'lucide-react'
import React from 'react'

export default function Logo({width = "100px"}) {
  return (
    <div className='flex items-center justify-center text-white'>
      <Bird className='text-primary' size={width} />
      <span className='ml-2 text-primary font-bold text-lg'>Appwrite</span>
    </div>
  )
}
