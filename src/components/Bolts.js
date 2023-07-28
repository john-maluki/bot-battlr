import React, { useEffect, useMemo, useReducer, useState } from "react";
import BoltArmy from "./BoltArmy";
import BotCollection from "./BotCollection";

const actionTypes = {
  FILL_BOLTS: "fill_bots",
  ADD_ARMY_BOLT: "add_army_bots",
  REMOVE_FROM_ARMY: "remove_army_bots",
};

const botReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FILL_BOLTS:
      return { ...state, bots: [...action.payLoad] };
    case actionTypes.ADD_ARMY_BOLT:
      return { ...state, armyBots: [...state.armyBots, action.payLoad] };
    case actionTypes.REMOVE_FROM_ARMY:
      const newArmyBots = state.armyBots.filter(
        (armyBot) => armyBot.id !== action.payLoad
      );
      return { ...state, armyBots: [...newArmyBots] };
    default:
      return state;
  }
};

const Bolts = () => {
  const [botData, dispatch] = useReducer(botReducer, {
    bots: [],
    armyBots: [],
  });

  const fetchBoltsFromServer = () => {
    fetch("http://localhost:4000/bots")
      .then((resp) => resp.json())
      .then((bots) =>
        dispatch({ type: actionTypes.FILL_BOLTS, payLoad: bots })
      );
  };

  const addBotToArmy = (botId) => {
    const bot = findBotById(botId);
    const isBotAdded = botData.armyBots.includes(bot);
    if (!isBotAdded) {
      dispatch({ type: actionTypes.ADD_ARMY_BOLT, payLoad: bot });
    }
  };

  const removeBotFromArmy = (botId) => {
    dispatch({ type: actionTypes.REMOVE_FROM_ARMY, payLoad: botId });
  };

  const findBotById = (botId) => {
    return botData.bots.find((bot) => bot.id === botId);
  };

  useEffect(() => {
    fetchBoltsFromServer();
  }, []);

  return (
    <div className="bot">
      <BoltArmy bots={botData.armyBots} onAction={removeBotFromArmy} />
      <BotCollection bots={botData.bots} onAction={addBotToArmy} />
    </div>
  );
};

export default Bolts;
