import express from 'express';
import bookingsController from '../controllers/bookingsController.js'
import checkApiKey from '../middleware/checkApiKey.js';

const router = express.Router();

router.get('/bookings', checkApiKey, bookingsController.getAllBookings);

router.get('/bookings/:id', checkApiKey, bookingsController.getBookingById);

router.get('/bookings/show/:id', checkApiKey, bookingsController.getBookingWithShowId)

router.post('/bookings', /* checkApiKey, */ bookingsController.addNewBooking);

router.put('/bookings/:id', checkApiKey, bookingsController.editBooking);

router.delete('/bookings/:id', checkApiKey, bookingsController.deleteBooking);

export default router;