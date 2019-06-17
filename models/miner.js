const mongoose = require('mongoose');
const controller = require('../controllers/MovieController');
const movie = require('./Movie');
const _progress = require('cli-progress');
const _colors = require('colors');




Miner(function(){console.log("\ncomplete"); process.exit(1)})

function Miner(onComplete){

console.log('['+_colors.green('*')+'] Establishing connection with database.')
mongoose.connect('mongodb://localhost/movieapp', { useNewUrlParser: true })
        .then(db =>{
            console.log('['+_colors.green('*')+'] Connection to database established.')
        }).catch(err =>{
            console.log('['+_colors.red('*')+'] Connection Failed,'+err)
            process.exit(1)
        })
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

const query = model.find().select('id -_id').limit(1000);

// create new progress bar using default values
const b1 = new _progress.Bar({}, {
    format: _colors.green(' {bar}') + ' {percentage}% | ETA: {eta}s | {value}/{total}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591'
});

query.exec(function (err, res){
    if(res){
        let bar_value=0
        const records_length = res.length;
        console.log('['+_colors.green('*')+'] Movie ID\'s fetched from Database, Total '+records_length+' records fetched.')
        b1.start(records_length,0)
        res.forEach(data =>{
                // console.log(data.id);
                controller.getMovie(data.id)
                      .then(m=>{
                        //   console.log(m);
                          movie.create(m)
                               .then(res => {
                                //    console.log(res)
                                   bar_value++;
                               })
                               .catch(err =>{
                                console.log('['+_colors.red('*')+'] databse error, '+err.message)
                                process.exit(1)
                               })
                      })
                      .catch(err =>{
                        console.log('['+_colors.red('*')+'] error in fetching data from the api, '+err.message)
                        process.exit(1)                       
                      })
                      b1.update(++bar_value)
            
                
        })
       if(bar_value === records_length){
           b1.stop()
        //    onComplete.apply(this);
       }


    }else if(err){
        console.log('['+_colors.red('*')+'] There is a problem fetching the ID\'s')
    }
    })
}

