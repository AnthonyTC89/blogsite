import React, { useState } from 'react';
import axios from 'axios';
import Grow from '@material-ui/core/Grow';
import './PostsForm.css';

const defaultPost = {
  id: null,
  title: '',
  text: '',
};

const PostsForm = () => {
  const [post, setPost] = useState(defaultPost);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const btnText = post.id === null ? 'Create' : 'Update';

  const handleChange = (e) => {
    e.persist();
    setPost((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = post.id == null
        ? await axios.post('/api/posts/', post)
        : await axios.put(`/api/posts/${post.id}`, post);
      setMessage(res.statusText);
      setPost(defaultPost);
    } catch (err) {
      setMessage('error!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grow in timeout={1500}>
      <form className="form-posts" onSubmit={loading ? null : handleSubmit}>
        <h3 className="text-primary">Post</h3>
        <input
          className="form-control input-posts"
          name="title"
          placeholder="title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="form-control input-posts"
          name="text"
          rows={5}
          placeholder="text"
          value={post.text}
          onChange={handleChange}
          required
        />
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading
            ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
            : null}
          {loading ? 'Wait...' : btnText}
        </button>
        <small>{message}</small>
      </form>
    </Grow>
  );
};

export default PostsForm;
