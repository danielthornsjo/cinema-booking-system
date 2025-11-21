import React from 'react'
import { Link } from 'react-router-dom';

function AdminNav() {
    return (
        <nav className='w-full md:w-auto text-center'>
            <ul className='flex flex-col gap-4'>
                <li>
                    <Link to="/admin/start">Start</Link>
                </li>
                <li className='bg-amber-500'>
                    <Link to="/admin/movies">Filmer</Link>
                </li>
                <li>
                    <Link to="/admin/halls">Salonger</Link>
                </li>
                <li>
                    <Link>Föreställningar</Link>
                </li>
                <li>
                    <Link to="/admin/bookings">Bokningar</Link>
                </li>
                <li>
                    <Link>Användare</Link>
                </li>
            </ul>
        </nav>
    )
}

export default AdminNav;