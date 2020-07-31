import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import axios from 'axios';
import Gravatar from './Gravatar';
import updateSession from '../redux/actions/updateSession';
import './UserForm.css';

const defaultUser = {
  username: '',
  email: '',
};

const UserForm = ({ session }) => {
  const [user, setUser] = useState(defaultUser);
  const [loadingPage, setLoadingPage] = useState(true);
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
      const config = {
        timeout: 5000,
        headers: { Authorization: `Bearer ${session.token}` },
      };
      const userToken = jwt.sign(user, process.env.REACT_APP_JWT_SECRET);
      const res = await axios.put(`/api/users/${user._id}`, { userToken }, config);
      setLoading(false);
      setMessage(res.statusText);
    } catch (err) {
      setMessage('Error!');
      setLoading(false);
    }
  };

  const getUserInfo = async () => {
    try {
      const config = {
        timeout: 5000,
        headers: { Authorization: `Bearer ${session.token}` },
      };
      const userSession = jwt.verify(session.token, process.env.REACT_APP_JWT_SECRET);
      const res = await axios.get(`/api/users/${userSession._id}`, config);
      const userData = jwt.verify(res.data, process.env.REACT_APP_JWT_SECRET);
      const { _id, username, email, status } = userData;
      setUser({ _id, username, email, status, password: '', confirmation: '' });
      setLoadingPage(false);
    } catch (err) {
      setMessage('Error!');
      setLoadingPage(false);
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line
  }, []);

  if (loadingPage) {
    return (
      <div className="container text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
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

const mapDispatchToProps = (dispatch) => ({
  changeSession: (token) => dispatch(updateSession(token)),
});

const UserFormWrapper = connect(mapStateToProps, mapDispatchToProps)(UserForm);

export default UserFormWrapper;
