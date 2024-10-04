import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isRecipesLoaded, setIsRecipesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const api = axios.create({ baseURL: "http://localhost:5000" });
  useEffect(() => {
    if (favoriteRecipes.length > 0 && isRecipesLoaded === false) {
      return;
    }
    setLoading(true);
    api
      .get("/favoriteRecipes")
      .then((response) => {
        setFavoriteRecipes(response.data);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setLoading(false);
        setIsRecipesLoaded(true);
      });
  }, []);

  const getRecipeById = (id) => {
    return recipes.find((recipe) => recipe.id === id);
  };

  const getOpenAIRecipes = async (prompt) => {
    setLoading(true);
    try {
      await api
        .get(`/recipes?prompt=${encodeURIComponent(prompt)}`)
        .then((response) => {
          setRecipes(response.data.recipes);
          console.log(recipes);
        });
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const addToFavoriteRecipes = async (newFavoriteRecipe) => {
    setLoading(true);
    try {
      const response = await api.post("/favoriteRecipe", {
        id: newFavoriteRecipe.id,
        name: newFavoriteRecipe.name,
        ingredients: newFavoriteRecipe.ingredients,
        instructions: newFavoriteRecipe.instructions,
        preparationTime: newFavoriteRecipe.preparationTime,
      });
      if (response.status === 200)
        setFavoriteRecipe(favoriteRecipe.push(newFavoriteRecipe));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const deleteFromFavoriteRecipies = async (id) => {
    setLoading(true);
    try {
      const response = await api.delete(`/favoriteRecipe/${id}`);
      if (response.status === 200) {
        setFavoriteRecipe((prevRecipe) =>
          prevRecipe.filter((recipe) => recipe.id !== id)
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    recipes,
    favoriteRecipes,
    loading,
    getOpenAIRecipes,
    addToFavoriteRecipes,
    deleteFromFavoriteRecipies,
    getRecipeById,
  };

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
};

export const useRecipeContext = () => useContext(RecipeContext);
