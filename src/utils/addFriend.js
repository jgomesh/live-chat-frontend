const addFriend = (setPrivateChats, setFriendInput, friendInput) => {
  setPrivateChats((prevChats) => {
    const prevPrivateChats = new Map(prevChats);
    if (!prevPrivateChats.has(friendInput.name)) {
      prevPrivateChats.set(friendInput.name, []);
    }
    setFriendInput({
      friendName: "",
    });
    return prevPrivateChats;
  });
};

export default addFriend;
