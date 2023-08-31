const express=require('express')

const empRouter=require('./router/employee');
const urlRouter=require('./router/url')



const db=require('./config/db')


const app=express()

app.use(express.json());


app.use('/',empRouter);
app.use('/url',urlRouter)

app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000");
})