const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController');
const validateJWT = require('./auth/validateJWT');

const app = express();

app.use(bodyParser.json());

app.get('/user', validateJWT, userController.getAll);
app.get('/user/:id', validateJWT, userController.getById);
app.post('/user', userController.create);
app.post('/login', userController.login);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
