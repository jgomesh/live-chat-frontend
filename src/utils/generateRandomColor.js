const generateRandomColor = (value) => {
  const r = Math.sin(value) * 127 + 128;
  const g = Math.sin(value + 3) * 127 + 128;
  const b = Math.sin(value + 5) * 127 + 128;
  return `rgb(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)})`;
};

export default generateRandomColor;