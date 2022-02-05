import React, { useState, useEffect } from 'react';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase-config';
import { CircularProgress } from '@material-ui/core';

import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      const postsCollectionRef = collection(db, 'posts');
      const q = query(postsCollectionRef, orderBy('date'));
      const data = await getDocs(q);
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })).reverse());
      console.log(posts);
      setLoading(false);
    }

    getPosts();
  }, [setPosts]);

  return (
      <div style={{'paddingTop' : '4em'}}>
        {loading && <CircularProgress size='10rem'/>}
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
  );
};

export default Home;
