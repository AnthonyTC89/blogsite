import React from 'react';
import GoogleLogin from 'react-google-login';
import PropTypes from 'prop-types';

const GoggleButton = ({ buttonText }) => {
  const onSuccessGoogle = (res) => {
    console.log('res', res);
  };

  const onFailureGoogle = (res) => {
    console.log('res', res);
  };

  return (
    <GoogleLogin
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText={buttonText}
      onSuccess={onSuccessGoogle}
      onFailure={onFailureGoogle}
    />
  );
};

GoggleButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default GoggleButton;
