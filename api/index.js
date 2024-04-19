const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
require('dotenv').config()
const uri = process.env.MONGO_URI
const User = require('./models/User.js')
const cors = require('cors');

mongoose.connect(uri)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.use(express.json());
app.use(cors());
 


app.post("/form",async(req,res)=>{

    const name = req.body.name
    const Password = req.body.password
    const username = req.body.username
    const Email = req.body.email
    
  
    const formData = new User({
        name:name,
        username:username,
        password:Password,
        email:Email
      })

  try{
        await formData.save();
        res.send("inserted data..")
  }catch(err){
    console.log(err)
  }
})

app.get("/user",async(req,res)=>{
    try{
        let result = await User.find()
        res.status(200).json(result);
      } catch (error){
        res.status(500).json(error)
      }    
})


app.listen(8000,()=>{
    console.log("Listening");
})

