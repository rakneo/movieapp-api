const mongoose = require('mongoose');
const controller = require('../controllers/MovieController');
const movie = require('./Movie');
const _progress = require('cli-progress');
const _colors = require('colors');
var cq = require('concurrent-queue');
var _ = require('lodash');
var fs = require("fs");






// Miner(function(){console.log("\ncomplete"); process.exit(1)})


async function getidx(){
    const b1 = new _progress.Bar({}, {
        format: _colors.green(' {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total}\n',
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591'
    });
    var arr_id=[];
    console.log('['+_colors.yellow('*')+'] Establishing connection with database.')
    mongoose.connect('mongodb://localhost/movieapp', { useNewUrlParser: true })
    .then(db =>{
        console.log('['+_colors.green('*')+'] Connection to database established.')

        const MovieIdSchema = new mongoose.Schema({
            adult:{
                type:Boolean,
                required:true,
                unique:true
            },
            id:{
                type:Number,
                required:true,
                unique:true
            },
            original_title:{
                type:String,
                required:true,
                trim:true
            },
            popularity:{
                type:Number,
            },
            video:{
                type:Boolean
            }
        },{collection:'movie_ids'});
    
        const model = mongoose.model('movie_ids', MovieIdSchema);
        
        const query = model.find().select('id -_id').limit(1000)

        console.log('['+_colors.yellow('*')+'] Fetching id\'s from collection')

        query.exec()
             .then(res =>{ 
                let bar_value=0
                const records_length = res.length;
                console.log('['+_colors.green('*')+'] Movie ID\'s fetched from Database, Total '+records_length+' records fetched.')
                 res.forEach(o=>{
                 })
                 console.log('['+_colors.green('*')+'] Fetching Completed')
                 var chunks =_.chunk(arr_id,50)
                 var chunks_len = chunks.length
                 console.log('['+_colors.green('*')+'] Total Chucks to be processed '+chunks_len)

                 var queue = cq().limit({ concurrency: 10}).process(function (chunk,cb) {
                    console.log('['+_colors.yellow('*')+'] Proccessing Chunk '+chunk)
                    chunk.forEach(data =>{
                    controller.getMovie(data)
                        .then(m=>{
                            
                            // if(m.status !== 34){
                            //     movie.create(m)
                            //     .then(res => {
                            //         cb(null, res)
                            //     })
                            //     .catch(err =>{
                            //         console.log('['+_colors.red('*')+'] databse error, '+err.message)
                            //         process.exit(1)
                            //     })
                            // }else{
                            //     console.log('['+_colors.red('*')+'] Chunk, '+chunk+' not valid')
                            // }

                            fs.open('dump.json', 'w+', function(err, fd){
                                fs.appendFile(fd,m+'\n')
                            })

                        })
                        .catch(err =>{
                            console.log('['+_colors.red('*')+'] error in fetching data from the api, '+err.message)
                            process.exit(1)                       
                        })
                        
            })
                    
                })
               

      
                 var idx1=0
                 chunks.forEach(chunk =>{
                     queue(chunk,function(){
                        idx1++ 
                        console.log('['+_colors.green('*')+'] Process '+idx1+' Completed') 
                      
                     })
                    
                 })
                //  b1.stop() 
                
             })
             .catch(err =>{
                console.log('['+_colors.red('*')+'] Error executing the query, '+err.message)
             })

    }).catch(err =>{
        console.log('['+_colors.red('*')+'] Connection Failed,'+err)
        process.exit(1)
    })

}

getidx()

