'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import Image from 'next/image'

function ShowEvent() {
  const [event, setEvent] = useState({})
  const { id } = useParams()
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState(null);

  const fetchEvent = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}`);
    const data = await response.json();
    setEvent(data);
  }
  
  const checkBooking = async () => {
    if (!user) {
      return;
    }
  
    const userId = user.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}?id=${userId}`);
    const data = await response.json();
    setBookingStatus(data.booked);
    setLoading(false);
  }
  
  const handleButtonClick = async () => {
    const userId = user.id;
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/events/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    await checkBooking();
    await fetchEvent(); // Fetch the event data again to update the seats and bookings
  }
  
  useEffect(() => {
    fetchEvent();
    if (user) {
      checkBooking();
    }
  }, [id, user?.id]);
  
  if (loading) {
    return <p>Loading...</p>;
  }

  const buttonText = bookingStatus ? 'Cancel booking' : 'Book event';

  
  

  return (

 
    <div> <p> <a href="/events" className='inline-block px-6 py-3 mt-3 mb-6 ml-3 text-white bg-blue-600 rounded-lg hover:bg-opacity-50'>
             All Events</a>
</p>
        <h1 className='text-4xl font-extrabold text-center mb-14'>{event.title}</h1>
      
        <Image
          src={event.image}
          alt={event.description}
          className='w-full'
          width={1200}
          height={1200}
          priority={true}
        />
        
        <button className={`text-white flex justify-center items-center mx-auto py-5 px-10 mt-2 rounded-lg hover:opacity-75 font-bold w-64 ${bookingStatus ? (event.seats === 0 ? 'bg-red-800' : 'bg-red-900') : 'bg-green-900'}`}
          onClick={handleButtonClick}>
            {buttonText}
          </button>

        {bookingStatus && <p className='py-4 mt-5 font-bold text-center bg-green-100'>You are booked to this event.</p>}

        {event.seats === 0 && <p className='py-4 mt-5 font-bold text-center bg-red-100'>All seats are booked.</p>}

        <h2 className='my-5 font-bold'>Event Description</h2>
        <p className='mb-7'>{event.description}</p>
        
        <div className='grid grid-cols-2 gap-4'>
        <div><strong>Price:</strong> ${event.price}</div>
        <div><strong>Date:</strong> {event.date}</div>
        <div><strong>People Attending:</strong> {event.bookings}</div>
        <div><strong>Total Seats:</strong> {event.seats}</div>
        </div>
          
    </div>
  )
}

export default ShowEvent

