const router = require ("express").Router();

const {getAllRegister,insertRegister, loginUser, updateDataRegister, deleteDataRegister} = require('../controllers/registerController');
const {isLogin} = require('../middleware/auth')
router.get("/", getAllRegister);
router.post('/', insertRegister);
router.post('/login', loginUser);
router.patch('/:id', isLogin, updateDataRegister);
router.delete('/:id', deleteDataRegister);

module.exports= router;