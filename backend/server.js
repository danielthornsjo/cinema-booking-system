import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import movieRoutes from './routes/moviesRoutes.js';
import showRoutes from './routes/showsRoutes.js'
import hallsModel from './models/hallsModel.js'
import URI from './serverUri.js';
import ShowModel from './models/showModel.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(movieRoutes);
app.use(showRoutes);


/* app.get('/reset/halls', async (req, res) => {
    await hallsModel.deleteMany({});

    const shows = await ShowModel.find();

    if (shows.length === 0) {
        return res.status(400).json({ error: 'Inga föreställningar finns i databasen' });
    }

    let nextId = 1;

    const halls = [
        {
            id: nextId++,
            roomNumber: 1,
            seatMap: [
                { seatId: 'A1', booked: false },
                { seatId: 'A2', booked: false },
                { seatId: 'A3', booked: false },
                { seatId: 'A4', booked: false },
                { seatId: 'A5', booked: false },
                { seatId: 'A6', booked: false },
                { seatId: 'A7', booked: false },
                { seatId: 'A8', booked: false },
                { seatId: 'A9', booked: false },
                { seatId: 'B1', booked: false },
                { seatId: 'B2', booked: false },
                { seatId: 'B3', booked: false },
                { seatId: 'B4', booked: false },
                { seatId: 'B5', booked: false },
                { seatId: 'B6', booked: false },
                { seatId: 'B7', booked: false },
                { seatId: 'B8', booked: true },
                { seatId: 'B9', booked: true },
            ]
        },
        {
            id: nextId++,
            roomNumber: 2,
            seatMap: [
                { seatId: 'A1', booked: false },
                { seatId: 'A2', booked: false },
                { seatId: 'A3', booked: false },
                { seatId: 'A4', booked: false },
                { seatId: 'A5', booked: false },
                { seatId: 'A6', booked: false },
                { seatId: 'A7', booked: false },
                { seatId: 'A8', booked: false },
                { seatId: 'A9', booked: false },
                { seatId: 'B1', booked: false },
                { seatId: 'B2', booked: false },
                { seatId: 'B3', booked: false },
                { seatId: 'B4', booked: false },
                { seatId: 'B5', booked: false },
                { seatId: 'B6', booked: false },
                { seatId: 'B7', booked: false },
                { seatId: 'B8', booked: true },
                { seatId: 'B9', booked: true },
            ]
        },
    ]

    await hallsModel.insertMany(halls);
    res.status(200).json({ message: 'Databasen är seedad med salonger.' })


})


app.get('/halls', async (req, res) => {
    const halls = await hallsModel.find();

    halls.map(hall =>
        console.log(hall.seatMap)

    )


});

app.get('/halls/:id', async (req, res) => {
    const { id } = req.params;
    const hall = await hallsModel.findOne({ id: id });

    if (!hall) {
        return res.status(404).json({ error: 'Hittade inga salonger' })
    }

    return res.status(200).json(hall)
}) */

mongoose.connect(process.env.DB_URL || URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`) })
    })
    .catch(err => {
        console.error('Kunde inte ansluta till MongoDB', err)
    })

export default app;