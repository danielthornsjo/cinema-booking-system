import express from 'express';
import showsController from '../controllers/showsController.js';
import checkApiKey from '../middleware/checkApiKey.js';

const router = express.Router();

// Route för att tömma databasen och fylla på med föreställningar
router.get('/reset/shows', checkApiKey, showsController.resetShows);

// Route för att lista alla föreställningar
router.get('/shows', showsController.getAllShows);

// Route för att lista specifik föreställning
router.get('/shows/:id', showsController.getShowWithId);

// Route för att lista show för specifik film
router.get('/shows/movie/:id', showsController.getMovieWithShow);

// Route för att lägga till en ny föreställning, med kontroll av API-nyckel
router.post('/shows', checkApiKey, showsController.addNewShow);

// Route för att redigera en föreställning, med kontroll av API-nyckel
router.put('/shows/:id', checkApiKey, showsController.editShow);

// Route för att ta bort en föreställning, med kontroll av API-nyckel
router.delete('/shows/:id', checkApiKey, showsController.deleteShowWithId);

export default router;