import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './layout/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Movie from './pages/Movie';
import SeatPicker from './pages/SeatPicker';

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App