import React, { useContext } from "react";
import { BotContext } from "../context/BotContext";

const SortBar = ({ onFilterByBotClass, onBotsSort }) => {
  const bots = useContext(BotContext);

  const handleSelectChange = (e) => {
    let options = e.target.options;
    let values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    onFilterByBotClass(values);
  };

  const botClasses = [...new Set(bots.map((bot) => bot.bot_class))];
  const optionList = botClasses.map((cl, index) => (
    <option key={index} value={cl}>
      {cl}
    </option>
  ));

  return (
    <div className="sort-bar">
      <span>
        Health{" "}
        <i
          className="fa fa-sort"
          aria-hidden="true"
          onClick={() => onBotsSort("health")}
        ></i>
      </span>
      <span>
        Damage{" "}
        <i
          className="fa fa-sort"
          aria-hidden="true"
          onClick={() => onBotsSort("damage")}
        ></i>
      </span>
      <span>
        Armor{" "}
        <i
          className="fa fa-sort"
          aria-hidden="true"
          onClick={() => onBotsSort("armor")}
        ></i>
      </span>
      <div>
        Filter By Bot Class
        <select
          className="multi-select-filter"
          multiple
          onChange={handleSelectChange}
        >
          <option value="All">All</option>
          {optionList}
        </select>
      </div>
    </div>
  );
};

export default SortBar;
