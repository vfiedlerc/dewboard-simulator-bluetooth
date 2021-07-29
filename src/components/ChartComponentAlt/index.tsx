import { memo, ReactNode, useEffect, useState } from 'react';
import 'react-vis/dist/style.css';
import { Line } from 'react-chartjs-2';
import './styles.scss';



type SimulationData = {
  x:number,
  y:number
}

const initialData = [
  {x: 0, y: 0},
]
const ChartComponent = () => {
  const [simulationData, setSimulationData] = useState<SimulationData[]>(initialData)
  const [xAxis, setXAxis] = useState<number[]>([0,50])
  const [displayedValues, setDisplayedValues] = useState<SimulationData[]>()
  const [maxSimulationData, setMaxSimulationData] = useState<SimulationData[]>(initialData)
  const [maxSimulationValue, setMaxSimulationValue] = useState<number>(0)
  const [counter, setCounter] = useState<number>(1)
  const [isOn, setIsOn] = useState<boolean>(false)

  const randomNumber = (min:number, max:number) => Math.random() * (max - min) + min;

  const insertSimulationData = () => {
    const {x, y} = handleCreateSimulatorData()
    // if(y > maxSimulationValue){
    //   setMaxSimulationValue(y)
    // }
    setSimulationData([...simulationData, {x, y}])

    // setMaxSimulationData([...maxSimulationData, {x, y:maxSimulationValue}])
    
    // if(simulationData.length > 30){
    //   const minAxis = xAxis[0]
    //   const maxAxis = xAxis[1]
    //   setXAxis([minAxis +1, maxAxis+1])
    // }
  }

  const handleCreateSimulatorData = () => {
    const randomY = Math.floor(randomNumber(30, 150))
    setCounter(counter +1)

    return {x:counter, y:randomY}
  }

  const getArrayLastValues = (array:Array<SimulationData>, numberOfValues:number) => {
    return array.slice(Math.max(array.length - numberOfValues, 0))
  }

  useEffect(() => {
    if(isOn){
     const interval = setInterval(() =>{ 
        insertSimulationData()
      }, 90);
      return () => clearInterval(interval);
    }else if (!isOn) {
      clearInterval();
    }
  },[isOn, insertSimulationData])


  return (
    <div id="chart-component">
      <div className="label">
        <p>Results</p>
        <div>
          <span className="current">Current</span>
          <span className="maximum">Maximum</span>
        </div>
        <button onClick={() => setIsOn(!isOn)}></button>

      </div>
      <div className="chart">
      </div>
    </div>
  );
}

export default memo(ChartComponent)
