import React from 'react';
import registerUser from '../utils/registerUser';
import handleChange from '../utils/handleFriendInput';

const RegisterForm = ({setUserData, userData, connectWebSocket, setPublicChats, setPrivateChats}) => {
  return (
    <div className="register">
      <input
        id="user-name"
        placeholder="Enter your name"a
        name="username"
        value={userData.username}
        onChange={(event) => handleChange(event, setUserData, userData)}
        margin="normal"
      />
      <button type="button" onClick={() => registerUser(connectWebSocket, setPublicChats, setPrivateChats, userData)}>
        connect
      </button>
    </div>
  );
};

export default RegisterForm;
