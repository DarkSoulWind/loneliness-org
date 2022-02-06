import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa';
import { auth, db } from '../firebase-config';
import { doc, deleteDoc } from 'firebase/firestore';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Comment = ({ comment, setSuccess }) => {
    const deleteComment = async () => {
        const commentRef = doc(db, 'comments', comment.id);
        await deleteDoc(commentRef)
        .then(() => {
            setSuccess('Deleted comment successfully!')
        })
    }

    const deleteClicked = () => {
        confirmAlert({
            title: 'Confirm deletion',
            message: 'Are you sure you want to delete this comment?',
            buttons: [{
                label: 'Delete',
                onClick: () => deleteComment()
            },
            {
                label: 'Cancel',
                onClick: () => {return}
            }]
        })
    }

    return (
        <div>
            <ListGroup.Item>
                <Row>
                    <Col sm={1}>
                        <img style={{'height' : '3em', 'borderRadius' : '50px'}} src={comment.pfp} alt='pfp' />
                    </Col>
                    
                    <Col>
                        <Row>
                            <Col>
                                <h6 style={{'fontSize': '10px'}}>
                                <strong>{comment.displayname}</strong> {comment.date.toDate().toDateString()} {comment.date.toDate().toLocaleTimeString()}
                                </h6>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4 style={{'fontSize' : '15px'}}>
                                    {comment.text}
                                </h4>
                            </Col>
                            <Col sm={1}>
                                {comment.displayname === auth?.currentUser?.displayName && <FaTimes onClick={deleteClicked} />}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </ListGroup.Item>
        </div>
    )
};

export default Comment;
