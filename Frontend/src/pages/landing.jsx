import React from 'react';  
import {Link, useNavigate} from "react-router-dom";
import GamepadIcon from '@mui/icons-material/Gamepad';
import "../App.css";

export default function LandingPage(){

   const router = useNavigate();

    return (
       <div className='landingPageContainer'>
         <nav>
            <div className="navHeader">
                <h2><GamepadIcon/> Apna Video Call</h2>
            </div>

            <div className="navlist">
                <h3 onClick={() => {
                  router("/aljk23")
                }}>Join as Guest</h3>
                
                <h3 onClick={() => {
                  router("/auth")
                }}>Register</h3>
                
                <div onClick={() =>{
                  router("/auth")
                }} role="button">
                   <h3>Login</h3>
                </div>
            </div>
         </nav>

         <div className="landingMainContainer">
         <div>
            <h1><span style={{color:"#FF9839"}}>Connect </span>with your loved Ones</h1>

            <p>Cover a distance by Apna Video Call</p>

            <div role='button'>
                <Link to={"/auth"}>Get Started</Link>
            </div>
         </div>

         <div>
            <img src="/mobile.png" alt="Random Image"/>
         </div>
         </div>

       </div>
    )
}