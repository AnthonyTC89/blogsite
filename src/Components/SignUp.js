import React, { useState } from 'react';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import './SignUp.css';

const defaultUser = {
  username: '',
  email: '',
  password: '',
  confirmation: '',
};

const SignUp = ({ history, handleComponent }) => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    e.persist();
    setUser((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const token = jwt.sign(user, process.env.REACT_APP_JWT_SECRET);
      const res = await axios.post('/api/users', { token }, { timeout: 5000 });
      console.log('res.data: ', res.data);
      setMessage(res.statusText);
      setLoading(false);
      history.push('/posts');
    } catch (err) {
      setMessage('Error!');
      setLoading(false);
    }
  };

  return (
    <Grow in timeout={1500} appear>
      <form className="form-signup" onSubmit={loading ? null : handleSubmit}>
        <h2 className="text-dark">Sign Up</h2>
        <input
          className="form-control input-signup"
          name="username"
          placeholder="username"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          className="form-control input-signup"
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
          required
        />
        <button className="btn btn-dark" type="submit" disabled={loading}>
          {loading
            ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
            : null}
          {loading ? 'Wait...' : 'Sign up'}
        </button>
        <small className="text-danger">{message}</small>
        <div className="form-group">
          <button
            className="btn btn-link bg-white text-dark link-signup"
            type="button"
            onClick={handleComponent}
          >
            You already have an account, Login!
          </button>
        </div>
        <div className="form-group social-login">
          <FacebookButton textButton="Sign up with Facebook" />
          <GoogleButton buttonText="Sign up with Google" />
        </div>
      </form>
    </Grow>
  );
};

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  handleComponent: PropTypes.func.isRequired,
};

export default SignUp;
