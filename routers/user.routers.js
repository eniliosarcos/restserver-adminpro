const { Router } = require('express');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/user.controllers');

const router = Router();

router.get('/',usuariosGet);
router.put('/:userID', usuariosPut);
router.post('/', usuariosPost);
router.delete('/', usuariosDelete);

module.exports = router;