import React, { useEffect, useState } from 'react'

function AdminHalls() {
    const [halls, setHalls] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/halls")
            .then(res => res.json())
            .then(data => setHalls(data))
    }, [halls])

    return (
        <>
            <section className='flex flex-col gap-6 mx-auto w-full items-center'>
                <h1 className='text-3xl w-full'>Salonger</h1>
                <div className='flex gap-4'>
                    {halls.map(hall =>
                        <div className='border p-4'>
                            <p>Salong: {hall.roomNumber}</p>
                            <p>Antal platser: {hall.capacity}</p>
                        </div>
                    )}
                </div>

            </section>
        </>
    )
}

export default AdminHalls