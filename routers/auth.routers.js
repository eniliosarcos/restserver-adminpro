const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/fields-validator');

const router = Router();

router.post('/',[
    check('email', 'el email es obligatorio').notEmpty(),
    check('password', 'el password es obligatorio').notEmpty(),
    validateFields
],login);


module.exports = router