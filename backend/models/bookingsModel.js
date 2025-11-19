import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true },
    email: { type: String, required: true },
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    seats: [{ type: String, required: true }],
    bookingTime: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true }
});

const BookingModel = new mongoose.model('Booking', bookingSchema);

export default BookingModel;