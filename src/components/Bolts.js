import React, { useEffect, useState } from "react";
import BoltArmy from "./BoltArmy";
import BotCollection from "./BotCollection";

const Bolts = () => {
  const [bots, setBolts] = useState([]);
  const [amrmyBots, setAmrmyBots] = useState([]);

  const fetchBoltsFromServer = () => {
    fetch(" http://localhost:4000/bots")
      .then((resp) => resp.json())
      .then((bots) => setBolts(bots));
  };

  const addBotToArmy = (botId) => {
    const bot = bots.find((bot) => bot.id === botId);
    setAmrmyBots([...amrmyBots, bot]);
  };

  useEffect(() => {
    fetchBoltsFromServer();
  }, []);

  return (
    <div className="bot">
      <BoltArmy bots={amrmyBots} />
      <BotCollection bots={bots} addBotToArmy={addBotToArmy} />
    </div>
  );
};

export default Bolts;
