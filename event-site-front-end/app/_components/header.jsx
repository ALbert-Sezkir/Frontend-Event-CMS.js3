import Link from 'next/link'
import { ClerkProvider, UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <header className='flex items-center justify-between p-5 text-white bg-black'>

      <div className='text-2xl font-bold'>
        <Link href="/">Magic Event Site</Link>
      </div>

      <nav className='flex items-center justify-center'>
        <div className='flex justify-center space-x-4'>
          <Link href="/events" className='hover:text-gray-300'>All the Magic Events</Link>
          <Link href="/my-events" className='hover:text-gray-300'>My Magic Events</Link>
        </div>
      </nav>
      <span className="px-5 mt-2">
      
      <UserButton />
      
      </span>

      
    </header>
  )
}

export default Header