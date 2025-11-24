import express from "express";
import BookingModel from "./models/bookingsModel.js";
import ShowModel from "./models/showModel.js";
import HallModel from "./models/hallsModel.js";
import MovieModel from "./models/moviesModel.js";
import checkApiKey from "./middleware/checkApiKey.js";

const router = express.Router();

router.get('/reset/all', checkApiKey, async (req, res) => {
    // RESET DATABAS
    await BookingModel.deleteMany({});
    await ShowModel.deleteMany({});
    await HallModel.deleteMany({});
    await MovieModel.deleteMany({});

    // Skapa salonger
    let hallId = 1;
    const halls = [
        {
            id: hallId++,
            roomNumber: 1,
            // Mappa upp rader och kör flat för att slå ihop till en array
            capacity: 18,
            rows: ['A', 'B']
            /*             seatMap: ['A', 'B'].flatMap(row =>
                            Array.from({ length: 9 }, (_, i) => ({
                                seatId: `${row}${i + 1}`,
                                booked: false
                            }))
                        ) */
        },
        {
            id: hallId++,
            roomNumber: 2,
            capacity: 27,
            rows: ['A', 'B', 'C']
            /* seatMap: ['A', 'B', 'C'].flatMap(row =>
                Array.from({ length: 9 }, (_, i) => ({
                    seatId: `${row}${i + 1}`,
                    booked: false
                }))
            ) */
        }
    ]

    await HallModel.insertMany(halls)

    let movieId = 10;

    const movies = [
        {
            id: movieId++,
            title: "Fast X",
            genre: ["Action"],
            description: "The final road begins! Dom Torretto and his family have made it through thick and thin together while succeeding in various missions and fighting off multiple villains. But now Dom is put to the ultimate test when he goes up against Dante Reyes, the son of an old foe who is out to exact revenge for the death of his father. With time running out and help from new allies, Dom and his family are in for the fight of their lives against the biggest enemy they have ever faced.",
            directors: ["Louis Leterrier"],
            writers: ["Dan Mazeau", "Justin Lin", "Zach Dean"],
            posterUrl: 'https://imusic.b-cdn.net/images/item/original/934/5053083257934.jpg?fast-x-2023-fast-x-dvd&class=scaled&v=1693845007',
            releaseDate: new Date("2023-05-17"),
            actors: ["Vin Diesel", "Michelle Rodriguez", "Tyrese Gibson", "Ludacris", "John Cena"],
            duration: 141
        },
        {
            id: movieId++,
            title: "Predator Badlands",
            genre: ["Sci-Fi"],
            description: "A young Predator outcast from his clan finds an unlikely ally on his journey in search of the ultimate adversary.",
            directors: ["Dan Trachtenberg"],
            writers: ["Patrick Aison", "Jim Thomas", "John Thomas"],
            posterUrl: 'https://media.outnow.ch/Movies/Bilder/2025/Predator-Badlands/014.png',
            releaseDate: new Date("2025-11-05"),
            actors: ["Elle Fanning", "Dimitrius Schuster-Koloamatangi", "Michael Homick", "Reuben De Jong", "Alison Wright"],
            duration: 107
        },
        {
            id: movieId++,
            title: "Avatar: The Last Airbender",
            genre: ["Action", "Adventure", "Fantasy"],
            description: "The film follows Aang, a young Avatar who wakes up after a hundred years to find a world plagued by war. Together with his friends Katara and Sokka, he must travel to the North Pole to master waterbending and stop the Fire Nation's expansion.",
            directors: ["M. Night Shyamalan"],
            writers: ["M. Night Shyamalan"],
            posterUrl: "https://preview.redd.it/official-poster-for-avatar-the-last-airbender-v0-q0qteqwf20ec1.jpeg?auto=webp&s=38159ade421ce41cb54c7b4d05c0e7e64ce83d12",
            releaseDate: new Date("2010-07-01"),
            actors: ["Noah Ringer", "Nicola Peltz Beckham", "Jackson Rathbone", "Dev Patel", "Shaun Toub"],
            duration: 103
        },
        {
            id: movieId++,
            title: "Star Wars: The Rise of Skywalker",
            genre: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
            description: "The surviving members of the Resistance face the First Order once again as the final chapter of the Skywalker saga unfolds. Rey, Finn, and Poe Dameron must embark on a dangerous journey to confront their destiny and a powerful new threat in Emperor Palpatine, bringing the ancient conflict between the Jedi and Sith to a climactic end.",
            directors: ["J.J. Abrams"],
            writers: ["Chris Terrio", "J.J. Abrams", "Derek Connolly", "Colin Trevorrow"],
            posterUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzUZk6bM5T5EK-XhjMPD6RxcFxNF3-IwgOyA&s",
            releaseDate: new Date("2019-12-20"),
            actors: ["Daisy Ridley", "John Boyega", "Oscar Isaac", "Adam Driver", "Carrie Fisher", "Mark Hamill", "Ian McDiarmid", "Billy Dee Williams"],
            duration: 142
        },
        {
            id: movieId++,
            title: "Avengers: Endgame",
            genre: ["Action", "Adventure", "Sci-Fi"],
            description: "After the devastating events of Infinity War, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
            directors: ["Anthony Russo", "Joe Russo"],
            writers: ["Christopher Markus", "Stephen McFeely", "Stan Lee"],
            posterUrl: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SY679_.jpg",
            releaseDate: new Date("2019-04-26"),
            actors: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth", "Scarlett Johansson"],
            duration: 181
        }
    ];

    await MovieModel.insertMany(movies);

    const findMovies = await MovieModel.find();
    const findHalls = await HallModel.find();

    let showId = 100;
    const startDates = [
        new Date('2025-11-23T14:30:00Z'),
        new Date('2025-11-23T18:00:00Z'),
    ];

    const shows = [];

    for (let i = 0; i < findMovies.length; i++) {
        const movie = findMovies[i];
        const hall = findHalls[i % findHalls.length];
        const rows = hall.rows;
        const seatsPerRow = hall.capacity / rows.length;

        const seatMap = rows.flatMap(row =>
            Array.from({ length: seatsPerRow }, (_, i) => ({
                seatId: `${row}${i + 1}`,
                booked: false
            }))
        );

        const start = startDates[i % startDates.length];

        const bookings = await BookingModel.find().populate('show');

        for (const booking of bookings) {
            const hall = await HallModel.findById(booking.show.hall);

            hall.seatMap = hall.seatMap.map(seat => ({
                ...seat,
                booked: booking.seats.includes(seat.seatId) || seat.booked
            }));

            await hall.save();
        }

        shows.push({
            id: showId++,
            movie: movie._id,
            hall: hall._id,
            seatMap,
            startTime: start,
            endTime: new Date(start.getTime() + movie.duration * 60000),
            price: 100 + i * 20
        });
    }

    const insertedShows = await ShowModel.insertMany(shows);
    console.log(`${insertedShows.length} shows skapade!`);


    /*     // Skapa ett datum för att kunna räkna ut sluttid beronde på filmens speltid
        const start = new Date('2025-11-11T14:30:00Z');
    
        const shows = [
            {
                id: showId++,
                movie: findMovies[0]._id,
                hall: findHalls[0]._id,
                seatMap: rows.flatMap(row => Array.from(findHalls[0].capacity)),
                startTime: start,
                endTime: new Date(start.getTime() + findMovies[0].duration * 60000),
                price: 120
            },
            {
                id: showId++,
                movie: findMovies[1]._id,
                hall: findHalls[1]._id,
                seatMap: findHalls[1],
                startTime: start,
                endTime: new Date(start.getTime() + findMovies[1].duration * 60000),
                price: 100
            }
        ];
    
    
    
        console.log(findHalls[0].capacity); */


    // const insertedShows = await ShowModel.insertMany(shows)

    /*     let bookingId = 1000;
    
        await BookingModel.insertMany([
            {
                id: bookingId++,
                email: "danielthornsjo@live.se",
                show: insertedShows[0]._id,
                seats: ['A1', 'A2'],
                totalPrice: insertedShows[0].price * 2
            },
            {
                id: bookingId++,
                email: 'daniel@danielthornsjo.se',
                show: insertedShows[1]._id,
                seats: ['B1', 'B2', 'B3', 'B4'],
                totalPrice: insertedShows[1].price * 4
            }]);
     */


    res.status(200).json({ message: 'Databasen är seedad' })
});

export default router;