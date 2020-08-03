import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import Footer from '../Components/Footer';
import srcPhone from '../Images/phone.png';
import { InfoHome } from '../Info.json';
import './Home.css';

const Home = ({ history }) => {
  const [showSignIn, setShowSignIn] = useState(true);
  const { Images } = InfoHome;

  const handleComponent = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <>
      <div className="container">
        <div className="row home-row">
          <picture className="d-none d-sm-flex col-sm-6 home-picture">
            <img src={srcPhone} alt="home-phone" className="home-phone" />
            <img src={Images[0]} alt="home-img" className="home-img" />
          </picture>
          <div className="col-12 col-sm-6 justify-content-center justify-content-center justify-content-md-start home-component">
            {showSignIn ? <SignIn history={history} handleComponent={handleComponent} />
              : <SignUp history={history} handleComponent={handleComponent} />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

Home.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Home;
