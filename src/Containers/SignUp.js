import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setLoading(false);
  };

  return (
    <form className="form-signin" onSubmit={loading ? null : handleSubmit}>
      <h2 className="text-primary">Sign Up</h2>
      <input
        className="form-control input-signin"
        name="username"
        placeholder="username"
        value={user.username}
        onChange={handleChange}
        required
      />
      <input
        className="form-control input-signin"
        name="email"
        type="email"
        placeholder="email"
        value={user.email}
        onChange={handleChange}
        required
      />
      <input
        className="form-control input-signin"
        name="password"
        type="password"
        placeholder="password"
        value={user.password}
        onChange={handleChange}
        required
      />
      <input
        className="form-control input-signin"
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
          className="btn bg-white text-primary btn-link"
          type="button"
          onClick={() => history.push('/login')}
        >
          You already have an account, Login!
        </button>
      </div>
    </form>
  );
};

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignUp;
