import { memo, ReactNode, useContext, useEffect, useState } from 'react';
import 'react-vis/dist/style.css';
import {
  XYPlot, 
  LineSeries, 
  VerticalGridLines, 
  HorizontalGridLines, 
  XAxis, 
  YAxis,   
  FlexibleXYPlot,
  FlexibleWidthXYPlot,
  FlexibleHeightXYPlot
} from 'react-vis';

import './styles.scss';
import { simulatorContext } from '../../contexts/SimulatorContext';



type SimulationData = {
  x:number,
  y:number
}





const initialData = [
  {x: 0, y: 0},
]
const ChartComponent = () => {
  const [simulationDataArray, setSimulationDataArray] = useState<SimulationData[]>(initialData)
  const [xAxis, setXAxis] = useState<number[]>([0,50])
  const [displayedValues, setDisplayedValues] = useState<SimulationData[]>()
  const [maxSimulationData, setMaxSimulationData] = useState<SimulationData[]>(initialData)
  const [maxSimulationValue, setMaxSimulationValue] = useState<number>(0)
  const [counter, setCounter] = useState<number>(1)
  const [isOn, setIsOn] = useState<boolean>(false)

  const { simulationData, setSimulationData } = useContext(simulatorContext);

  const randomNumber = (min:number, max:number) => Math.random() * (max - min) + min;

  const insertSimulationData = () => {
    const {x, y} = handleCreateSimulatorData()
    // if(y > maxSimulationValue){
    //   setMaxSimulationValue(y)
    // }
    setSimulationDataArray([...simulationDataArray, {x, y}])

    // setMaxSimulationData([...maxSimulationData, {x, y:maxSimulationValue}])
    
    // if(simulationData.length > 30){
    //   const minAxis = xAxis[0]
    //   const maxAxis = xAxis[1]
    //   setXAxis([minAxis +100, maxAxis+100])
    // }
  }

  const handleCreateSimulatorData = () => {
    const randomY = simulationData;
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
      }, 190);
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
        <FlexibleXYPlot animation={true} yDomain={[0,150]}>
          <HorizontalGridLines tickValues={[0, 25, 50,75,100,125,150]} />
          <XAxis title={"time"} tickTotal={10}/>
          <YAxis  hideLine tickValues={[0, 25, 50,75,100,125,150]} style={{marginRight: 10, overflow:"hidden"}} />
          {/* <LineSeries color={"#B58604"} data={maxSimulationData} /> */}

          <LineSeries animation={true} color={"#F2E1AB"} data={simulationDataArray} curve={'curveMonotoneX'} />
        </FlexibleXYPlot>
      </div>
    </div>
  );
}

export default memo(ChartComponent)
