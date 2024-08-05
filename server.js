const express = require('express');
const app = express();
const authController = require('./controllers/auth');
const recipesController = require('./controllers/recipes');
const ingredientsController = require('./controllers/ingredients');
const isSignedIn = require('./middleware/is-signed-in');
const passUserToView = require('./middleware/pass-user-to-view');

app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/recipes', recipesController);
app.use('/ingredients', ingredientsController);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
