/*
import { useState, useEffect } from "react"

function App () {
  return (
    <div>
      <p>stack</p>
    </div>
  )
}

export default App
*/
import React, { useState, useEffect }from 'react';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion"


const pageVariants = {
  //initial: { opacity: 0, x: "-100%" },
  initial : { opacity : 0, scale : 0.5 },
  animate: { opacity: 1, scale : 1},
  exit: { opacity: 0.5, scale : 2, x : "100%" },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 2,
};

const Home = () => {
    const navigate = useNavigate()
    const [ isActive, setIsActive ] = useState(true)
    
    useEffect(()=>{
      
    },[])
    
    return (
  <AnimatePresence >
    { isActive &&
      <motion.div 
        //animate={{ /*x : 100 ,*/ scale : 1 , rotate : 10 }}
        //initial = {{ opacity : 1}}
        //whileInView = {{ opacity : 0.5 }}
        /*
        transition = {{
          type: "spring",
          stiffness: 260,
          damping: 20,
          ease : "easeOut",
          duration : 2
        }}
        */
        //exit = {{ opacity : 0 }}
        initial = "initial"
        animate = "animate"
        exit = "exit"
        variants = {pageVariants}
        transition={pageTransition}
      >
        <h2>Home </h2>
        <button onClick={() => {
          setIsActive(false)
          setTimeout(()=>{
            navigate("/i")
          },2000)
        }}>Go to Profile</button>
      </motion.div>
      }
    </AnimatePresence>
    );
};



const Profile = () => {
    const navigate = useNavigate()
    return (
      <div>
        <h2>Profile</h2>
        <button onClick={()=>navigate("/")}>Go Back</button>
      </div>
    );
};



function App() {
  
    return (
      <BrowserRouter>
          <Routes >
            <Route exact path='/' element={<Home />} />
            <Route path='/i' element={<Profile />} />
          </Routes>
      </BrowserRouter>
    );
}

export default App;
