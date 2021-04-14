export const getRandomInt = (min: number, max: number) => {
  if (min > max) {
    throw new Error("min must be greater than max");
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};
