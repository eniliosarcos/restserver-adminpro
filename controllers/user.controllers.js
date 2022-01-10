const {response, request} = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { JWTgenerate } = require('../helpers/jwt-generator');

const getUsers = async (req = request, res = response) => {

    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 10;

    const [users, totalUsers] = await Promise.all([
        User.find().skip(from).limit(limit),
        User.count()
    ])

    res.json({
        totalUsers,
        users,
        // requestByUserID: req.userID
    })
}

const createUser = async(req = request, res = response) => {

    // const body = req.body;

    //desestructuracion
    const {email, password} = req.body; //captura de datos del front

    try {

        const emailExist = await User.findOne({email});

        if(emailExist){
            return res.status(400).json({
                ok:false,
                msg: 'El Correo ya esta registrado'
            })
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        const token = await JWTgenerate(user.id);
    
        res.status(201).json({
            msg: 'Usuario creado',
            user,
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

const updateUser = async(req = request, res = response) => {

    // const userID = req.params.userID;
    //desestructuracion
    const {userID} = req.params; //captura de informacion relevante como el ID

    try {

        const userDB = await User.findById(userID);

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        const {password, google, email, ...fields} = req.body;

        if(userDB.email !== email){

            const emailExist = await User.findOne({email})
            if(emailExist){
                return res.status(400).json({
                    ok:false,
                    msg: 'Ya existe un usuario con ese correo'
                });
            }
        }

        if(!userDB.google){
            fields.email = email;
        } else if(userDB.email !== email){
            return res.status(400).json({
                ok:false,
                msg: 'Usuarios de google no pueden cambiar su correo'
            });
        }

        const userUpdated = await User.findByIdAndUpdate(userID,fields,{new:true});

        res.status(203).json({
            ok: true,
            userUpdated
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado en el servidor. revisar logs'
        })
    }
}

const deleteUser = async(req= request, res = response) => {

    const {userID} = req.params; //captura de informacion relevante como el ID

    try {
        const userDB = await User.findById(userID);

        if(!userDB){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        await User.findByIdAndDelete(userID);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado en el servidor. revisar logs'
        })
    }


}

module.exports = {
    getUsers,
    updateUser,
    createUser,
    deleteUser
}