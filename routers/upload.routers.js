const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const {updateImg, returnImg } = require('../controllers/upload.controller');

const { JWTvalidator } = require('../middlewares/jwt-validator');

const router = Router();

router.use(expressFileUpload());

router.put('/:collection/:id', JWTvalidator, updateImg);

router.get('/:collection/:img', returnImg);

module.exports = router;