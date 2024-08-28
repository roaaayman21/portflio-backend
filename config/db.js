const mongoose=require('mongoose');
//
const connectDb=async ()=>{
    await mongoose.connect('mongodb://localhost:27017/portfolio');
    console.log('mongoDB connected');
}
module.exports=connectDb;