import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const RecipeContext = createContext();

export const RecipeProvider = ({childrean}) =>{
    const [recipes, setRecipes] = useState([])
    const [favoriteRecipes, setFavoriteRecipes] = useState([])
    const [loading, setLoading] = useState(true);
    const api = axios.create({baseURL: 'http://localhost:5000'});
    useEffect(()=>{
        setLoading(true);
        api.get('/favoriteRecipes').then(
            response =>{
                console.log(response);
                setFavoriteRecipes(response.data);
            }
        ).catch(e => console.error(e)).finally(setLoading(false));
    }, []
    )

    
    const getOpenAIRecipes = async() =>{
        setLoading(true);
        try{
            const response = await api.get("/recipes");
            if(response.status === 200)
            setRecipes(response.data.recipes);
        }catch(e){
            console.error(e)
        }finally{
            setLoading(true);
        }
    }

    const addToFavoriteRecipes = async(newFavoriteRecipe)=>{
        setLoading(true);
        try{
            const response = await axios.post('/favoriteRecipe', {id:newFavoriteRecipe.id, name: newFavoriteRecipe.name, ingredients:newFavoriteRecipe.ingredients, instructions: newFavoriteRecipe.instructions});
            if(response.status === 200)
            setFavoriteRecipe(favoriteRecipe.push(newFavoriteRecipe));
        }catch(e){
            console.error(e)
        }finally{
            setLoading(false);
        }
    }

    const deleteFromFavoriteRecipies = async(id) =>{
        setLoading(true);
        try{
            const response = await axios.delete(`/favoriteRecipe/${id}`);
            if(response.status === 200){
                setFavoriteRecipe(prevRecipe => prevRecipe.filter(recipe => recipe.id !== id));
            }
        }catch(e){
            console.error(e)
        }finally{
            setLoading(false);
        }
    }

    const value = {recipes, favoriteRecipes, loading, getOpenAIRecipes, addToFavoriteRecipes, deleteFromFavoriteRecipies}

    return (
        <RecipeContext.Provider value={value}>
            {childrean}
        </RecipeContext.Provider>
    );

}

export const useRecipeContext = () => useContext(RecipeContext);