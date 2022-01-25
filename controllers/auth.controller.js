const bcryptjs = require("bcryptjs");
const { request, response } = require("express");
const { googleVerify } = require("../helpers/google-verify");
const { JWTgenerate } = require("../helpers/jwt-generator");
const { getMenuFrontEnd } = require("../helpers/menu-frontend");
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
            token,
            menu: getMenuFrontEnd(userDB.role)
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado en el servidor. revisar logs'
        })
    }
}

const googleSignIn = async(req = request, res = response) => {

    const googleToken = req.body.token;

    try {

        const {given_name, family_name, email, picture} = await googleVerify(googleToken);

        const userDB = await User.findOne({email});
        let user;

        if(!userDB){
            user = new User({
                name:given_name,
                lastName: family_name || '',
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }

        await user.save();

        const token = await JWTgenerate(user.id);
        
        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(user.role)
        });
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: 'token no es correcto',
        });
    }
}

const renewToken = async(req = request, res = response) => {
    const {userID} = req;

    const userDB = await User.findById(userID);
    
    res.status(200).json({
        ok:true,
        userDB,
        menu: getMenuFrontEnd(userDB.role)
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}