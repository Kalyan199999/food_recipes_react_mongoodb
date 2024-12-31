import { useState,useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const API = "http://localhost:5050/recipe";

const url = "http://localhost:5050/images/"


function MyRecipes() {

    const [recipes , setRecipes] = useState([])
    const [isChanged , setIsChanged] = useState(false);

    useEffect(()=>{

        if(!isChanged)
        {
            getAllMyRecipes();
        }

    } , [isChanged])

    const getAllMyRecipes = async () => {

        let data = await axios.get(API);

        if(data.status === 200)
        {
            const user = JSON.parse(localStorage.getItem("user"));
            // console.log(user._id);
            
            data = data.data.data;
            const myRecipe = data.filter((item)=>{
                // console.log(item.createdBy);
                
                return item.createdBy === user._id
            })

            console.log(myRecipe);

            setRecipes(myRecipe);
            setIsChanged(true);
            
            
        }
        
    }

    const handleFavorite = async (e) => {
        // console.log(e.target);
        e.target.classList.toggle('heart-color')
    }


    const handleDelete = async (e,id) => {
        
        try {
            let data = await axios.delete(`${API}/${id}`);

            console.log(data);
            setIsChanged(false);
            
        } catch (error) {
            console.log(error);
            
        }

        
    }

  return (
    <div className="my-recipes">

        {
            recipes.length === 0 ? "Loading":
            <>
            {
                recipes.map((recipe) => {
                    return(
                        <div className="each-recipe" key={recipe._id}>
                            <img src={`${url}${recipe.image.filename}`} alt="" />
                            
                            <p><span>Title: </span>{ recipe.title.toUpperCase()}</p>

                            <p><span>Time: </span>{ recipe.time.toUpperCase()}</p>                          
                            {/* <h3>:{recipe.time}</h3> */}

                            <p><span>Instructions: </span>{recipe.instructions}</p>

                            <span>Ingredients: </span>

                            {
                                recipe.ingredients.map((ingredient ,idx) => {
                                    return(
                                        <p key={idx}>{ingredient}</p>
                                    )
                                })
                            }
                            
                            <div className="icons">
                            <i className='bx bxs-heart heart'  onClick={(e)=>{handleFavorite(e)}}></i>
                            <Link to={`/editrecipe/${recipe._id}`}><i className='bx bxs-message-edit edit '></i></Link>
                            <i className='bx bxs-trash-alt delete' onClick={(e)=>{handleDelete(e,recipe._id)}}></i>
                            </div>

                        </div>
                    )
                })
            }
            </>
        }
      
    </div>
  )
}

export default MyRecipes
