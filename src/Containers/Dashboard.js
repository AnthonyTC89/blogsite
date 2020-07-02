import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import PostsForm from '../Components/PostsForm';

const Dashboard = ({ history }) => (
  <>
    <Navbar history={history} />
    <PostsForm />
  </>
);

Dashboard.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Dashboard;
