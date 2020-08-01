/* eslint-disable no-console */
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import './FacebookButton.css';

const FacebookButton = ({ handleLogin, textButton }) => (
  <FacebookLogin
    appId={process.env.REACT_APP_FACEBOOK_KEY}
    fields="name,email"
    size="small"
    textButton={textButton}
    icon="fa-facebook"
    cssClass="btn btn-primary btn-facebook"
    callback={handleLogin}
  />
);

FacebookButton.propTypes = {
  textButton: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default FacebookButton;
