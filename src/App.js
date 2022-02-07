import './App.css';
import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { auth } from './firebase-config';

import Home from './pages/Home';
import Submit from './pages/Submit';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const [success, setSuccess] = useState('');
  const [showUser, setShowUser] = useState(auth?.currentUser || JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <Navbar fixed='top' bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand as={Link} to='/'>Loneliness</Navbar.Brand>
          <Nav className='me-auto'>
            {isAuth && <Nav.Link as={Link} to='/submit'>Submit</Nav.Link>}
            <Nav.Link as={Link} to='/about'>About</Nav.Link>
            <Nav.Link onClick={() => {
              if (isAuth) setShowUser(JSON.parse(localStorage.getItem('user')))
            }} as={Link} to='/login'>{isAuth ? 'Profile' : 'Login'}</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home success={success} setSuccess={setSuccess} setShowUser={setShowUser} />}/>
        <Route path='/submit' element={<Submit setSuccess={setSuccess} />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/login' element={<Login isAuth={isAuth} setIsAuth={setIsAuth} user={showUser}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
