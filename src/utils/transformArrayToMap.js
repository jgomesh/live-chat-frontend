const transformArrayToMap = (array, userData) => {
  const map = new Map();
  array.forEach((item) => {
    const key = item.senderName !== userData.username ? item.senderName : item.chatId;
    const value = {
      id: item.id,
      senderName: item.senderName,
      recieverName: item.chatId,
      message: item.message,
      status: "MESSAGE",
    };

    if (!map.has(key)) {
      map.set(key, []);
    }

    map.get(key).push(value);
  });

  return map;
};

export default transformArrayToMap;
