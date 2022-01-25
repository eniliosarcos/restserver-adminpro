const jsonwebtoken = require("jsonwebtoken");


const JWTvalidator = (req, res, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'No hay token en la peticion'
        })
    }

    try {

        const {userID} = jsonwebtoken.verify(token,process.env.JWT_SECRET);
        req.userID = userID;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }
}



module.exports = {
    JWTvalidator
}