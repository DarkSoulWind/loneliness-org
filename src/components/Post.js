import React, { useState, forwardRef } from 'react';
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
        <Card style={{'marginTop' : '1em', 'marginInline' : '1em'}}>
            <Card.Header><strong>{post.displayname}</strong> at {post.date.toDate().toDateString()} {post.date.toDate().toLocaleTimeString()}</Card.Header>
            {post.image && <Card.Img variant='top' src={post.image}/>}
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>

                <FaHeart onClick={likePost} style={{ color: liked ? 'red' : 'black' }} />
                
            </Card.Body>
            <Card.Footer>
                    {likes} {likes === 1 ? 'like' : 'likes'}
            </Card.Footer>
        </Card>
    )
  }

export default Post;
