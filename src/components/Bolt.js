import React from "react";

const Bolt = ({ bot, onAction }) => {
  const { name, catchphrase, avatar_url } = bot;
  return (
    <div className="card" onClick={onAction}>
      <div className="card__img-container">
        <img className="card__img" src={avatar_url} alt={name} />
      </div>
      <div className="card__body">
        <h1>{name}</h1>
        <p>{catchphrase}</p>
      </div>
    </div>
  );
};

export default Bolt;
