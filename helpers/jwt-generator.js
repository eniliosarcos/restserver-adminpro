const jwt = require('jsonwebtoken');

const JWTgenerate = (userID) => {

    return new Promise((resolve, reject) =>{
        const payload = {userID};

        jwt.sign(payload, process.env.JWT_SECRET,{

            expiresIn: '24h'
        }, (err, token) => {

            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    })
}

module.exports = {
    JWTgenerate
}