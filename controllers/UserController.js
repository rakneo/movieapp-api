const User = require('../models/User')

module.exports = {
    createUser:(params)=>{
        return new Promise((resolve, reject)=>{
            User.create(params)
            .then(response =>{
                resolve(response)
            })
            .catch(err =>{
                reject(err)
            })
        })
    },
    getUser: (id)=>{
        return new Promise((resolve, reject) => {
            User.find({uid:id})
                .then(response =>{
                    resolve(response)
                })
                .catch(err =>{
                    reject(err)
                })
        })
    }
}