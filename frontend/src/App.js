import './App.css'

import Home from './pages/Home';
import Navbar from "./components/Navbar";
import LoginRegister from './components/LoginRegister';
import AddRecipe from './pages/AddRecipe';

import MyRecipes from './pages/MyRecipes';

import EditRecipe from './pages/EditRecipe';

import { BrowserRouter , Routes, Route } from 'react-router-dom';

const App = ()=>{
  return(
    <>
      
       <BrowserRouter >

       <Navbar />

       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login-register" element={<LoginRegister />} />
          <Route path='/addrecipe' element={<AddRecipe />} />
          <Route path='/myrecipe' element={<MyRecipes />} />
          <Route path='/editrecipe/:id' element={<EditRecipe />} />
       </Routes>

       </BrowserRouter>

    </>
  )
}

export default App;