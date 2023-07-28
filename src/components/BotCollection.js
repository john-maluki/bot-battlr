import React from "react";
import Bolt from "./Bolt";

const BotCollection = ({ bots, addBotToArmy }) => {
  return (
    <section className="bot__collection">
      {bots.map((bot) => (
        <Bolt
          key={bot.id}
          bot={bot}
          addBotToArmy={() => addBotToArmy(bot.id)}
        />
      ))}
    </section>
  );
};

export default BotCollection;
