import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    hall: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    availableSeats: { type: [String], required: true },
    bookedSeats: { type: [String] },
    price: { type: Number, required: true }
})

const ShowModel = new mongoose.model('Show', showSchema);

export default ShowModel;