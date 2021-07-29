import React,{ createContext, ReactNode, useState } from "react";


interface SimulatorContextData{
  simulationData :number
  setSimulationData: React.Dispatch<React.SetStateAction<number>>
}

type SimulatorProviderProps = {
  children: ReactNode;
}

export const simulatorContext = createContext({} as SimulatorContextData)

export const SimulatorProvider = ({children} : SimulatorProviderProps) => {
  const [simulationData, setSimulationData]= useState<number>(0)
  // const history = useHistory()

    
    return (
      <simulatorContext .Provider value={{ simulationData, setSimulationData }}>
        {children}
      </simulatorContext.Provider>
    )
}