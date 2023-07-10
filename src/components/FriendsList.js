import React from 'react';
import scrollToBottom from '../utils/scrollToBottom';

const FriendsList = ({setTab, setAddFriendTabOpen, tab, addFriendTabOpen, privateChats }) => {
  const handleTabChange = (newTab) => {
    setTab(newTab);
    setAddFriendTabOpen(false);
    scrollToBottom();
  };

  return (
    <div className="member-list">
      <ul>
        <li
          onClick={() => handleTabChange('CHATROOM')}
          className={`member ${(tab === 'CHATROOM' && !addFriendTabOpen) && 'active'}`}
        >
          Chatroom
        </li>
        {[...privateChats.keys()].map((name, index) => (
          <li
            onClick={() => handleTabChange(name)}
            className={`member ${(tab === name && !addFriendTabOpen) && 'active'}`}
            key={index}
          >
            {name}
          </li>
        ))}
        <li
          className={`member ${(addFriendTabOpen) && 'active'}`}
          onClick={() => setAddFriendTabOpen(true)}
        >
          Adicionar chat +
        </li>
      </ul>
    </div>
    
  )
};

export default FriendsList;