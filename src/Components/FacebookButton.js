import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookButton = () => {
  const componentClicked = () => {
    console.log('click');
  };

  const responseFacebook = (res) => {
    console.log('res', res);
  };

  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_KEY}
      autoLoad
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
    />
  );
};

export default FacebookButton;
