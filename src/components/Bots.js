import React, { useEffect, useMemo, useReducer, useState } from "react";
import { toast } from "react-toastify";

import BotArmy from "./BotArmy";
import BotCollection from "./BotCollection";
import { BotContext } from "../context/BotContext";
import BotSpecs from "./BotSpecs";
import SortBar from "./SortBar";
import { sortBotsByArmor, sortBotsByDamage, sortBotsByHealth } from "../utils";

const actionTypes = {
  FILL_BOLTS: "fill_bots",
  ADD_ARMY_BOLT: "add_army_bots",
  ADD_BOLT: "add_bot",
  REMOVE_FROM_ARMY: "remove_army_bots",
  REMOVE_FROM_BOTS: "remove_from_bots",
  CURRENT_SELECTED_BOT: "current_selected_bot",
};

const botReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.FILL_BOLTS:
      return { ...state, bots: [...action.payLoad] };
    case actionTypes.ADD_ARMY_BOLT:
      return { ...state, armyBots: [...state.armyBots, action.payLoad] };
    case actionTypes.ADD_BOLT:
      return { ...state, bots: [action.payLoad, ...state.bots] };
    case actionTypes.REMOVE_FROM_ARMY:
      const newArmyBots = state.armyBots.filter(
        (armyBot) => armyBot.id !== action.payLoad
      );
      return { ...state, armyBots: [...newArmyBots] };
    case actionTypes.REMOVE_FROM_BOTS:
      const newBots = state.bots.filter((bot) => bot.id !== action.payLoad);
      return { ...state, bots: newBots };

    case actionTypes.CURRENT_SELECTED_BOT:
      return { ...state, currentSelectedBot: action.payLoad };
    default:
      return state;
  }
};

const Bots = () => {
  const [isBotSpecOpen, setIsBotSpecOpen] = useState(false);
  const [botData, dispatch] = useReducer(botReducer, {
    bots: [],
    armyBots: [],
    currentSelectedBot: {},
  });
  const [botClassFilter, setBotClassFilter] = useState(["All"]);
  const [toggleSortByHealth, setToggleSortByHealth] = useState(false);
  const [toggleSortByDamage, setToggleSortByDamage] = useState(false);
  const [toggleSortByArmor, setToggleSortByArmor] = useState(false);

  const fetchBoltsFromServer = () => {
    fetch("http://localhost:4000/bots")
      .then((resp) => resp.json())
      .then((bots) =>
        dispatch({ type: actionTypes.FILL_BOLTS, payLoad: bots })
      );
  };

  const addBotToArmy = () => {
    const currentBot = botData.currentSelectedBot;
    const isBotAdded = botData.armyBots.includes(currentBot);
    const currentBotClassInArmy = isBotClassRepresentedInArmy(
      currentBot.bot_class
    );
    if (!isBotAdded) {
      if (!Boolean(currentBotClassInArmy)) {
        dispatch({
          type: actionTypes.ADD_ARMY_BOLT,
          payLoad: currentBot,
        });
        dispatch({
          type: actionTypes.REMOVE_FROM_BOTS,
          payLoad: currentBot.id,
        });
        toast.success(`${currentBot.name} added successfully`);
      } else {
        toast.error(
          `${currentBot.bot_class} group is alraedy represented by '${currentBotClassInArmy?.name}'!!`
        );
      }
    } else {
      toast.info(`${currentBot.name} already selected!!`);
    }
  };

  const setSelelectedBot = (botId) => {
    const bot = findBotById(botId);
    dispatch({ type: actionTypes.CURRENT_SELECTED_BOT, payLoad: bot });
    setIsBotSpecOpen(true);
  };

  const removeBotFromArmy = (botId) => {
    const armyBot = findArmyBotById(botId);
    dispatch({ type: actionTypes.REMOVE_FROM_ARMY, payLoad: botId });
    dispatch({
      type: actionTypes.ADD_BOLT,
      payLoad: armyBot,
    });
  };

  const deleteBotFromServer = (botId) => {
    fetch(`http://localhost:4000/bots/${botId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((resp) => {
      if (resp.ok) {
        toast.info("Bot Deleted!!");
        dispatch({ type: actionTypes.REMOVE_FROM_BOTS, payLoad: botId });
        dispatch({ type: actionTypes.REMOVE_FROM_ARMY, payLoad: botId });
      }
    });
  };

  const findBotById = (botId) => {
    return botData.bots.find((bot) => bot.id === botId);
  };

  const findArmyBotById = (botId) => {
    return botData.armyBots.find((bot) => bot.id === botId);
  };

  const isBotClassRepresentedInArmy = (botClass) => {
    return botData.armyBots.find((bot) => bot.bot_class === botClass);
  };

  useEffect(() => {
    fetchBoltsFromServer();
  }, []);

  const goBack = () => {
    setIsBotSpecOpen(false);
  };

  const filterByBotClass = (filters) => {
    setBotClassFilter(filters);
  };

  const sortBots = (key) => {
    // sorts bots collection by health, damage or armor
    let sortedBots = [];
    if (key === "health") {
      setToggleSortByHealth((toggleSortByHealth) => !toggleSortByHealth);
      sortedBots = sortBotsByHealth(botData.bots, key, !toggleSortByHealth);
    } else if (key === "damage") {
      setToggleSortByDamage((toggleSortByDamage) => !toggleSortByDamage);
      sortedBots = sortBotsByDamage(botData.bots, key, !toggleSortByDamage);
    } else {
      // sort by armor
      setToggleSortByArmor((toggleSortByArmor) => !toggleSortByArmor);
      sortedBots = sortBotsByArmor(botData.bots, key, !toggleSortByArmor);
    }
    dispatch({ type: actionTypes.FILL_BOLTS, payLoad: sortedBots });
  };

  const filteredBots = useMemo(() => {
    return botData.bots.filter((bot) => {
      console.log("Method called");
      if (botClassFilter.includes("All")) {
        return true;
      } else {
        return botClassFilter.includes(bot.bot_class);
      }
    });
  }, [filterByBotClass]);

  return (
    <div className="bot">
      <BotArmy bots={botData.armyBots} onAction={removeBotFromArmy} />
      {isBotSpecOpen ? (
        <BotSpecs
          bot={botData.currentSelectedBot}
          onGoBack={goBack}
          onAddBot={addBotToArmy}
        />
      ) : (
        <>
          <BotContext.Provider value={botData.bots}>
            <SortBar
              onFilterByBotClass={filterByBotClass}
              onBotsSort={sortBots}
            />
          </BotContext.Provider>

          <BotContext.Provider value={filteredBots}>
            <BotCollection
              onAction={setSelelectedBot}
              onBotDelete={deleteBotFromServer}
            />
          </BotContext.Provider>
        </>
      )}
    </div>
  );
};

export default Bots;
