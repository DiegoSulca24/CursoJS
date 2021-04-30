const {request, response} = require ('express');
const jwt = require ('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }
    try{
        jwt.verify(token,'Est8a74es41mi148k748e692y0');
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            msg:'Token no valido'
        })
    }
}


module.exports = {
    validarJWT,
}