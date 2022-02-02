import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';

const Submit = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const postsCollectionRef = collection(db, 'posts');

    const submitPost = async e => {
        e.preventDefault();
        if (!title && !description) {
            console.log('Empty request');
            return
        }
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
        alert('Added message!');
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
        )
        const file = await response.json();
        setImage(file.secure_url)
        console.log(file);
        setLoading(false);
    }

    return (
        <div>
            <h3>Submit a post</h3>
            <form>
                <label>Title:</label>
                <input type='text' placeholder='Post title...' onChange={e => setTitle(e.target.value)}/>
                
                <label>Description:</label>
                <input type='text' placeholder='Post description...' onChange={e => setDescription(e.target.value)}/>

                <label>Add an image:</label>
                <input type='file' name='Image file' onChange={uploadImage}/>

                {loading ? (
                    <p>Loading image...</p>
                ) : (
                    <img src={image} style={{width: '500px'}}/>
                )}

                <input type='submit' onClick={submitPost}/>
            </form>
        </div>
    );
};

export default Submit;
