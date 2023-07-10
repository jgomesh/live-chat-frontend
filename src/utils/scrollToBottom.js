const scrollToBottom = () => {
  const chatMessageElements = document.querySelectorAll('.chat-messages');
  chatMessageElements.forEach((element) => {
    element.scrollTop = element.scrollHeight;
  });
};

export default scrollToBottom;