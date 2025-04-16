const {mongoose,Schema}=require('mongoose');

const transactionSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    transactionId:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'pending'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const Transaction=mongoose.model('Transaction',transactionSchema);

module.exports=Transaction;