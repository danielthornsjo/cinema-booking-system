import Movies from "./Movies";

function Home() {
    return (
        <>
            <section className="bg-[url(./assets/HeroImage.png)] bg-contain md:bg-contain bg-top bg-no-repeat w-full h-[60vh]  md:h-[70vh]">
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <h1 className="text-[54px] tracking-wider leading-11 md:text-8xl md:leading-18">Välkommen till</h1>
                    <h1 className="text-[54px] tracking-wider leading-11 md:text-8xl md:leading-18">Starlight Cinema</h1>
                    <div className="md:flex md:relative mx-auto px-4">
                        <div className="my-4 w-full md:w-[650px] mx-auto" id="input-search">
                            <input type="search" name="search" id="search" placeholder="Sök film eller genre..." className="w-full md:py-4" />
                        </div>
                        <button className="tracking-wider md:absolute md:top-7 md:right-7 md:w-60 w-full md:rounded">Upplev magin på bio</button>
                    </div>
                </div>
            </section>
            <Movies />
        </>
    )
}
export default Home;