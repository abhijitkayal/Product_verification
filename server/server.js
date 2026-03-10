// const express = require("express");
import express from "express";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const cors = require("cors");
import cors from "cors";

// const Product = require("./models/Product");
import Product from "./Product.js";

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/product_verification?retryWrites=true&w=majority&appName=HACKETHIC")
.then(()=>console.log("MongoDB connected"));

/* ================= VERIFY ================= */

app.post("/verify", async (req,res)=>{

try{

const {code,serial,mfg,token} = req.body;

let product;

if(token){

product = await Product.findOne({token});

}else{

product = await Product.findOne({
code,
mfg,
...(mfg !== "03/2022 or after" && {serial})
});

}

if(!product){
return res.json({status:"fail"});
}

if(product.verified){

return res.json({
status:"duplicate",
verifiedAt:product.verifiedAt
});

}

product.verified = true;
product.verifiedAt = new Date();

await product.save();

return res.json({
status:"success",
productName:product.name
});

}catch(err){

console.error(err);
res.status(500).json({status:"error"});

}

});

app.listen(5000,()=>{
console.log("Server running on port 5000");
});