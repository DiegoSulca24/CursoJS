const { Router } = require('express');
const {
    productoGet,
    productoPost,
    productoPut,
    productoDelete
} = require('../controllers/productos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { roles } = require('../middlewares/validar-roles');

const router = Router();

//Todas las rutas necesitan pasar por la validacion de token (validarJWT) y por la validaion de roles (roles)
//deesta manera se verifica si el usuario es administrador o no, y se le dan los permisos respectivos

router.get('/',
validarJWT,
roles,
productoGet);

router.post('/',
validarJWT, 
roles,
productoPost);

router.put('/:id', 
validarJWT,
roles,
productoPut);

router.delete('/:id', 
validarJWT,
roles,
productoDelete);



module.exports = router;