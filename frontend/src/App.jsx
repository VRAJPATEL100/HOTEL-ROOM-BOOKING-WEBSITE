import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Rooms from './pages/Rooms';
import SingleRoom from './pages/SingleRoom';
import Error from './pages/Error';
import Navbar from './components/Navbar';
import About from './pages/About';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Booknow from './pages/Booknow';
import Register from './pages/Register'
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/about" element={<About/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/contact" element={<Contact/>} />
          <Route exact path="/rooms/" element={<Rooms/>}/>
          <Route exact path="/room/:id" element={<SingleRoom/>} />
          <Route exact path="/booknow/:id" element={<Booknow/>} />
          <Route exact path="/bookings/:id" element={<Bookings/>} />
          <Route exact path="/profile" element={<Profile/>} />
          <Route path="*" element={<Error/>}/>
        </Routes>
        <Footer/>
      </HashRouter>
    </div>
  );
}

export default App;
