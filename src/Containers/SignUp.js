import React, { useState } from 'react';
import './SignUp.css';

const defaultUser = {
  username: '',
  email: '',
  password: '',
  confirmation: '',
};

const SignUp = () => {
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
        {loading ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
          : null}
        {loading ? 'Espere...' : 'Login'}
      </button>
      <small>{message}</small>
    </form>
  );
};

export default SignUp;
