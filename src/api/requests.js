import axios from "axios";
import api_data from "./config";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  }
};

const { URL, PORT } = api_data;

export const register = async (username) => {
  try {
    const registerResponse = await axios.post(`http://${URL}:${PORT}/chat-user-register`, { name: username }, config);
    return registerResponse
  } catch (error) {
    return error.message;
  }
}

export const getPublic = async () => {
  try {
    const publicResponse = await axios.get(`http://${URL}:${PORT}/messages/public`, config);
    return publicResponse;
  } catch (error) {
    return error.message;
  }
}

export const getPrivate = async (username) => {
  try {
    const privateResponse = await axios.get(`http://${URL}:${PORT}/messages/private/` + username, config);
    return privateResponse;
  } catch (error) {
    return error.message;
  }
}

export const findFriend = async (friendName) => {
  try {
    const friendResponse = await axios.get(`http://${URL}:${PORT}/chat-user-register/user/` + friendName, config);
    return friendResponse;
  } catch (error) {
    return error.message;
  }
}
