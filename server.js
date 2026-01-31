const express = require('express');
const app = express();

const bodyParser = require('body-parser')
app.use(bodyParser.json()) // for parsing application/json

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
    password: String,
    displayName: String
})

const User = mongoose.model('User', userSchema, 'testUser')

//Checking whether there is email in the storage.
app.post('/checkUser', async (req,res) => {

    const { email, password } = req.body;

    try {

        const emailUser = await User.findOne({email: email})

        console.log("User found in DB: ",emailUser)
        if(emailUser){
            if(password){
                if(emailUser.password === password){
                    return res.status(200).json({ 
                        emailExists : true,
                        passwordMatch : true,
                        message: "login successful"
                    })
                }else{
                    console.log("Password does not match with this email address")
                    return res.status(401).json({ 
                        emailExists: true,
                        passwordMatch : false,
                        message: "Password wrongs"
                    })
                }
            }else{
                return res.status(200).json({
                    emailExists : true,
                    message: "Email found"
                })
            }
        }else{
            return res.status(401).json({
                emailExists: false,
                message: "There is no email address"
             })
        }
    }catch(err){
        return res.status(500).json({ message: "Server Error", error: err.message});
    }
})

//Checking whether there is display name in the storage.
app.post('/checkdisplayName', async(req,res) => {

    const { displayName } = req.body;
    
    try{
        const displayNameUser = await User.findOne({displayName: displayName})
        console.log(`Searching for ${displayName} in collection: ${User.collection.name}`)

        if(displayNameUser){
            return res.status(200).json({ displayNameExists : true })
        }else{
            return res.status(200).json({ displayNameExists : false })
        }
    }catch(err){
        return res.status(500).json({ message: "Server Error", error: err.message});
    }
})

//Save value on register page to storage

app.post('/register', async (req,res) => {

    const { email, displayName, dob, password } = req.body;

    try{
        const consistedEmail = await User.findOne({ email : email })
        if(consistedEmail){
            return res.status(401).json({ message : "Email is registered" })
        }
        
        const newUser = new User({
            email: email,
            displayName: displayName,
            dob: dob,
            password: password
        });

        await newUser.save();
        console.log("newUser: ",newUser)

        if(newUser){
            console.log("Creating Successful: ", newUser)
            return res.status(200).json({ message: "Creating Successful"})
        }else{
            console.log("We can't create the new user")
            return res.status(500).json({ message: "Creating failure"})
        }
    }catch(err){
        console.error("Error: ",err)
        return res.status(500).json({
            message: "Server Error",
            error: err.message
        })
    }
})



//Defining server port
const port = 5000;
app.listen(port ,() => {
    console.log("Running server...")
})

//On the other hand, we dont install bcrypt function or hash function yet.