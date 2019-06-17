const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const ReviewSchema = new mongoose.Schema({
    
    uid:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true
    },
    movie:{
        type:String,
        required:true,
        trim:true
    },
    review: {
        rating: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
    },
}, { collection: 'reviews' })

ReviewSchema.plugin(timestamps)

module.exports = mongoose.model('Review', ReviewSchema)