import { ReactNode, useEffect, useState } from 'react';
import io from "socket.io-client"

const socket = io(`${process.env.REACT_APP_SOCKET_URL}`);
socket.on('connect', () => console.log('Connected'))

interface SocketConnectionProps {

}

export function SocketConnection() {
  const [simulationData, setSimulationData] = useState<any>()
  const [user, setUser] = useState<string | undefined>("username")
  const [connected, setConnected] = useState(false)

  //listener
  useEffect(() => {
    socket.on("new data", (data:string) => {
      console.log("socket data", data)
      setSimulationData(data)
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

    const payload = {
      content:Date.now(), // change to simulator data
      roomName: user,
    }
    
    //send event to socket 
    socket.emit("send data", payload)
  }

  function handleJoinRoom() {
    socket.emit("join room", user, (data: any) => console.log(data))
  }

  return (
    <>
      <h1>SocketConnection</h1>
      <button onClick={handleSendData}>Test</button>
      <input type="text" value={user} onChange={ event => setUser(event.target.value)} />
      <button onClick={handleJoinRoom}>join room</button>
      <div>
        {JSON.stringify(simulationData)}
      </div>
    </>
  );
}

//socket events
//join room - take username as argument (lately email/token/user.id) 
//send data 
//new data - get data
