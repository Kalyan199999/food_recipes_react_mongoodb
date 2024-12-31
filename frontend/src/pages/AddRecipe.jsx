import axios from "axios"
import { useState } from "react"

const API = "http://localhost:5050/recipe"

const obj = {
    title:"",
    ingredients:"",
    instructions:"",
    time:"",
    image:""
 }

function AddRecipe() {

    const [recipe, setRecipe] = useState(obj)

    const handleChanege = (e) => {

        const value = (e.target.name === "ingredients")? e.target.value.split(",") : (e.target.name === "image")? e.target.files[0] :  e.target.value

        setRecipe({ ...recipe, [e.target.name]: value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        console.log(recipe);
        
        try {
            const d = await axios.post(API,recipe , {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + localStorage.getItem("token")
                }
            });
            console.log(d);
            setRecipe(obj)
            
        } 
        catch (error) {
            console.log("error");
            
            console.log(error);
            
        }
    }

  return (
    <>
       <form action="#" className="recipe-form" onSubmit={(e)=>handleSubmit(e)}>

             <h1>Enter your Recipe</h1>
            <div className="recipe-item">

                <input type="text" name='title' placeholder='Enter recipe title' value={recipe.title} onChange={(e)=>handleChanege(e)} />

            </div>

            <div className="recipe-item">

                <input type="text" name='ingredients' className="text-area" placeholder='Enter recipe ingredients' value={recipe.ingredients} onChange={(e)=>handleChanege(e)} />

            </div>

            <div className="recipe-item">

                <input type="text" name='instructions' className="text-area" placeholder='Enter recipe instructions' value={recipe.instructions} onChange={(e)=>handleChanege(e)} />

            </div>

            <div className="recipe-item">

                <input type="text"  name='time' placeholder='Enter recipe time' value={recipe.time} onChange={(e)=>handleChanege(e)} />

            </div>

            <div className="recipe-item">

                <input type="file" name="image"  onChange={(e)=>handleChanege(e)} />

            </div>

            <div className="recipe-item">
                <button type="submit">Add Recipe</button>
            </div>


       </form>
    </>
  )
}

export default AddRecipe
