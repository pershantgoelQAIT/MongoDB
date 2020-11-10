const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{
        type:String,
    },
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    address: [
        { street: String},
        { suite: String},
        { city: String},
        { zipcode: String},
        { geo: [{lat: String}, {lng: String}]}
    ],
    username:{
        type:String,
    },
    phone:{
        type:String,
    },
    website:{
        type:String,
    },
    company: [
        {name: String},
        {catchPhrase: String}
    ]
});

module.exports = User = mongoose.model("user", userSchema);