import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase-config';
import { updateDoc, doc, arrayUnion, arrayRemove, deleteDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { FaHeart, FaTimes, FaComment } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import CommentSection from './CommentSection';

const Post = ({ post, setSuccess, posts, setPosts, setShowUser }) => {
    const [liked, setLiked] = useState(post.likes.includes(auth?.currentUser?.uid) || false);
    const [likes, setLikes] = useState(post.likes.length);
    const [showComments, setShowComments] = useState(false);
    const [numComments, setNumComments] = useState(0);
    const [user, setUser] = useState({});

    const navigate = useNavigate();
    const commentsCollectionRef = collection(db, 'comments');
    const usersCollectionRef = collection(db, 'users');

    useEffect(() => {
        const getNumComments = async () => {
            const q = query(commentsCollectionRef, where('postID', '==', post.id));
            const data = await getDocs(q);
            setNumComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).length);
        }

        getNumComments();
    }, [commentsCollectionRef, post.id])

    useEffect(() => {
        const getUser = async () => {
            const q = query(usersCollectionRef, where('displayName', '==', post.displayname));
            const data = await getDocs(q);
            setUser(data.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0]);
        }

        getUser();
    }, [])

    const likePost = async () => {
        if (!auth.currentUser) {
            mustBeSignedInPrompt('Login to your account before you can start liking posts.')
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

    const mustBeSignedInPrompt = reason => {
        confirmAlert({
            title: 'Must be logged in',
            message: reason,
            buttons: [{
                label: 'Go to login page',
                onClick: () => navigate('/login')
            },
            {
                label: 'Cancel',
                onClick: () => {return}
            }]
        })
    }

    const commentsClicked = () => {
        if (auth?.currentUser) {
            setShowComments(!showComments);
        } else {
            mustBeSignedInPrompt('Login to your account before you can start viewing comments.')
        }
    }

    return (
        <Card style={{'marginTop' : '1em', 'marginInline' : '1em'}}>
            <Card.Header>

                { user ? (<Card.Link onClick={() => {
                setShowUser(user)
                }} as={Link} to='/login'><strong>{post.displayname}</strong>
                </Card.Link>) : (<strong>{post.displayname}</strong>)} at {post.date.toDate().toDateString()} {post.date.toDate().toLocaleTimeString()}
            </Card.Header>
            {post.image && <Card.Img variant='top' src={post.image}/>}
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.description}</Card.Text>

                <FaHeart size={20} onClick={likePost} style={{ color: liked ? 'red' : 'black' }} />
                <FaComment size={20} onClick={commentsClicked} style={{ 'marginLeft' : '1rem' }} />
                {auth?.currentUser?.displayName === post.displayname && <FaTimes size={25} onClick={deleteClicked} style={{'color' : 'black', 'marginLeft' : '1rem'}} />}
                
            </Card.Body>
            <Card.Footer>
                    {likes} {likes === 1 ? 'like' : 'likes'} • {numComments} {numComments === 1 ? 'comment' : 'comments'}
            </Card.Footer>

            {showComments && <CommentSection setNumComments={setNumComments} post={post} />}
        </Card>
    )
  }

export default Post;
