// const mongoose = require("mongoose");
import mongoose from "mongoose";
// const Product = require("./models/Product");
import Product from "./Product";

mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/product_verification?retryWrites=true&w=majority&appName=HACKETHIC");

const RAW_PRODUCTS = [
{
serial:"SN1001",
code:"ALPHA123",
mfg:"02/2022 or before",
name:"Astralean 40mcg - 50 tablets",
token:"01"
},
{
serial:"SN1002",
code:"BRAVO457",
mfg:"02/2022 or before",
name:"Cardioplus 10mg - 30 tablets",
token:"02"
},
{
serial:"SN1011",
code:"BETA456",
mfg:"03/2022 or after",
name:"Alphabol 10mg - 50 tablets",
token:"11"
}
];

async function seed(){
await Product.deleteMany({});
await Product.insertMany(RAW_PRODUCTS);
console.log("Products inserted");
process.exit();
}

seed();