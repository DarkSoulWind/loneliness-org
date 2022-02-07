import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';
import { CircularProgress } from '@material-ui/core';
import { Container, Alert, Button } from 'react-bootstrap';

import Post from '../components/Post';

const Home = ({ success, setSuccess, setShowUser }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState(5);

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
  }, [setPosts]);

  return (
      <Container style={{'padding' : '4em 0em 2em 0em'}}>
        {success && <Alert onClose={() => setSuccess('')} variant='success' dismissible>{success}</Alert>}
        {loading && <CircularProgress size='10rem'/>}
        {posts.slice(0, visibility).map((post, index) => (
          <Post post={post} setSuccess={setSuccess} posts={posts} setPosts={setPosts} setShowUser={setShowUser} key={index} />
        ))}
        {visibility < posts.length && <Button style={{'margin' : '20px 0px 10px 10px'}} onClick={() => setVisibility(visibility + 5)}>Show more</Button>}
      </Container>
  );
};

export default Home;
