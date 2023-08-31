const express=require('express');
const employee=require('../model/empModel');
const { default: mongoose } = require('mongoose');

const router=express.Router();




router.post('/',async(req,res)=>{
    const {first_name,last_name,hire_date,address,department,dob,joiningDate,salary}=req.body
    try {

        if(!first_name|| !last_name|| !hire_date|| !address|| !department|| !dob|| !joiningDate|| !salary){
return res.status(400).json({mesage:"All Fileds are Required..!",status:false,statusCode:400})
        }
   

        const data= await employee({
            first_name:first_name,
            last_name:last_name,
            hire_date:hire_date,
            address:address,
            department:department,
            dob:dob,
            joiningDate:joiningDate,
            salary:salary
        })

        const result= await data.save();
        if(data){
            res.status(200).json({mesage:"Employee Added sucessfully...",status:true,statuCode:200,data:result})
        }else{
       res.status(400).json({message:"Something went wrong...!",status:false,statusCode:400})
        }



    } catch (error) {
        res.status(500).json({message:"Something went wrong...!",status:false,statusCode:500})
    }
});
  //getAll employee
router.get('/getperticular/:id',async(req,res)=>{
    try {
        const id= req.params.id
        const data= await employee.findById(id);
        if(data){
       
           console.log(data);
            res.status(200).json({message:"Data found Sucessfully...!",status:true,statuCode:200,data:data, totalemployee:totalemployee})
        }else{
            res.status(400).json({message:"Something went wrong..!",status:false,statuCode:200})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong..!",status:false,statuCode:500})
    }
})


//get all employee
router.get('/getAll',async(req,res)=>{
    let page= Number(req.query.page)
    let limit=Number(req.query.limit)
    let skip=(page-1)*limit
    console.log(skip);
    try {
        const data= await employee.find().skip(skip).limit(limit).sort({_id:-1});
        if(data){
            let totalemploye=data.length
            res.status(200).json({message:"Data found Sucessfully...!",status:true,statuCode:200,data:data,totalemployee:totalemploye})
        }else{
            res.status(400).json({message:"Something went wrong..!",status:false,statuCode:200})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong..!",status:false,statuCode:500})
    }
})


//update employee


router.put('/update/:id',async(req,res)=>{
    const id=req.params.id
    try {
        const data= await employee.findByIdAndUpdate(id,{$set:req.body},{new:true});
        if(data){
            res.status(200).json({message:"Employee updated sucessfully...!",status:true,statusCode:200,data:data})
        }else{
            res.status(400).json({message:"something went wrong...!",statuCode:400,status:false})
        }
    } catch (error) {

        res.status(500).json({message:"something went wrong...!",statuCode:500,status:false})
        console.log(error);
    }
});


//delete employee
router.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    try {
        const data= await employee.findByIdAndDelete(id);
        if(data){
            res.status(200).json({mesage:"Record Delet sucessfully..!",status:true,statuCode:200})
        }else{
            res.status(400).json({message:"something went wrong...!",statuCode:400,status:false})
        }
    } catch (error) {
        console.log(error);
         res.status(500).json({message:"something went wrong...!",statuCode:500,status:false})
    }
});



// sorting salary

router.get('/sortBySalary',async(req,res)=>{
    const {sort}=req.query
    try {
        if(!sort){
            return res.status(400).json({message:"Please provide info...!",status:false,statusCode:400})
        }
  if(sort==="asc"){
    const data= await employee.find().sort({salary:1})
    res.status(200).json({mesage:"Salary Sorted...!",status:true,statuCode:200,data:data})
  }else if(sort==="dsc"){
    const data= await employee.find().sort  ({salary:-1})

    res.status(200).json({mesage:"Salary Sorted...!",status:true,statuCode:200,data:data})
  }else{
    res.status(400).json({message:"something went wrong...!",statusCode:400,status:false})
  }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong...!",statusCode:500,status:false})
    }
});


router.get('/filter',async(req,res)=>{
    const {department}=req.query
    try {
        if(!department){
            return res.status(400).json({message:"Please provide info...!",status:false,statusCode:400})
        }
        const data= await employee.find({ department: { $regex: department, $options: 'i' }});
        if(data){
            res.status(200).json({message:"data found...!",status:true,statusCode:200,data:data})
        }else{
            res.status(400).json({message:"something went wrong...!",statusCode:400,status:false})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"something went wrong...!",statusCode:500,status:false})
    }
})

module.exports=router