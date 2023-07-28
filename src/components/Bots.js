import React, { useEffect, useReducer } from "react";
import { toast } from "react-toastify";

import BotArmy from "./BotArmy";
import BotCollection from "./BotCollection";
import { BotContext } from "../context/BotContext";

const actionTypes = {
  FILL_BOLTS: "fill_bots",
  ADD_ARMY_BOLT: "add_army_bots",
  REMOVE_FROM_ARMY: "remove_army_bots",
  REMOVE_FROM_BOTS: "remove_from_bots",
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
    case actionTypes.REMOVE_FROM_BOTS:
      const newBots = state.bots.filter((bot) => bot.id !== action.payLoad);
      return { ...state, bots: newBots };
    default:
      return state;
  }
};

const Bots = () => {
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
      toast.success(`${bot.name} added successfully`);
    } else {
      toast.info(`${bot.name} already selected!!`);
    }
  };

  const removeBotFromArmy = (botId) => {
    dispatch({ type: actionTypes.REMOVE_FROM_ARMY, payLoad: botId });
  };

  const deleteBotFromServer = (botId) => {
    fetch(`http://localhost:4000/bots/${botId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((resp) => {
      if (resp.ok) {
        toast.info("Deleted");
        dispatch({ type: actionTypes.REMOVE_FROM_BOTS, payLoad: botId });
        dispatch({ type: actionTypes.REMOVE_FROM_ARMY, payLoad: botId });
      }
    });
  };

  const findBotById = (botId) => {
    return botData.bots.find((bot) => bot.id === botId);
  };

  useEffect(() => {
    fetchBoltsFromServer();
  }, []);

  return (
    <div className="bot">
      <BotArmy bots={botData.armyBots} onAction={removeBotFromArmy} />
      <BotContext.Provider value={botData.bots}>
        <BotCollection
          onAction={addBotToArmy}
          onBotDelete={deleteBotFromServer}
        />
      </BotContext.Provider>
    </div>
  );
};

export default Bots;
