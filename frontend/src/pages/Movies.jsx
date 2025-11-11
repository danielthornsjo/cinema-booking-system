import { useEffect, useState } from "react";
import MovieList from "../components/movies/MovieList";
import { useParams } from "react-router-dom";

function Movies() {
    const [movies, setMovies] = useState([]);
    const { movieId } = useParams()

    /* Fetch för att rendera ut alla filmer i API:t */
    useEffect(() => {
        {
            fetch(`http://localhost:3000/movies`)
                .then(res => res.json())
                .then(data => setMovies(data)
                );
        }
    }, [movieId])

    return (
        <>
            <section className="px-4 flex flex-col gap-8 items-center justify-center">
                <div id="grid-movies" className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-5 gap-4  md:max-w-[1200px] mx-auto md:gap-8">
                    <p className="font-heading text-text-primary text-3xl tracking-wide col-span-2 sm:col-span-3 md:col-span-5">Visas nu</p>
                    {/* Rendera ut alla filmer */}
                    <MovieList movies={movies} />
                </div>
            </section >
        </>
    )

}
export default Movies;