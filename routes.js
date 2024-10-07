const express = require('express');
const router = express.Router();
const generalRouteController = require('./controllers/generalRouteController');
const authController = require('./controllers/authController');
const reqLogger = require('./middleware/requestLogger');

const generalLoggers = [reqLogger]

router.get('/',...generalLoggers,generalRouteController.goHomePage);
router.post('/login',...generalLoggers,authController.login);
router.post('/logout',...generalLoggers,authController.logout);

module.exports = router;