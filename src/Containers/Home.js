import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import srcPhone from '../Images/phone.png';
import { InfoHome } from '../Info.json';
import './Home.css';

const Home = ({ history }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  const { Images } = InfoHome;
  const handleComponent = () => {
    setShowSignIn(!showSignIn);
  };

  // const srcImg = '';

  return (
    <div className="container">
      <div className="row home-row">
        <picture className="col-md-6 home-picture">
          <img src={srcPhone} alt="home-phone" className="home-phone" />
          <img src={Images[1]} alt="home-img" className="home-img" />
        </picture>
        <div className="col-md-6 home-component">
          {showSignIn ? <SignIn history={history} handleComponent={handleComponent} />
            : <SignUp history={history} handleComponent={handleComponent} />}
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
