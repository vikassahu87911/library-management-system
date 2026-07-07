const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },surname:{
        type: String,
        required: true
    },email:{
        type: String,
        required: true
    }, issuedbook:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: false

    },issueddate:{
        type: String,
        required:false
    },returndate:{
        type: String,
        required:false
    }, subscriptiontype:{
        type:String,
        required:true
    },subscriptiondate:{
        type:String,
        required:true
    }

},
{
    timestamps:true
})


module.exports = mongoose.model("user",userschema);

