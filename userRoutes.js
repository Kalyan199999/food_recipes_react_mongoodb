const express = require('express');
const userRoute = express()

const { postUser,getUser,getUserById,deleteUser,modifyUser,userLogIn } = require('../controlers/userControl.js')

userRoute.post('/register',postUser)
userRoute.post('/login',userLogIn)

userRoute.get('/', getUser)
userRoute.get('/:id' , getUserById)

userRoute.delete('/:id' , deleteUser)

userRoute.put('/:id' , modifyUser)

module.exports = userRoute;
