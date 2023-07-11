import React, { useEffect, useState, createContext } from 'react';
import { over } from 'stompjs';
import onError from '../utils/onError';
import SockJS from 'sockjs-client';
import scrollToBottom from '../utils/scrollToBottom';
import api_data from '../api/config';
import sendPrivateValue from '../utils/sendPrivateValue';
import sendValue from '../utils/sendValue';
import registerUser from '../utils/registerUser';

let stompClient;

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [publicChats, setPublicChats] = useState([]);
  const [tab, setTab] = useState("CHATROOM");
  const [friendInput, setFriendInput] = useState({
    friendName: "",
  });
  const [addFriendTabOpen, setAddFriendTabOpen] = useState(false);
  const [userData, setUserData] = useState({
    username: localStorage.getItem('username') ? localStorage.getItem('username') : "",
    receivername: '',
    connected: false,
    message: ''
  });

  useEffect(() => {
    const username = localStorage.getItem('username');
    if(username && username.length) {
      setUserData({...userData, username: username})
      registerUser(connectWebSocket, setPublicChats, setPrivateChats, { ...userData, username: username })
    }
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [publicChats, privateChats, tab]);

  useEffect(() => {
    scrollToBottom();
  }, [userData]);

  const connectWebSocket = () => {
    const { URL, PORT } = api_data;
    const socketURL = `http://${URL}:${PORT}/ws`;
    const socket = new SockJS(socketURL);
    stompClient = over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setUserData({ ...userData, "connected": true });
    stompClient.subscribe('/chatroom/public', onMessageReceived);
    stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    userJoin();
  };

  const userJoin = () => {
    let chatMessage = {
      senderName: userData.username,
      status: "JOIN"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
  };

  const onMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
      case "JOIN":    
        const updatedPrivateChats = new Map(privateChats);
        
        if (payloadData.senderName !== userData.username) {
          setPrivateChats((prevChats) => {
            const prevPrivateChats = new Map(prevChats);
            const existingMessages = prevPrivateChats.get(payloadData.senderName) || [];
            prevPrivateChats.set(payloadData.senderName, existingMessages);
            return prevPrivateChats;
          });
        } else {
          updatedPrivateChats.set(payloadData.senderName, [payloadData]);
        }
        break;        
      case "MESSAGE":
        setPublicChats((prevChats) => [...prevChats, payloadData]);
        break;
    }
  };

  const onPrivateMessage = (payload) => {
    let payloadData = JSON.parse(payload.body);
    setPrivateChats((prevPrivateChats) => {
      const updatedPrivateChats = new Map(prevPrivateChats);
      if (updatedPrivateChats.has(payloadData.senderName)) {
        let existingMessages = updatedPrivateChats.get(payloadData.senderName);
        let updatedMessages = existingMessages.concat(payloadData);
        updatedPrivateChats.set(payloadData.senderName, updatedMessages);
      } else {
        updatedPrivateChats.set(payloadData.senderName, [payloadData]);
      }
      return updatedPrivateChats;
    });
  };

  const handleSendMessage = () => {
    if (tab === 'CHATROOM') {
      sendValue(stompClient, userData, setUserData);
    } else {
      sendPrivateValue(stompClient, userData, tab, setPrivateChats, setUserData);
    }
  };

  return (
    <ChatContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatProvider, ChatContext };
