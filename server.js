const express = require('express')
const mongoose = require("mongoose")
const BrandName = require("./model")

mongoose.connect('mongodb+srv://UDAYKIRAN:UDAYKIRAN@cluster0.isg3hqj.mongodb.net/?retryWrites=true&w=majority').then(() =>{
    console.log("DB Conected ...")
}).catch((e) =>{
    console.log(e)
})
const app = express()
app.use(express.json())



app.listen(4000,() =>{
    console.log("Server Is runing")
})

app.get("/getBrands",async(req,res) => {
    try{
        res.send(await BrandName.find())
    }catch(e){
        console.log(e.message)
    }
})

app.get("/getBrands/:id",async(req,res) =>{
    try{
        const data = await BrandName.findById("637a5e3fa1e9e2c11201c93d")
        res.send(data)
    }
    catch(e){
        console.log(e.message)
    }
})

app.delete("/deleteBrand/:id",async(req,res) =>{
    try{
        await BrandName.findByIdAndDelete(req.params.id)
        return  res.send( await BrandName.find()) 
    }catch(e){
        console.log(e.message)
    }
})

app.post("/addBrands" , async(req,res) =>{
    const {brandname} = req.body
    try{
        const newData =new BrandName({brandname})
        await newData.save()
        return  res.send( await BrandName.find())
    }catch(e){
        res.send(e.message)
    }
} )
app.put("/updateBrand/:id", async(req,res) =>{
    try{
        await BrandName.findByIdAndUpdate(req.params.id,req.body)
        return res.send(await BrandName.findById(req.params.id))
    }
    catch(e){
        console.log(e.message)
    }
})