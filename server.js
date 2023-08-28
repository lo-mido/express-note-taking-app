const PORT= process.env.PORT ||3001; 
const fs= require('fs');
const path= require('path');
// code lines 1-4 initializes the path and set up the node js application and the file system to use 3001 as the default port number.

const express= require('express');
const app= express();

const allNotes = require("./Develop/db/db.json"); 
app.use(express.json());
app.use(express.static("public")); 
    // comment here
    
  app.get("/api/notes,(req,res) => { res.json(allNotes.slice(1)); });