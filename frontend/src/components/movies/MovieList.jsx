import MovieCard from "./MovieCard";

import { Link } from "react-router-dom";

function MovieList({ movies }) {

    return (
        <>
            {/* Mappa över alla filmer för att ge möjlighet att gå in på en specifik film */}
            {movies.map(movie => (
                <Link key={movie._id} to={`/movie/${movie._id}`}>
                    <img src={movie.posterUrl} alt={movie.title} className="hover:scale-[1.1] transition ease-in-out duration-500 rounded-2xl" />
                </Link>
            ))}
        </>
    );
}

export default MovieList;
