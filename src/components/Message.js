import React from 'react';
import getAvatarColor from '../utils/getAvatarColor';

const Message = ({ chat, username }) => (
  <li className={`message ${chat.senderName === username && 'self'}`}>
    {chat.senderName !== username && (
      <div className="avatar" style={{ backgroundColor: getAvatarColor(chat.senderName) }}>
        {chat.senderName}
      </div>
    )}
    <div className="message-data">{chat.message}</div>
    {chat.senderName === username && <div className="avatar self">{chat.senderName}</div>}
  </li>
);

export default Message;
