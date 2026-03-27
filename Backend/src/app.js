// ## Start the server by
// node app.js

import express from "express";
import {createServer} from "node:http";
import {Server} from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connectToSocket } from "./controllers/socketManager.js";
import userRoutes from "./routes/user.routes.js";

const app = express();
const port = 8080;
const server = createServer(app);
const io = connectToSocket(server);

app.set("port" , (process.env.PORT || 8080));
app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit : "40kb" , extended: true}));
app.use("/api/v1/users" , userRoutes);

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect("mongodb+srv://krrishbhandari44_db_user:Krish@cluster2.dlakyn2.mongodb.net/?appName=Cluster2");
};


app.get("/" , (req,res) =>{
    res.send("Connection Sucessful");
});

server.listen(app.get("port") , ()=>{
    console.log(`App is listening on port: ${app.get("port")}`);
})