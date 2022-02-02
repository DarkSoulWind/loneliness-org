import React, { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config';

import Post from '../components/Post';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsCollectionRef = collection(db, 'posts');
      const data = await getDocs(postsCollectionRef);
      setPosts(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      console.log(posts);
    }

    getPosts();
  }, [setPosts]);

  return (
      <div>
          <h3>All posts will show up here</h3>
          {posts.map((post, index) => (
            <Post post={post} key={index} />
          ))}
      </div>
  );
};

export default Home;
