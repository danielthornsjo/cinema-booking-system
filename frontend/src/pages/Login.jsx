import { Link } from "react-router-dom"

function Login() {
    return (
        <>
            <section className="h-[70vh] w-screen  text-text-primary flex flex-col justify-center align-center p-4">
                <form action="" method="post" className="flex flex-col justify-center w-full gap-4 md:w-150 mx-auto">
                    <div className="flex flex-col md:flex-row md:items-baseline">
                        <label htmlFor="email" className="flex items-baseline md:w-30">E-mail:</label>
                        <input type="email" name="email" id="email" className="bg-black border-2 border-gradient1 w-full p-2 rounded-xl outline-0 focus:border-purple-500 transition ease-in-out duration-300" />
                    </div>
                    <div className="flex flex-col md:flex-row md:items-baseline">
                        <label htmlFor="password" className="flex items-baseline w-30">Lösenord:</label>
                        <input type="password" name="password" id="password" className="bg-black border-2 border-gradient1 w-full p-2 rounded-xl outline-0 focus:border-purple-500 transition ease-in-out duration-300" />
                    </div>
                    <Link to={`/admin`}>
                        <button className="mt-2 w-full rounded-xl">Logga in</button>
                    </Link>
                </form >
            </section >
        </>
    )
}

export default Login