'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import Image from 'next/image'
import Link from 'next/link'


function ShowMyEvents() {
  const [events, setEvents] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    if (user) {
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events?id=${user.id}`)
        .then(response => response.json())
        .then(data => {
          setEvents(data)
          setLoading(false)
        })
    }
  }, [user])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <button style={{position: 'absolute', top: '10px', left: '10px'}}>
  <a href="/" className='inline-block px-6 py-3 mb-6 text-white bg-blue-600 rounded-lg hover:bg-opacity-50'>
    Home
  </a>
</button>
      
        <h1 className='mt-3 mb-10 text-3xl font-extrabold text-center '>My Events</h1>
        <div className='grid grid-cols-2 gap-2 bg-black md:grid-cols-3 md:gap-6'>
        {Array.isArray(events) && events.map((event, index) => (
          <div key={index}>
            <Link href={`/events/${event._id}`}>
              <Image
                src={event.image}
                alt={event.description}
                width={500}
                height={300}
                className='object-cover mt-2 transition-opacity duration-200 border border-gray-50 aspect-video hover:opacity-75'
                priority={true}
              />
              <p className='py-2 font-bold text-white md:text-lg'>{event.title}</p>
              <p className='text-sm text-white md:text-base'>{event.date} - {event.location}</p>
            </Link>
          </div>
        ))}
        </div>
    </div>
  )
}

export default ShowMyEvents