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
            {halls.map(hall =>
                <div className=''>
                    <p>Salong: {hall.roomNumber}</p>
                    <p>Antal platser: {hall.seatMap.filter(seat => seat.seatId).length}</p>
                </div>
            )}

        </>
    )
}

export default AdminHalls