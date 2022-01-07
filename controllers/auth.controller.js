const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { JWTgenerate } = require("../helpers/jwt-generator");
const User = require('../models/user');

const login = async(req = request, res = response) => {

    const {email, password} = req.body;

    try {

        const userDB = await User.findOne({email});

        if(!userDB){

            return res.status(404).json({
                ok:false,
                msg:'Email no encontrado'
            })
        }

        const passwordVerify = bcryptjs.compareSync(password, userDB.password);

        if(!passwordVerify){
            
            return res.status(400).json({
                ok:false,
                msg:'Contraseña no valida'
            })
        }

        const token = await JWTgenerate(userDB.id);

        res.status(200).json({
            ok:true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado en el servidor. revisar logs'
        })
    }
}

module.exports = {
    login
}