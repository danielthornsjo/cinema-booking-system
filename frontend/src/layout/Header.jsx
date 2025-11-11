import { HiDotsVertical } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
import Nav from "./Nav";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    const [renderNav, setRenderNav] = useState(false)


    return (
        <header className="header sticky top-0 flex justify-between w-full md:py-4 md:px-0 z-100 bg-bg-primary">
            <h1 className="text-3xl">
                <Link to="/">Starlight Cinema</Link>
            </h1>
            <nav className="flex items-center items">
                <IoIosSearch className='text-2xl md:text-3xl text-text-secondary' />
                <HiDotsVertical className='text-2xl md:text-3xl text-text-secondary cursor-pointer' onClick={() => setRenderNav(true)} />
            </nav>
            <Nav renderNav={renderNav} setRenderNav={setRenderNav} />

        </header>
    )
}
export default Header;