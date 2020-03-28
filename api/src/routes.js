const express = require('express');

const UserController = require('./controller/UserController');
const SessionController = require('./controller/SessionController');
const CasesController = require('./controller/CasesController');

const routes = express.Router();

routes.get('/session', SessionController.index);
routes.post('/session', SessionController.create);

routes.post('/session/forgot_password', SessionController.forgot_password);
routes.post('/session/reset_password', SessionController.reset_password);

routes.get('/cases', CasesController.index);

routes.get('/users', UserController.index);
routes.post('/users', UserController.create);
routes.put('/users', UserController.update);
routes.delete('/users', UserController.delete);

module.exports = routes;