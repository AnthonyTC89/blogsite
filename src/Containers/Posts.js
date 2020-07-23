import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import PostsList from '../Components/PostsList';
import updateSession from '../redux/actions/updateSession';

const Posts = ({ history, changeSession }) => {
  const handleLogout = () => {
    changeSession(null);
    history.push('/');
  };

  return (
    <>
      <Navbar history={history} handleLogout={handleLogout} />
      <PostsList />
    </>
  );
};

Posts.propTypes = {
  history: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
});

const PostsWrapper = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsWrapper;
