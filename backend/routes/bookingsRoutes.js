import express from 'express';
import bookingsController from '../controllers/bookingsController.js'
import checkApiKey from '../middleware/checkApiKey.js';

const router = express.Router();

router.get('/bookings', checkApiKey, bookingsController.getAllBookings);

router.get('/bookings/:id', checkApiKey, bookingsController.getBookingById);

router.post('/bookings', /* checkApiKey, */ bookingsController.addNewBooking);

router.delete('/bookings/:id', checkApiKey, bookingsController.deleteBooking);

export default router;