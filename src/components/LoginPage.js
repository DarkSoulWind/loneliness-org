import React, { useState, useEffect } from 'react';
import { Container, Button, Card } from 'react-bootstrap';

const LoginPage = ({ signUserIn, loading }) => {

    return (
        <Card style={{'marginInline' : '1em', 'textAlign' : 'center'}}>
            <Card.Body>
                <Card.Title>You must be logged in to like and post</Card.Title>
                <Button 
                    disabled={loading} 
                    onClick={!loading ? signUserIn : null}
                    >
                    {!loading ? 'Sign in with Google' : 'Signing in...'}
                </Button>
            </Card.Body>
        </Card>
    );
};

export default LoginPage;
