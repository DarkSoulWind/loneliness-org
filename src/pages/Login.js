import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

import LoginPage from '../components/LoginPage';
import ProfilePage from '../components/ProfilePage';

const Login = ({ isAuth, setIsAuth, user }) => {
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
        <div style={{'padding' : '4em 0em 1em 0em'}}>
            

            {isAuth ? (
                <ProfilePage signUserOut={signUserOut} user={user} />
            ) : (
                <LoginPage loading={loading} signUserIn={signInWithGoogle} />
            )}
        </div>
    );
};

export default Login;
