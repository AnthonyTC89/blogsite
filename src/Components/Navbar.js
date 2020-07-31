import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import updateSession from '../redux/actions/updateSession';
import updateNavbar from '../redux/actions/updateNavbar';
import './Navbar.css';

// eslint-disable-next-line no-unused-vars
const Navbar = ({ history, session, navbar, changeNavbar, changeSession }) => {
  const handleActive = (link) => {
    const auxItems = [...navbar];
    // eslint-disable-next-line
    auxItems.forEach((item) => item.active = false);
    const index = navbar.findIndex((item) => item.link === link);
    auxItems[index] = { ...auxItems[index], active: true };
    changeNavbar(auxItems);
  };

  const removeStorage = () => {
    sessionStorage.clear();
    localStorage.clear();
  };

  const handleLink = (link) => {
    if (link === 'logout') {
      removeStorage();
      handleActive('profile');
      changeSession(null);
      history.push('/');
    } else {
      handleActive(link);
      history.push(`/${link}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <span className="navbar-brand">Blogsite</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {navbar.map((item) => (
            <li key={uuidv4()} className="nav-item">
              <button
                type="button"
                className={item.active ? 'btn nav-link active' : 'btn nav-link'}
                onClick={() => handleLink(item.link)}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  navbar: PropTypes.array.isRequired,
  changeSession: PropTypes.func.isRequired,
  changeNavbar: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
  navbar: state.navbar,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
  changeNavbar: (nav) => dispatch(updateNavbar(nav)),
});

const NavbarWrapper = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default NavbarWrapper;
