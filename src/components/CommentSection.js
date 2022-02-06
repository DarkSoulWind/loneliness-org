import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Form, Row, Col, Container, Alert, Button } from 'react-bootstrap';
import { db, auth } from '../firebase-config';
import { collection, query, orderBy, getDocs, Timestamp, addDoc } from 'firebase/firestore';
import { FaReply } from 'react-icons/fa';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Comment from './Comment';

const FilterProfanity = require('leo-profanity');

const CommentSection = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [visibility, setVisibility] = useState(5);
    
    const commentsCollectionRef = collection(db, 'comments');

    useEffect(() => {
        const getComments = async () => {
            const q = query(commentsCollectionRef, orderBy('date'));
            const data = await getDocs(q);
            setComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).filter(doc => post.id === doc.postID));
        }

        getComments();
    }, [post.id])

    const checkIfValid = () => {
        if (!text) {
            setError('Please fill in some text.');
            return false;
        } else if (FilterProfanity.check(text)) {
            setError('Please remove the profanity from your comment.')
            return false;
        }
        return true;
    }

    const submitComment = async () => {
        if (!checkIfValid()) return;

        const data = {
            displayname: auth?.currentUser?.displayName,
            pfp: auth?.currentUser?.photoURL,
            text,
            date: Timestamp.fromDate(new Date()),
            postID: post.id
        }

        await addDoc(commentsCollectionRef, data);
        setSuccess('Comment added successfully!');
        setText('');
    }

    return (
        <Card.Body>

            {comments.length > 0 ? (<ListGroup variant='flush'>
                {comments.slice(0, visibility).map((comment, index) => (
                    <Comment comment={comment} setSuccess={setSuccess} key={index} />
                ))}
                {visibility < comments.length && <Button onClick={() => setVisibility(visibility + 5)} >Load more</Button>}
            </ListGroup>) : (
                <Card.Subtitle>No comments to show.</Card.Subtitle>
            )}

            {success && <Alert 
                onClose={() => setSuccess('')} 
                variant='success' 
                style={{'marginTop' : '1em'}} 
                dismissible
                transition
            >
                {success}
            </Alert>}

            {error && <Alert 
                onClose={() => setError('')} 
                variant='danger' 
                style={{'marginTop' : '1em'}} 
                dismissible
            >
                {error}
            </Alert>}

            <Form style={{'marginTop' : '1rem'}}>
                <Container>
                        <Row>
                            <Col>
                                <Form.Control column='lg' value={text} onChange={e => setText(e.target.value)} placeholder='Post a comment...'/>
                            </Col>
                            <Col sm={1}>
                                <FaReply size={30} onClick={submitComment} />
                            </Col>
                        </Row>
                </Container>
            </Form>
        </Card.Body>
    );
};

export default CommentSection;
