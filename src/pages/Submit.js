import React, { useState } from 'react';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const Submit = () => {
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
        <div className='submitPostPage'>
            <div className='submitPostContainer'>
                <h2>Submit a post</h2>
                <form>
                    <label>Title:</label>
                    <input className='inputPost' type='text' placeholder='Post title...' onChange={e => setTitle(e.target.value)}/>
                    {title.length < 20 && <h5>Please make your title {20 - title.length} characters longer.</h5>}
                    
                    <label>Description:</label>
                    <textarea 
                        className='inputPost' 
                        placeholder='Post description...' 
                        style={{ 'height': '200px' }}
                        onChange={e => setDescription(e.target.value)}
                    />
                    {description.length < 100 && <h5>Please make your description {100 - description.length} characters longer.</h5>}

                    <label>Add an image:</label>
                    <div className='inputPost'>
                        <input type='file' name='Image file' onChange={uploadImage}/>

                        {loading ? (
                            <p>Loading image...</p>
                        ) : (
                            image && <img src={image} style={{width: '500px'}} alt='uploaded'/>
                        )}
                    </div>

                    {error && <Alert variant='danger' onClose={() => setError('')} dismissible>{error}</Alert>}
                    <input className='submitPost' type='submit' onClick={submitPost}/>
                </form>
            </div>
        </div>
    );
};

export default Submit;
