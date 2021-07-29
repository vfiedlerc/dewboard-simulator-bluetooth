import initialEmoji from "../../assets/images/initialEmoji.svg";
import middleEmoji from "../../assets/images/middleEmoji.svg";
import finalEmoji from "../../assets/images/finalEmoji.svg";
import { useContext, useState } from "react";
import { simulatorContext } from "../../contexts/SimulatorContext";

export function IconComponent() {
  const { simulationData, setSimulationData } = useContext(simulatorContext);

  return (
    <div>
      {Number(simulationData) <= 50 && (
        <div>
          <img src={initialEmoji} alt="emoji"></img>
          <h1>Keep going! You can't stop now</h1>
        </div>
      )}

      {Number(simulationData) > 50 && Number(simulationData) < 100 && (
        <div>
          <img src={middleEmoji} alt="emoji"></img>
          <h1>C'mon! Just a little bit more!</h1>
        </div>
      )}


      {Number(simulationData) > 100 && (
        <div>
          <img src={finalEmoji} alt="emoji"></img>
          <h1>Your're a monster!</h1>
        </div>
      )}


    </div>
  );
}
