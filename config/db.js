const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/employee').then(()=>{
    console.log("conneted");
}).catch((err)=>{
    console.log(err);
})