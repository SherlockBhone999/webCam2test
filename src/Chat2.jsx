import { useState, useEffect, useRef } from "react"

import io  from "socket.io-client"

//const serverUrl = "https://webcamserver.onrender.com"
const serverUrl ="http://localhost:3000"
const socket = io(serverUrl)


const EachDevice = ({deviceInfo, socket}) => {
  
  const orderTakePhoto = () => {
    socket.emit("orderTakePhoto", deviceInfo)
  }
  
  const orderStartRecording = () => {
    socket.emit("orderStartRecording", deviceInfo )
  }
  
  return (
    <div>
      <p>{JSON.stringify(deviceInfo)}</p>
      <button className="bg-blue-400 p-2 m-1" onClick={orderTakePhoto} >capture photo</button>
      
      
      <button className="bg-blue-400 p-2 m-1" onClick={orderStartRecording} >capture video</button>
    </div>
  )
}

const Camera = ({cameraChildRef}) => {
  const [action, setAction ] = useState("sending stream")
  
  
  const capture = () => {
    setAction("took a photo")
    setTimeout(()=>{
      setAction("sending stream")
    },2000)
  }
  
  const record = () => {
    setAction("took a video")
    setTimeout(()=>{
      setAction("sending stream")
    },2000)
  }
  
  useEffect(()=>{
    cameraChildRef.current = {
      capture : capture,
      record : record
    }
  },[])
  
  return (
    <div>
      <h1>Camera</h1>
      <p className="text-red-400">{action}</p>
      
    </div>
  )
}


const DeviceInfo = ({deviceInfo, setDeviceInfo}) => {
  const [temp, setTemp] = useState(deviceInfo)
  
  useEffect(()=>{
    setTemp(deviceInfo)
  },[deviceInfo])
  return (
    <div>
      <p>name :</p>
      <input className="bg-gray-200 p-2 m-1"
        value={temp.deviceName}
        onChange={e => setTemp(prevv =>{ return {...prevv, deviceName : e.target.value}})}
      />
      <p>group :</p>
      <input className="bg-gray-200 p-2 m-1"
        value={deviceInfo.groupName}
        onChange={e => setTemp(prevv =>{ return {...prevv, roomName : e.target.value}})}
      />
      <button className="bg-blue-400 p-2 m-1 block" onClick={()=>{
        setDeviceInfo(temp)
      }}>set</button>
    </div>
  )
}

export default function App () {
  const [allDevices, setAllDevices ] = useState([])
  const [deviceInfo, setDeviceInfo ] = useState( 
    { 
      deviceName : "", 
      roomName : "", 
      socketId : "", 
      peerId : "" , 
      status : "", 
    } )
  const cameraChildRef = useRef(null)
  
  useEffect(()=>{
    
    socket.on("connect", () => {
      setDeviceInfo(prevv => {
        return {...prevv , socketId : socket.id }
      })
      
      if(deviceInfo.deviceName !== "" && deviceInfo.groupName !== "" && deviceInfo.socketId !== ""){
        socket.emit("sendDeviceInfoToServer", deviceInfo)
      }
    })
    
    socket.on("sendAllDevicesToClient", (devices) => {
      setAllDevices(devices)
    })
    
    socket.on("takePhoto", ()=>{
      cameraChildRef.current?.capture()
    })
    
    socket.on("startRecording", () => {
      cameraChildRef.current?.record()
    })
    
  },[])
  
  useEffect(()=>{
      if(deviceInfo.deviceName !== "" && deviceInfo.groupName !== "" && deviceInfo.socketId !== ""){
        socket.emit("sendDeviceInfoToServer", deviceInfo)
      }
  },[deviceInfo])
  

  
  return (
    <div>
    
      <p>{socket.id}</p>
      <DeviceInfo 
        deviceInfo={deviceInfo}
        setDeviceInfo={setDeviceInfo}
      />
      <p>{allDevices.length}</p>
      {allDevices.map((obj,index) => (
        <div key={index}>
          <EachDevice deviceInfo={obj}
          socket={socket}
          />
        </div>
      ))}
      
      <Camera cameraChildRef={cameraChildRef}/>
    
      
      
    </div>
  )
}