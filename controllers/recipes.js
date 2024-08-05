const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Recipe = require('../models/recipe');

// Router logic
router.get('/', async (req, res) => {
    try {
      const recipes = await Recipe.find({ owner: req.session.user._id });
      res.render('recipes/index.ejs', { recipes });
    } catch (error) {
      res.redirect('/');
    }
  });
  router.get('/new', (req, res) => {
    res.render('recipes/new.ejs');
  });
    router.post('/', async (req, res) => {
        try {
        const recipe = new Recipe(req.body);
        recipe.owner = req.session.user._id;
        await recipe.save();
        res.redirect('/recipes');
        } catch (error) {
        res.redirect('/recipes/new');
        }
    });
    
    router.get('/:recipeId', async (req, res) => {
        try {
          const recipe = await Recipe.findById(req.params.recipeId).populate('ingredients');
          res.render('recipes/show.ejs', { recipe });
        } catch (error) {
          res.redirect('/recipes');
        }
      });
        router.get('/:recipeId/edit', async (req, res) => {
            try {
            const recipe = await Recipe.findById(req.params.recipeId);
            res.render('recipes/edit.ejs', { recipe });
            } catch (error) {
            res.redirect('/recipes');
            }
        });
        router.get('/:recipeId/edit', async (req, res) => {
            try {
              const recipe = await Recipe.findById(req.params.recipeId);
              res.render('recipes/edit.ejs', { recipe });
            } catch (error) {
              res.redirect('/recipes');
            }
          });
            
          router.post('/', async (req, res) => {
            try {
              const newRecipe = new Recipe({
                name: req.body.name,
                instructions: req.body.instructions,
                owner: req.session.user._id,
                ingredients: [] // Add logic to handle ingredients
              });
              await newRecipe.save();
              res.redirect('/recipes');
            } catch (error) {
              res.redirect('/recipes/new');
            }
          });
          
          router.put('/:recipeId', async (req, res) => {
            try {
              const recipe = await Recipe.findById(req.params.recipeId);
              if (!recipe) return res.redirect('/recipes');
              recipe.name = req.body.name;
              recipe.instructions = req.body.instructions;
              // Update ingredients logic
              await recipe.save();
              res.redirect(`/recipes/${req.params.recipeId}`);
            } catch (error) {
              res.redirect('/recipes');
            }
          });
          
          router.delete('/:recipeId', async (req, res) => {
            try {
              await Recipe.findByIdAndDelete(req.params.recipeId);
              res.redirect('/recipes');
            } catch (error) {
              res.redirect('/recipes');
            }
          });
          
  

module.exports = router;
