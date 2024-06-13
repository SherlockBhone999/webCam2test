
import Chat2 from "./Chat2"

import { BrowserRouter, Routes, Route, useParams , useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState, createContext , useContext } from "react"

import "./index.css"





export const Context = createContext()


const Another = () => {
  const navigate = useNavigate()
  
  
  return (
    <div>
      <button className="bg-blue-400 p-2 m-1" onClick={()=>{
        navigate("/")
      }} > to home page</button>
      


    </div>
  )
}

const Home = () => {
  const navigate = useNavigate()
  return (
    <div>
      <button className="bg-blue-400 p-2 m-1" onClick={()=>{
        window.open("/gg","_blank")
      }}>to another page </button>
      <Chat2 />
    
      </div>
  )
}

function App () {
  const { i } = useParams()
  return (
    <BrowserRouter >
      <Routes >
        <Route exact path="/" element={<Home />} />
        <Route path="/:i" element={<Another />} />
      </Routes> 
    </BrowserRouter>
  )
}


export default function App2 () {

  return (
    <Context.Provider value={{
      
    }}>
      <App />
    </Context.Provider>
  )
}