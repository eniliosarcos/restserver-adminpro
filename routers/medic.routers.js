const { Router } = require('express');
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/fields-validator');
const { JWTvalidator } = require('../middlewares/jwt-validator');

const { getMedics, updateMedic, createMedic, deleteMedic, getMedicById } = require('../controllers/medic.controller');

const router = Router();

router.get('/', getMedics);

router.get('/:id', JWTvalidator ,getMedicById);

router.post('/',[
    JWTvalidator,
    check('name', 'El nombre del medico es obligatorio').notEmpty(),
    check('hospital', 'El id del hospital es obligatorio').notEmpty(),
    check('hospital', 'el ID del hospital no es un mongoID').isMongoId(),
    validateFields
], createMedic);

router.put('/:id',[
    JWTvalidator,
    check('name', 'El nombre del medico es obligatorio').notEmpty(),
    check('hospital', 'El id del hospital es obligatorio').notEmpty(),
    check('hospital', 'el ID del hospital no es un mongoID').isMongoId(),
    validateFields
], updateMedic);

router.delete('/:id', JWTvalidator ,deleteMedic);

module.exports = router;