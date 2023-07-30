import React from "react";
import { getRandomFontIcons } from "./utils";

const BotSpecs = ({ bot, onGoBack, onAddBot }) => {
  const { name, catchphrase, avatar_url, bot_class, health, damage, armor } =
    bot;
  return (
    <div className="bot-specs">
      <img src={avatar_url} className="bot-specs__img" alt={name} />
      <div className="bot-specs__details">
        <h1>Name: {name}</h1>
        <div className="bot-specs__catch-phrase">
          <h3>Catchphrase</h3>
          <p>{catchphrase}</p>
        </div>
        <div className="bot-spec__bot-class">
          <h1>
            Class: {bot_class} {getRandomFontIcons(bot.id)}
          </h1>
        </div>
        <div className="bot-spec__stats">
          <div className="card__icon">
            <i className="fa fa-heartbeat" aria-hidden="true"></i>
            <span>{health}</span>
          </div>
          <div className="card__icon">
            <i className="fa fa-bolt" aria-hidden="true"></i>
            <span>{damage}</span>
          </div>
          <div className="card__icon">
            <i className="fa fa-shield" aria-hidden="true"></i>
            <span>{armor}</span>
          </div>
        </div>
        <div className="bot-spec__manage">
          <button className="bot-spec__btn" onClick={onGoBack}>
            Go Back
          </button>
          <button className="bot-spec__btn" onClick={() => onAddBot(bot.id)}>
            Enlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BotSpecs;
