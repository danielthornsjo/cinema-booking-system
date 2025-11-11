import { IoClose } from "react-icons/io5";

function Modal({ renderModal, setRenderModal, selectedSeats, totalPrice, email, selectedMovie,
    selectedShow }) {

    if (!renderModal) {
        return (<></>)
    }
    return (
        <>
            <div className="w-screen h-screen absolute top-0 left-0 bg-bg-primary/60 flex items-center justify-center backdrop-blur-xs z-100">
                <div className="bg-text-primary mx-4 w-full md:w-1/2 h-100 md:h-1/4 rounded-xl text-bg-primary p-4 relative grid md:grid-cols-2 justify-center items-center">
                    <button onClick={() => setRenderModal(false)} className="rounded-full w-10 h-10 absolute top-3 right-3 cursor-pointer flex items-center justify-center">
                        <IoClose className="text-3xl" />
                    </button>
                    <h1 className="text-bg-primary text-3xl text-center md:col-span-2 mt-10 md:mt-0">Tack för din bokning</h1>
                    <div className="text-center">
                        <p>Bokad film: {selectedMovie.title}</p>
                        <p>Tid: {selectedShow.start}</p>
                    </div>
                    <div className="text-center">
                        <p>Salong {selectedShow.room}</p>
                        <p>Platser {selectedSeats.join(", ")}</p>
                        <p>Summa: {totalPrice} kr</p>
                    </div>
                    <div className="text-center md:col-span-2">
                        <p>Dörrar öppnas 15 minuter innan filmen startar.</p>
                        <p>Bokningsbekräftelse har skickats till: {email}</p>
                    </div>

                </div>
            </div>
        </>
    )
}
export default Modal;