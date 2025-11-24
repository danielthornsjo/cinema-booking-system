import React, { useEffect, useState } from 'react'
import AdminNav from './AdminNav';

function Bookings() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/bookings", {
            headers: { 'x-api-key': 'valid-api-key' }
        }
        )
            .then(res => res.json())
            .then(data => setBookings(data)
            )
    }, [])

    const deleteBooking = async (id) => {
        const res = await fetch(`http://localhost:3000/bookings/${id}`, {
            method: 'DELETE',
            headers: {
                'x-api-key': 'valid-api-key',
                'Content-Type': 'application/json',
            },
        })
        if (res.ok) {

            setBookings(prev => prev.filter(b => b._id !== id));

        } else {
            console.log('Kunde inte ta bort bokning');
        }
    }

    return (
        <section>
            <h1 className='text-3xl'>Bokningar</h1>
            <div className='w-full flex flex-col gap-4 mt-4'>
                {bookings.map(booking => (
                    <ul key={booking.id} className='flex justify-between p-4 rounded-2xl border hover:bg-blue-900 transition-all ease-in-out
                    duration-300 hover:scale-102'>
                        <li className='flex-1'>Bokningsid
                            <ul>
                                <li>{booking.id}</li>
                            </ul>
                        </li>
                        <li className='flex-2'>Email
                            <ul>
                                <li>{booking.email}</li>
                            </ul>
                        </li>
                        <li className='flex-2'>Föreställning
                            <ul>
                                <li>{booking.show?.movie.title}</li>
                            </ul>
                        </li>
                        <li className='flex-1'>Bokade platser
                            <ul>
                                <li>{booking.seats.join(', ')}</li>
                            </ul>
                        </li>
                        <li className='flex-1'>Totalt pris
                            <ul>
                                <li>{booking.totalPrice} kr</li>
                            </ul>
                        </li>
                        <button className='w-auto' onClick={() => deleteBooking(booking._id)}>X</button>
                    </ul>
                ))}
            </div>
        </section>
    )
}

export default Bookings