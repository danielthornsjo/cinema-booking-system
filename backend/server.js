import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import movieRoutes from './routes/moviesRoutes.js';
import showRoutes from './routes/showsRoutes.js'
import HallModel from './models/hallsModel.js';
import bookingRoutes from './routes/bookingsRoutes.js'
import seed from './seed.js';

const app = express();
app.use(express.json());
app.use(cors());

// SEED FÖR ATT TÖMMA DATABASEN OCH FYLLA PÅ MED NY DATA
app.use(seed);

// ROUTES
app.use(movieRoutes);
app.use(showRoutes);
app.use(bookingRoutes);


app.get('/halls', async (req, res) => {
    const halls = await HallModel.find();

    if (!halls) {
        return res.status(404).json({ error: 'Hittade inga salonger i databasen' });
    }

    res.json(halls)
});

app.get('/halls/:id', async (req, res) => {
    const { id } = req.params;
    const hall = await HallModel.findOne({ id: id });

    if (!hall) {
        return res.status(404).json({ error: 'Hittade inga salonger' })
    }

    return res.status(200).json(hall)
})

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`) })
    })
    .catch(err => {
        console.error('Kunde inte ansluta till MongoDB', err)
    })

export default app;