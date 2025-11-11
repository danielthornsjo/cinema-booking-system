import { useEffect, useState } from "react";
import MovieCard from "../components/movies/MovieCard";
// Use params 
// http://localhost:5173/movie/68c0bf82708d51a4478b5786
import { useParams } from "react-router-dom";

function Movie() {
    const [selectedMovie, setSelectedMovie] = useState([]);
    const { movieId } = useParams();

    /* Plocka ut Id från specifik film */
    useEffect(() => {
        fetch(`http://localhost:3000/movies/${movieId}`)
            .then(res => res.json())
            .then(data => setSelectedMovie(data));
    }, [movieId])


    return (
        <>
            {/* Rendera ut info om vald film med komponent MovieCard */}
            <MovieCard selectedMovie={selectedMovie} />
        </>
    )
}
export default Movie;