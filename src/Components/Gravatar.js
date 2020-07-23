import React from 'react';
import CryptoJS from 'crypto-js';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';

const Gravatar = ({ user }) => {
  const hash = CryptoJS.MD5(user.email);
  const gravatar = `https://www.gravatar.com/avatar/${hash}`;
  const hrefGravatar = 'https://en.gravatar.com/site/login';
  return (
    <Link href={hrefGravatar} target="_blank" rel="noopener">
      <Avatar alt={user.username} src={gravatar} />
    </Link>
  );
};

Gravatar.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Gravatar;
