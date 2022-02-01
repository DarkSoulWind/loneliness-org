import React from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Login = ({ isAuth, setIsAuth }) => {
    const navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then(result => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            console.log(result);
            navigate('/');
        })
    }

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
        })
    }

    return (
        <div>
            <h3>Logged in: {isAuth ? 'indeed' : 'nope not at all'}</h3>
            {isAuth ? (<button onClick={signUserOut}>Logout</button>) : (<button onClick={signInWithGoogle}>Login with google</button>)}

        </div>
    );
};

export default Login;
