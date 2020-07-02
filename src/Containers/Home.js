import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';

const Home = ({ history }) => (
  <>
    <Navbar history={history} />
  </>
);

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
