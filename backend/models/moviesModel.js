import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id: { type: Number, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    genre: { type: [String], required: true },
    duration: { type: Number, required: true },
    releaseDate: { type: Date },
    posterUrl: { type: String },
    directors: { type: [String] },
    cast: { type: [String] },
    createdAt: { type: Date, default: Date.now }
});

const MovieModel = new mongoose.model('Movie', movieSchema);

export default MovieModel;