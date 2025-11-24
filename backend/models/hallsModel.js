import mongoose from "mongoose";

const hallSchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true },
    roomNumber: { type: Number, required: true },
    capacity: { type: Number, required: true, },
    rows: { type: [String], required: true }
});

const HallModel = mongoose.model('Hall', hallSchema);

export default HallModel;