const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({

    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Member",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trainer",
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    method:{
        type: String,
        enum: ["cash", "online"],
        required: true
    },
    status:{
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "completed"
    }



} , {timestamps: true});

 const Payment = mongoose.model("Payment",paymentSchema)

 module.exports = Payment;