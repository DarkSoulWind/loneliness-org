import './App.css';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';

import Home from './pages/Home';
import Submit from './pages/Submit';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  return (
    <Router>
      <nav>
        <Link className='link' to='/'>Home</Link>
        {isAuth && <Link className='link' to='/submit'>Submit a post</Link>}
        <Link className='link' to='/about'>About</Link>
        <Link className='link' to='/login'>{isAuth ? 'Logout' : 'Login'}</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/submit' element={<Submit />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
