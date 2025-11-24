import React, { useEffect, useState } from 'react'

function AdminMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/movies")
            .then(res => res.json())
            .then(data => setMovies(data))
    }, []);

    return (
        <>
            <section>
                <h1 className='text-3xl'>Filmer</h1>
                <div className='w-full flex flex-col gap-4'>
                    {movies.map(movie => (
                        <div className='grid grid-cols-8 items-center border gap-4 px-4 py-2 rounded-2xl'>
                            <img src={movie.posterUrl} alt={movie.title} srcset="" className='' />
                            <p className='col-span-2'>
                                {movie.title}
                            </p>
                            <p>
                                {movie.duration} minuter
                            </p>
                            <p className='col-span-2'>
                                {movie.genre.join(", ")}
                            </p>
                            <p className='text-center'>
                                {movie.releaseDate.slice(0, 10)}
                            </p>
                            <div className='flex gap-4 flex-end'>
                                <button>Edit</button>
                                <button className='w-10 '>X</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default AdminMovies