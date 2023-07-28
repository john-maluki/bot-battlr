import React from "react";
import Bolt from "./Bolt";

const BotCollection = ({ bots, onAction }) => {
  return (
    <section className="bot__collection">
      {bots.map((bot) => (
        <Bolt key={bot.id} bot={bot} onAction={() => onAction(bot.id)} />
      ))}
    </section>
  );
};

export default BotCollection;
