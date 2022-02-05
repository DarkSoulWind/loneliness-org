import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage';

const Login = ({ isAuth, setIsAuth }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const signInWithGoogle = () => {
        setLoading(true);
        signInWithPopup(auth, provider).then(result => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            setLoading(false);
            navigate('/');
        })
        .catch(() => {
            setLoading(false);
        })
    }

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
        })
    }

    return (
        <div style={{'paddingTop' : '4em'}}>
            {isAuth ? (
                <ProfilePage signUserOut={signUserOut} />
            ) : (
                <LoginPage loading={loading} signUserIn={signInWithGoogle} />
            )}
        </div>
    );
};

export default Login;
