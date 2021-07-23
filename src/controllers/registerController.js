const helper = require('../helper/response')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const {getAllRegisterModel, postRegisterModel, checkEmail, updateDataRegisterModel, deleteDataRegisterModel} = require('../models/registerModel')

module.exports = {
    getAllRegister: async (req, res) =>{
        try {
            const result = await getAllRegisterModel();
            return helper.response(res, 200, 'Success get all register data', result);
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, "Bad Request");
        }
    },
    insertRegister: async (req, res) =>{
        try {
            const {
                first_name, last_name, email, phone, tgl_lahir, gender, photo_profil, id_regis, password
            } = req.body

            const salt = bcrypt.genSaltSync(10)
            const encryptPassword = bcrypt.hashSync(password, salt)

            const crypto = require('crypto')
            const userKey = crypto.randomBytes(20).toString('hex')

            const setData = {
                first_name, last_name, email, phone, tgl_lahir, gender, photo_profil, id_regis, password : encryptPassword
            }
            console.log('line33')
            const checkDuplicateEmail = await checkEmail(email)
            console.log('line35')
            if (checkDuplicateEmail.length > 0) {
                return helper.response(
                    res,
                    400,
                    'Duplicate Email, email has been used by another account'
                )
            }

            const result = await postRegisterModel(setData)
            if (result) {
                return helper.response(
                    res,
                    200,
                    'Success register account',
                    result
                )
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad Request', error)
        }
    },

    loginUser: async (req, res) => {
        try {
            const {email,password} = req.body
            console.log(req.body)
            const checkUserData = await checkEmail(email)
            console.log(checkUserData.rows.length)
            if (checkUserData.rows.length > 0) {
                const checkPassword = bcrypt.compareSync(
                    password, checkUserData.rows[0].password
                )

                if (checkPassword) {
                    const {
                        id_regis: id_regis,
                        email: email
                    } = checkUserData.rows[0]

                    const payload = {
                        id_regis, 
                        email
                    }

                    const token = jwt.sign(payload, 'RAHASIA', {expiresIn: '24h'})
                    const result = { ...payload, token}
                    return helper.response(res, 200, 'Login Success', result)
                }   else {
                    return helper.response(res, 400, 'Password invalid')
                }
            } else {
                return helper.response(res, 400, 'Account not Registered')
            }
        } catch (error) {
            console.log(error)
            return helper.response(res, 400, 'Bad Request', error)
        }
    },

    updateDataRegister: async (req, res) =>{
        try {
            const result = await updateDataRegisterModel(req.body, req.params.id);
            return helper.response(res, 200, `Success update register data with id: ${req.params.id}`, result);
        } catch (error) {
            return helper.response(res, 400, "Bad Request");
        }
    },
    deleteDataRegister: async (req, res) =>{
        try {
            await deleteDataRegisterModel(req.params.id);
            return helper.response(res, 200, `Success delete register data with id: ${req.params.id}`);
        } catch (error) {
            return helper.response(res, 400, "Bad Request");
        }
    },
};