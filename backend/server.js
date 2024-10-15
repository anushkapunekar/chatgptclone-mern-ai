import express from "express";
import ImageKit from "imagekit";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import url , {fileURLToPath} from "url";
import mongoose from "mongoose";
import {ClerkExpressRequireAuth} from "@clerk/clerk-sdk-node";
import UserChats from "./models/userChats.js";
import Chat from "./models/chat.js";



dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware for CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL, 
    methods: ["GET" , "POST" , "PUT"],
    credentials: true,
  })
);



app.use(express.json());


// MongoDB Connection
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to MongoDB");
    } catch (err) {
      console.log(err);
    }
  };
  

// Initialize ImageKit instance
const imagekit = new ImageKit({
  urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY
});

// Route to get ImageKit authentication parameters
app.get("/api/upload", (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
});


// Route to handle chat messages
app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    const { text } = req.body;
  try {
    //create a new chat
    const newChat= new Chat({
        userId,
        history: [{role: "user", parts: [{text}]}],
    });

    const savedChat = await newChat.save();

    //check if the userchats exists
    const userChats = await UserChats.find({userId});
   //if doesnt existcreate a new one and add the chat in chats array
    if(!userChats.length){
        const newUserChats = new UserChats({
            userId,
            chats: [
                {
                    _id:savedChat._id,
                    title:
                        text.substring(0,40),
                    
                },
            ],
        });

       await newUserChats.save() 
    }else{
        //if exists push the chat to the existing array
        await UserChats.updateOne({userId:userId},{
            $push:{
                chats: {
                    _id:savedChat._id,
                    title: text.substring(0,40),
                },
            },

        },
    );
    res.status(201).send(newChat._id);
    }

  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating chat!");
    
  }
});

app.get("/api/userchats", ClerkExpressRequireAuth(), async(req,res)=>{
  const userId = req.auth.userId;

  try{
    const userChats = await UserChats.find({userId});
    res.status(200).send(userChats[0].chats); 
  }catch(err){
    console.log(err);
    res.status(500).send("error fetching userchats!");
  }
});

app.get("/api/chats/:id", ClerkExpressRequireAuth(), async(req,res)=>{
  const userId = req.auth.userId;

  try{
    const chat = await Chat.findOne({_id: req.params.id,userId});
    res.status(200).send(chat); 
  }catch(err){
    console.log(err);
    res.status(500).send("error fetching chat!");
  }
});

app.put("/api/chats/:id" , ClerkExpressRequireAuth(), async (req,res)=>{
  const userId = req.auth.userId;

  const {question , answer , img} = req.body;

  const newItems = [
    ...(question
      ? [{role:"user", parts: [{text: question}], ...(img && {img})}]
      : []
    ),
    {role: "model" , parts: [{text:answer}]},
  ];

  try{
    const updatedChat = await Chat.updateOne(
      {_id:req.params.id, userId},
      {
        $push: {
          history:{
            $each: newItems,
          },
        },
      },
    );
    console.log("Updated Chat:", updatedChat); 
    res.status(200).send(updatedChat); 
  }catch(err){
    console.log(err);
    res.status(500).send("error Adding a conversation!");
  }
});



app.use((err , req , res , next)=> {
  console.log(err.stack);
  res.status(401).send("Unauthenticated!");
  
});

app.use(express.static(path.join(__dirname, "../client/dist")))

app.get("*", (req,res)=> {
  res.sendFile(path.join(__dirname, "../client/dist" , "index.html"))
})
  

// Start server and connect to MongoDB
app.listen(port, () => {
  connect();
  console.log(`Server is running on port 3000`);
});
