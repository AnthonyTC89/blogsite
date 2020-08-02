import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Grow from '@material-ui/core/Grow';
import LoadingGif from './LoadingGif';
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
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(defaultPost);

  const getPosts = async () => {
    setLoadingPage(true);
    setMessage('');
    try {
      const config = { timeout: 10000, headers: { Authorization: `Bearer ${session.token}` } };
      const res = await axios.get('/api/posts', config);
      setPosts(res.data);
      if (res.data.length === 0) {
        setMessage("You don't have posts");
      }
    } catch (err) {
      setMessage('error!');
    } finally {
      setLoadingPage(false);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleForm = async () => {
    await getPosts();
    setShowForm(!showForm);
  };

  const handleDelete = async (item) => {
    setLoading(true);
    setMessage('');
    try {
      const config = { timeout: 5000, headers: { Authorization: `Bearer ${session.token}` } };
      const res = await axios.delete(`/api/posts/${item._id}`, config);
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

  if (loadingPage) {
    return <LoadingGif />;
  }
  if (showForm) {
    return <PostsForm item={editItem} handleForm={handleForm} />;
  }
  return (
    <Grow in timeout={1500}>
      <div className="container text-center container-posts">
        <h2> My posts </h2>
        {loading ? <LoadingGif /> : null}
        {message === '' ? null : <p>{message}</p>}
        <button
          className="btn"
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
