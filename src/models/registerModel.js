const client = require("../config/postgre");

module.exports = {
    getAllRegisterModel: () =>{
        return new Promise ((resolve, reject) => {
        client.query('SELECT * FROM register', (error, result) => {
            if(!error){
                resolve(result.rows);
            }else {
                reject(new Error (error));
            }
        });
        });
    },
    postRegisterModel: (setData) =>{
        console.log(setData)
        return new Promise ((resolve, reject) => {
        client.query(`INSERT INTO register (first_name, last_name, email, phone, tgl_lahir, gender, photo_profil, password) VALUES ('${setData.first_name}', '${setData.last_name}', '${setData.email}', ${setData.phone}, '${setData.tgl_lahir}', '${setData.gender}', '${setData.photo_profil}', '${setData.password}') RETURNING id_regis, first_name, last_name, email, phone, tgl_lahir, gender, photo_profil, password`, 
        (error, result) => {
            if(!error){
                const newResult = {
                    user_id: result.insertedId,
                    ...setData
                }
                delete newResult.password
                resolve(newResult)
            }else {
                console.log(error)
                reject(new Error (error));
            }
        })
       
        });
    },
    checkEmail: (userEmail) => {
        return new Promise((resolve, reject) => {
            client.query(
                `SELECT * FROM register WHERE email = '${userEmail}'`,
                (error, result) => {
                    !error ? resolve(result) : reject(new Error(error))
                }
            )
        })
    },
    updateDataRegisterModel: (data, id) =>{
        return new Promise ((resolve, reject) => {
        client.query(`UPDATE register SET first_name = '${data.first_name}', last_name = '${data.last_name}', email = '${data.email}', phone = '${data.phone}', tgl_lahir = '${data.tgl_lahir}', gender = '${data.gender}', photo_profil = '${data.photo_profil}', password = '${data.password}'  WHERE id_regis =${id} RETURNING id_regis, first_name, last_name, email, phone, tgl_lahir, gender, photo_profil, password`,
        (error, result) => {
            if(!error){
                resolve(result.rows);
            }else {
                reject(new Error (error));
            }
        });
        });
    },
    deleteDataRegisterModel: (id) =>{
        return new Promise ((resolve, reject) => {
        client.query(`DELETE FROM register WHERE id_regis =${id}`,
        (error, result) => {
            if(!error){
                resolve(result.rows);
            }else {
                reject(new Error (error));
            }
        });
        });
    },
};