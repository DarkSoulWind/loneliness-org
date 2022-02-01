import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';

import Home from './pages/Home';
import Submit from './pages/Submit';
import About from './pages/About';

function App() {
  return (
    <Router>
      <Link to='/'>Home</Link>
      <Link to='/submit'>Submit a post</Link>
      <Link to='/about'>About</Link>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/submit' element={<Submit />}/>
        <Route path='/about' element={<About />}/>
      </Routes>
    </Router>
  );
}

export default App;
