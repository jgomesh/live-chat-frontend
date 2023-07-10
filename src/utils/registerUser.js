import transformArrayToMap from "./transformArrayToMap";
import { register, getPublic, getPrivate } from "../api/requests";

const registerUser = async (connectWebSocket, setPublicChats, setPrivateChats, userData) => {
  try {
    const registerResponse = await register(userData.username);
    const publicResponse = await getPublic();
    const privateResponse = await getPrivate(userData.username);
    const publicChatData = publicResponse.data.map((publicMessage) => ({ ...publicMessage, status: "MESSAGE", receiverName: null }));
    const privateChatData = privateResponse.data;

    const MapPrivateChat = transformArrayToMap(privateChatData, userData);
    setPublicChats(publicChatData);
    setPrivateChats(MapPrivateChat);
    connectWebSocket();
  } catch (error) {
    console.log(error.message);
  }
};

export default registerUser;
