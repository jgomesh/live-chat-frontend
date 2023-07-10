import React from 'react';
import addFriend from '../utils/addFriend';
import searchForFriend from '../utils/searchForFriend';
import handleChange from '../utils/handleFriendInput';

const FriendSearch = ({addFriendTabOpen, friendInput, setFriendInput, setPrivateChats}) => {
  
  return (
    <>
      {
        addFriendTabOpen && (
              <div className="chat-content">
                <div className="chat-messages search-div">
                  <div className="search-container">
                    <input type="text" name="friendName" value={friendInput.friendName} onChange={(event) => handleChange(event, setFriendInput, friendInput)} />
                    <button onClick={() => searchForFriend(friendInput, setFriendInput)}>
                      Search
                    </button>
                  </div>
                  <div>
                    { (!friendInput.friendNotFound && friendInput.friendNotFound !== undefined) ? (
                      <div className="add-user-container">
                        <span>{friendInput.name}</span>
                        <button onClick={() => addFriend(setPrivateChats, setFriendInput, friendInput)}>Add +</button>
                      </div>
                    ) : (
                      <div>
                        {friendInput.friendNotFound !== undefined && <span>Friend not found!</span>}
                      </div>
                    )}
                  </div> 
                </div>
              </div>
            )
          }
    </>
       
  );
};

export default FriendSearch;
