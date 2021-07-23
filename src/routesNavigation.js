const router = require('express').Router();

const register = require('./routes/registerRoute')
// const login = require('./routes/loginRoute')

router.use('/register', register)
// router.use('/login', login)

module.exports = router;