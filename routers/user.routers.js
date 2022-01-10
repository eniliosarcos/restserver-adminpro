const { Router } = require('express');
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/fields-validator');
const { JWTvalidator } = require('../middlewares/jwt-validator');

const { getUsers, updateUser, createUser, deleteUser } = require('../controllers/user.controllers');

const router = Router();

router.get('/',JWTvalidator, getUsers);

router.post('/',[
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('lastName', 'El apellido es obligatorio').notEmpty(),
    check('password', 'El password es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    validateFields
], createUser);

router.put('/:userID',[
    JWTvalidator,
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('lastName', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').notEmpty(),
    validateFields
], updateUser);

router.delete('/:userID', JWTvalidator,deleteUser);

module.exports = router;