const handleChange = (event, setFriendInput, friendInput) => {
  const { value, name } = event.target;
  setFriendInput({ ...friendInput, [name]: value });
};

export default handleChange;
