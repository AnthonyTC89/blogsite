import React, { useState } from 'react';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import axios from 'axios';
import './SignUp.css';

const defaultUser = {
  username: '',
  email: '',
  password: '',
  confirmation: '',
};

const SignUp = ({ history }) => {
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
      await axios.post('/api/users', user);
      setLoading(false);
      setUser(defaultUser);
    } catch (err) {
      setMessage('Error!');
      setLoading(false);
    }
  };

  return (
    <Grow in timeout={1500} appear>
      <form className="form-signup" onSubmit={loading ? null : handleSubmit}>
        <button
          className="btn bg-white"
          type="button"
          onClick={() => history.push('/')}
        >
          <img src="https://img.icons8.com/cute-clipart/64/000000/reply-arrow.png" alt="home" />
        </button>
        <h2 className="text-primary">Sign Up</h2>
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
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading
            ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
            : null}
          {loading ? 'Wait...' : 'Sign up'}
        </button>
        <small>{message}</small>
        <div className="form-group">
          <button
            className="btn btn-link bg-white text-primary link-signup"
            type="button"
            onClick={() => history.push('/login')}
          >
            You already have an account, Login!
          </button>
        </div>
      </form>
    </Grow>
  );
};

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignUp;
