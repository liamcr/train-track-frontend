import React from "react";
import { ExerciseSet } from "../util/commonTypes";
import "../styles/SetInputItem.css";

type SetInputItemProps = {
  exerciseSet: ExerciseSet;
  setSet: (arg0: ExerciseSet) => void;
};

const SetInputItem: React.FC<SetInputItemProps> = ({ exerciseSet, setSet }) => {
  return <div>Hey</div>;
};

export default SetInputItem;
