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
const botIcons = {};
const getRandomFontIcons = (botId) => {
  const icons = [
    <i className="fa fa-fighter-jet" aria-hidden="true"></i>,
    <i className="fa fa-shield" aria-hidden="true"></i>,
    <i className="fa fa-ambulance" aria-hidden="true"></i>,
    <i className="fa fa-fighter-jet" aria-hidden="true"></i>,
    <i className="fa fa-shield" aria-hidden="true"></i>,
    <i className="fa fa-ambulance" aria-hidden="true"></i>,
    <i className="fa fa-fighter-jet" aria-hidden="true"></i>,
    <i className="fa fa-shield" aria-hidden="true"></i>,
    <i className="fa fa-ambulance" aria-hidden="true"></i>,
    <i className="fa fa-fighter-jet" aria-hidden="true"></i>,
    <i className="fa fa-shield" aria-hidden="true"></i>,
    <i className="fa fa-ambulance" aria-hidden="true"></i>,
    <i className="fa fa-fighter-jet" aria-hidden="true"></i>,
    <i className="fa fa-shield" aria-hidden="true"></i>,
    <i className="fa fa-ambulance" aria-hidden="true"></i>,
    <i className="fa fa-shield" aria-hidden="true"></i>,
    <i className="fa fa-ambulance" aria-hidden="true"></i>,
    <i className="fa fa-fighter-jet" aria-hidden="true"></i>,
    <i className="fa fa-shield" aria-hidden="true"></i>,
  ];
  const randomNumber = Math.ceil(Math.random() * (icons.length - 1));

  if (botId in botIcons) {
    return icons[botIcons[botId]];
  } else {
    botIcons[botId] = randomNumber;
    return icons[botIcons[botId]];
  }
};

export {
  sortBotsByArmor,
  sortBotsByDamage,
  sortBotsByHealth,
  getRandomFontIcons,
};
