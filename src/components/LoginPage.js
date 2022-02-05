import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';

const LoginPage = ({ signUserIn, loading }) => {

    return (
        <Container>
            <Button 
                disabled={loading} 
                onClick={!loading ? signUserIn : null}
            >
                {!loading ? 'Sign in with Google' : 'Signing in...'}
            </Button>
        </Container>
    );
};

export default LoginPage;
