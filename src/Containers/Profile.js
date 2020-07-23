import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../Components/Navbar';
import UserForm from '../Components/UserForm';

// eslint-disable-next-line arrow-body-style
const Profile = ({ history }) => {
  return (
    <>
      <Navbar history={history} />
      <UserForm />
    </>
  );
};

Profile.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  session: state.session,
});

// const mapDispatchToProps = (dispatch) => ({
// });

const ProfileWrapper = connect(mapStateToProps, null)(Profile);

export default ProfileWrapper;
