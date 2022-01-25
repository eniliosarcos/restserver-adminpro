const { response } = require('express');
const { request } = require('express');
const User = require('../models/user');

const AdminRole_or_UserIDValidator = async(req = request, res = response, next) => {
    const userID = req.userID;
    const id = req.params.userID;

    try {

        const userDB = await User.findById(userID);

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no existe'
            })
        }

        if(userDB.role !== 'ADMIN_ROLE' && userID !== id){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene privilegios para hacer eso'
            })
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
  
}

module.exports = {
    AdminRole_or_UserIDValidator
}