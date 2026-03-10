// // const mongoose = require("mongoose");
// import mongoose from "mongoose";
// // const Product = require("./models/Product");
// import Product from "./Product.js";

// mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/product_verification?retryWrites=true&w=majority&appName=HACKETHIC");

// const RAW_PRODUCTS = [
//   // 02/2022 or before (requires serial)
//   {
//     serial: "SN1001",
//     code: "ALPHA123",
//     mfg: "02/2022 or before",
//     name: "Astralean 40mcg - 50 tablets",
//     token: "01"
//   },
//   {
//     serial: "SN1002",
//     code: "BRAVO457",
//     mfg: "02/2022 or before",
//     name: "Cardioplus 10mg - 30 tablets",
//     token: "02"
//   },
//   {
//     serial: "SN1003",
//     code: "CHARLIE892",
//     mfg: "02/2022 or before",
//     name: "Neurovita B12 - 60 capsules",
//     token: "03"
//   },
//   {
//     serial: "SN1004",
//     code: "DELTA310",
//     mfg: "02/2022 or before",
//     name: "GastroCare 20mg - 15 tablets",
//     token: "04"
//   },
//   {
//     serial: "SN1005",
//     code: "ECHO765",
//     mfg: "02/2022 or before",
//     name: "ImmunoShield C - 100 tablets",
//     token: "05"
//   },
//   {
//     serial: "SN1006",
//     code: "FOXTROT221",
//     mfg: "02/2022 or before",
//     name: "PainRelief XR 500mg - 10 tablets",
//     token: "06"
//   },
//   {
//     serial: "SN1007",
//     code: "GOLF908",
//     mfg: "02/2022 or before",
//     name: "RespiraClear 5mg - 20 tablets",
//     token: "07"
//   },
//   {
//     serial: "SN1008",
//     code: "HOTEL634",
//     mfg: "02/2022 or before",
//     name: "Dermacalm Lotion - 100ml",
//     token: "08"
//   },
//   {
//     serial: "SN1009",
//     code: "INDIA519",
//     mfg: "02/2022 or before",
//     name: "OcuVision Plus - 30 softgels",
//     token: "09"
//   },
//   {
//     serial: "SN1010",
//     code: "JULIET842",
//     mfg: "02/2022 or before",
//     name: "VitaBoost Zinc - 90 tablets",
//     token: "10"
//   },

//   // 03/2022 or after (no serial required)
//   {
//     serial: "SN1011",
//     code: "BETA456",
//     mfg: "03/2022 or after",
//     name: "Alphabol 10mg - 50 tablets",
//     token: "11"
//   },
//   {
//     serial: "SN1012",
//     code: "LIMA204",
//     mfg: "03/2022 or after",
//     name: "GlucoGuard 500mg - 30 tablets",
//     token: "12"
//   },
//   {
//     serial: "SN1013",
//     code: "MIKE639",
//     mfg: "03/2022 or after",
//     name: "NeuroCalm 25mg - 15 tablets",
//     token: "13"
//   },
//   {
//     serial: "SN1014",
//     code: "NOVEMBER115",
//     mfg: "03/2022 or after",
//     name: "HeartSafe 75mg - 14 tablets",
//     token: "014"
//   },
//   {
//     serial: "SN1015",
//     code: "OSCAR903",
//     mfg: "03/2022 or after",
//     name: "AllerFree 5mg - 10 tablets",
//     token: "15"
//   },
//   {
//     serial: "SN1016",
//     code: "PAPA472",
//     mfg: "03/2022 or after",
//     name: "VitaD3 Max - 8 capsules",
//     token: "16"
//   },
//   {
//     serial: "SN1017",
//     code: "QUEBEC388",
//     mfg: "03/2022 or after",
//     name: "LiverCare Forte - 60 tablets",
//     token: "17"
//   },
//   {
//     serial: "SN1018",
//     code: "ROMEO726",
//     mfg: "03/2022 or after",
//     name: "RespiraAid Syrup - 100ml",
//     token: "18"
//   },
//   {
//     serial: "SN1019",
//     code: "SIERRA550",
//     mfg: "03/2022 or after",
//     name: "PainBlock Gel - 30g",
//     token: "19"
//   }
// ];

// async function seed(){
//   console.log("Connecting to MongoDB...");
//   await Product.deleteMany({});
//   console.log("Cleared existing products");
  
//   await Product.insertMany(RAW_PRODUCTS);
//   console.log(`✅ ${RAW_PRODUCTS.length} products inserted successfully`);
//   console.log("All products are unverified (verified: false)");
  
//   process.exit();
// }

// seed().catch(err => {
//   console.error("❌ Seed failed:", err);
//   process.exit(1);
// });


import mongoose from "mongoose";

const products = [
{
serial:"SN1001",
code:"ALPHA123",
mfg:"02/2022 or before",
name:"Astralean 40mcg - 50 tablets",
token:"01",
verified:false,
verifiedAt:null
},
{
serial:"SN1002",
code:"BRAVO457",
mfg:"02/2022 or before",
name:"Cardioplus 10mg - 30 tablets",
token:"02",
verified:false,
verifiedAt:null
},
{
serial:"SN1003",
code:"CHARLIE892",
mfg:"02/2022 or before",
name:"Neurovita B12 - 60 capsules",
token:"03",
verified:false,
verifiedAt:null
},
{
serial:"SN1004",
code:"DELTA310",
mfg:"02/2022 or before",
name:"GastroCare 20mg - 15 tablets",
token:"04",
verified:false,
verifiedAt:null
},
{
serial:"SN1005",
code:"ECHO765",
mfg:"02/2022 or before",
name:"ImmunoShield C - 100 tablets",
token:"05",
verified:false,
verifiedAt:null
},
{
serial:"SN1006",
code:"FOXTROT221",
mfg:"02/2022 or before",
name:"PainRelief XR 500mg - 10 tablets",
token:"06",
verified:false,
verifiedAt:null
},
{
serial:"SN1007",
code:"GOLF908",
mfg:"02/2022 or before",
name:"RespiraClear 5mg - 20 tablets",
token:"07",
verified:false,
verifiedAt:null
},
{
serial:"SN1008",
code:"HOTEL634",
mfg:"02/2022 or before",
name:"Dermacalm Lotion - 100ml",
token:"08",
verified:false,
verifiedAt:null
},
{
serial:"SN1009",
code:"INDIA519",
mfg:"02/2022 or before",
name:"OcuVision Plus - 30 softgels",
token:"09",
verified:false,
verifiedAt:null
},
{
serial:"SN1010",
code:"JULIET842",
mfg:"02/2022 or before",
name:"VitaBoost Zinc - 90 tablets",
token:"10",
verified:false,
verifiedAt:null
},
{
serial:"SN1011",
code:"BETA456",
mfg:"03/2022 or after",
name:"Alphabol 10mg - 50 tablets",
token:"11",
verified:false,
verifiedAt:null
},
{
serial:"SN1012",
code:"LIMA204",
mfg:"03/2022 or after",
name:"GlucoGuard 500mg - 30 tablets",
token:"12",
verified:false,
verifiedAt:null
},
{
serial:"SN1013",
code:"MIKE639",
mfg:"03/2022 or after",
name:"NeuroCalm 25mg - 15 tablets",
token:"13",
verified:false,
verifiedAt:null
},
{
serial:"SN1014",
code:"NOVEMBER115",
mfg:"03/2022 or after",
name:"HeartSafe 75mg - 14 tablets",
token:"014",
verified:false,
verifiedAt:null
},
{
serial:"SN1015",
code:"OSCAR903",
mfg:"03/2022 or after",
name:"AllerFree 5mg - 10 tablets",
token:"15",
verified:false,
verifiedAt:null
},
{
serial:"SN1016",
code:"PAPA472",
mfg:"03/2022 or after",
name:"VitaD3 Max - 8 capsules",
token:"16",
verified:false,
verifiedAt:null
},
{
serial:"SN1017",
code:"QUEBEC388",
mfg:"03/2022 or after",
name:"LiverCare Forte - 60 tablets",
token:"17",
verified:false,
verifiedAt:null
},
{
serial:"SN1018",
code:"ROMEO726",
mfg:"03/2022 or after",
name:"RespiraAid Syrup - 100ml",
token:"18",
verified:false,
verifiedAt:null
},
{
serial:"SN1019",
code:"SIERRA550",
mfg:"03/2022 or after",
name:"PainBlock Gel - 30g",
token:"19",
verified:false,
verifiedAt:null
}
];

mongoose.connect("mongodb+srv://HACK:giDCgxy2d3HiO7IE@hackethic.ozjloba.mongodb.net/product_verification?retryWrites=true&w=majority&appName=HACKETHIC");

const db = mongoose.connection;

db.once("open", async () => {
  await db.collection("products").insertMany(products);
  console.log("Products inserted");
  process.exit();
});