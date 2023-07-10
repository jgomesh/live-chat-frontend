import React from 'react';
import Message from './Message';

const ChatContent = ({ chats, username, message, onMessageChange, onSendMessage }) => (
  <div className="chat-content">
    <ul className="chat-messages">
      {chats.map((chat, index) => (
        <Message chat={chat} username={username} key={index} />
      ))}
    </ul>

    <div className="send-message">
      <input
        type="text"
        className="input-message"
        placeholder="enter the message"
        value={message}
        onChange={onMessageChange}
      />
      <button type="button" className="send-button" onClick={onSendMessage}>
        send
      </button>
    </div>
  </div>
);

export default ChatContent;