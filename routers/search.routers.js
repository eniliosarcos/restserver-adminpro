const { Router } = require('express');

const { JWTvalidator } = require('../middlewares/jwt-validator');

const { getTodo, getCollectionDocument } = require('../controllers/search.controller');

const router = Router();

router.get('/:find', JWTvalidator, getTodo);
router.get('/:collection/:find', JWTvalidator, getCollectionDocument);

module.exports = router;