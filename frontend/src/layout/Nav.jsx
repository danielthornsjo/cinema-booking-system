import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";

function Nav({ renderNav, setRenderNav }) {
    if (!renderNav) {
        return (
            <></>
        )
    }

    return (
        <>
            <nav className="text-text-secondary w-screen h-screen flex items-center justify-center fixed top-0 left-0 bg-black z-10">
                <button onClick={() => setRenderNav(false)} className="w-10 h-10 flex bg-gradient2 text-text-primary items-center justify-center rounded-full text-3xl cursor-pointer m-8 md:m-16 absolute top-0 right-0"><IoMdClose /></button>
                <ul className="text-center text-4xl gap-8  font-primary flex flex-col">
                    <li><Link to="/" onClick={() => setRenderNav(false)}>Hem</Link></li>
                    <li><Link to="/movies" onClick={() => setRenderNav(false)}>Våra filmer</Link></li>
                    <li><Link to="/login" onClick={() => setRenderNav(false)}>Logga in</Link></li>
                </ul>
            </nav>
        </>

    )
}
export default Nav;