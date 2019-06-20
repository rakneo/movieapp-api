const fetch = require('node-fetch')

module.exports = {

    getMovie:(id)=>{
            return new Promise((resolve, reject) => {
                fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=04d2c97ac9015754ba522ea34c0cb296&language=en-US`)
                .then(data =>{
                    resolve(data.json())
                })
                .then(err =>{
                    reject(err)
                })  
            })
        },
    getNowPlaying:()=>{
            return new Promise((resolve, reject) => {
                fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=04d2c97ac9015754ba522ea34c0cb296&language=en-US&page=1')
                .then(data =>{
                    resolve(data.json())
                })
                .then(err =>{
                    reject(err)
                })
            })
            
        },

    getPopular:()=>{
        return new Promise((resolve, reject) => {
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=04d2c97ac9015754ba522ea34c0cb296&language=en-US&page=1')
            .then(data =>{
                resolve(data.json())
            })
            .then(err =>{
                reject(err)
            })
        })
    },
    getTopRated:()=>{
        return new Promise((resolve, reject) => {
            fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=04d2c97ac9015754ba522ea34c0cb296&language=en-US&page=1')
            .then(data =>{
                resolve(data.json())
            })
            .then(err =>{
                reject(err)
            })
        })
    },
    getUpcoming:()=>{
        return new Promise((resolve, reject) => {
            fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=04d2c97ac9015754ba522ea34c0cb296&language=en-US&page=1https://api.themoviedb.org/3/movie/top_rated?api_key=04d2c97ac9015754ba522ea34c0cb296&language=en-US&page=1')
            .then(data =>{
                resolve(data.json())
            })
            .then(err =>{
                reject(err)
            })
        })
    },
    getTrending:()=>{
        return new Promise((resolve, reject) => {
            fetch('https://api.themoviedb.org/3/trending/movie/week?api_key=04d2c97ac9015754ba522ea34c0cb296')
            .then(data =>{
                resolve(data.json())
            })
            .then(err =>{
                reject(err)
            })
        })
    }
}