const mongoose   = require('mongoose'),
      timestamps = require('mongoose-timestamp')

const UserSchema = new mongoose.Schema({
    
    uid:{
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
    },
    name: {
        first: {
            type: String,
            trim: true,
            required: true,
        },
        last: {
            type: String,
            trim: true,
            required: true,
        },
    },
}, { collection: 'users' })

UserSchema.plugin(timestamps)

module.exports = mongoose.model('User', UserSchema)