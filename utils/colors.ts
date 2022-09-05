const colors = [
  "blue",
  "purple",
  "pink",
  "orange",
  "green",
  "lime",
  "yellow",
  "red",
];

export const getRandomColor = (): string => {
  const rand = Math.floor(Math.random() * Object.keys(colors).length);
  return colors[rand];
};

export default colors;
