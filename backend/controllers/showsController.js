import ShowModel from "../models/showModel.js";

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
    getAllShows,
    getShowWithId,
    getMovieWithShow,
    addNewShow,
    editShow,
    deleteShowWithId
}