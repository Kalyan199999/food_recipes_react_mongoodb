
import axios from "axios";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import Footer from "../components/Footer";

const API = "http://localhost:5050/recipe";

const url = "http://localhost:5050/images/"

const Home = ()=>{

    const [recipes, setRecipe] = useState([]);

    const navigate = useNavigate();

    const addrecipe = ()=>{

        const token = localStorage.getItem('token');

        console.log(token);
       
        if(token)
        {
            navigate('/addrecipe');
        }
        else{
            navigate('/login-register');
        }
    }

    useEffect(()=>{
       getRecipes();    
    } , [])

    const getRecipes = async ()=>{
        const d = await axios.get(API);
        setRecipe(d.data.data);
    }

    return(
        <>
            <h1>Food App</h1>

           <section className="home">

            <div className="left">

                <h5>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, animi. Deleniti iusto debitis minima ratione recusandae doloribus dignissimos accusamus eaque eveniet suscipit sint alias iste veritatis ab, et nemo excepturi reiciendis voluptas quaerat quas numquam aperiam? Deleniti vitae excepturi obcaecati blanditiis sed! Mollitia doloremque praesentium assumenda ut, natus aperiam et.</h5>

                <button onClick={()=>addrecipe()}>Share your Recipe</button>
                
            </div>

            <div className="right">

               <img src="https://th.bing.com/th/id/OIP.Q4f5lR46RdwAqe9hXJ7dlAHaF7?rs=1&pid=ImgDetMain" alt="food" />
           
            </div>
           
           </section>

           {/* <div className="bg">

           <svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#a2d9ff" fillOpacity="1" d="M0,64L34.3,74.7C68.6,85,137,107,206,128C274.3,149,343,171,411,154.7C480,139,549,85,617,74.7C685.7,64,754,96,823,144C891.4,192,960,256,1029,245.3C1097.1,235,1166,149,1234,133.3C1302.9,117,1371,171,1406,197.3L1440,224L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>

           </div> */}

           {
             recipes && <div className="all-recipes">
                {
                    recipes.map((item,idx)=>{
                        return(
                            <div className="item-card" key={item._id} >
                                <img src={`${url}${item.image.filename}`} alt={item} />
                                <div className="details">
                                    <h3>{item.title}</h3>
                                    <ul>
                                        <li><i className='bx bx-alarm'></i></li>
                                        <li ><i className='bx bx-heart'></i></li>
                                    </ul>
                                    
                                </div>
                            </div>
                        )
                    })
                }
             </div>
           }

           <Footer />

        </>
    )
}

export default Home;