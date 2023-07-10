import React from 'react';
import ChatRoom from './components/ChatRoom';
import { ChatProvider } from './context/chatContext';

function App() {
  return (
    <ChatProvider>
      <ChatRoom />
    </ChatProvider>
  );
}

export default App;
