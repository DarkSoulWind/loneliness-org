import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { Container, Button, Card, ListGroup } from 'react-bootstrap';

const ProfilePage = ({ signUserOut }) => {
    const [posts, setPosts] = useState([]);
    const user = auth?.currentUser || JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const getPosts = async () => {
            const postsCollectionRef = collection(db, 'posts');
            const q = query(postsCollectionRef, orderBy('date'));
            const data = await getDocs(q);
            setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(post => post.displayname == user.displayName).reverse().slice(0, 5));
        }

        getPosts();
    }, [setPosts])

    return (
        <Container style={{'marginTop' : '1em', 'marginBottom' : '1em'}}>
            <Card>
                <Card.Header as='h1'>{user.displayName}</Card.Header>
                <Card.Img sizes='sm' variant='top' src={user.photoURL}/>
                <Card.Body>
                    <Card>
                        <Card.Header as='h4'>Recent posts:</Card.Header>
                        {posts.length > 0 ? (
                        <ListGroup variant='flush'>
                            {posts.map((post, index) => (
                                <div key={index}>
                                    <ListGroup.Item>
                                        <strong>{post.date.toDate().toDateString()}:</strong> {post.description}
                                    </ListGroup.Item>
                                </div>
                            ))}
                        </ListGroup>) : (
                            <Card.Body>
                                <Card.Subtitle>No recent posts to show.</Card.Subtitle>
                            </Card.Body>
                        )}
                    </Card>
                </Card.Body>
            </Card>
            <Button style={{'marginTop' : '1em'}} onClick={signUserOut}>Sign out</Button>
        </Container>
    );
};

export default ProfilePage;
