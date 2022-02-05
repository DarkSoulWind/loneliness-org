import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Post = ({ post }) => {
    const [liked, setLiked] = useState(post.likes.includes(auth?.currentUser?.uid) || false);
    const [likes, setLikes] = useState(post.likes.length);
    const navigate = useNavigate();

    const likePost = async () => {
        if (!auth.currentUser) {
            navigate('/login');
            return;
        }

        const postRef = doc(db, 'posts', post.id);
        if (liked) { // dislike
            await updateDoc(postRef, {
                likes: arrayRemove(auth?.currentUser?.uid)
            })
            setLikes(likes - 1);
            setLiked(false);
        } else { // like
            await updateDoc(postRef, {
                likes: arrayUnion(auth?.currentUser?.uid)
            })
            setLikes(likes + 1);
            setLiked(true);
        }

    }

    return (
        <div className='post'>
            <Card style={{ 'width' : '60%'}}>
                {post.image && <Card.Img variant='top' src={post.image}/>}
                <Card.Header>{post.displayname} at {post.date.toDate().toDateString()} {post.date.toDate().toLocaleTimeString()}</Card.Header>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <FaHeart onClick={likePost} style={{ color: liked ? 'red' : 'black' }} />
                    
                </Card.Body>
                <Card.Footer>
                        {likes} {likes === 1 ? 'like' : 'likes'}
                </Card.Footer>
            </Card>
        </div>
    )
  }

export default Post;
