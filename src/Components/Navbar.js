import React from 'react';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ history }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <button
          className="btn btn-link bg-white text-primary link-navbar"
          type="button"
          onClick={() => history.push('/signup')}
        >
          Sign up
        </button>
        <button
          className="btn btn-link bg-white text-primary link-navbar"
          type="button"
          onClick={() => history.push('/login')}
        >
          Login
        </button>
      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Navbar;
