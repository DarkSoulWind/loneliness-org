import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';
import { Container, Alert, Button, Spinner } from 'react-bootstrap';

import Post from '../components/Post';
import NetworkDetector from '../hoc/NetworkDetector';

const Home = ({ success, setSuccess, setShowUser, isDisconnected, setIsDisconnected }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(5);
  const [error, setError] = useState('');

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const postsCollectionRef = collection(db, 'posts');
      const q = query(postsCollectionRef, orderBy('date'));
      const data = await getDocs(q);
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).reverse());
      setLoading(false);
    }

    getPosts();

    return 
  }, [setPosts, isDisconnected]);

  return (
      <Container style={{'padding' : '4em 0em 12em 0em'}}>
        <NetworkDetector isDisconnected={isDisconnected} setIsDisconnected={setIsDisconnected} />
        {success && <Alert onClose={() => setSuccess('')} variant='success' dismissible>{success}</Alert>}
        {error && <Alert onClose={() => setError('')} variant='error'>{error}</Alert>}
        {loading && <Spinner style={{'height' : '10em', 'width' : '10em'}} animation='border' variant='primary'/>}
        {posts.slice(0, visibility).map((post, index) => (
          <Post post={post} setSuccess={setSuccess} posts={posts} setPosts={setPosts} setShowUser={setShowUser} key={index} />
        ))}
        {visibility < posts.length && <Button style={{'margin' : '20px 0px 10px 10px'}} onClick={() => setVisibility(visibility + 5)}>Show more</Button>}
      </Container>
  );
};

export default Home;
