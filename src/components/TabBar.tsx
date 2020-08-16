import React from "react";
import TabBarOption from "./TabBarOption";
import HomeIcon from "../assets/icons/home.svg";
import SearchIcon from "../assets/icons/search.svg";
import PersonIcon from "../assets/icons/person.svg";
import "../styles/TabBar.css";

type TabBarProps = {
  index: number;
};

const TabBar: React.FC<TabBarProps> = ({ index }) => {
  return (
    <div className="tab-bar-container">
      <TabBarOption selected={index === 0} icon={HomeIcon} title="Home" />
      <TabBarOption selected={index === 1} icon={SearchIcon} title="Search" />
      <TabBarOption selected={index === 2} icon={PersonIcon} title="Profile" />
    </div>
  );
};

export default TabBar;
