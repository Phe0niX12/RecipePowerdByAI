import { useEffect, useState } from "react";

const { useParams } = require("react-router-dom");
const { useRecipeContext } = require("../contexts/recipeContext");

const DetailsPage = () => {
  const { recipes, loading, getRecipeById } = useRecipeContext();
  const { id } = useParams();
  const recipe = getRecipeById(id);
  const ingredients = recipe.ingredients;
  const instructions = recipe.instructions;
  console.log(recipe);
  
  if (!recipe) {
    return <div>Recipe not found.</div>;
  }
  return (
    <div className="flex overflow-auto">
      <div className="ml-64 mt-16">
        <img
          src="https://archive.org/download/placeholder-image/placeholder-image.jpg"
          className="w-[400px] h-[400px] object-cover border-4 border-black"
        />
      </div>
      <div>
        <h1>Ingredients</h1>
        <ul className="list-disc ml-5">
        {
            ingredients.map((ingredient, index) =>(
                <li key={index} className="mb-2">
                    {ingredient}
                </li>
            ))
        }
        </ul>
      </div>
      <div>
        <h1>Instructions</h1>
        <ul>
            {
                instructions.map((instruction, index) =>{
                    <li key={index} className="mb-2">
                        {instruction}
                    </li>
                })
            }
        </ul>
      </div>
    </div>
  );
};

export default DetailsPage;
