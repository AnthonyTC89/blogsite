import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import updateSession from '../redux/actions/updateSession';
import './Navbar.css';

const Navbar = ({ history, session, changeSession }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div>
      <span> BlogSite </span>
    </div>
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
    <div>
      <span>
        {session.isLoggedIn ? session.user.username : 'User' }
      </span>
      {session.isLoggedIn ? (
        <button
          className="btn bg-white"
          type="button"
          onClick={() => changeSession(null)}
        >
          <img
            className="icon-navbar"
            src="https://img.icons8.com/color/48/000000/logout-rounded-left--v1.png"
            alt="logout"
          />
        </button>
      ) : null}
    </div>
  </nav>
);

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
});

const NavbarWrapper = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarWrapper;
