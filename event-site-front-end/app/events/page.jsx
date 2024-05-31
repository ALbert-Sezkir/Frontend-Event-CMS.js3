

'use client'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'

function ShowEvents() {
  const [events, setEvents] = useState([])
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events`)
      .then(response => response.json())
      .then(data => {
        // Sort events by location and date
        data.sort((a, b) => {
          if (a.location < b.location) return -1;
          if (a.location > b.location) return 1;
          if (a.date < b.date) return -1;
          if (a.date > b.date) return 1;
          return 0;
        });
        setEvents(data);
      })
  }, [])

  // Get unique locations
  const locations = [...new Set(events.filter(event => new Date(event.date) >= new Date()).map(event => event.location))];

  // Filter events by selected location, date range, and future dates
  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date).setHours(0, 0, 0, 0);
    const currentDate = new Date().setHours(0, 0, 0, 0);
    if (selectedLocation && event.location !== selectedLocation) {
      return false;
    }
    if (startDate && eventDate < new Date(startDate)) {
      return false;
    }
    if (endDate && eventDate > new Date(endDate)) {
      return false;
    }
    if (eventDate < currentDate) {
      return false;
    }
    return true;
  });

  return (
    <div>

<button style={{position: 'absolute', top: '10px', left: '10px'}}>
  <a href="/" className='inline-block px-6 py-3 mb-6 text-white bg-blue-600 rounded-lg hover:bg-opacity-50'>
    Home
  </a>
</button>
<div className='flex items-center justify-center mt-2 '>
  <h1 className='mb-10 text-3xl font-bold'>All Events</h1>
</div>
        <div className='text-center'>
          <label>
            Start Date:
            <input type="date" onChange={e => setStartDate(e.target.value)} />
          </label>
          <label>
            End Date:
            <input type="date" onChange={e => setEndDate(e.target.value)} />
          </label>
        </div>

        <ul className='flex items-center justify-center py-5 space-x-20 hover:bg-opacity-50'>
          <li 
            onClick={() => setSelectedLocation(null)} 
            style={{cursor: 'pointer', textDecoration: selectedLocation === null ? 'underline' : 'none'}} 
            className='mr-2 font-bold '
          >
            All Cities
          </li>
          {locations.map((location, index) => (
            <li 
              key={index} 
              onClick={() => setSelectedLocation(location)} 
              style={{cursor: 'pointer', textDecoration: location === selectedLocation ? 'underline' : 'none'}} 
              className='mr-2 font-bold'
            >
              {location}
            </li>
          ))}
        </ul>

        <div className='grid grid-cols-2 gap-2 bg-black md:grid-cols-3 md:gap-6'>
          {filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date)).map((event, index) => (
            <div 
              key={index} 
              style={{opacity: new Date(event.date) < new Date() ? 0.5 : 1}}
            >
              <Link href={`/events/${event._id}`}>
              <Image
              src={event.image}
              alt={event.description}
              width={500}
              height={300}
              className='object-cover mt-2 transition-opacity duration-200 border rounded border-gray-50 aspect-video hover:opacity-75'
              priority={true}
              />
                  <p className='pt-2 pb-1 font-bold text-white md:text-lg'>{event.title}</p>
                  <p className='pb-3 text-xs text-gray-500 md:text-sm'>{event.date} - {event.location}</p>
              </Link>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ShowEvents