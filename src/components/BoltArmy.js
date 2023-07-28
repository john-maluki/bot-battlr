import React from "react";
import Bolt from "./Bolt";

const BoltArmy = ({ bots }) => {
  return (
    <section className="bot__army">
      {bots.map((bot) => (
        <Bolt key={bot.id} bot={bot} />
      ))}
    </section>
  );
};

export default BoltArmy;
