import React from 'react';
import { useNavigate } from 'react-router-dom';

const Submit = () => {
    const navigate = useNavigate();

    const submitPost = e => {
        e.preventDefault();
        console.log('Submitted!')
        navigate('/');
    }

    return (
        <div>
            <h3>Submit to me</h3>
            <form>
                <label>Title:</label>
                <input type='text' placeholder='Post title...'/>
                
                <label>Description:</label>
                <input type='text' placeholder='Post description...'/>

                <input type='submit' onClick={submitPost}/>
            </form>
        </div>
    );
};

export default Submit;
