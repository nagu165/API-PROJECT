const mongoose = require('mongoose')

const pdtschema = mongoose.Schema(
    {
        name : {
            type : String,
            required : [true, "enter a product name"]
        },
        quantity : {
            type : Number,
            required : true,
            default : 0
        },
        price : {
            type : Number,
            required : false,
        }
    },
    {
        timestamps: true
    }
)

const Pdt = mongoose.model('Pdt',pdtschema);

module.exports = Pdt;