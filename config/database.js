const mongoose=require('mongoose');
const getDB = require('./config')

const conncectDatabase=()=>{
    const DB=getDB();
    console.log(DB)
mongoose.connect(DB).then(con=>{
    console.log(`MongoDB is connected`); 
}).catch((e)=>console.log(e))
}

module.exports=conncectDatabase;