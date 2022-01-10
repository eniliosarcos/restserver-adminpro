const { request, response } = require("express");
const path = require('path');
const fileSystem = require('fs');

const { fileUpload } = require("../helpers/uploat-file");

const Medic = require("../models/medic");
const User = require("../models/user");
const Hospital = require("../models/hospital");

const collectionsValid = [
    'hospitales',
    'medicos',
    'usuarios'
]
const validExtent = [
    'png',
    'jpg',
    'jpeg',
    'gif'
];


const updateImg = async(req = request, res = response) => {

    const {id, collection} = req.params;
    let model;
  
    switch (collection) {
      case 'medicos':
        model = await Medic.findById(id);
        if(!model){
          return res.status(400).json({
            message: `no existe un medico con este id ${id}`
          });
        }
      break;
      case 'hospitales':
        model = await Hospital.findById(id);
        if(!model){
          return res.status(400).json({
            message: `no existe un hospital con este id ${id}`
          });
        }
      break;
      case 'usuarios':
        model = await User.findById(id);
        if(!model){
          return res.status(400).json({
            message: `no existe un usuario con este id ${id}`
          });
        }
      break;
    
      default:
        return res.status(500).json({
          message: `Solo se permiten estas colleciones ${collectionsValid}`
        });
    }
  
    //Limpiar imagenes previas
    if(model.img){
      // Hay que borrar la imagen del servidor\
      const pathImage = path.join(__dirname, '../uploads', collection, model.img);
      if(fileSystem.existsSync(pathImage)){
        fileSystem.unlinkSync(pathImage);
      }
    }
    
    const fileName = await fileUpload(req.files, validExtent, collection);
    model.img = fileName;
  
    await model.save();
  
    res.json({
        ok: true,
        collection,
        model
    });
}

const returnImg = (req = request, res = response) => {
  const {collection, img} = req.params;

  const pathImage = path.join(__dirname, '../uploads', collection, img);

  if(!fileSystem.existsSync(pathImage)){
    const pathImage = path.join(__dirname, '../assets/no-image.jpg');
    return res.sendFile(pathImage);
  }

  res.sendFile(pathImage);
}

module.exports = {
    updateImg,
    returnImg
}