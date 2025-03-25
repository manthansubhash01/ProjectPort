import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Registration from './components/Registration';
import Submission from './components/Submission';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register" element={<Registration/>}></Route>
        <Route path="/submit" element={<Submission/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
