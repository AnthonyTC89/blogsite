import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Navbar.css';

const Navbar = ({ history, session, handleLogout }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div>
      <span>
        {session.user.username || 'User'}
      </span>
    </div>
    <div>
      <button
        className="btn bg-white"
        type="button"
        onClick={handleLogout}
      >
        My Posts
      </button>
      <button
        className="btn bg-white"
        type="button"
        onClick={handleLogout}
      >
        Home
      </button>
      <button
        className="btn bg-white"
        type="button"
        onClick={() => history.push('/profile')}
      >
        Profile
      </button>
    </div>
    <div>
      <button
        className="btn bg-white"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  </nav>
);

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const NavbarWrapper = connect(mapStateToProps, null)(Navbar);

export default NavbarWrapper;
