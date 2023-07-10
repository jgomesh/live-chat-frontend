const handleMessage = (event, userData, setUserData) => {
  const { value } = event.target;
  setUserData({ ...userData, "message": value });
};

export default handleMessage;
