import React, { useContext } from 'react';
import ChatContent from './ChatContent';
import RegisterForm from './RegisterForm';
import handleMessage from '../utils/handleMessage';
import FriendSearch from './FriendSearch';
import FriendsList from './FriendsList';
import { ChatContext } from '../context/chatContext';

const ChatRoom = () => {
  const {
    privateChats,
    setPrivateChats,
    publicChats,
    setPublicChats,
    tab,
    setTab,
    friendInput,
    setFriendInput,
    addFriendTabOpen,
    setAddFriendTabOpen,
    userData,
    setUserData,
    connectWebSocket,
    handleSendMessage,
  } = useContext(ChatContext);

  return (
    <div>
      {userData.connected ? (
        <div className="chat-box">
          <FriendsList
            setTab={setTab}
            setAddFriendTabOpen={setAddFriendTabOpen}
            tab={tab}
            addFriendTabOpen={addFriendTabOpen}
            privateChats={privateChats}
          />
          {tab === 'CHATROOM' && !addFriendTabOpen && (
            <ChatContent
              chats={publicChats}
              username={userData.username}
              message={userData.message}
              onMessageChange={(event) => handleMessage(event, userData, setUserData)}
              onSendMessage={handleSendMessage}
            />
          )}
          {tab !== 'CHATROOM' && !addFriendTabOpen && (
            <ChatContent
              chats={privateChats.get(tab) || []}
              username={userData.username}
              message={userData.message}
              onMessageChange={(event) => handleMessage(event, userData, setUserData)}
              onSendMessage={handleSendMessage}
            />
          )}
          <FriendSearch
            addFriendTabOpen={addFriendTabOpen}
            friendInput={friendInput}
            setFriendInput={setFriendInput}
            setPrivateChats={setPrivateChats}
          />
        </div>
      ) : (
        <RegisterForm
          setUserData={setUserData}
          userData={userData}
          connectWebSocket={connectWebSocket}
          setPublicChats={setPublicChats}
          setPrivateChats={setPrivateChats}
        />
      )}
    </div>
  );
};

export default ChatRoom;
