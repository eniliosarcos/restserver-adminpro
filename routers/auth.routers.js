const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/fields-validator');
const { JWTvalidator } = require('../middlewares/jwt-validator');

const router = Router();

router.post('/',[
    check('email', 'el email es obligatorio').notEmpty(),
    check('password', 'el password es obligatorio').notEmpty(),
    validateFields
],login);

router.post('/google',[
    check('token', 'el token de google es obligatorio').notEmpty(),
    validateFields
],googleSignIn);

router.get('/renew',JWTvalidator , renewToken);


module.exports = router