const express = require('express');
const mongoose = require('mongoose');
let {users} = require("./Data/users.json");

const dotenv = require('dotenv');


const DbConnection = require('./databaseConnection.js');

const userrouter = require("./routes/users");
const booksrouter = require("./routes/books");

dotenv.config();
DbConnection();
const app = express();



const port = 8081;
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message : "Home Page:-"
    });
});

app.use("/users",userrouter);
app.use("/books",booksrouter);



app.listen(port,()=>{
    console.log(`server is live on port http://localhost:${port}`)
});