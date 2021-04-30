const { Router } = require('express');
const { check } = require('express-validator');
const {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete
} = require('../controllers/categorias');
const { validarJWT } = require('../middlewares/validar-jwt');
const { roles } = require('../middlewares/validar-roles');

const router = Router();


//Todas las rutas necesitan pasar por la validacion de token (validarJWT) y por la validaion de roles (roles)
//deesta manera se verifica si el usuario es administrador o no, y se le dan los permisos respectivos

router.get('/',
validarJWT,
roles,
categoriaGet);

router.post('/',
validarJWT, 
roles,
categoriaPost);

router.put('/:id', 
validarJWT,
roles,
categoriaPut);

router.delete('/:id', 
validarJWT,
roles,
categoriaDelete);



module.exports = router;