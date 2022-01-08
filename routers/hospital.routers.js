const { Router } = require('express');
const { check } = require('express-validator')

const { validateFields } = require('../middlewares/fields-validator');
const { JWTvalidator } = require('../middlewares/jwt-validator');

const { getHospitals, updateHospital, createHospital, deleteHospital } = require('../controllers/hospital.controller');

const router = Router();

router.get('/', getHospitals);

router.post('/',[
    JWTvalidator,
    check('name','El nombre del hospital es necesario').notEmpty(),
    validateFields

], createHospital);

router.put('/:id',[

], updateHospital);

router.delete('/:id',deleteHospital);

module.exports = router;