const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const tripSchema= new Schema({
    destination:{
        type: String,
        required:[true,"destination is required" ]
    },
    price:{
        type: Number,
        required:[true,"price is required" ]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
      },
    contact:{
        type: Number,
        required:[true,"contact is required" ],
        min: [1000000000],
        max: [9999999999],
    },
    startDate:{
        type: Date,
        required:[true,"startDate is required" ]
    },
    endDate:{
        type: Date,
        required:[true,"endDate is required" ]
    },
    description:{
        type: String
    }


})
module.exports= mongoose.model('Trip', tripSchema );