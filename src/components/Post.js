import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { updateDoc, doc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Post = ({ post, setSuccess, posts, setPosts }) => {
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

    const deletePost = async () => {
        const postRef = doc(db, 'posts', post.id);
        await deleteDoc(postRef)
        .then(() => {
            setSuccess('Deleted post successfully!');
            setPosts(posts.filter(item => item !== post))
        })
    }

    const deleteClicked = () => {
        confirmAlert({
            title: 'Confirm deletion',
            message: 'Are you sure you want to delete this post?',
            buttons: [{
                label: 'Delete',
                onClick: () => deletePost()
            },
            {
                label: 'Cancel',
                onClick: () => {return}
            }]
        })
    }

    return (
        <Card style={{'marginTop' : '1em', 'marginInline' : '1em'}}>
            <Card.Header><strong>{post.displayname}</strong> at {post.date.toDate().toDateString()} {post.date.toDate().toLocaleTimeString()}</Card.Header>
            {post.image && <Card.Img variant='top' src={post.image}/>}
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>

                <FaHeart size={20} onClick={likePost} style={{ color: liked ? 'red' : 'black' }} />
                {auth?.currentUser?.displayName == post.displayname && <FaTimes size={25} onClick={deleteClicked} style={{'color' : 'black', 'marginLeft' : '1rem'}} />}
                
            </Card.Body>
            <Card.Footer>
                    {likes} {likes === 1 ? 'like' : 'likes'}
            </Card.Footer>
        </Card>
    )
  }

export default Post;
