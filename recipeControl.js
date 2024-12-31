const Recipe = require('../models/recipes.js')

const multer  = require('multer')

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + '-' + file.fieldname;

      cb(null,  filename)
    }

  })
  
const upload = multer({ storage: storage })

// add new recipe
const postRecipes = async (req, res) => {

    console.log("Post Recipes method!");

    console.log(req.body);
    // console.log(req.user);

    try {

        const {title  , ingredients , instructions , time} = req.body;

        const image = req.file

        const createdBy = req.user.id;

        const newRecie = await Recipe.create({title , ingredients , instructions , time , image , createdBy:createdBy});
        newRecie.save();

        return res.status(200).json({ message:"Recipes added successfully!" ,data:newRecie });
    } 
    catch (error) {
        return res.status(500).json({ message:"Failed to add recipes!" ,error: error.message });
    }
}

// fetch all recipes
const getRecipes = async (req, res) => {

    console.log("Get Recipes method!");
    
    try {
        const recipes = await Recipe.find({});

        return res.status(200).json({ message:"Recipes fetched successfully!" ,data:recipes });
    } 
    catch (error) {
        return res.status(500).json({ message:"Failed to fetch recipes!" ,error: error.message });
    }
}

// fetch recipe by id
const getRecipesById = async (req, res) => {

    console.log("Get Recipes method with id:",req.params);
    
    try {
        const recipes = await Recipe.findById(req.params.id);

        if(recipes){
            return res.status(200).json({ message:"Recipe fetched successfully!" ,data:recipes });
        }
        else{
            return res.status(200).json({ message:"Recipenot found!" , data:{} });
        }
    } 
    catch (error) {
        return res.status(500).json({ message:"Failed to fetch recipes!" ,error: error.message });
    }
}

// delete recipe
const deleteRecipe = async (req, res) => {

    console.log("delete Recipe method with id:",req.params);
    
    try {
        const recipes = await Recipe.findByIdAndDelete(req.params.id);

        if(recipes){
            return res.status(200).json({ message:"Recipe deleted successfully!" ,data:recipes });
        }
        else{
            return res.status(200).json({ message:"Recipe not found!" , data:{} });
        } 
    } 
    catch (error) {
        return res.status(500).json({ message:"Failed to delete recipe!" ,error: error.message });
    }
}

// modify recipe
const modifyRecipe = async (req, res) => {

    console.log("modify Recipe method with id:",req.params);
    try 
    {
        const {title  , ingredients , instructions , time} = req.body;

        console.log(req.body);
        const image = req.file

        const {id}= req.params;

        const data = Recipe.findById(id);

        const recipe = await Recipe.findByIdAndUpdate( req.params.id , {title , ingredients , instructions , time , image } , {new:true} );

        if(recipe){
            console.log(recipe);
            
            return res.status(200).json({ message:"Recipe modified successfully!" , data:recipe });
        }
        else{
            console.log("not found!");
            
            return res.status(200).json({ message:"Recipe not found!" , data:{} });
        }
        
    } 
    catch (error) {
        console.log( error.message);
        
        return res.status(500).json({ message:"Failed to modify recipe!" ,error: error.message });
    }

    
}


module.exports = {
    postRecipes,
    getRecipes,
    getRecipesById,
    deleteRecipe,
    modifyRecipe,
    upload
}