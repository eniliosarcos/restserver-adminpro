const path = require('path');
const { v4: uuidv4 } = require('uuid');


const fileUpload = (files, validExtent = ['png', 'jpg', 'jpeg'], folder = '') => {


    return new Promise((resolve, reject) => {
      
        const {archivo} = files;
        const cutName = archivo.name.split('.');
        const extent = cutName.at(-1);
        
        if(!validExtent.includes(extent)){
            return reject(`La extension ${extent} no es permitida. Solo se aceptan: ${validExtent}`)
        }
    
        const tempName = uuidv4() + '.' + extent;
        uploadPath = path.join(__dirname, '../uploads/',folder ,tempName);
      
        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                return reject(err);
            }

            resolve(tempName);
        });
    });

}

module.exports = {
    fileUpload
}