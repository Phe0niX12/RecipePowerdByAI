const {v4:uuidv4} = require('uuid');
const {Recipes} = require('../model/ModelSequalizer');


const getAllFavoriteRecipes = async(req,res) =>{
    try{
        const recipes = await Recipes.findAll();
        console.log(recipes);
        if(!recipes){
            return res.status(404).send('No recipies exist');
        }
        return res.status(200).json(recipes);
    }catch(error){
        console.error('Unexpected error at retreaving favorite recipes');
        return res.status(400).send({error, message:'Unexpected error at retreaving favorite recipes'})
    }
}

const createFavoriteRecipe = async(req, res) =>{
    try{
        const newRecipe = {...req.body};
        const recipe = await Recipes.create(newEmail);
        if(!recipe){
            return res.status(400).send('Recipe was not created');
        }
        return res.status(200).json({recipe:recipe, message:'Recipe was added succesfully'});
    }catch(error){
        return res.status(400).send({error:error, message:'Unexpected error at creating a new favorite recipe'});
    }
}

const deleteFavoriteRecipe = async(req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const result = await Recipes.findByPk(id);
        if(!result){
            return res.status(404).send({message: `Recipe with ${id} not found`})
        }
        await result.destroy();
        res.status(200).send({message:'Recipe deleted from favorites list'})
    }catch(error){
        res.status(400).send({error, message:'Unexpected error at deleting recipe'})
    }
}

module.exports = {getAllFavoriteRecipes, createFavoriteRecipe,deleteFavoriteRecipe}