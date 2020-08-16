import React from "react";
import "../styles/TabBarOption.css";

type TabBarOptionProps = {
  selected: boolean;
  icon: string;
  title: string;
};

const TabBarOption: React.FC<TabBarOptionProps> = ({
  selected,
  icon,
  title,
}) => {
  return (
    <div className={`tab-bar-option ${selected && "tab-bar-selected-option"}`}>
      <img src={icon} alt={`${title} icon`} className="tab-bar-icon" />
      {title}
    </div>
  );
};

export default TabBarOption;
