import React from "react";
import { getRandomFontIcons } from "./utils";

const Bot = ({ bot, onAction, onBotDelete }) => {
  const { name, catchphrase, avatar_url, health, damage, armor } = bot;
  return (
    <div>
      {onBotDelete && (
        <div className="delete-bot">
          <button title={`delete ${name}`}>
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={onBotDelete}
            ></i>
          </button>
        </div>
      )}
      <div className="card" onClick={onAction}>
        <div className="card__img-container">
          <img className="card__img" src={avatar_url} alt={name} />
        </div>
        <div className="card__body">
          <h1>
            {name} {getRandomFontIcons(bot.id)}
          </h1>

          <p>{catchphrase}</p>
        </div>
        <div className="card__footer">
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
      </div>
    </div>
  );
};

export default Bot;
