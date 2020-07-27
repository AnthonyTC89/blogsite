import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import PostsList from '../Components/PostsList';

// eslint-disable-next-line arrow-body-style
const Posts = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <PostsList />
    </>
  );
};

Posts.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const PostsWrapper = connect(mapStateToProps, null)(Posts);

export default PostsWrapper;
