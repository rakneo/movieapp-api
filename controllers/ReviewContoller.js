const Review = require('../models/Review')

module.exports = {
    getByMovieId: (mid)=>{
        return new Promise((resolve, reject) =>{
            Review.find({movie:mid})
            .then(data =>{
                resolve(data)
            })
            .catch(err =>{
                reject(err)
            })
        })
    },

    getByUid: (uid) =>{
        return new Promise((resolve, reject) => {
            Review.find({uid:uid})
            .then(data =>{
                resolve(data)
            })
            .catch(err => {
                reject(new Error(`Review ${uid} not found`))
            })
        })
    },

    post:(params)=>{
        return new Promise((resolve, reject) =>{
            Review.create(params)
            .then(data =>{
                resolve(data)
            })
            .catch(err =>{
                reject(err)
            })
        })
    },
    put:(id, params)=>{
        return new Promise((resolve, reject) => {
            Review.findByIdAndUpdate(id, params,)
            .then(data =>{
                resolve(data)
            })
            .catch(err =>{
                reject(err)
            })
        })
    },
    delete: (id) => {
		return new Promise((resolve, reject) => {
			Player.findByIdAndRemove(id)
			.then(() => {
				resolve({id: id})
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}