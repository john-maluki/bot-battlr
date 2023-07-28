import React from "react";
import Bolt from "./Bot";

const BotArmy = ({ bots, onAction }) => {
  return (
    <section className="bot__army">
      {bots.map((bot) => (
        <Bolt key={bot.id} bot={bot} onAction={() => onAction(bot.id)} />
      ))}
    </section>
  );
};

export default BotArmy;
