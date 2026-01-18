import { useEffect, useState } from "react";
import BookingCard from "../booking/BookingCard";

function ShowCard({ selectedMovie }) {
    const [allShows, setAllShows] = useState([]);
    const [selectedShow, setSelectedShow] = useState(null);

    useEffect(() => {
        if (!selectedMovie?._id) return;

        fetch(`/api/shows/movie/${selectedMovie._id}`)
            .then(res => res.json())
            .then(data => {
                const formatted = data.map(show => ({
                    ...show,
                    formattedStart: new Date(show.start).toLocaleString("sv-SE", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }),
                    formattedEnd: new Date(show.end).toLocaleString("sv-SE", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }),
                }));
                setAllShows(formatted)
            })
    }, [selectedMovie]);

    return (
        <>

            <section className="px-4 max-w-[1200px] mx-auto mt-8 text-text-primary mb-8">
                <h2 className="text-3xl font-heading mb-4">Föreställningar</h2>

                {/* See info about shows for selected movie */}
                <div className="grid md:grid-cols-2 gap-12 ">
                    <div className="text-text-primary flex flex-col md:flex-row gap-4 items-start">
                        {allShows.map((show) => (
                            <button
                                key={show.id} onClick={() => setSelectedShow(show)} className={`w-full md:col-span-2 py-2 md:py-3
                                    text-center text-lg font-semibold tracking-wider rounded-2xl  ${selectedShow?.id === show.id ? "bg-gradient-to-r from-emerald-500 to-emerald-900"
                                        : "bg-gradient-to-br from-gradient via-gradient1 to-gradient2"
                                    }`}>
                                {show.formattedStart}
                            </button>
                        ))}
                    </div>
                    {selectedShow && (

                        <BookingCard selectedShow={selectedShow} selectedMovie={selectedMovie} />

                    )}
                </div>
            </section>
        </>
    )
}
export default ShowCard;