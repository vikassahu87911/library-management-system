const express = require('express');
const app = express();

const port = 8081;
app.use(express.json());

app.get('/',(req,res)=>{
    res.status(200).json({
        message : "Home Page:-"
    });
});


app.listen(port,()=>{
    console.log(`server is live on port http://localhost:${port}`)
});