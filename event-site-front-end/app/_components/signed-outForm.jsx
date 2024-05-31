import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SignInButton } from '@clerk/nextjs'

function SignedOutPage() {
    return (
      <div className='relative flex flex-col items-center justify-center min-h-screen text-center bg-gray-100'>
        <div className='absolute z-10 pb-16'>
          <h1 className='pb-16 text-4xl text-white'>Be ready to enter a whole new world</h1>
          <h2 className='pb-10 text-3xl text-white'>Magic Live Nation events</h2>
          <p>
            <Link href="/events" passHref>
              <SignInButton className='font-bold text-blue-700' />
            </Link>
          </p>
        </div>
        <div className='absolute z-0 w-full h-full'>
          <Image src="/image.jpg" alt="Magic Live Nation events" width={2600} height={1000} />
        </div>
      </div>
    )
  }
  
  export default SignedOutPage