import React from "react";

const BotSpecs = ({ bot, onGoBack, onAddBot }) => {
  const { name, catchphrase, avatar_url } = bot;
  return (
    <div className="bot-specs">
      <img src={avatar_url} className="bot-specs__img" />
      <div className="bot-specs__details">
        <h1>Name: {name}</h1>
        <div className="bot-specs__catch-phrase">
          <h3>Catchphrase</h3>
          <p>{catchphrase}</p>
        </div>
        <div className="bot-spec__bot-class">
          <h1>Class: Assault</h1>
        </div>
        <div className="bot-spec__stats">
          <div className="bot-spec">icon</div>
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
