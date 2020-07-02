import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import PostsList from '../Components/PostsList';

const Dashboard = ({ history }) => (
  <>
    <Navbar history={history} />
    <PostsList />
  </>
);

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Dashboard;
