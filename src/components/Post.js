import React, { useState } from 'react';
import { auth, db } from '../firebase-config';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { FaHeart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
        <h3 className='title'>{post.title}</h3>
        <h4>{post.description}</h4>

        {post.image && <img src={post.image} alt={post.title} className='image'/>}
        
        <p className='likes-count'>
            <FaHeart className='likes-button' onClick={likePost} style={{ color: liked ? 'red' : 'black' }} />
            {likes} {likes === 1 ? 'like' : 'likes'}
        </p>
        
        <h5 className='timestamp'>
            {post.displayname} at {post.date.toDate().toDateString()} {post.date.toDate().toLocaleTimeString()}
        </h5>
      </div>
    )
  }

export default Post;
