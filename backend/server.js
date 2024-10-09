import express from "express";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
    cors({
    origin:process.env.CLIENT_URL,
    method: ["GET" , "POST" , "DELETE" , "OPTIONS"],
    
}));

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to mongodb");
        
    } catch (error) {
        console.log(error)
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY ,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  });

app.get("/api/upload" ,(req,res)=>{
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
});

app.listen(port , () =>{
    connect()
    console.log('server is running on port 3000');
});
