const express = require('express')
const cors = require("cors")
const dotenv = require("dotenv").config();

const connection = require('./connectionDB/connect')
const userRoute = require('./routes/userRoutes')
const recipeRouter = require('./routes/recipeRoutes')

const app = express();
app.use(cors())
app.use(express.json())
app.use(express.static("public"));

const port = process.env.PORT || 5000;

app.use('/user' , userRoute)
app.use('/recipe' , recipeRouter)

connection()

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})