import httpStatus from "http-status";
import {User}  from "../models/user.model.js";
import {Meeting} from "../models/meeting.model.js";
import bcrypt , {hash} from "bcrypt";
import crypto from "crypto";

const login = async(req,res) =>{
    const {username , password} = req.body;

    if(!username || !password){
        return res.status(400).json({messgae: "Please provide"});
    }

    try{
     const user = await User.findOne({username});
     if(!user){
        return res.status(httpStatus.NOT_FOUND).json({messgae :"User Not Found"});
     }

     let isPasswordCorrect = await bcrypt.compare(password , user.password);
     if(isPasswordCorrect){
        let token = crypto.randomBytes(20).toString("hex");
      
        user.token  = token;
        await user.save();
        return res.status(httpStatus.OK).json({token : token});
     }else{
      return res.status(httpStatus.UNAUTHORIZED).json({message : "Invalid credentials"});
     }
    }catch(e){
      return res.status(500).json({message : `Something went wrong`});
    }
}

const register = async(req , res) =>{
    const {name , username , password} = req.body;

    try{
      const existingUser = await User.findOne({username});
      if(existingUser){
        return res.status(httpStatus.FOUND).json({message : "User already exists"});
      }

      const hashedPassword = await bcrypt.hash(password , 10);

      const newUser = new User({
        name : name , 
        username : username , 
        password : hashedPassword
      });

      await newUser.save();
      
      res.status(httpStatus.CREATED).json({message : "User registered successfully"});

    }catch(e){
     res.json({message : `Something went wrong ${e}`});
    }
};

const getUserHistory = async(req , res) =>{
  const{token} = req.query;

  try{
    if(!token){
      return res.status(httpStatus.BAD_REQUEST).json({message : "Token is required"});
    }

    const user = await User.findOne({token: token});
    
    if(!user){
      return res.status(httpStatus.UNAUTHORIZED).json({message : "Invalid token"});
    }

    const meetings = await Meeting.find({user_id: user.username});
    res.status(httpStatus.OK).json(meetings)
  }catch(e){
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message : `Something went wrong ${e}`});
  }
}

const addToHistory = async (req, res) => {
    const { token, meeting_code } = req.body;

    try {
        const user = await User.findOne({ token: token });

        if(!user){
            return res.status(httpStatus.UNAUTHORIZED).json({message : "Invalid token"});
        }

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code,
            messages: []
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({ message: "Added code to history", meeting: newMeeting })
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${e}` })
    }
}

const addMessagesToMeeting = async (req, res) => {
    const { token, meeting_code, messages } = req.body;

    try {
        if(!token || !meeting_code){
            return res.status(httpStatus.BAD_REQUEST).json({message : "Token and meeting code required"});
        }

        const user = await User.findOne({ token: token });
        if(!user){
            return res.status(httpStatus.UNAUTHORIZED).json({message : "Invalid token"});
        }

        const meeting = await Meeting.findOneAndUpdate(
            { meetingCode: meeting_code, user_id: user.username },
            { $set: { messages: messages } },
            { new: true }
        );

        if(!meeting){
            return res.status(httpStatus.NOT_FOUND).json({message : "Meeting not found"});
        }

        res.status(httpStatus.OK).json({ message: "Messages saved", meeting: meeting })
    } catch (e) {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: `Something went wrong ${e}` })
    }
}

export {login , register , getUserHistory , addToHistory, addMessagesToMeeting} ;