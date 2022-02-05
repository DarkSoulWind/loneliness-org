import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { Alert, Form, Card, Button, Container } from 'react-bootstrap';

const Submit = ({ setSuccess }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const postsCollectionRef = collection(db, 'posts');

    const submitPost = async e => {
        e.preventDefault();
        if (title.length < 20) {
            setError('Your title must be at least 20 characters long.')
            return
        } else if (description.length < 100) {
            setError('Your description must be at least 100 characters long.')
            return
        }
        
        setError('')
        console.log(auth.currentUser.displayName);
        const data = {
            title,
            description,
            image,
            displayname: auth.currentUser.displayName,
            date: Timestamp.fromDate(new Date()),
            likes: []
        }

        await addDoc(postsCollectionRef, data);
        console.log('Submitted!');
        setSuccess('Post submitted successfully!')
        navigate('/');
    }

    const uploadImage = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'loneliness');
        setLoading(true);
        const response = await fetch(
            'https://api.cloudinary.com/v1_1/djrqimnl0/image/upload',
            {
                method: 'POST',
                body: data
            }
        ).then(() => {
            setError('');
        })
        .catch(err => {
            console.log(err);
            setError('Unable to upload file - contents too large.');
            setLoading(false);
        })
        const file = await response.json();
        setImage(file.secure_url)
        console.log(file);
        setLoading(false);
    }

    return (
        <Container style={{'marginTop' : '5em'}}>
            <Card>
                <Card.Body>
                    <h2>Submit a post</h2>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control onChange={e => setTitle(e.target.value)} placeholder='Post title...'/>
                            {title.length < 20 && <Form.Text>Please make your title {20 - title.length} characters long.</Form.Text>}
                        </Form.Group>

                        <Form.Group className='mb-3'>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control onChange={e => setDescription(e.target.value)} as='textarea' placeholder='Post title...'/>
                            {description.length < 100 && <Form.Text>Please make your description {100 - description.length} characters long.</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Add an image:</Form.Label>
                            <Form.Control onChange={uploadImage} type="file" />
                            {loading ? (
                                <p>Loading image...</p>
                                ) : (
                                    image && <img src={image} style={{width: '500px'}} alt='uploaded'/>
                                )
                            }
                        </Form.Group>
                        
                        {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
                        <div className='d-grid gap-2'>
                            <Button size='lg' onClick={submitPost}>Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            
        </Container>
    );
};

export default Submit;
