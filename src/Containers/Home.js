import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SignIn from '../Components/SignIn';
import SignUp from '../Components/SignUp';
import srcPhone from '../Images/phone.png';
import './Home.css';

const Home = ({ history }) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const handleComponent = () => {
    setShowSignIn(!showSignIn);
  };

  // const srcImg = 'https://cdn.pixabay.com/photo/2015/09/17/14/24/guitar-944262_960_720.jpg';

  return (
    <div className="container">
      <div className="row home-row">
        <picture className="col-md-6 home-column home-picture">
          <img src={srcPhone} alt="home-img" className="home-phone" />
        </picture>
        <div className="col-md-6 home-column">
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
