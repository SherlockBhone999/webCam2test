
import { useState, useEffect } from "react"
import io  from "socket.io-client"

const serverUrl = "https://webcamserver.onrender.com"
//const serverUrl ="http://localhost:3000"
const socket = io(serverUrl)


export default function App(){
  const [ room, setRoom ] = useState("")
  const [ messages, setMessages ] = useState([])
  const [ newText, setNewText ] = useState("")
  
  useEffect(()=>{
    socket.on("connect",()=>{
      /*
      const arr = [...messages,`you have connected with socketID : ${socket.id}`]
      setMessages(arr)
      */
    })
    
    socket.on("receiveMessage",(message)=>{
      const arr = [...messages, message]
      setMessages(arr)
    })
  },[messages])
  
  const sendMessage = () => {
    socket.emit("sendMessage", newText, room )
    const arr = [...messages, newText]
    setMessages(arr)
    setNewText("")
    
  }

  const joinRoom = () => {
    socket.emit("joinRoom", room )
  }

  /*
  const joinRoom = () => {
    socket.emit("joinRoom", room, () => {
      const arr = [...messages,`user ${socket.id} has joined`]
      setMessages(arr)
    })
  }
  */
  
  return (
    <div>
      <p>messages</p>
      { messages.map(str => <div>
        <p>{str}</p>
      </div>)}
      <p>---</p>
      <p>newText</p>
      <input type="text" 
        value={newText}
        onChange={e => setNewText(e.target.value)}
      /> 
      <button 
        onClick={sendMessage}
      >send</button>
      
      <p>room</p>
      <input type="text" 
        onChange={e => setRoom(e.target.value)}
      /> 
      <button 
        onClick={joinRoom}
      >join</button>
    </div>
  )
}

/*
git remote add origin https://github.com/SherlockBhone999/webCam2test.git
git branch -M main
git push -u origin main
*/