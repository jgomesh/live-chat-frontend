const sendPrivateValue = (stompClient, userData, tab, setPrivateChats, setUserData) => {
  if (stompClient) {
    let chatMessage = {
      senderName: userData.username,
      receiverName: tab,
      message: userData.message,
      status: "MESSAGE"
    };

    if (userData.username !== tab) {
      setPrivateChats((prevPrivateChats) => {
        const updatedPrivateChats = new Map(prevPrivateChats);
        if (updatedPrivateChats.has(tab)) {
          let existingMessages = updatedPrivateChats.get(tab);
          let updatedMessages = existingMessages.concat(chatMessage);
          updatedPrivateChats.set(tab, updatedMessages);
        }
        return updatedPrivateChats;
      });
    }
    stompClient.send("/app/private-message", {}, JSON.stringify(chatMessage));
    setUserData({ ...userData, "message": "" });
  }
};

export default sendPrivateValue;
