import React from "react";
import axios, { HttpStatusCode } from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8080/api/v1/users"
})

export const AuthProvider = ({ children }) => {
    const authContext = useContext(AuthContext);

    const [userData, setUserData] = useState(authContext);

    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })

            if (request.status === HttpStatusCode.Created) {
                return request.data.messages;
            }
        }
        catch (err) {
            throw err;
        }
    }


    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            if (request.status === HttpStatusCode.Ok) {
                localStorage.setItem("token" , request.data.token);
                router("/home");
            }
        } catch (err) {
            throw err;
        }
    };

    const getHistoryOfUser = async () => {
     try{
        let request = await client.get("/get_all_activity" , {
            params: {
                token: localStorage.getItem("token")
            }
        });
        return request.data
       }catch(err){
        throw err;
       }
    }

 const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }

 const addMessagesToMeeting = async (meetingCode, messages) => {
    try {
        let request = await client.post("/add_messages", {
            token: localStorage.getItem("token"),
            meeting_code: meetingCode,
            messages: messages
        });
        return request.data
    } catch (err) {
        throw err;
    }
}

    const data = {
        userData,
        setUserData,
        handleRegister,
        handleLogin,
        getHistoryOfUser,
        addToUserHistory,
        addMessagesToMeeting
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}

