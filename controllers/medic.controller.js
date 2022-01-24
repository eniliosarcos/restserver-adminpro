const {response, request} = require('express');
const Medic = require('../models/medic');
const bcrypt = require('bcryptjs');
const { JWTgenerate } = require('../helpers/jwt-generator');

const getMedics = async (req = request, res = response) => {

    const from = Number(req.query.from) || 0;
    const limit = Number(req.query.limit) || 10;

    const [medics, totalMedics] = await Promise.all([
        Medic.find().skip(from).limit(limit).populate('user', 'name img').populate('hospital', 'name img'),
        Medic.count()
    ]) 


    //desestructuracion
    // const {limit, page = 1} = req.query; //captura de informacion en los http

    // const Hospitals = await Hospital.find({}, 'name lastName email role google');

    res.json({
        totalMedics,
        medics
        // requestByUserID: req.userID
    })
}

const getMedicById = async (req = request, res = response) => {

    const {id} = req.params

    try {
        const medic = await Medic.findById(id).populate('user', 'name img').populate('hospital', 'name img');

        res.json({
            ok: true,
            medic
            // requestByUserID: req.userID
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }


    //desestructuracion
    // const {limit, page = 1} = req.query; //captura de informacion en los http

    // const Hospitals = await Hospital.find({}, 'name lastName email role google');

}

const createMedic = async(req = request, res = response) => {

    // const body = req.body;
    const userID = req.userID;
    const medic = new Medic({
        user: userID,
        ...req.body
    });

    try {
        const medicDB = await medic.save();
        
        res.json({
            ok:true,
            medic: medicDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
        
    }
}

const updateMedic = async(req = request, res = response) => {


    // const userID = req.params.userID;
    //desestructuracion
    const {id} = req.params; //captura de informacion relevante como el ID
    const {userID} = req;

    try {

        const medicDB = await Medic.findById(id);

        if(!medicDB){
            return res.status(404).json({
                ok:false,
                msg:'medico no encontrado por id'
            });
        }

        const data = {
            ...req.body,
            user: userID
        }

        const medicUpdated = await Medic.findByIdAndUpdate(id, data, {new: true});
        
        res.json({
            ok:true,
            medic: medicUpdated
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el administrador'
        })
        
    }

}

const deleteMedic = async(req= request, res = response) => {

    const {id} = req.params; //captura de informacion relevante como el ID
    const {userID} = req;

    try {

        const medicDB = await Medic.findById(id);

        if(!medicDB){
            return res.status(404).json({
                ok:false,
                msg:'Medico no encontrado por id'
            });
        }
        // -------------------------------- IMPLEMENTAR DESPUES
        // const data = {
        //     state: false,
        //     user: userID
        // }

        // const medicUpdated = await Medic.findByIdAndUpdate(id, data, {new: true});
        
        // res.json({
        //     ok:true,
        //     medic: medicUpdated
        // });
        await Medic.findByIdAndDelete(id);
        
        res.json({
            ok:true,
            resul: 'Medico borrado'
        });
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'hable con el administrador'
        })
        
    }

}

module.exports = {
    getMedics,
    getMedicById,
    updateMedic,
    createMedic,
    deleteMedic
}