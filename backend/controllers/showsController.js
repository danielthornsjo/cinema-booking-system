import HallModel from "../models/hallsModel.js";
import MovieModel from "../models/moviesModel.js";
import ShowModel from "../models/showModel.js";
import { generateSeatMap } from "../utils/functions.js";

async function getAllShows(req, res) {
    const shows = await ShowModel.find().populate('movie').populate('hall');

    res.status(200).json(shows);
}

async function getShowWithId(req, res) {
    const id = req.params.id
    const show = await ShowModel.findOne({ _id: id }).populate('movie').populate('hall');

    if (!show) {
        return res.status(404).json({ error: `Finns ingen show med id ${id}.` })
    }

    res.status(200).json(show)
}

async function getMovieWithShow(req, res) {
    const movieId = req.params.id;
    const showForMovie = await ShowModel.find({ movie: movieId }).populate('hall').populate('movie').lean();

    if (showForMovie.length === 0) {
        return res.status(404).json({ error: 'Finns ingen show för filmen' })
    }

    const formatShow = showForMovie.map(show => ({
        id: show._id.toString(),
        start: show.startTime,
        end: show.endTime,
        price: show.price,
        seatMap: show.seatMap,
        hall: {
            id: show.hall._id,
            roomNumber: show.hall.roomNumber,
            seatMap: show.hall.seatMap
        },
        movie: {
            id: show.movie._id,
            title: show.movie.title,
            poster: show.movie.posterUrl
        }
    }))

    res.json(formatShow);
}

async function addNewShow(req, res) {
    const lastShow = await ShowModel.findOne().sort({ id: -1 }).populate('movie');
    const nextId = lastShow ? lastShow.id + 1 : 100;

    const { movie, hall, price, startTime } = req.body;

    const start = new Date(startTime)
    const findMovie = await MovieModel.findOne({ _id: movie });
    const endTime = new Date(start.getTime() + findMovie.duration * 60000);

    if (!movie || !start || !price) {
        return res.status(400).json({ error: 'Missing required fields.' })
    }

    const hallData = await HallModel.findById(hall);

    if (!hallData) {
        return res.status(404).json({ error: 'Ingen salong hittades.' });
    }

    const seatMap = generateSeatMap(hallData.rows, hallData.capacity);

    const newShow = await ShowModel.create({
        id: nextId,
        movie: movie,
        hall: hall,
        seatMap,
        startTime: start,
        endTime: endTime,
        price: price
    });

    if (!newShow) {
        res.status(404).json({ err: 'Error 404' });
    }

    res.status(201).json(newShow);
}

async function editShow(req, res) {
    const id = req.params.id;
    const findMovie = await MovieModel.findById(req.body.movie || show.movie);

    const start = new Date(req.body.startTime || show.startTime);
    const endTime = new Date(start.getTime() + findMovie.duration * 60000)

    console.log(endTime);
    const show = await ShowModel.findByIdAndUpdate(id, { ...req.body, endTime }, { new: true });

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
    getAllShows,
    getShowWithId,
    getMovieWithShow,
    addNewShow,
    editShow,
    deleteShowWithId
}