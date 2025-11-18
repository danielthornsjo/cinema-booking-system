import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true },
    roomNumber: { type: Number, required: true },
    // capacity: { type: Number, required: true, },
    seatMap: {
        type: [
            {
                seatId: { type: String, required: true },
                booked: { type: Boolean, default: false }
            }
        ],
        default: []
    },
});

const HallModel = mongoose.model('Hall', hallSchema);

export default HallModel;