const {response, request} = require('express');
const Hospital = require('../models/hospital');
const bcrypt = require('bcryptjs');
const { JWTgenerate } = require('../helpers/jwt-generator');

const getHospitals = async (req = request, res = response) => {

    // const query = req.query;
    const hospitals = await Hospital.find()
                                            .populate('user','name lastName img');

    //desestructuracion
    // const {limit, page = 1} = req.query; //captura de informacion en los http

    // const Hospitals = await Hospital.find({}, 'name lastName email role google');

    res.json({
        ok:true,
        hospitals
        // requestByUserID: req.userID
    })
}

const createHospital = async(req = request, res = response) => {

    // const body = req.body;
    const userID = req.userID;
    const hospital = new Hospital({
        user: userID,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        
        res.json({
            ok:true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
        
    }


}

const updateHospital = async(req = request, res = response) => {

    // const userID = req.params.userID;
    //desestructuracion
    const {id} = req.params; //captura de informacion relevante como el ID

    res.json({
        ok:true,
        msg: 'Hospitales update',
        id
        // requestByUserID: req.userID
    })
}

const deleteHospital = async(req= request, res = response) => {

    const {id} = req.params; //captura de informacion relevante como el ID

    res.json({
        ok:true,
        msg: 'Hospitales delete',
        id,
        // requestByUserID: req.userID
    })


}

module.exports = {
    getHospitals,
    updateHospital,
    createHospital,
    deleteHospital
}