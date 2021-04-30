const { Router } = require('express');
const { check } = require('express-validator');
const {
    usuariosGet,
    usuariosPost,
    usuriosPut,
    usuariosDelete
} = require('../controllers/user');
const { validarJWT } = require('../middlewares/validar-jwt');
const { roles } = require('../middlewares/validar-roles');

const router = Router();

//Todas las rutas necesitan pasar por la validacion de token (validarJWT) y por la validaion de roles (roles)
//deesta manera se verifica si el usuario es administrador o no, y se le dan los permisos respectivos

router.get('/',
validarJWT,
roles,
usuariosGet);

router.post('/',
validarJWT, 
roles,
[check('correo','El correo es requerido o no es valido').isEmail()],
usuariosPost);

router.put('/:id', 
validarJWT,
roles,
usuriosPut);

router.delete('/:id', 
validarJWT,
roles,
usuariosDelete);



module.exports = router;