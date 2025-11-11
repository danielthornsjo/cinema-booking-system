import MovieModel from "../models/moviesModel.js";
import ShowModel from "../models/showModel.js";

async function resetShows(req, res) {
    await ShowModel.deleteMany({});

    const movies = await MovieModel.find();

    if (movies.length === 0) {
        return res.status(400).json({ error: 'Inga filmer finns i databasen' });
    }
    let nextId = 1;

    const shows = [
        {
            id: nextId++,
            movie: movies[0]._id,
            startTime: '2025-11-11T21:00:00.000Z',
            endTime: '2025-11-11T23:00:00.000Z',
            availableSeats: ['A1', 'A2', 'A3'],
            bookedSeats: ['A4', 'A5', 'A6'],
            price: 120
        },
        {
            id: nextId++,
            movie: movies[0]._id,
            startTime: '2025-11-11T14:30:00.000Z',
            endTime: '2025-11-11T16:00:00.000Z',
            availableSeats: ['A1', 'A2', 'A3'],
            bookedSeats: ['A4', 'A5', 'A6'],
            price: 120
        },
        {
            id: nextId++,
            movie: movies[1]._id,
            startTime: '2025-11-11T21:00:00.000Z',
            endTime: '2025-11-11T23:00:00.000Z',
            availableSeats: ['A1', 'A2', 'A3'],
            bookedSeats: ['A4', 'A5', 'A6'],
            price: 120
        },
    ];

    await ShowModel.insertMany(shows);
    res.status(200).json({ message: 'Databasen är seedad med shower för filmer' })
}

async function getAllShows(req, res) {
    const shows = await ShowModel.find().populate('movie');

    res.status(200).json(shows);
}

async function getShowWithId(req, res) {
    const id = req.params.id
    const show = await ShowModel.findOne({ id });

    if (!show) {
        return res.status(404).json({ error: `Finns ingen show med id ${id}.` })
    }

    res.status(200).json(show)
}

async function getMovieWithShow(req, res) {
    const movieId = req.params.id;
    const showForMovie = await ShowModel.find({ movie: movieId }).populate('movie');

    if (showForMovie.length === 0) {
        return res.status(404).json({ error: 'Finns ingen show för filmen' })
    }

    res.json(showForMovie);
}

async function addNewShow(req, res) {
    const lastShow = await ShowModel.findOne().sort({ id: -1 });
    const nextId = lastShow ? lastShow.id + 1 : 1;


    const { movie, hall, startTime, endTime, availableSeats, bookedSeats, price } = req.body;

    if (!movie || !startTime || !endTime || !price || !availableSeats) {
        return res.status(400).json({ error: 'Missing required fields.' })
    }

    const newShow = await ShowModel.create({ id: nextId, movie: movie, hall: hall, startTime: startTime, endTime: endTime, availableSeats: availableSeats, bookedSeats: bookedSeats, price: price });

    if (!newShow) {
        res.status(404).json({ err: 'Error 404' });
    }

    res.status(201).json(newShow);
}

async function editShow(req, res) {
    const id = req.params.id;

    const show = await ShowModel.findOneAndUpdate({ id: id }, req.body, { new: true });

    if (!show) {
        return res.status(404).json({ error: `Hittade ingen föreställning med id ${id}` })
    }

    res.status(200).json(show)
}

async function deleteShowWithId(req, res) {
    const id = parseInt(req.params.id);
    const show = await ShowModel.findOne({ id: id });

    if (!show) {
        return res.status(404).json({ error: `Det finns ingen föreställning med id ${id} att ta bort.` });
    }

    await ShowModel.deleteOne({ id: id });

    res.status(204).json({ message: 'Föreställningen är borttagen' });
}

export default {
    resetShows,
    getAllShows,
    getShowWithId,
    getMovieWithShow,
    addNewShow,
    editShow,
    deleteShowWithId
}