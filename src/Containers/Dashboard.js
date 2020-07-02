import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import PostsForm from '../Components/PostsForm';
import PostsList from '../Components/PostsList';

const Dashboard = ({ history }) => (
  <>
    <Navbar history={history} />
    <PostsForm />
    <PostsList />
  </>
);

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Dashboard;
