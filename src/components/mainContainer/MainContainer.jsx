import React from 'react';
import './MainContainer.css';

import localImage from '../../img/bible_background.png'

const MainContainer = () => {
  return (
    <div className="fullscreen-image">
      <img src={localImage} alt="Background baseball" />
    </div>
  );
};

export default MainContainer;