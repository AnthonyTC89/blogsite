/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import updateSession from '../redux/actions/updateSession';

import './Navbar.css';

const navItemsDefault = [
  { name: 'profile', active: true },
  { name: 'posts', active: false },
  { name: 'logout', active: false },
];

const navItemsInactive = [
  { name: 'profile', active: false },
  { name: 'posts', active: false },
  { name: 'logout', active: false },
];

const Navbar = ({ history, session, changeSession }) => {
  const [navItems, setNavItems] = useState(navItemsDefault);

  const handleActive = (link) => {
    const index = navItemsInactive.findIndex((item) => item.name === link);
    const auxItems = [...navItemsInactive];
    auxItems[index] = { ...auxItems[index], active: true };
    setNavItems(auxItems);
  };

  const handleLink = (link) => {
    if (link === 'logout') {
      changeSession(null);
      history.push('/');
    } else {
      handleActive(link);
      history.push(`/${link}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <span className="navbar-brand">{`Blogsite - ${session.user.username}`}</span>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          {navItems.map((item) => (
            <li className="nav-item">
              <button
                type="button"
                className={item.active ? 'btn nav-link active' : 'btn nav-link'}
                onClick={() => handleLink(item.name)}
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
