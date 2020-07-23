import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import axios from 'axios';
import Gravatar from './Gravatar';
import './UserForm.css';

const UserForm = ({ session }) => {
  const [user, setUser] = useState(session.user);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    e.persist();
    setUser((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const validUser = () => {
    if (user.password !== user.confirmation) {
      setMessage('Check the password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!validUser()) return;
    setLoading(true);
    try {
      await axios.put('/api/users', user, { timeout: 5000 });
      setLoading(false);
      setMessage('Updated!');
    } catch (err) {
      setMessage('Error!');
      setLoading(false);
    }
  };

  return (
    <Grow in timeout={1500} appear>
      <form className="form-user" onSubmit={loading ? null : handleSubmit}>
        <Gravatar user={user} />
        <h2 className="text-dark">Profile</h2>
        <input
          className="form-control input-user"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChange}
          required
          disabled
        />
        <input
          className="form-control input-user"
          name="email"
          type="email"
          placeholder="email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          className="form-control input-signup"
          name="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <input
          className="form-control input-signup"
          name="confirmation"
          type="password"
          placeholder="confirmation"
          value={user.confirmation}
          onChange={handleChange}
          required={user.password !== ''}
          disabled={user.password === ''}
        />
        <button className="btn btn-dark" type="submit" disabled={loading}>
          {loading
            ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
            : null}
          {loading ? 'Wait...' : 'Update'}
        </button>
        <small className="text-danger">{message}</small>
      </form>
    </Grow>
  );
};

UserForm.propTypes = {
  session: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const UserFormWrapper = connect(mapStateToProps, null)(UserForm);

export default UserFormWrapper;
