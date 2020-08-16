import React from "react";
import "../styles/TabBar.css";

type TabBarProps = {
  index: number;
};

const TabBar: React.FC<TabBarProps> = ({ index }) => {
  return (
    <div className="tab-bar-container">
      <div
        className={`tab-bar-option ${index === 0 && "tab-bar-selected-option"}`}
      >
        Home
      </div>
      <div
        className={`tab-bar-option ${index === 1 && "tab-bar-selected-option"}`}
      >
        Profile
      </div>
    </div>
  );
};

export default TabBar;
