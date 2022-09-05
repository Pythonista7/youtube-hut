enum colors {
  blue = "blue",
  purple = "purple",
  pink = "pink",
  orange = "orange",
  green = "green",
  lime = "lime",
  yellow = "yellow",
  red = "red",
}

export const getRandomColor = (): colors => {
  const rand = Math.floor(Math.random() * Object.keys(colors).length);
  return colors[Object.keys(colors)[rand]];
};

export default colors;
