const { request, response } = require("express");
const User = require('../models/user');
const Medic = require('../models/medic');
const Hospital = require('../models/hospital');


const getTodo = async(req = request,res = response) =>{

    const {find} = req.params;

    const regex = new RegExp(find, 'i');

    const [users,medics,hospitals] = await Promise.all([
        User.find({name: regex}),
        Medic.find({name: regex}),
        Hospital.find({name: regex})
    ]);



    res.json({
        ok:true,
        users,
        medics,
        hospitals
    })
}

const getCollectionDocument = async(req = request,res = response) =>{

    const {find} = req.params;
    const {collection} = req.params;

    const regex = new RegExp(find, 'i');

    let data = [];


    switch (collection) {
        case 'medicos':
            data = await Medic.find({name: regex}).populate('user', 'name img').populate('hospital', 'name img');
            break;

        case 'hospitales':
            data = await Hospital.find({name: regex}).populate('user', 'name img');
            break;

        case 'usuarios':
            data = await User.find({name: regex});
            break;
    
        default:
            return res.status(400).json({
                ok:false,
                msg: 'La coleccion debe ser medicos, hospitales y usuarios'
            });
    }

    res.json({
        ok:true,
        result: data
    });
}

module.exports = {
    getTodo,
    getCollectionDocument
}