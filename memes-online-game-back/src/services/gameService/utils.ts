const getMemesFromDeck = (deck: string[], numberOfMems: number) => {
  const selectedCards = [1, 2, 3];
  const newDeck = [];
};

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const getCurrentParsedTime = () => {
  const current = new Date();
  return `${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
};
