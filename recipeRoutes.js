const express = require('express')

const { postRecipes, getRecipes, getRecipesById, deleteRecipe, modifyRecipe,upload } = require('../controlers/recipeControl.js')

const { verifyToken } = require('../middleware/auth.js')

const recipeRouter = express()


recipeRouter.post('/',upload.single('image'), verifyToken , postRecipes)

recipeRouter.get('/', getRecipes)

recipeRouter.get('/:id', getRecipesById)


recipeRouter.delete('/:id', deleteRecipe)

recipeRouter.put('/:id',upload.single('image'), modifyRecipe)

module.exports = recipeRouter;