import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import movieRoutes from './routes/moviesRoutes.js';
import showRoutes from './routes/showsRoutes.js'
import URI from './serverUri.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(movieRoutes);
app.use(showRoutes)

mongoose.connect(process.env.DB_URL || URI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`) })
    })
    .catch(err => {
        console.error('Kunde inte ansluta till MongoDB', err)
    })

export default app;