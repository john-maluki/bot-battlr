import React from "react";

const Bot = ({ bot, onAction, onBotDelete }) => {
  const { name, catchphrase, avatar_url } = bot;
  return (
    <div>
      {onBotDelete && (
        <div>
          <i
            className="fa fa-times"
            aria-hidden="true"
            onClick={onBotDelete}
          ></i>
        </div>
      )}
      <div className="card" onClick={onAction}>
        <div className="card__img-container">
          <img className="card__img" src={avatar_url} alt={name} />
        </div>
        <div className="card__body">
          <h1>{name}</h1>
          <p>{catchphrase}</p>
        </div>
      </div>
    </div>
  );
};

export default Bot;
