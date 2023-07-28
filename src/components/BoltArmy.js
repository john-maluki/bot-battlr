import React from "react";
import Bolt from "./Bolt";

const BoltArmy = ({ bots, onAction }) => {
  return (
    <section className="bot__army">
      {bots.map((bot) => (
        <Bolt key={bot.id} bot={bot} onAction={() => onAction(bot.id)} />
      ))}
    </section>
  );
};

export default BoltArmy;
