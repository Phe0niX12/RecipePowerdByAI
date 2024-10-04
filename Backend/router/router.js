const express = require('express');
const { getAllFavoriteRecipes, createFavoriteRecipe } = require('../Controller/RecipeController');
const { getRecipes } = require('../Controller/OpenAIController');

const router = express.Router();

router.get('/favoriteRecipes', getAllFavoriteRecipes);
router.post('/favoriteRecipe', createFavoriteRecipe);
router.get('/recipes', getRecipes);
router.delete('/favoriteRecipe/:id');
module.exports = {router}