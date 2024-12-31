// creating table for recipes
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;