import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Grow from '@material-ui/core/Grow';
import icons from '../icons.json';
import './PostsForm.css';

const PostsForm = ({ item, handleForm, session }) => {
  const [post, setPost] = useState(item);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const btnText = post._id === null ? 'Create' : 'Update';

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
      const config = { timeout: 5000, headers: { Authorization: `Bearer ${session.token}` } };
      const postToken = jwt.sign(post, process.env.REACT_APP_JWT_SECRET);
      const res = post._id == null
        ? await axios.post('/api/posts/', { postToken }, config)
        : await axios.put(`/api/posts/${post._id}`, { postToken }, config);
      setPost(res.data);
      setMessage(res.statusText);
    } catch (err) {
      setMessage('error!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post.user_id == null) {
      const userSession = jwt.verify(session.token, process.env.REACT_APP_JWT_SECRET);
      setPost((prev) => (
        { ...prev, user_id: userSession._id }
      ));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Grow in timeout={1500}>
      <form className="form-posts" onSubmit={loading ? null : handleSubmit}>
        <button
          className="btn bg-white"
          type="button"
          onClick={handleForm}
        >
          <img src={icons.back} alt="back" />
        </button>
        <h3 className="text-dark">Post</h3>
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
          rows={8}
          placeholder="text"
          value={post.text}
          onChange={handleChange}
          required
        />
        <button className="btn btn-dark" type="submit" disabled={loading}>
          {loading
            ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
            : null}
          {loading ? 'Wait...' : btnText}
        </button>
        <small className="text-danger">{message}</small>
      </form>
    </Grow>
  );
};

PostsForm.propTypes = {
  handleForm: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const PostsFormWrapper = connect(mapStateToProps, null)(PostsForm);

export default PostsFormWrapper;
