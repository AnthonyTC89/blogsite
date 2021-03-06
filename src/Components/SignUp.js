import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import Grow from '@material-ui/core/Grow';
import updateSession from '../redux/actions/updateSession';
import FacebookButton from './FacebookButton';
import GoogleButton from './GoogleButton';
import './SignUp.css';

const defaultUser = {
  username: '',
  email: '',
  password: '',
  confirmation: '',
};

const SignUp = ({ history, session, handleComponent, changeSession }) => {
  const [user, setUser] = useState(defaultUser);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    e.persist();
    setUser((prev) => (
      { ...prev, [e.target.name]: e.target.value }
    ));
  };

  const handleLoginFacebook = async (response) => {
    setLoading(true);
    setMessage('');
    try {
      const { name, email } = response;
      const userFacebook = { username: name, email };
      const userToken = jwt.sign(userFacebook, process.env.REACT_APP_JWT_SECRET);
      const res = await axios.post('/api/users/facebook', { userToken }, { timeout: 5000 });
      sessionStorage.setItem('userToken', res.data);
      setLoading(false);
      setUser(defaultUser);
      changeSession(res.data);
    } catch (err) {
      setMessage('Error!');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const userToken = jwt.sign(user, process.env.REACT_APP_JWT_SECRET);
      const res = await axios.post('/api/users', { userToken }, { timeout: 5000 });
      sessionStorage.setItem('userToken', res.data);
      setLoading(false);
      setUser(defaultUser);
      changeSession(res.data);
      history.push('/posts');
    } catch (err) {
      setMessage('Error!');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.isLoggedIn) {
      history.push('/posts');
    }
  });

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
            className="btn btn-link text-dark"
            type="button"
            onClick={handleComponent}
          >
            You already have an account, Login!
          </button>
        </div>
        <div className="form-group social-login">
          <FacebookButton handleLogin={handleLoginFacebook} textButton="Sign up with Facebook" />
          <GoogleButton buttonText="Sign up with Google" />
        </div>
      </form>
    </Grow>
  );
};

SignUp.propTypes = {
  history: PropTypes.object.isRequired,
  session: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
  handleComponent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
});

const SignUpWrapper = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default SignUpWrapper;
