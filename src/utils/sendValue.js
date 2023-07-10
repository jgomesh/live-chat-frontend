const sendValue = (stompClient, userData, setUserData) => {
  if (stompClient) {
    let chatMessage = {
      senderName: userData.username,
      message: userData.message,
      status: "MESSAGE"
    };
    stompClient.send("/app/message", {}, JSON.stringify(chatMessage));
    setUserData({ ...userData, "message": "" });
  }
};

export default sendValue;
