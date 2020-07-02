import React, { useState } from 'react';
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
  };

  return (
    <Grow in timeout={1500}>
      <form className="form-posts" onSubmit={loading ? null : handleSubmit}>
        {/* <button
          className="btn bg-white"
          type="button"
          onClick={() => history.push('/')}
        >
          <img src="https://img.icons8.com/cute-clipart/64/000000/reply-arrow.png" alt="home" />
        </button> */}
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
