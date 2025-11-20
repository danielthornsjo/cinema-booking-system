import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './layout/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import SeatPicker from './pages/SeatPicker';
import { useEffect, useState } from 'react';
import Login from './pages/Login';

function App() {
  /*   const [bookings, setBookings] = useState([]);
    useEffect(() => {
      fetch("http://localhost:3000/bookings")
        .then(res => res.json())
        .then(data => setBookings(data)
        )
    }, []) */

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>Hem</Route>
          <Route path="/movies" element={<Movies />}>Våra filmer</Route>
          <Route path="/movie/:movieId" element={<Movie />}></Route>
          <Route path="/seatpicker/:showId" element={<SeatPicker />}></Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/* <p>{bookings.map(booking => (<p>{booking.email}</p>))}</p> */}

    </>
  )
}

export default App