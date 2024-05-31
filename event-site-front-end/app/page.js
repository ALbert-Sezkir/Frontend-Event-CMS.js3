import React from 'react'
import Image from 'next/image'
import Header from './_components/header'


function LandingPage() {
  return (
    <div>
      <div> 
        <Header /> 
      </div>    
      
      <div className='relative flex flex-col items-center justify-center min-h-screen text-center bg-gray-100'>
        <div className='absolute z-10 pb-16'>
          <h1 className='pb-16 text-4xl text-white'>Let the journey begin! Get ready!</h1>
          <h2 className='pb-10 text-3xl text-white'>Magic Live Nation events</h2>
          <p><a href="/events" className='font-bold text-blue-700'>View our magic events!</a></p>
        </div>
        <div className='absolute z-0 w-full h-full'>
          <Image src="/image.jpg" alt="Magic Live Nation events" width={1920} height={1000} />
        </div>
      </div>
    </div>
  )
}

export default LandingPage