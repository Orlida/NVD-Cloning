const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGODB_URL)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Success! We can connect to the MONGO server")
    })
    .catch((err) => {
        console.log(`Error: ${err}`)
    })


const userSchema = new mongoose.Schema({
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema, 'testUser')

app.post('/test', async (req,res) => {

    console.log("We can get /test");

    const email = req.body.email.trim();

    console.log(`Searching for ${email} in collection: ${User.collection.name}`);
    
    try {
        const user = await User.findOne({email: email})

        console.log("User found in DB: ",user)

        if(user){
            return res.status(200).json({ exists: true })
        }else{
            return res.status(200).json({ exists: false})
        }
    }catch(err){
        return res.status(500).json({ message: "Server Error", error: err.message});
    }
})

const port = 5000;

app.listen(port ,() => {
    console.log("Running server in port http://localhost:5000/test")
})