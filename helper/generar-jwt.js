const jwt = require ('jsonwebtoken');

const generarToken = (uid = '') => {
    return new Promise ((resolve,reject) => {
        const payload = {uid};

        jwt.sign(payload,'Est8a74es41mi148k748e692y0', {
            expiresIn: '4h',
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })
    });
}

module.exports = {
    generarToken
}