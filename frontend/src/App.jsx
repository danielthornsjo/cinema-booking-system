import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './layout/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import SeatPicker from './pages/SeatPicker';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AdminBookings from './components/admin/AdminBookings';
import Start from './components/admin/Start';
import AdminMovies from './components/admin/AdminMovies'
import AdminHalls from './components/admin/AdminHalls';

function App() {


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
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="start" element={<Start />} />
            <Route path="bookings" element={<AdminBookings />} />
            <Route path="movies" element={<AdminMovies />} />
            <Route path="halls" element={<AdminHalls />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App