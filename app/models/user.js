const mongoose = require('mongoose');
const Schema = mongoose.Schema; //class or constructor func if starting with capital letter
const userSchema = new Schema({
    name: { type: String, require:true},
    email: { type: String, require:true, unique:true},
    password: { type: String, require:true},
    role: {type:String, default: 'customer'}
},{timestamps: true}
); //blueprint of things in database

//creating model and exporting
const User = mongoose.model('User', userSchema);
module.exports = User;