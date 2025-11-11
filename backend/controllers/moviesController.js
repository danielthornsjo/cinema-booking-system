import MovieModel from "../models/moviesModel.js";

async function resetMovies(req, res) {
    await MovieModel.deleteMany({});
    let nextId = 1;

    const movies = [
        {
            id: nextId++,
            title: "Fast X",
            genre: "Action",
            startTime: 20.00,
            endTime: 22.00,
            description: "The final road begins! Dom Torretto and his family have made it through thick and thin together while succeeding in various missions and fighting off multiple villains. But now Dom is put to the ultimate test when he goes up against Dante Reyes, the son of an old foe who is out to exact revenge for the death of his father. With time running out and help from new allies, Dom and his family are in for the fight of their lives against the biggest enemy they have ever faced.",
            directors: "Louis Leterrier",
            writers: 'Dan Mazeau, Justin Lin, Zach Dean',
            posterUrl: 'https://imusic.b-cdn.net/images/item/original/934/5053083257934.jpg?fast-x-2023-fast-x-dvd&class=scaled&v=1693845007',
            releaseDate: "2023-05-17",
            actors: ' Vin Diesel, Michelle Rodriguez, Tyrese Gibson, Ludacris, John Cena',
            duration: 141
        },
        {
            id: nextId++,
            title: "Predator Badlands",
            genre: "Sci-Fi",
            startTime: 20.00,
            endTime: 22.00,
            description: "A young Predator outcast from his clan finds an unlikely ally on his journey in search of the ultimate adversary.",
            directors: "Dan Trachtenberg",
            writers: 'Patrick Aison, Jim Thomas, John Thomas',
            posterUrl: 'https://media.outnow.ch/Movies/Bilder/2025/Predator-Badlands/014.png',
            releaseDate: "2025-11-05",
            actors: 'Elle Fanning, Dimitrius Schuster-Koloamatangi, Michael Homick, Reuben De Jong, Alison Wright',
            duration: 107
        },
        {
            id: nextId++,
            title: "Avatar: The Last Airbender",
            genre: "Action, Adventure, Fantasy",
            startTime: 20.00,
            endTime: 22.00,
            description: "The film follows Aang, a young Avatar who wakes up after a hundred years to find a world plagued by war. Together with his friends Katara and Sokka, he must travel to the North Pole to master waterbending and stop the Fire Nation's expansion.",
            directors: "M. Night Shyamalan",
            writers: "M. Night Shyamalan",
            posterUrl: "https://preview.redd.it/official-poster-for-avatar-the-last-airbender-v0-q0qteqwf20ec1.jpeg?auto=webp&s=38159ade421ce41cb54c7b4d05c0e7e64ce83d12",
            releaseDate: "2010-07-01",
            actors: "Noah Ringer, Nicola Peltz Beckham, Jackson Rathbone, Dev Patel, Shaun Toub",
            duration: 103
        },
        {
            id: nextId++,
            title: "Star Wars: The Rise of Skywalker",
            genre: "Action, Adventure, Fantasy, Sci-Fi",
            startTime: 20.00,
            endTime: 22.00,
            description: "The surviving members of the Resistance face the First Order once again as the final chapter of the Skywalker saga unfolds. Rey, Finn, and Poe Dameron must embark on a dangerous journey to confront their destiny and a powerful new threat in Emperor Palpatine, bringing the ancient conflict between the Jedi and Sith to a climactic end.",
            directors: "J.J. Abrams",
            writers: "Chris Terrio, J.J. Abrams (Screenplay); Derek Connolly, Colin Trevorrow, J.J. Abrams, Chris Terrio (Story)",
            posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUZk6bM5T5EK-XhjMPD6RxcFxNF3-IwgOyA&s",
            releaseDate: "2019-12-20",
            actors: "Daisy Ridley, John Boyega, Oscar Isaac, Adam Driver, Carrie Fisher, Mark Hamill, Ian McDiarmid, Billy Dee Williams",
            duration: 142
        },
        {
            id: nextId++,
            title: "Avengers: Endgame",
            genre: "Action, Adventure, Sci-Fi",
            startTime: 20.00,
            endTime: 22.00,
            description: "After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
            directors: "Anthony Russo, Joe Russo",
            writers: "Christopher Markus, Stephen McFeely, Stan Lee (characters)",
            posterUrl: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
            releaseDate: "2019-04-26",
            actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth, Scarlett Johansson",
            duration: 181
        }
    ];

    await MovieModel.insertMany(movies);

    res.status(200).json({ message: 'Databasen är seedad' });
}

async function getAllMovies(req, res) {
    const movies = await MovieModel.find();
    if (!movies) {
        return res.status(404).json({ error: 'Inga filmer i databasen' });
    }
    res.json(movies)
}

async function getMovieById(req, res) {
    const id = req.params.id;
    const movie = await MovieModel.findOne({ _id: id });

    if (!movie) {
        return res.status(404).json({ error: `Filmen med id ${id} existerar inte` });
    }
    res.json(movie);
}

async function addNewMovie(req, res) {
    // Hitta ID för sista filmen för att generera nästa ID i kedjan
    const lastMovie = await MovieModel.findOne().sort({ id: -1 });
    const nextId = lastMovie ? lastMovie.id + 1 : 1;

    const { title, description, genre, duration, releaseDate, posterUrl, director, cast } = req.body;

    if (!title || !description || !genre || !duration) {
        return res.status(400).json({ error: 'Missing required fields.' })
    }

    try {
        const newMovie = await MovieModel.create({
            id: nextId, title: title, description: description, genre: genre, duration: duration, releaseDate: releaseDate, posterUrl: posterUrl, director: director, cast: cast
        });

        if (!newMovie) {
            res.status(404).json({ err: 'error 404' })
        }
        res.status(201).json(newMovie)
    } catch (err) {
        res.json(err);
    };
}

async function editMovieById(req, res) {
    const id = parseInt(req.params.id);

    const movie = await MovieModel.findOneAndUpdate({ id: id }, req.body, { new: true });

    if (!movie) {
        return res.status(404).json({ error: `Hittade ingen film med id ${id}.` })
    }

    res.status(200).json(movie);
}

async function deleteMovie(req, res) {
    const id = parseInt(req.params.id);
    const movie = await MovieModel.findOne({ id: id });

    if (!movie) {
        return res.status(404).json({ error: `Det finns ingen film med id ${id} att ta bort.` })
    }

    await MovieModel.deleteOne({ id: id })

    res.status(204).json({ message: 'Filmen är borttagen' });
}

export default {
    resetMovies,
    getAllMovies,
    getMovieById,
    addNewMovie,
    editMovieById,
    deleteMovie
}