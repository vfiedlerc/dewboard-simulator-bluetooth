import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import "./Slider.scss";
import { ReactNode, useEffect, useState } from 'react';
import io from "socket.io-client"
import { simulatorContext } from '../../contexts/SimulatorContext';

const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
socket.on('connect', () => console.log('Connected'))




const useStyles = makeStyles({
  root: {
    height: `${22}rem`,
    width: `${19}rem`
      

  },
  
});

export function ContinuousSlider() {


  const [sliderData, setSliderData] = useState(0)
  const {simulationData,setSimulationData} = useContext(simulatorContext)

  const [user, setUser] = useState<string>("username")
  const [connected, setConnected] = useState(false)

  //listener
  useEffect(() => {
    socket.on("new data", (data:string) => {
      console.log(data)
     // setSimulationData(Number(data))
    })

    return () => {
      //remove listener
    socket.off("new data")
    }
  },[])

  function handleSendData() {
    if(!user){
     return 
     
    
    }
    handleJoinRoom()
    
    const payload = {
      content: simulationData, // change to simulator data
      roomName: user, 
    }
    
    //send event to socket 
    socket.emit("send data", payload)
  }

  function handleJoinRoom() {
    socket.emit("join room", user, (data: any) => console.log(data))
  }



  //const classes = useStyles();


  const handleChange = (event: any, newValue: number | number[]) => {
    setSimulationData(newValue as number);
    setSliderData(newValue as number);
  };

  return (
    <div className="slider-size">

     <div className="slider-value">
       {sliderData}
       </div>

      <Grid container spacing={2}>
        <Grid item>
        <Typography gutterBottom ></Typography>
        </Grid>

        <Grid item xs>

          <Slider 
          value={simulationData}
          onChange={handleChange} 
          aria-labelledby="continuous-slider"
          min={0}
          max={150}
          />
        </Grid>

        <Grid item>
        <Typography gutterBottom></Typography>
        
        </Grid>
        
      </Grid>
      <button  onClick={handleSendData} className="button-test">test me!</button>
       </div>
  );
}
