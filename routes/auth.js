const {Router} = require ('express');
const {login} = require ('../controllers/auth');
const { validarROL } = require('../middlewares/validar-usuario');

const router = Router();

router.post('/login', validarROL,login);

module.exports = router;