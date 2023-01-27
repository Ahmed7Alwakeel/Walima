import React from 'react';

const RedRoundButton = ({ text, type }) => {
 return <>
  <div className={`round-btn-container ${type}`}>
   <div className="btn-text lato-light">
    {text}
   </div>
  </div>

 </>;
};

export default RedRoundButton;
