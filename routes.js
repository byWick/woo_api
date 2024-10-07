const express = require('express');
const router = express.Router();
const generalRouteController = require('./controllers/generalRouteController');
const authController = require('./controllers/authController');
const firmController = require('./controllers/firmController');
const reqLogger = require('./middleware/requestLogger');

const generalLoggers = [reqLogger]

router.get('/',...generalLoggers,generalRouteController.goHomePage);
//USER ROUTES
router.post('/login',...generalLoggers,authController.login);
router.post('/logout',...generalLoggers,authController.logout);
//FIRM ROUTES
router.get('/my-firm',...generalLoggers,firmController.getMyFirm);
//STORE ROUTES
router.post('/store')

module.exports = router;