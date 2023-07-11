import React from 'react';

const Header = ( { handleFriendsButtonClick }) => {

  return (
    <div className="header-container">
      <div className="max-container">
        <button className="friends-button" onClick={handleFriendsButtonClick}>Friends</button>
        <h3>Live Chat</h3>
        <button onClick={() => {
          localStorage.removeItem("username");
          window.location.reload();
          }}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
