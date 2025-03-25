import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/register"></Route>
        <Route path="/submit"></Route>
      </Routes>
    </Router>
  )
}

export default App
