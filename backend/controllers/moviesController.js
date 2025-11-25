import MovieModel from "../models/moviesModel.js";

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

    const { title, description, genre, duration, releaseDate, posterUrl, directors, cast } = req.body;

    if (!title || !description || !genre || !duration) {
        return res.status(400).json({ error: 'Missing required fields.' })
    }

    try {
        const newMovie = await MovieModel.create({
            id: nextId, title: title, description: description, genre: genre, duration: duration, releaseDate: releaseDate, posterUrl: posterUrl, directors: directors, cast: cast
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
    const id = req.params.id;

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
    // resetMovies,
    getAllMovies,
    getMovieById,
    addNewMovie,
    editMovieById,
    deleteMovie
}