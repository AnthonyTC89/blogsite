import React from 'react';
import './LoadingGif.css';

const LoadingGif = () => (
  <div className="container text-center container-gif">
    <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default LoadingGif;
