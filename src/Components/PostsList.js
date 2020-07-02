import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const getPosts = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
      if (res.data.length === 0) {
        setMessage("You don't have posts");
      }
    } catch (err) {
      setMessage('error!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <div className="container text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="container text-center">
        <h4>
          {message}
        </h4>
      </div>
    );
  }
  return (
    <div className="container text-center">
      <h3> My posts </h3>
      <div className="row">
        {posts.map((post) => (
          <div className="card col-3">
            <div className="card-body">
              <h5 className="card-title">
                {post.title}
              </h5>
              <p className="card-text">
                {post.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;
