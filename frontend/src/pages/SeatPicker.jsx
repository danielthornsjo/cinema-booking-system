import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BookingForm from "../components/booking/BookingForm";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

function SeatPicker() {
    const { showId } = useParams();
    const [selectedShow, setSelectedShow] = useState(null);
    const location = useLocation();
    const { selectedMovie } = location.state;
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    /* Fastställ pris/bokning beroende på hur många platser man bokat */
    useEffect(() => {
        setTotalPrice(selectedSeats.length * selectedShow?.price)
    }, [selectedSeats, selectedShow?.price]);


    useEffect(() => {
        if (!showId) return;

        fetch(`http://localhost:3000/shows/${showId}`)
            .then(res => res.json())
            .then(data => {
                /* Format data for easier use */
                const formattedShow = {
                    movieTitle: data.movie.title,
                    id: data._id,
                    room: data.hall.roomNumber,
                    seats: data.seatMap,
                    start: new Date(data.startTime).toLocaleString("sv-SE", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }),
                    end: new Date(data.endTime).toLocaleString("sv-SE", {
                        dateStyle: "medium",
                        timeStyle: "short",
                    }),
                    price: data.price,
                };
                setSelectedShow(formattedShow);

            });
    }, [showId])

    if (!selectedShow) return <p>Laddar föreställning...</p>

    const allSeats = [
        ...selectedShow.seats.map(seat => ({ id: seat.seatId, booked: seat.booked }))
    ]

    /* Toggle seat in seatpicker */
    const toggleSeat = (seat) => {
        setSelectedSeats((prev) => prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]);
    }

    return (
        <>
            <div className="px-4 flex items-center justify-between max-w-[1200px] mx-auto md:px-0 text-text-primary">
                <Link to={`/movie/${selectedMovie._id}`} className="bg-linear-to-br from-gradient via-gradient1 to-gradient2 px-2 text-2xl font-bold py-1 rounded-2xl button w-auto z-10">
                    <IoIosArrowBack />
                </Link>
                <p className="text-3xl text-right md:text-5xl font-heading md:text-center flex-1 md:-translate-x-6">{selectedMovie.title}</p>
            </div>
            <section className="w-[90%] mx-auto  text-text-primary flex flex-col justify-center">
                {/* Seatpicker */}
                <div className="bg-text-secondary w-full md:w-[550px] rounded-t-full mx-auto h-5 mt-10 mb-20 relative">
                    <div className="w-full bg-white h-5 back shadow blur absolute top-4"></div>
                </div>
                <div className="grid grid-cols-9 gap-2 md:gap-4 max-w-[800px] mx-auto">
                    {allSeats.map(seat => (
                        <div key={seat.id} onClick={() => !seat.booked && toggleSeat(seat.id)} className={`w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-b-lg md:rounded-b-xl md:text-xl ${seat.booked ? "bg-gradient-to-br from-red-800 via-red-600 to-red-400 cursor-not-allowed"
                            : selectedSeats.includes(seat.id)
                                ? "bg-gradient-to-br from-blue-800 via-blue-600 to-blue-400 cursor-pointer"
                                : "bg-gradient-to-br from-green-800 via-green-600 to-green-400 hover:from-yellow-800 hover:via-yellow-600 hover:to-yellow-600 cursor-pointer"}`}>{seat.id}</div>
                    ))}
                </div>
                <BookingForm selectedShow={selectedShow} selectedSeats={selectedSeats} selectedMovie={selectedMovie} totalPrice={totalPrice} />
            </section >

        </>
    )
}
export default SeatPicker;