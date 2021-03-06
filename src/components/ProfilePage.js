import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase-config';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { Container, Button, Card, ListGroup } from 'react-bootstrap';

const ProfilePage = ({ signUserOut, user }) => {
    const [posts, setPosts] = useState([]);
    const loginDate = new Date(user?.lastLoginAt * 1);

    useEffect(() => {
        const getPosts = async () => {
            const postsCollectionRef = collection(db, 'posts');
            const q = query(postsCollectionRef, orderBy('date'));
            const data = await getDocs(q);
            setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(post => post.displayname === user?.displayName).reverse().slice(0, 5));
        }

        getPosts();
    }, [user.displayName])

    return (
        <Container style={{'padding' : '1em 0em 12em 0em'}}>
            <Card>
                <Card.Header as='h1'>{user.displayName}</Card.Header>
                <Card.Img sizes='sm' variant='top' src={user.photoURL}/>
                <Card.Body>
                    <Card.Text><strong>Last online:</strong> {loginDate.toDateString()} {loginDate.toLocaleTimeString()}</Card.Text>

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
            {user.uid === auth?.currentUser?.uid && <Button style={{'marginTop' : '1em'}} onClick={signUserOut}>Sign out</Button>}
        </Container>
    );
};

export default ProfilePage;
