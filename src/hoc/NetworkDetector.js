import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';

const NetworkDetector = ({ isDisconnected, setIsDisconnected }) => {

    useEffect(() => {
        // componentDidMount
        handleConnectionChange();
        window.addEventListener('online', handleConnectionChange);
        window.addEventListener('offline', handleConnectionChange);

        //componentWillUnmount
        return () => {
            window.removeEventListener('online', handleConnectionChange);
            window.removeEventListener('offline', handleConnectionChange);
        }
    }, []);

    const handleConnectionChange = () => {
        const condition = navigator.onLine ? 'online' : 'offline';
        if (condition === 'online') {
            const webPing = setInterval(
                () => {
                    fetch('//google.com', {
                        mode: 'no-cors'
                    })
                    .then(() => {
                        setIsDisconnected(false);
                        return clearInterval(webPing);
                    }).catch(() => setIsDisconnected(true))
                }, 2000);
            return;
        }

        return setIsDisconnected(true);
    }
    
    return (
        <>
        {isDisconnected && (
            <Container>
                {isDisconnected && <Alert variant='danger'>You have been disconnected from the internet.</Alert>}
            </Container>
        )}
        </>
    )
}

export default NetworkDetector;