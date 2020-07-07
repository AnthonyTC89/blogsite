import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Grow from '@material-ui/core/Grow';
import PostsForm from './PostsForm';
import icons from '../icons.json';
import './PostsList.css';

const defaultPost = {
  _id: null,
  title: '',
  text: '',
};

const PostsList = ({ session }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(defaultPost);

  const getPosts = async () => {
    setLoading(true);
    setMessage('');
    try {
      const { user } = session;
      const res = await axios.get('/api/posts', { params: { userID: user._id } }, { timeout: 5000 });
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

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleForm = async () => {
    setShowForm(!showForm);
    await getPosts();
  };

  const handleDelete = async (item) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await axios.delete(`/api/posts/${item._id}`);
      setMessage(res.statusText);
      await getPosts();
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
  if (showForm || posts.length === 0) {
    return <PostsForm item={editItem} handleForm={handleForm} />;
  }
  return (
    <Grow in timeout={1500}>
      <div className="container text-center">
        <h2> My posts </h2>
        <p>{message}</p>
        <button
          className="btn bg-white"
          type="button"
          onClick={() => handleEdit(defaultPost)}
        >
          <img className="icon-posts" src={icons.add} alt="add" />
        </button>
        {posts.map((post) => (
          <div key={uuidv4()} className="row card post-card">
            <h3 className="card-header">{post.title}</h3>
            <div className="card-body">
              <p className="card-text">
                {post.text}
              </p>
            </div>
            <button
              className="btn bg-light btn-edit"
              type="button"
              onClick={() => handleEdit(post)}
            >
              <img className="icon-posts" src={icons.edit} alt="edit" />
            </button>
            <button
              className="btn bg-light btn-remove"
              type="button"
              onClick={() => handleDelete(post)}
            >
              <img className="icon-posts" src={icons.remove} alt="remove" />
            </button>
          </div>
        ))}
      </div>
    </Grow>
  );
};

PostsList.propTypes = {
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const PostsListWrapper = connect(mapStateToProps, null)(PostsList);

export default PostsListWrapper;
