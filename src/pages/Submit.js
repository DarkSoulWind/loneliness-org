import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { Alert, Form, Card, Button, Container } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const FilterProfanity = require('leo-profanity');

const Submit = ({ setSuccess }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const postsCollectionRef = collection(db, 'posts');

    const submitPost = async () => {
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
        if (response) {
            const file = await response.json();
            setImage(file.secure_url)
            console.log(file);
            setLoading(false);
        }
    }

    const checkIfValid = () => {
        if (title.length < 10) {
            setError('Your title must be at least 10 characters long.')
            return false;
        } else if (description.length < 100) {
            setError('Your description must be at least 100 characters long.')
            return false;
        } else if (FilterProfanity.check(title)) {
            setError('Please remove any profanity words from the title.');
            return false;
        } else if (FilterProfanity.check(description)) {
            setError('Please remove any profanity words from the description.');
            return false;
        }

        return true;
    }

    const submitClicked = e => {
        e.preventDefault();
        if (!checkIfValid()) return;

        confirmAlert({
            title: 'Confirm submission',
            message: 'Are you sure you want to submit this post?',
            buttons: [{
                label: 'Post',
                onClick: () => submitPost()
            },
            {
                label: 'Cancel',
                onClick: () => {return}
            }]
        })
    }

    return (
        <Container style={{'padding' : '5em 0em 12em 0em'}}>
            <Card>
                <Card.Body>
                    <h2>Submit a post</h2>
                    <Form>
                        <Form.Group className='mb-3'>
                            <Form.Label>Title:</Form.Label>
                            <Form.Control onChange={e => setTitle(e.target.value)} placeholder='Post title...'/>
                            {title.length < 10 && <Form.Text>Please make your title {10 - title.length} characters long.</Form.Text>}
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
                            <Button size='lg' onClick={submitClicked}>Submit</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
            
        </Container>
    );
};

export default Submit;
