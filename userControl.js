const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users.js')

// creatin the new user or registeration
const postUser = async (req, res) => {

    console.log("user post method");

    try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({message: "email or password is missing!"})
        }

        const user = await User.findOne({email:email});

        if(user){
            return res.status(400).json({message: "user already exist!"})
        }

        const hashpwd = bcrypt.hashSync(password, 10);

        const newUser = await User.create({
            email:email,
            password:hashpwd
        });

        newUser.save();

        const token = jwt.sign( { email:email , id:newUser._id }, process.env.SECRET_KEY, {expiresIn:"1h"} );

        return res.status(200).json({message: "user added successfully!" ,data:newUser , token:token })
        
    } 
    catch (error) {
        return res.status(500).json({message: "failed to add user!"})
    }
}

const userLogIn = async (req, res) => {

    console.log("user login method");

    try {

        const {email,password} = req.body;

        if(!email || !password)
        {
            return res.status(200).json({message: "email or password is missing!"})
        }

        const user = await User.findOne({email:email});

        // if user exists
        if(user && await bcrypt.compare(password, user.password))
        {
            const token = jwt.sign( { email:email , id:user._id }, process.env.SECRET_KEY, {expiresIn:"1h"} );

            return res.status(200).json({message: "user found!" , token:token , data:user })
        }
        
        return res.status(200).json({message: "Invalid details!"})

    } 
    catch (error) {
        return res.status(500).json({message: "failed to login user!" , error:error.message})
    }
    
}

// fetching all the users
const getUser = async (req, res) => {

    console.log("user get method");

    try {
        const users = await User.find({});
        return res.status(200).json({message: "users fetched successfully!" , data:users })
        
    } 
    catch (error) {
        return res.status(500).json({message: "failed to fetch" , error:error})
    }
}

// find the user with id
const getUserById = async (req, res) => {

    console.log("user get method with id:",req.params);

    try {
        const user = await User.findById(req.params.id);
        
        if(user)
        {
            return res.status(200).json({message: "user found!" , data:user })
        }
        else{
            return res.status(200).json({message: "user not found" , data:{}})
        }
        
    } 
    catch (error) {
        return res.status(500).json({message: "failed to fetch" , error:error})
    }
}


// delete the user
const deleteUser = async (req, res) => {

    console.log("user delete method with id:",req.params);
    
    try {

        const user = await User.findByIdAndDelete(req.params.id);

        if(user)
        {
            return res.status(200).json({message: "user deleted!" , data:user })
        }
        else{
            return res.status(200).json({message: "user not found" , data:{}})
        }
    } 
    catch (error) {
        return res.status(500).json({message: "failed to delete user!"})
    }
    
}

// modify User
const modifyUser = async (req, res) => {

    console.log("modify User method with id:",req.params);
    try 
    {
        const user = await User.findByIdAndUpdate( req.params.id , req.body , {new:true} );

        if(user)
        {
            return res.status(200).json({message: "user modified!" , data:user })
        }
        else{
            return res.status(200).json({ message:"User not found!" , data:{} });
        }
        
    } 
    catch (error) {
        return res.status(500).json({ message:"Failed to modify User!" ,error: error.message });
    }
}

module.exports = {
    postUser,
    getUser,
    getUserById,
    deleteUser,
    modifyUser,
    userLogIn
}