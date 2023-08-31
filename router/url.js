const express= require('express');
const shortid = require('shortid');

const urlModel= require('../model/urlmodel')


const router= express.Router();


router.post('/',async(req,res)=>{

    try {
        const shortId=shortid(7)
        const data= await urlModel({
      shortId:shortId,
      redirectUrl:req.body.redirectUrl,
      visitHistory:[]

        })

        const result= await data.save();
        if(result){
            res.status(200).json({message:"sucess",statusCode:200,status:true,data:data})
        }else{
            res.status(400).json({message:"Something went wrong..!",status:false,statusCode:400})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong..!",status:false,statusCode:400})
    }
});


router.get("/getanalytics/:id",async(req,res)=>{
    try {
        const id=req.params.shortId

        const anylaticsdata= await urlModel.findOne({id});

        if(anylaticsdata){

            const Totalclicks=anylaticsdata.visitHistory.length
           
            res.status(200).json({messge:"total Click data Found",data:anylaticsdata,Totalclicks:Totalclicks})
        }else{
            res.status(400).json({message:"Something Ernt wrong...!",status:false,statusCode:400})
        }
    } catch (error) {
        console.log(error);
       res.status(500).json({message:"something Went wrong...!",status:false,statusCode:500})
        
    }
})
 
module.exports=router