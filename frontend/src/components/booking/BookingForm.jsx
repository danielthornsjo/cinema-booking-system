import { useState } from "react";
import Modal from "./Modal";


function BookingForm({ selectedShow, selectedSeats, selectedMovie, totalPrice }) {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [renderModal, setRenderModal] = useState(false)


    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            email,
            show: selectedShow.id,
            seats: selectedSeats,
            bookingTime: new Date().toLocaleDateString(),
            totalPrice: selectedSeats.length * selectedShow.price
        };

        try {
            const response = await fetch("/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                let errorMessage = "Något gick fel vid bokningen";
                try {
                    const errorData = await response.json();

                    if (errorData.message) {
                        errorMessage = errorData.message;

                    } else {
                        errorMessage = JSON.stringify(errorData);
                    }
                } catch {
                    errorMessage = response.statusText;
                }
                throw new Error(errorMessage);
            }

            const result = await response.json();
            setMessage("Booking successfully added!");
            setRenderModal(true);
            console.log(result);

        } catch (error) {
            setMessage(error.message);
            console.error("Error:", error);
        }
    }

    return (
        <>
            {/* Info about selected show */}
            < div className="grid md:grid-cols-2 gap-8 mx-auto mt-8 md:mt-20" >
                <div>
                    <h1 className="text-3xl">Boka platser för salong {selectedShow.room}</h1>
                    <h2>{selectedMovie.title}</h2>

                    <p>Start: {selectedShow.start}</p>
                    <p>Slut: {selectedShow.end}</p>
                    <p>Pris: {selectedShow.price} kr</p>
                    {/* <p>Lediga platser: {selectedShow.seats.seatId}</p> */}
                    <p>Lediga platser: {selectedShow.seats.filter(seat => !seat.booked).length}</p>
                </div>
                <div className="flex flex-col gap-4">
                    <p>Boka plats: {selectedSeats.length > 0 ? (
                        <span>{selectedSeats.join(", ")}</span>
                    ) : (
                        <span>Inga platser Valda</span>
                    )}</p>
                    {<p>Summa: {totalPrice}  kr</p>}
                    <form action="" onSubmit={handleSubmit} className="transition ease-in-out duration-300 ">
                        <label htmlFor="email" className="flex items-baseline gap-4">
                            Email: <input className="bg-black border-2 border-gradient1 w-full p-2 rounded-xl outline-0 focus:border-purple-500 transition ease-in-out duration-300" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <button type="submit" className="mt-4 w-full rounded-xl">Boka platser</button>
                    </form>
                    {message}
                </div>
            </div >

            <Modal
                renderModal={renderModal}
                selectedSeats={selectedSeats}
                totalPrice={totalPrice}
                setRenderModal={setRenderModal}
                email={email}
                selectedMovie={selectedMovie}
                selectedShow={selectedShow} />

        </>
    )
}
export default BookingForm;