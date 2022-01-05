const {response, request} = require('express')

const usuariosGet = (req = request, res = response) => {

    // const query = req.query;

    //desestructuracion
    const {limit, page = 1} = req.query; //captura de informacion en los http

    res.json({
        msg: 'get API - controller',
        page,
        limit
    })
}

const usuariosPost = (req = request, res) => {

    // const body = req.body;

    //desestructuracion
    const {nombre, edad} = req.body; //captura de datos del front

    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad
    })
}
const usuariosPut = (req = request, res) => {

    // const userID = req.params.userID;
    //desestructuracion
    const {userID} = req.params; //captura de informacion relevante como el ID

    res.json({
        msg: 'put API - controller',
        userID
    })
}
const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controller'
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}