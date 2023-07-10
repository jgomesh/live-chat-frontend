import { findFriend } from "../api/requests";

const searchForFriend = async (friendInput, setFriendInput) => {
  try {
    const friendResponse = await findFriend(friendInput.friendName)
    const friendData = friendResponse.data;
    if(friendData) {
      setFriendInput({...friendInput, ...friendData, friendNotFound: false, friendName: ""});
    } else {
      setFriendInput({...friendInput, ...friendData, friendNotFound: true});
    }
  } catch (error) {
    setFriendInput({...friendInput, friendNotFound: true});
    setFriendInput({...friendInput, friendName: ""});

  }
}

export default searchForFriend;
