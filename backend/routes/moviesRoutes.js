import express from 'express';
import moviesController from '../controllers/moviesController.js';
import checkApiKey from '../middleware/checkApiKey.js';
import MovieModel from '../models/moviesModel.js';

const router = express.Router();

// Route för att tömma databasen, och fylla på med data
router.get('/reset/movies', moviesController.resetMovies);

// Route för att lista alla filmer
router.get('/movies', moviesController.getAllMovies);

// Route för att lista specifik film
router.get('/movies/:id', moviesController.getMovieById);

router.put('/movies/:id', checkApiKey, moviesController.editMovieById)

// Route för att ta bort en film, kontroll av API-nyckel
router.delete('/movies/:id', checkApiKey, moviesController.deleteMovie);

export default router;