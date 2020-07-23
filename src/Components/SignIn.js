import React, { useState } from 'react';
import { connect } from 'react-redux';
import Grow from '@material-ui/core/Grow';
import PropTypes from 'prop-types';
import axios from 'axios';
import updateSession from '../redux/actions/updateSession';
import './SignIn.css';

const defaultUser = {
  username: '',
  password: '',
};

const SignIn = ({ history, changeSession, handleComponent }) => {
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
      const res = await axios.post('/api/users/login', user);
      setLoading(false);
      if (res.data.status === 'OK') {
        setUser(defaultUser);
        changeSession(res.data.user);
        history.push('/dashboard');
      } else {
        setMessage('Error!');
      }
    } catch (err) {
      setMessage('Error!');
      setLoading(false);
    }
  };

  return (
    <Grow in timeout={1500}>
      <form className="form-signin" onSubmit={loading ? null : handleSubmit}>
        <h2 className="text-dark">Login</h2>
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
          name="password"
          type="password"
          placeholder="password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button className="btn btn-dark" type="submit" disabled={loading}>
          {loading
            ? <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true" />
            : null}
          {loading ? 'Wait...' : 'Login'}
        </button>
        <small>{message}</small>
        <div className="form-group">
          <button
            className="btn bg-white text-dark btn-link"
            type="button"
            onClick={handleComponent}
          >
            Don&apos;t have and account, Sign up!
          </button>
        </div>
      </form>
    </Grow>
  );
};

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
  changeSession: PropTypes.func.isRequired,
  handleComponent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

const mapDispatchToProps = (dispatch) => ({
  changeSession: (session) => dispatch(updateSession(session)),
});

const SignInWrapper = connect(mapStateToProps, mapDispatchToProps)(SignIn);

export default SignInWrapper;
