import generateRandomColor from "./generateRandomColor";

const getAvatarColor = (name) => {
  const nameValue = name
    .split('')
    .map((char) => char.charCodeAt(0))
    .reduce((acc, cur) => acc + cur, 0);
  return generateRandomColor(nameValue);
};

export default getAvatarColor;