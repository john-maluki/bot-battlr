const sortBotByKey = (bots, key, asc = true) => {
  return bots.sort((b1, b2) => {
    if (asc) {
      return b1[key] - b2[key];
    } else {
      return b2[key] - b1[key];
    }
  });
};

const sortBotsByHealth = (bots, key, asc = true) => {
  return sortBotByKey(bots, key, asc);
};

const sortBotsByDamage = (bots, key, asc = true) => {
  return sortBotByKey(bots, key, asc);
};

const sortBotsByArmor = (bots, key, asc = true) => {
  return sortBotByKey(bots, key, asc);
};

export { sortBotsByArmor, sortBotsByDamage, sortBotsByHealth };
