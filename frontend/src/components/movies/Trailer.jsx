import { useEffect, useState } from "react";
import { IoLogoYoutube } from "react-icons/io5";
import { Link } from "react-router-dom";

function Trailer({ selectedMovie }) {
    /*     const [videoId, setVideoId] = useState(null);
    
    
        useEffect(() => {
            if (!selectedMovie?.title) return;
    
            /* Spara söksträng i localStorage för att minska quota på youtube 
    const trailerCache = `trailer-${selectedMovie.title}`;
    const trailerCacheId = localStorage.getItem(trailerCache);

    if (trailerCacheId) {
        setVideoId(trailerCacheId);
        return;
    }

    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        selectedMovie.title + " trailer"
    )}&key=AIzaSyAG7PF3kGPKi2d76v2ZLNFPBK4_Ls8Ug1E`)
        .then(res => res.json())
        .then(data => {
            /* Plocka ur första videon i sökresultatet på youtube för att skapa en länk till selectedMovie trailer */
    /* Och spara datan i localStorage 
    if (data?.items?.length > 0) {
        const id = data.items[0].id.videoId;
        setVideoId(id);
        localStorage.setItem(trailerCache, id);
    }
})
.catch(err => {
    console.log("Youtube API error: ", err);
    setVideoId(null);
});
}, [selectedMovie]); */

    return (
        <>
            {/*             <div className="flex">
                <Link to={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" className="w-auto"><IoLogoYoutube size={40} color="red" className="" /></Link>
            </div> */}
        </>
    )
}
export default Trailer;