import BookingModel from "../models/bookingsModel.js";
import ShowModel from "../models/showModel.js";

async function getAllBookings(req, res) {
    const bookings = await BookingModel.find().populate({
        path: 'show',
        populate: { path: 'movie' }
    });

    if (!bookings) {
        return res.status(404).json({ error: 'Hittade inga bokningar i databasen' });
    }

    res.status(200).json(bookings)
}

async function getBookingById(req, res) {
    const { id } = req.params;

    const booking = await BookingModel.findOne({ id: id }).populate({
        path: 'show',
        populate: { path: 'movie' }
    });

    if (!booking) {
        return res.status(404).json({ error: `Hittade ingen bokning med id ${id}` });
    }

    res.status(200).json(booking)
}

async function addNewBooking(req, res) {
    try {
        // Plocka ut data från req.body
        const { email, show, seats, totalPrice } = req.body;

        // Felmeddelande om fält inte är ifyllda
        if (!email || !show || !seats || !totalPrice) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Kolla id på senaste bokning och sätt +1 på nästkommande boknings id
        const lastBooking = await BookingModel.findOne().sort({ id: -1 });
        const nextBookingId = lastBooking ? lastBooking.id + 1 : 1000;

        const existingBooking = await BookingModel.findOne({ email, show })

        if (existingBooking) {
            return res.status(409).json({ error: 'Bokning för vald show finns redan' })
        }

        // Hämta specifik show för att kunna uppdatera seatMap för vald föreställning/film
        const show1 = await ShowModel.findById(show);
        const seatMap = show1.seatMap;

        // Kontrollera att valda platser inte redan är upptagna
        for (const seatId of seats) {
            const seat = seatMap.find(s => s.seatId === seatId);
            if (!seat) continue;

            if (seat.booked) {
                return res.status(409).json({ error: `Plats ${seatId} är redan bokad` })
            }
        }

        // Mappar igenom varje plats i seatMap arrayen
        show1.seatMap = seatMap.map(seat => ({
            // Kopiera allt från det gamla objektet seat
            ...seat,
            // Kontrollera om seatId finns bland de platser användare försöker boka
            // Sätt säte som bokad om användare vill boka, behåll gamla säten som bokade.
            booked: req.body.seats.includes(seat.seatId) || seat.booked
        }));

        await show1.save();

        // Skapa ny bokning
        const newBooking = await BookingModel.create({
            id: nextBookingId, email: email, show: show, seats: seats, totalPrice: totalPrice
        });

        if (!newBooking) {
            return res.status(404).json({ error: 'error 404' });
        }

        res.status(201).json(newBooking)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function deleteBooking(req, res) {
    try {
        const { id } = req.params;

        const booking = await BookingModel.findById(id).populate({
            path: 'show',
            populate: { path: 'hall' }
        });

        if (!booking) {
            return res.status(404).json({ error: `Finns ingen bokning med id ${id}` })
        }

        const show = booking.show;
        const seatsToFree = booking.seats;

        show.seatMap = show.seatMap.map(seat =>
            seatsToFree.includes(seat.seatId)
                ? { ...seat, booked: false }
                : seat
        )

        await show.save()
        await BookingModel.findByIdAndDelete(id)
        res.status(204).json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export default {
    getAllBookings,
    getBookingById,
    addNewBooking,
    deleteBooking
}