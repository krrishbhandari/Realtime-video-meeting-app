import React, { useState, useContext } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import RestoreIcon from '@mui/icons-material/Restore';
import GamepadIcon from '@mui/icons-material/Gamepad';
import "../App.css";
import { Button, TextField } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";


function HomeComponent(){

    let navigate = useNavigate();
    const[meetingCode , setMeetingCode] = useState("");

    const {addToUserHistory} = useContext(AuthContext);

    let handleJoinVideoCall = async() =>{
       await addToUserHistory(meetingCode);
       navigate(`/${meetingCode}`)
    }

return (
    <>
    
    <div className="navBar">
        <div style={{display: "flex" , alignItems: "center"}}>
           <h1 style={{position:"fixed" , color:"#1976D2" , marginLeft:"20px"}}><GamepadIcon/> Apna Video Call</h1>
        </div>

        <div style={{display: "flex" , alignItems: "center"}}>
           {/* <IconButton onClick={() =>{
            navigate("/history")
           }}>
              <RestoreIcon />
           </IconButton>
           <h3>History</h3> */}
           &nbsp;&nbsp;&nbsp;
           <Button onClick={() => {
             localStorage.removeItem("token")
             navigate("/auth")
           }}>
            <h3 style={{color:"black"}}>Logout</h3>
           </Button>
        </div>
    </div>

    <div className="meetContainer">
      <div className="leftPanel">
        <div>
            <h2>Providing Quality Video Call Just Like Quality Education</h2>
            <br/>
            <div style={{display:"flex" , gap: "10px"}}>
                  <TextField onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined" />
                  <Button onClick={handleJoinVideoCall} variant='contained'>Join or Create</Button>
            </div>
        </div>
      </div>

      <div className='rightPanel'>
        <img srcSet='/logo3.png' alt="" />
      </div>


    </div>
    </>
)
}

export default withAuth(HomeComponent);