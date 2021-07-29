import { FormEvent, useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import Modal from 'react-modal';
import {motion} from "framer-motion"

import menuIcon from "../assets/images/menu-hamburger.svg"
import logo from "../assets/images/dewboard-logo.svg"
import simulatorIcon from "../assets/images/simulator-icon.svg"
import avatar from "../assets/images/avatar.svg"

import useOutsideClick from "../hooks/useOutsideClick";
import ChartComponent from "../components/ChartComponent";

import "../styles/dashboard.scss"
import { ContinuousSlider } from "../components/ContinuousSlider";
import { IconComponent } from "../components/IconComponent";
import { useAuth } from "../hooks/useAuth";
import { DownloadBanner } from "../components/DownloadBanner";
import { clearTimeout, setTimeout } from "timers";

export function Dashboard(){
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isTestFinished, setIsTestFinished] = useState(false)
  const [isSafeToDisplay, setIsSafeToDisplay] = useState(false)
  
  const {user, getUserSession  } = useAuth()
  const ref = useRef(null);
  const history = useHistory()

  useOutsideClick(ref, () => {
    isMenuOpen && setIsMenuOpen(false)
  });

  //sidebar animation
  const hidden= { 
      opacity: 0,
      x:-250,
  }
    
  const  show = { 
    opacity: 1,
    x:0
  }

  const gridAnimation = {
    initial: { 
      gridTemplateColumns: "2fr 4.6fr",
      padding: "0 2.5rem",
    },

    final: {
      gridTemplateColumns: "0fr 4.6fr",
      padding: "0 10rem",
      transition: {
        staggerChildren: 0.150,
        delayChildren: 0.2,
        y: { stiffness: 100, velocity: 100 }
      }
    }
  }

  const chartOffset = {
    initial: { 
      marginLeft:0,
    },

    final: {
      marginLeft:"-2rem",
    }
  }

  const sliderOpacity = {
    initial: { 
      opacity:0,
    },

    final: {
      opacity:1,
    }
  }

  useEffect(() => {
    (async () => {
      try {
      await getUserSession()
      } catch (error) {
        history.push("/login")
      }
    })()
  }, [])

  useEffect(() => {
    if(!isTestFinished){
      const unMount = setTimeout(() => {
        setIsSafeToDisplay(true)
      },200)
      return () => {clearTimeout(unMount)}
    }else{
      setIsSafeToDisplay(false)
    }
  },[isTestFinished])

  return(
    <div id="page-dashboard">
      <div className="sidebar">
        <img src={logo} alt="logo" />
        <button>
          <img src={simulatorIcon} alt="simulator" />
          Simulator
        </button>
      </div>

      <motion.div ref={ref}
         className="side-menu"
         initial={hidden}
         animate={isMenuOpen ? show : hidden}
         transition={{type: 'spring', bounce: 0.15 }}
         >
           <img src={logo} alt="logo" />
           <button>
             <img src={simulatorIcon} alt="simulator" />
             Simulator
            </button>  
      </motion.div>
      
      <header>
        <button className="open-menu"onClick={() => setIsMenuOpen(true)} >
          <img src={menuIcon} alt="open menu" />
        </button>

        <h2 onClick={() => setIsTestFinished(!isTestFinished)}>Dashboard</h2>

        <div className="profile">
          <span>{user?.name}</span>
          <div>
            <img src={avatar} alt="avatar" />
          </div>
        </div>
      </header>
      
      <motion.main
      initial={"initial"}
      variants={gridAnimation}
      animate={!isTestFinished ? "initial" : "final" }
      >
        <div className="box user">
          <h1>Hello, {user?.name}</h1>
          <h2>play around with your strength</h2>
        </div>
      {isSafeToDisplay && 
              <motion.div 
              initial={{opacity: 0}}
              animate={{opacity:1}}
              className="slider-component">
                <ContinuousSlider/>
            </motion.div>
      }

    
        <motion.div 
        className="box chart"
        variants={chartOffset}
        initial={"initial"}
        animate={!isTestFinished ? "initial" : "final" }
        >
          <ChartComponent/>
        </motion.div>

        <div className="banner">
          {isTestFinished ?  <DownloadBanner/> : <IconComponent/> }
         
        </div>
      </motion.main>
    </div>
  )
}