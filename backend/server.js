import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import movieRoutes from './routes/moviesRoutes.js';
import URI from './serverUri.js';
import ShowModel from './models/showModel.js';
import MovieModel from './models/moviesModel.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(movieRoutes);

app.get('/reset/shows', async (req, res) => {
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

});

app.get('/shows', async (req, res) => {
    const shows = await ShowModel.find().populate('movie');

    res.status(200).json(shows);
});

app.get('/shows/movie/:id', async (req, res) => {
    const movieId = req.params.id;
    const showForMovie = await ShowModel.find({ movie: movieId }).populate('movie');

    if (showForMovie.length === 0) {
        return res.status(404).json({ error: 'Finns ingen show för filmen' })
    }

    res.json(showForMovie);
});

mongoose.connect(process.env.DB_URL || URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`) })
    })
    .catch(err => {
        console.error('Kunde inte ansluta till MongoDB', err)
    })

export default app;