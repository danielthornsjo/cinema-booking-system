import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    hall: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    price: { type: Number, required: true },
    seatMap: {
        type: [
            {
                seatId: { type: String, required: true },
                booked: { type: Boolean, default: false }
            }
        ],
        default: []
    },
})

const ShowModel = new mongoose.model('Show', showSchema);

export default ShowModel;