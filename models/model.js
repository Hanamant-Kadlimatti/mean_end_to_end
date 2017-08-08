var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name : {
       type : String,
       required : true
    },
    age : {
        type : Number,
        required : true
    }
});

var model = mongoose.model('Users', UserSchema);

module.exports = model;