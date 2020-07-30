/* eslint-disable no-console */
import React from 'react';
import FacebookLogin from 'react-facebook-login';
import PropTypes from 'prop-types';
import './FacebookButton.css';

const FacebookButton = ({ textButton }) => {
  const componentClicked = () => {
    console.log('click');
  };

  const responseFacebook = (res) => {
    console.log('res', res);
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_KEY}
      fields="name,email,picture"
      size="small"
      textButton={textButton}
      icon="fa-facebook"
      cssClass="btn btn-primary btn-facebook"
      onClick={componentClicked}
      callback={responseFacebook}
    />
  );
};

FacebookButton.propTypes = {
  textButton: PropTypes.string.isRequired,
};

export default FacebookButton;
