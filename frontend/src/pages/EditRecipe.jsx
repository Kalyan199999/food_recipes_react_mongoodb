import { useParams  , useNavigate } from "react-router-dom"
import axios from "axios";
import { useState , useEffect } from "react";

const API = "http://localhost:5050/recipe";

function EditRecipe() {

    const {id} = useParams()

    const navigate = useNavigate()

    const [recipe, setRecipe] = useState()

    useEffect(() => {
        fetchRecipe()
    } , [])

    const fetchRecipe = async () => {
        
        try {
            const data = await axios.get(`${API}/${id}`)

            setRecipe(data.data.data)

        } catch (error) {
            console.log(error);
            
        }
    }

    const handleChanege = (e) => {

        const value = (e.target.name === "ingredients")? e.target.value.split(",") : (e.target.name === "image")? e.target.files[0] :  e.target.value

        setRecipe({ ...recipe, [e.target.name]: value })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()

        try {
            const data = await axios.put(`${API}/${id}`, recipe)
            console.log(data.data.data);
            alert("Recipe Updated Successfully")

            navigate('/myrecipe')

        } catch (error) {
            console.log(error);
        }
    }

    
    
  return (
    <div>
        
      {
        !recipe ? "Loading...":
        <form action="#" className="recipe-form" onSubmit={(e)=>{handleUpdate(e)}} >

        <h1>Update your Recipe</h1>
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
           <button type="submit">Update Recipe</button>
       </div>


     </form>
      }

    </div>
  )
}

export default EditRecipe
