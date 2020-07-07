import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
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
      console.log(post);
      const res = post._id == null
        ? await axios.post('/api/posts/', post, { timeout: 5000 })
        : await axios.put(`/api/posts/${post._id}`, post, { timeout: 5000 });
      setPost(res.data);
      setMessage(res.statusText);
    } catch (err) {
      setMessage('error!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (post.userID == null) {
      setPost((prev) => (
        { ...prev, userID: session.user._id }
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
