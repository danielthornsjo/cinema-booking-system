import { Link } from "react-router-dom";

function BookingCard({ selectedShow, selectedMovie }) {

    return (
        <>
            <section>
                {/* info about selectedShow */}
                <div className="rounded-xl bg-bg-primary text-text-primary grid grid-cols-2 mb-4 md:text-xl">
                    <h3 className="mb-3 font-semibold">Boka din plats</h3>
                    <p className="font-sem">{selectedShow.formattedStart}</p>

                    <p className="font-semibold">Salong:</p>
                    <p className=""> {selectedShow.hall.roomNumber}</p>

                    <p className="font-semibold">Starttid:</p>
                    <p className=""> {new Date(selectedShow.formattedStart).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}</p>

                    <p className="font-semibold ">Sluttid:</p>
                    <p className="">{new Date(selectedShow.formattedEnd).toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" })}</p>

                    <p className="font-semibold ">Pris:</p>
                    <p className=""> {selectedShow.price} kr</p>

                    <p className="font-semibold ">Lediga platser:</p>
                    <p className=""> {selectedShow.hall.seatMap.filter(seat => !seat.booked).length}</p>

                    <p className="font-semibold ">Bokade platser:</p>
                    <p className=""> {selectedShow.hall.seatMap.filter(seat => seat.booked).length}</p>

                    <Link to={`/seatpicker/${selectedShow.id}`} state={{ selectedShow, selectedMovie }} className="col-span-2 mt-4"><button className="w-full">Boka</button></Link>
                </div >
            </section>
        </>
    );
}
export default BookingCard;
