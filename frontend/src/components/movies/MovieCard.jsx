import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import ShowCard from "../shows/ShowCard";
import Trailer from "./Trailer";

function MovieCard({ selectedMovie }) {

    return (
        <>
            <section className="flex flex-col gap-8 max-w-[1200px] mx-auto px-4 md:px-0">
                {/* Info about selectedMovie */}
                <div className="flex items-center justify-between w-full md:px-0 text-text-primary">
                    <Link to="/movies" className="bg-linear-to-br from-gradient via-gradient1 to-gradient2 px-2 text-2xl font-bold py-1 rounded-2xl button w-auto z-10">
                        <IoIosArrowBack />
                    </Link>
                    <p className="text-3xl text-right md:text-5xl font-heading md:text-center flex-1 md:-translate-x-6">{selectedMovie.title}</p>
                </div>
                <div key={selectedMovie.id} className="text-text-primary font-primary sm:grid sm:grid-cols-2 sm:gap-8 sm:items-center">
                    <img className="w-100 mx-auto" src={selectedMovie.posterUrl} />
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 justify-between  items-center">
                        <h1 className="text-2xl text-left tracking-wide">Beskrivning:</h1>
                        <p className="col-span-2 text-left text-md font- mb-4">{selectedMovie.description}</p>

                        <h1 className="text-2xl tracking-">Genre: </h1>
                        <p className="text-md">{selectedMovie.genre}</p>

                        <h1 className="text-2xl tracking-">Utgivningsdatum: </h1>
                        <p className="text-md">{selectedMovie.releaseDate ? selectedMovie.releaseDate.slice(0, 10) : "Datum saknas"}</p>

                        <h1 className="text-2xl tracking-">Producent: </h1>
                        <p className="text-md">{selectedMovie.directors}</p>

                        <h1 className="text-2xl tracking-">Speltid: </h1>
                        <p className="text-md">{selectedMovie.duration} minuter</p>
                        <Trailer selectedMovie={selectedMovie} />
                    </div>
                </div>
            </section >
            <ShowCard selectedMovie={selectedMovie} />
        </>
    )
}
export default MovieCard;