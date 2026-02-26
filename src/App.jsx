// import React, { useState, useEffect, useRef } from 'react';
// import Android from './assets/download.png';
// import Apple from './assets/download (1).png'
// import Logo from './assets/Alpha - Pharma Logo.png'
// import Blackberry from './assets/download (2).png'
// // --- PLACE TO IMPLEMENT CODES ---
// const PRODUCT_DATABASE = [

//   {
//     serial: "SN1001",
//     code: "ALPHA123",
//     mfg: "02/2022 or before",
//     name: "Astralean 40mcg - 50 tablets"
//   },
//   {
//     serial: "SN1002",
//     code: "BRAVO457",
//     mfg: "02/2022 or before",
//     name: "Cardioplus 10mg - 30 tablets"
//   },
//   {
//     serial: "SN1003",
//     code: "CHARLIE892",
//     mfg: "02/2022 or before",
//     name: "Neurovita B12 - 60 capsules"
//   },
//   {
//     serial: "SN1004",
//     code: "DELTA310",
//     mfg: "02/2022 or before",
//     name: "GastroCare 20mg - 15 tablets"
//   },
//   {
//     serial: "SN1005",
//     code: "ECHO765",
//     mfg: "02/2022 or before",
//     name: "ImmunoShield C - 100 tablets"
//   },
//   {
//     serial: "SN1006",
//     code: "FOXTROT221",
//     mfg: "02/2022 or before",
//     name: "PainRelief XR 500mg - 10 tablets"
//   },
//   {
//     serial: "SN1007",
//     code: "GOLF908",
//     mfg: "02/2022 or before",
//     name: "RespiraClear 5mg - 20 tablets"
//   },
//   {
//     serial: "SN1008",
//     code: "HOTEL634",
//     mfg: "02/2022 or before",
//     name: "Dermacalm Lotion - 100ml"
//   },
//   {
//     serial: "SN1009",
//     code: "INDIA519",
//     mfg: "02/2022 or before",
//     name: "OcuVision Plus - 30 softgels"
//   },
//   {
//     serial: "SN1010",
//     code: "JULIET842",
//     mfg: "02/2022 or before",
//     name: "VitaBoost Zinc - 90 tablets"
//   },

//   {
//     serial: "SN1011",
//     code: "BETA456",
//     mfg: "03/2022 or after",
//     name: "Alphabol 10mg - 50 tablets"
//   },
 
//   {
//     serial: "SN1012",
//     code: "LIMA204",
//     mfg: "03/2022 or after",
//     name: "GlucoGuard 500mg - 30 tablets"
//   },
//   {
//     serial: "SN1013",
//     code: "MIKE639",
//     mfg: "03/2022 or after",
//     name: "NeuroCalm 25mg - 15 tablets"
//   },
//   {
//     serial: "SN1014",
//     code: "NOVEMBER115",
//     mfg: "03/2022 or after",
//     name: "HeartSafe 75mg - 14 tablets"
//   },
//   {
//     serial: "SN1015",
//     code: "OSCAR903",
//     mfg: "03/2022 or after",
//     name: "AllerFree 5mg - 10 tablets"
//   },
//   {
//     serial: "SN1016",
//     code: "PAPA472",
//     mfg: "03/2022 or after",
//     name: "VitaD3 Max - 8 capsules"
//   },
//   {
//     serial: "SN1017",
//     code: "QUEBEC388",
//     mfg: "03/2022 or after",
//     name: "LiverCare Forte - 60 tablets"
//   },
//   {
//     serial: "SN1018",
//     code: "ROMEO726",
//     mfg: "03/2022 or after",
//     name: "RespiraAid Syrup - 100ml"
//   },
//   {
//     serial: "SN1019",
//     code: "SIERRA550",
//     mfg: "03/2022 or after",
//     name: "PainBlock Gel - 30g"
//   }

// ];
// // --------------------------------

// const App = () => {
//   const [serial, setSerial] = useState('');
//   const [code, setCode] = useState('');
//   const [mfgDate, setMfgDate] = useState('02/2022 or before');
//   const [status, setStatus] = useState('idle'); // idle, loading, success, fail, duplicate
//   const [prevDetails, setPrevDetails] = useState(null);
//   const [productName, setProductName] = useState('');
//   // const isSerialAllowed = mfgDate === "02/2022 or before";
//   const isSerialAllowed = mfgDate !== "03/2022 or after";



//   // Dropdown States
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const options = ["02/2022 or before", "03/2022 or after"];

//   // Click outside listener
//   useEffect(() => {
//     const handleClick = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
//     };
//     document.addEventListener("mousedown", handleClick);
//     return () => document.removeEventListener("mousedown", handleClick);
//   }, []);

//   const handleVerify = (e) => {
//     e.preventDefault();
//     setStatus('loading');

//     setTimeout(() => {
//       const cleanCode = code.trim().toUpperCase();
//       const cleanSerial = serial.trim().toUpperCase();

//       // const product = PRODUCT_DATABASE.find(p =>
//       //   p.code.toUpperCase() === cleanCode &&
//         // (isSerialAllowed ? p.serial.toUpperCase() === cleanSerial : true) &&
//        const product = PRODUCT_DATABASE.find(p =>
//   p.code.toUpperCase() === cleanCode &&
//   p.mfg === mfgDate &&
//   (
//     isSerialAllowed
//       ? p.serial.toUpperCase() === cleanSerial
//       : true
//   )
// );

//       // );

//       if (!product) {
//         setStatus('fail');
//         return;
//       }

//       setProductName(product.name);
//       const cachedData = localStorage.getItem(`auth_${cleanCode}`);

//       if (cachedData) {
//         setPrevDetails(JSON.parse(cachedData));
//         setStatus('duplicate');
//       } else {
//         const now = new Date();
//         const verificationInfo = {
//           fullDate: now.toLocaleDateString('en-GB', {
//             day: '2-digit', month: 'long', year: 'numeric',
//             hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
//           }) + " IST",
//         };
//         localStorage.setItem(`auth_${cleanCode}`, JSON.stringify(verificationInfo));
//         setStatus('success');
//       }
//     }, 1000);
//   };
// useEffect(() => {
//   if (!isSerialAllowed) {
//     setSerial('');
//   }
// }, [isSerialAllowed]);

//   const reset = () => {
//     setStatus('idle');
//     setSerial('');
//     setCode('');
//     setMfgDate('');
//   };

//   return (
//     <div className="min-h-screen w-full bg-gray-50 font-sans flex items-center justify-center p-4">
//       <div className="w-full max-w-md">
//         {/* Blue Gradient Border Container */}
//         <div className="bg-gradient-to-br from-[#0087CC] to-[#0066AA] rounded-t-[2rem] rounded-b-[1rem] px-4 pb-2 shadow-2xl">
//           <div className="">
            
//             {/* Header */}
//             <div className="bg-gradient-to-r from-[#0066AA] to-[#0066AA] text-white py-3 text-center -ml-4 w-112 -mt-4 rounded-t-[2rem]
// ">
//               <h1 className="text-[19px] font-bold tracking-wider uppercase">PRODUCT AUTHENTICATION</h1>
//             </div>
//             <div className=' bg-white rounded-xl overflow-hidden'>
//             {/* Logo and Brand Name */}
//             <div className="flex flex-col items-center  rounded-2xl pt-4 pb-2 px-4">
//               <img src={Logo} alt="Alpha Pharma Logo" className="w-50 h-50 object-contain -mt-10"/>
//               <div className="text-center -mt-1">
//                 {/* <h2 className="text-[22px] font-bold tracking-tight">
//                   <span className="text-gray-800">Alpha</span>
//                   <span className="text-gray-800">·</span>
//                   <span className="text-gray-800">Pharma</span>
//                 </h2> */}
//                 {/* <p className="text-[#7CB342] text-[15px] font-semibold -mt-1">healthcare</p> */}
//               </div>
//             </div>

//             {/* Form Container */}
//             <div className='bg-red'>
//             <div className="px-6 pb-4 -mt-10">
//               {status === 'idle' || status === 'loading' ? (
//                 <form onSubmit={handleVerify} className="space-y-3 border rounded-xl grid justify-center bg-gray-200">

//                   {/* 1. MFG DATE DROPDOWN */}
//                   <div className="relative" ref={dropdownRef}>
//                     <label className="block text-[13px] ml-10 font-semibold text-gray-800 mb-1.5">Mfg. Date:</label>
//                     <div
//                       onClick={() => setIsOpen(!isOpen)}
//                       className="w-60 flex justify-center ml-10 border border-gray-400 cursor-pointer items-center bg-white hover:border-gray-600 transition-colors"
//                     >
//                       <span className="text-[20px] text-gray-800">
//                         {mfgDate || "02 / 2022 or before"}
//                       </span>
//                       <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//                       </svg>
//                     </div>
//                     {isOpen && (
//                       <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg overflow-hidden">
//                         {options.map((opt) => (
//                           <div 
//                             key={opt} 
//                             onClick={() => { setMfgDate(opt); setIsOpen(false); }} 
//                             className="px-3 py-2 text-[14px] text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
//                           >
//                             {opt}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* 2. SERIAL NUMBER */}
//                   {isSerialAllowed && (
//                     <div>
//                       <label className="block text-[13px] ml-10 font-semibold text-gray-800 mb-1.5">Serial Number:</label>
//                       <input
//                         type="text"
//                         placeholder=""
//                         required
//                         className="w-70 ml-10 px-2 py-1 border border-gray-400 bg-white focus:border-gray-600 focus:outline-none text-[14px] text-gray-800 transition-colors"
//                         value={serial}
//                         onChange={(e) => setSerial(e.target.value)}
//                       />
//                     </div>
//                   )}

//                   {/* 3. AUTHENTICATION CODE */}
//                   <div>
//                     <label className="block text-[13px] ml-10 font-semibold text-gray-800 mb-1.5">Authentication Code:</label>
//                     <input
//                       type="text" 
//                       required 
//                       placeholder="" 
//                       disabled={status === 'loading'}
//                       className="w-70 px-2 py-1 ml-10 border border-gray-400 bg-white focus:border-gray-600 focus:outline-none text-[14px] text-gray-800 transition-colors disabled:bg-gray-100"
//                       value={code} 
//                       onChange={(e) => setCode(e.target.value)}
//                     />
//                   </div>

//                   {/* SUBMIT BUTTON */}
//                   <div className="flex justify-center pt-2">
//                     <button
//                       type="submit" 
//                       disabled={status === 'loading'}
//                       className="px-5 py-2 bg-[#0087CC] hover:bg-[#0066AA] text-white font-bold text-[15px] rounded shadow-md transition-all active:scale-95 disabled:opacity-70 uppercase tracking-wide"
//                     >
//                       {status === 'loading' ? (
//                         <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       ) : (
//                         'SUBMIT'
//                       )}
//                     </button>
//                   </div>

//                   {/* NOTE */}
                  // <div className="mt-1 text-[11px] px-4  text-gray-700 leading-tight">
                  //   <p><strong>Note:</strong></p>
                  //   <p className="mt-0.5">Each product can only be authenticated once. All fields are case sensitive.</p>
                  // </div>

                  // {/* WARNING */}
                  // <div className="-mt-2 text-[11px] px-4 text-gray-700 leading-tight">
                  //   <p><strong>Warning:</strong></p>
                  //   <p className="mt-0.5 text-justify">
                  //     We strongly discourage anyone from purchasing our products as loose ampoules/trays or blisters/strips without cartons. 
                  //     All genuine Alpha-Pharma products are always supplied in a tamper proof carton with intact silver scratch field except for Oral Strips which has no authentication features.
                  //   </p>
                  // </div>

                  // {/* DOWNLOAD APP */}
                  // <div className="-mt-2 mb-1 px-4 flex items-center gap-3 text-[11px]">
                  //   <strong className="text-gray-800">Download App:</strong>
                  //   <div className="flex gap-2">
                  //     <a
                  //       href="https://play.google.com/store/apps/details?id=prjct.liji.codeauth.app"
                  //       target="_blank"
                  //       rel="noopener noreferrer"
                  //       className="hover:opacity-80 transition-opacity"
                  //     >
                  //       <img src={Android} width={28} height={28} alt="Android App" />
                  //     </a>
                  //     <a
                  //       href="https://apps.apple.com/us/app/check-alpha/id1140042313"
                  //       target="_blank"
                  //       rel="noopener noreferrer"
                  //       className="hover:opacity-80 transition-opacity"
                  //     >
                  //       <img src={Apple} width={28} height={28} alt="Apple App" />
                  //     </a>
                  //     <a
                  //       href="https://play.google.com/store/apps/details?id=prjct.liji.codeauth.app"
                  //       target="_blank"
                  //       rel="noopener noreferrer"
                  //       className="hover:opacity-80 transition-opacity"
                  //     >
                  //       <img src={Blackberry} width={28} height={28} alt="BlackBerry App" />
                  //     </a>
                  //   </div>
                  // </div>
                  
//                 </form>
//               ) : null}

//               {/* SUCCESS SCREEN */}
//               {status === 'success' && (
//                 <div className="text-center py-6 animate-in fade-in duration-500">
//                   <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
//                       <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </div>
//                   <p className="text-gray-600 font-medium">Your <span className="text-emerald-600 font-bold">{productName}</span></p>
//                   <h2 className="text-xl font-bold text-gray-900 mt-2">Has been successfully authenticated.</h2>
//                   <button 
//                     onClick={reset} 
//                     className="mt-6 px-6 py-2 bg-gray-100 rounded-lg text-gray-600 font-semibold hover:bg-emerald-600 hover:text-white transition-all"
//                   >
//                     Verify Another
//                   </button>
//                 </div>
//               )}

//               {/* DUPLICATE SCREEN */}
//               {status === 'duplicate' && (
//                 <div className="text-center py-6 animate-in fade-in duration-500">
//                   <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
//                       <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </div>
//                   <h2 className="text-lg font-bold text-gray-900 leading-tight">Your product was Successfully Authenticated on:</h2>
//                   <div className="mt-4 p-4 bg-rose-50 rounded-lg border border-rose-100 text-rose-600 font-bold text-sm">
//                     {prevDetails?.fullDate}
//                   </div>
//                   <button 
//                     onClick={reset} 
//                     className="mt-6 w-full py-3 border-2 border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-all"
//                   >
//                     Go Back
//                   </button>
//                 </div>
//               )}

//               {/* FAILED SCREEN */}
//               {status === 'fail' && (
//                 <div className="text-center py-6 animate-in fade-in duration-500">
//                   <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
//                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
//                       <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </div>
//                   <h2 className="text-xl font-bold text-gray-900">Invalid Credentials</h2>
//                   <p className="text-gray-600 mt-2 px-6 text-sm">The details entered do not match any product in our authentication database.</p>
//                   <button 
//                     onClick={reset} 
//                     className="mt-6 w-full py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
//                   >
//                     Try Again
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useEffect, useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

import Android from "./assets/download-removebg-preview (1).png";
import Apple from "./assets/download__1_-removebg-preview (1).png";
import Logo from "./assets/Alpha - Pharma Logo (1).png";
import Blackberry from "./assets/download__2_-removebg-preview (1).png";

/* ===================== DATABASE ===================== */
const WEBSITE_URL = "https://product-verification-dqhw.vercel.app/"; // when deployed use: https://yourdomain.com

const RAW_PRODUCTS = [
  {
    serial: "SN1001",
    code: "ALPHA123",
    mfg: "02/2022 or before",
    name: "Astralean 40mcg - 50 tablets",
    token: "01",
  },
  {
    serial: "SN1002",
    code: "BRAVO457",
    mfg: "02/2022 or before",
    name: "Cardioplus 10mg - 30 tablets",
    token: "02",
  },
  {
    serial: "SN1003",
    code: "CHARLIE892",
    mfg: "02/2022 or before",
    name: "Neurovita B12 - 60 capsules",
    token: "03",
  },
  {
    serial: "SN1004",
    code: "DELTA310",
    mfg: "02/2022 or before",
    name: "GastroCare 20mg - 15 tablets",
    token: "04",
  },
  {
    serial: "SN1005",
    code: "ECHO765",
    mfg: "02/2022 or before",
    name: "ImmunoShield C - 100 tablets",
    token: "05",
  },
  {
    serial: "SN1006",
    code: "FOXTROT221",
    mfg: "02/2022 or before",
    name: "PainRelief XR 500mg - 10 tablets",
    token: "06",
  },
  {
    serial: "SN1007",
    code: "GOLF908",
    mfg: "02/2022 or before",
    name: "RespiraClear 5mg - 20 tablets",
    token: "07",
  },
  {
    serial: "SN1008",
    code: "HOTEL634",
    mfg: "02/2022 or before",
    name: "Dermacalm Lotion - 100ml",
    token: "08",
  },
  {
    serial: "SN1009",
    code: "INDIA519",
    mfg: "02/2022 or before",
    name: "OcuVision Plus - 30 softgels",
    token: "09",
  },
  {
    serial: "SN1010",
    code: "JULIET842",
    mfg: "02/2022 or before",
    name: "VitaBoost Zinc - 90 tablets",
    token: "10",
  },

  // 03/2022 or after
  {
    serial: "SN1011",
    code: "BETA456",
    mfg: "03/2022 or after",
    name: "Alphabol 10mg - 50 tablets",
    token: "11",
  },
  {
    serial: "SN1012",
    code: "LIMA204",
    mfg: "03/2022 or after",
    name: "GlucoGuard 500mg - 30 tablets",
    token: "12",
  },
  {
    serial: "SN1013",
    code: "MIKE639",
    mfg: "03/2022 or after",
    name: "NeuroCalm 25mg - 15 tablets",
    token: "13",
  },
  {
    serial: "SN1014",
    code: "NOVEMBER115",
    mfg: "03/2022 or after",
    name: "HeartSafe 75mg - 14 tablets",
    token: "014",
  },
  {
    serial: "SN1015",
    code: "OSCAR903",
    mfg: "03/2022 or after",
    name: "AllerFree 5mg - 10 tablets",
    token: "15",
  },
  {
    serial: "SN1016",
    code: "PAPA472",
    mfg: "03/2022 or after",
    name: "VitaD3 Max - 8 capsules",
    token: "16",
  },
  {
    serial: "SN1017",
    code: "QUEBEC388",
    mfg: "03/2022 or after",
    name: "LiverCare Forte - 60 tablets",
    token: "17",
  },
  {
    serial: "SN1018",
    code: "ROMEO726",
    mfg: "03/2022 or after",
    name: "RespiraAid Syrup - 100ml",
    token: "18",
  },
  {
    serial: "SN1019",
    code: "SIERRA550",
    mfg: "03/2022 or after",
    name: "PainBlock Gel - 30g",
    token: "19",
  },
];

// add qrLink
const PRODUCT_DATABASE = RAW_PRODUCTS.map((p) => ({
  ...p,
  qrLink: `${WEBSITE_URL}/?token=${encodeURIComponent(
    p.token
  )}`,
}));


/* ===================================================== */

export default function App() {
  /* ===================== COMMON STATES ===================== */
  const [status, setStatus] = useState("idle"); // idle, loading, success, duplicate, fail
  const [productName, setProductName] = useState("");
  const [prevDetails, setPrevDetails] = useState(null);

  // StrictMode fix (prevent double useEffect verify)
  const hasVerifiedFromQR = useRef(false);

  /* ===================== FORM STATES ===================== */
  const [serial, setSerial] = useState("");
  const [code, setCode] = useState("");
  const [mfgDate, setMfgDate] = useState("02/2022 or before");

  const isSerialAllowed = mfgDate !== "03/2022 or after";

  /* ===================== DROPDOWN STATES ===================== */
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = ["02/2022 or before", "03/2022 or after"];

  // Click outside listener
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // if serial not required -> clear serial field
  useEffect(() => {
    if (!isSerialAllowed) setSerial("");
  }, [isSerialAllowed]);

  /* ===================== READ URL PARAMS ===================== */
  // const queryData = useMemo(() => {
  //   const params = new URLSearchParams(window.location.search);

  //   const codeParam = params.get("code");
  //   const serialParam = params.get("serial");
  //   const mfgParam = params.get("mfg");

  //   return {
  //     code: codeParam ? codeParam.trim().toUpperCase() : "",
  //     serial: serialParam ? serialParam.trim().toUpperCase() : "",
  //     mfg: mfgParam ? mfgParam.trim() : "",
  //   };
  // }, []);

  const queryData = useMemo(() => {
  const params = new URLSearchParams(window.location.search);

  const tokenParam = params.get("token");

  return {
    token: tokenParam ? tokenParam.trim() : "",
  };
}, []);

  /* ============================================================
      🔥 ONE KEY FUNCTION (SAME FOR QR + MANUAL)
  ============================================================ */
  const makeAuthKey = (product) => {
    const cleanCode = product.code.trim().toUpperCase();
    const cleanMfg = product.mfg.trim();

    // For 03/2022 or after -> serial not required
    if (cleanMfg === "03/2022 or after") {
      return `auth_${cleanCode}_${cleanMfg}`;
    }

    const cleanSerial = product.serial.trim().toUpperCase();
    return `auth_${cleanCode}_${cleanSerial}_${cleanMfg}`;
  };

  /* ============================================================
      🔥 ONE VERIFY FUNCTION (SAVES ONLY ONCE)
  ============================================================ */
  const verifyProduct = (product) => {
    setProductName(product.name);

    const key = makeAuthKey(product);
    const cachedData = localStorage.getItem(key);

    if (cachedData) {
      setPrevDetails(JSON.parse(cachedData));
      setStatus("duplicate");
      return;
    }

    const now = new Date();
    const verificationInfo = {
      fullDate:
        now.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }) + " IST",
    };

    localStorage.setItem(key, JSON.stringify(verificationInfo));
    setStatus("success");
  };

  /* ===================== MANUAL VERIFY ===================== */
  const handleVerify = (e) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      const cleanCode = code.trim().toUpperCase();
      const cleanSerial = serial.trim().toUpperCase();

      const product = PRODUCT_DATABASE.find((p) => {
        const serialRequired = p.mfg !== "03/2022 or after";

        return (
          p.code.toUpperCase() === cleanCode &&
          p.mfg === mfgDate &&
          (serialRequired ? p.serial.toUpperCase() === cleanSerial : true)
        );
      });

      if (!product) {
        setStatus("fail");
        return;
      }

      // ✅ use ONE verify function
      verifyProduct(product);
    }, 900);
  };

  /* ===================== AUTO VERIFY FROM QR LINK ===================== */
  // useEffect(() => {
  //   // STOP running twice in dev
  //   if (hasVerifiedFromQR.current) return;

  //   // if no params -> do nothing
  //   if (!queryData.code || !queryData.mfg) {
  //     setStatus("idle");
  //     return;
  //   }

  //   hasVerifiedFromQR.current = true;

  //   const product = PRODUCT_DATABASE.find((p) => {
  //     const serialRequired = p.mfg !== "03/2022 or after";

  //     return (
  //       p.code.toUpperCase() === queryData.code &&
  //       p.mfg === queryData.mfg &&
  //       (serialRequired ? p.serial.toUpperCase() === queryData.serial : true)
  //     );
  //   });

  //   if (!product) {
  //     setStatus("fail");
  //     return;
  //   }

  //   // ✅ use ONE verify function
  //   verifyProduct(product);
  // }, [queryData]);


 useEffect(() => {
  if (hasVerifiedFromQR.current) return;

  if (!queryData.token) {
    setStatus("idle");
    return;
  }

  hasVerifiedFromQR.current = true;

  const product = PRODUCT_DATABASE.find((p) => p.token === queryData.token);

  if (!product) {
    setStatus("fail");
    return;
  }

  verifyProduct(product);
}, [queryData]);



  /* ===================== RESET (QR MODE) ===================== */
  const resetQR = () => {
    setStatus("idle");
    setProductName("");
    setPrevDetails(null);

    // allow scanning again
    hasVerifiedFromQR.current = false;

    // remove query params
    window.history.replaceState({}, document.title, "/");
  };

  /* ===================== RESET (FORM MODE) ===================== */
  const resetForm = () => {
    setStatus("idle");
    setProductName("");
    setPrevDetails(null);

    setSerial("");
    setCode("");
    setMfgDate("02/2022 or before");
  };

  const isQRMode = !!queryData.token;

  /* ===================== UI ===================== */
  return (
    <div className="min-h-screen md:-mt-2 w-full font-sans flex items-center justify-center px-4 py-6 md:p-0">
      <div className="w-full max-w-[280px] md:w-80 rounded-2xl md:max-w-md shadow-[0px_6px_12px_rgba(0,0,0,0.58)]">
        <div className="bg-gradient-to-br w-full md:w-80 from-[#0087CC] to-[#0066AA] rounded-t-[1.5rem] md:rounded-t-[2rem] rounded-b-[1rem] px-2 md:px-4 pb-2 shadow-2xl">
          {/* Header */}
          <div className="bg-[#0066AA] md:bg-gradient-to-r md:w-80 w-70 md:from-[#0066AA] md:to-[#0066AA] text-white py-2 md:py-3 text-center -ml-2 md:-ml-4 -mt-2 md:-mt-4 rounded-t-[1.5rem] md:rounded-t-[2rem]">
            <h1 className="text-[12px] md:text-[17px] font-semibold tracking-wider uppercase px-2">
              PRODUCT AUTHENTICATION
            </h1>
          </div>

          <div className="bg-white rounded-xl overflow-hidden">
            {/* Logo */}
            <div className="flex md:-mt-6 flex-col items-center rounded-2xl pt-3 md:pt-4 pb-2 md:pb-2 px-2 md:px-4">
              <img
                src={Logo}
                alt="Alpha Pharma Logo"
                className="w-28 h-28 md:w-50 md:h-50 object-contain -mt-6 md:-mt-10"
              />
            </div>

            {/* FORM */}
            <div className="px-3 md:px-6 pb-4 md:pb-4 -mt-6 md:-mt-12">
              {(status === "idle" || status === "loading") && (
                <form
                  onSubmit={handleVerify}
                  className="border w-full md:w-65 md:-ml-2.5 0 rounded-lg md:rounded-xl p-3 md:p-0 md:grid md:justify-center bg-gray-200"
                >
                  {/* MFG DATE */}
                  <div className="relative mb-2 md:mb-0" ref={dropdownRef}>
                    <label className="block text-[9px] md:text-[13px] md:ml-10 font-semibold text-gray-800 mb-1">
                      Mfg. Date:
                    </label>

                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full md:w-35 md:ml-10 flex justify-between px-2 md:px-0 py-2 md:py-1 md:justify-center md:ml-10 border border-gray-400 cursor-pointer items-center bg-white hover:border-gray-600 transition-colors rounded md:rounded-none"
                    >
                      <span className="text-[10px] md:text-[12px] text-gray-800">
                        {mfgDate || "02/2022 or before"}
                      </span>
                      <svg
                        className={`w-3 h-3 md:w-4 md:h-4 text-gray-600 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>

                    {isOpen && (
                      <div className="absolute z-20 w-full md:w-35 md:ml-10 mt-1 bg-white border border-gray-300 rounded shadow-lg overflow-hidden">
                        {options.map((opt) => (
                          <div
                            key={opt}
                            onClick={() => {
                              setMfgDate(opt);
                              setIsOpen(false);
                            }}
                            className="px-2 md:px-3 py-2 md:py-2 text-[10px] md:text-[14px] text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* SERIAL */}
                  {isSerialAllowed && (
                    <div className="mb-2 md:mb-0">
                      <label className="block text-[9px] md:text-[13px] md:ml-10 font-semibold text-gray-800 mb-1">
                        Serial Number:
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full md:w-45 md:ml-10 px-2 md:px-2 py-2 md:py-1 border border-gray-400 bg-white focus:border-gray-600 focus:outline-none text-[10px] md:text-[14px] text-gray-800 transition-colors rounded md:rounded-none"
                        value={serial}
                        onChange={(e) => setSerial(e.target.value)}
                      />
                    </div>
                  )}

                  {/* CODE */}
                  <div className="mb-2.5 md:mb-0">
                    <label className="block text-[9px] md:text-[13px] md:ml-10 font-semibold text-gray-800 mb-1">
                      Authentication Code:
                    </label>
                    <input
                      type="text"
                      required
                      disabled={status === "loading"}
                      className="w-full md:w-45 md:ml-10 px-2 md:px-2 py-2 md:py-1 border border-gray-400 bg-white focus:border-gray-600 focus:outline-none text-[10px] md:text-[14px] text-gray-800 transition-colors disabled:bg-gray-100 rounded md:rounded-none"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>

                  {/* SUBMIT */}
                  <div className="flex justify-center mb-2 md:mb-0 md:mt-1">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full md:w-auto px-5 md:px-3 py-2 md:py-1 font-semibold bg-[#0087CC] hover:bg-[#0066AA] text-white text-[11px] md:text-[15px] rounded shadow-md transition-all active:scale-95 disabled:opacity-70 uppercase tracking-wide"
                    >
                      {status === "loading" ? (
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div>
                      ) : (
                        "SUBMIT"
                      )}
                    </button>
                  </div>

                  {/* NOTE */}
                  <div className="text-[8px] md:text-[11px] px-0 md:px-4 text-gray-700 leading-tight">
                    <p><strong>Note:</strong></p>
                    <p className="mt-0.5">Each product can only be authenticated once. All fields are case sensitive.</p>
                  </div>

                  {/* WARNING */}
                  <div className="text-[8px] md:text-[11px] w-full md:w-63 px-0 md:px-4 text-gray-700 leading-tight">
                    <p><strong>Warning:</strong></p>
                    <p className="mt-0.5 text-justify">
                      We strongly discourage anyone from purchasing our products as loose ampoules/trays or blisters/strips without cartons. 
                      All genuine Alpha-Pharma products are always supplied in a tamper proof carton with intact silver scratch field except for Oral Strips which has no authentication features.
                    </p>
                  </div>

                  {/* DOWNLOAD APP */}
                  <div className="mb-0.5 md:mb-1 px-0 md:px-4 flex flex-row items-center gap-2 md:gap-3 text-[8px] md:text-[11px]">
                    <strong className="text-gray-800">Download App:</strong>
                    <div className="flex gap-2 md:gap-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=prjct.liji.codeauth.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img src={Android} width={28} height={28} alt="Android App" className="w-6 h-6 md:w-7 md:h-7" />
                      </a>
                      <a
                        href="https://apps.apple.com/us/app/check-alpha/id1140042313"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img src={Apple} width={28} height={28} alt="Apple App" className="w-6 h-6 md:w-7 md:h-7" />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=prjct.liji.codeauth.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img src={Blackberry} width={28} height={28} alt="BlackBerry App" className="w-6 h-6 md:w-7 md:h-7" />
                      </a>
                    </div>
                  </div>
                </form>
              )}

              {/* SUCCESS */}
              {status === "success" && (
                <div className="text-center min-h-[300px] py-4 md:py-6 px-3 md:px-4 border animate-in fade-in rounded-xl bg-gray-200 duration-500">
                  <p className="text-[10px] font-['Times_New_Roman'] md:text-base text-left text-gray-600 font-medium leading-snug">
                    Your <span className="text-emerald-600  font-bold">{productName}</span>  has been successfully authenticated.
                  </p>
                </div>
              )}

              {/* DUPLICATE */}
              {status === "duplicate" && (
                <div className="text-center min-h-[300px] py-4  md:py-6 px-3 md:px-4 border animate-in fade-in bg-gray-200 rounded-xl duration-500">
                  <p className="text-[10px] md:text-sm font-medium font-['Times_New_Roman'] text-red-500 text-left leading-snug">
                    Your product was Successfully Authenticated on {prevDetails?.fullDate}.
                  </p>
                </div>
              )}

              {/* FAIL */}
              {status === "fail" && (
                <div className="text-center py-4 min-h-[300px] border border-xl md:py-6 px-1 md:px-4 animate-in fade-in rounded-xl bg-gray-200 duration-500">
                  <h2 className="text-[11px] md:text-xl font-bold font-['Times_New_Roman'] text-red-500">
                    WARNING!
                  </h2>
                  <div className="space-y-4">
                  <p className="text-gray-600 text-left font-semibold font-['Times_New_Roman'] text-red-500 mt-2 md:mt-2 px-0 md:px-1 text-[9px] md:text-[15px] leading-snug">
                  Your Product could not be Authenticated!
                  </p>
                  <p className="text-gray-600 text-left font-semibold font-['Times_New_Roman'] text-red-500 mt-2 md:mt-2 px-0 md:px-1 text-[9px] md:text-[15px] leading-snug">
                  Do not Purchase this Product or return it to the Pharmacy!
                  </p>
                  <p className="text-gray-600 text-left font-semibold font-['Times_New_Roman'] text-red-500 mt-2 md:mt-2 px-0 md:px-1 text-[9px] md:text-[15px] leading-snug">
                  Counterfeited medicines are potentially lethal!
                  </p>
                  </div>

                  {/* <button
                    onClick={isQRMode ? resetQR : resetForm}
                    className="mt-4 md:mt-6 w-full py-2 md:py-3 bg-rose-600 text-white rounded-lg text-[10px] md:text-base font-bold hover:bg-rose-700 transition-all"
                  >
                    Try Again
                  </button> */}
                </div>
              )}
            </div>

            {/* ================= OPTIONAL QR LIST FOR TEST ================= */}
            {/* <div className="px-3 sm:px-6 pb-4 sm:pb-6">
              <details className="bg-gray-50 border rounded-xl p-3 sm:p-4">
                <summary className="cursor-pointer font-bold text-xs sm:text-sm">
                  Show QR Codes For All Products (Testing)
                </summary>

                <div className="grid grid-cols-1 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  {PRODUCT_DATABASE.map((p) => (
                    <div key={p.qrLink} className="border rounded-xl p-3 bg-white">
                      <div className="text-xs sm:text-sm font-bold">{p.name}</div>
                      <div className="text-[10px] sm:text-xs text-gray-600 mt-1">
                        Code: {p.code} <br />
                        Serial: {p.serial} <br />
                        MFG: {p.mfg}
                      </div>

                      <div className="mt-3 flex justify-center">
                        <QRCodeCanvas value={p.qrLink} size={120} className="w-28 h-28 sm:w-40 sm:h-40" />
                      </div>

                      {/* <div className="text-[9px] sm:text-[10px] text-gray-500 break-all mt-2 text-center px-1">
                        {p.qrLink}
                      </div> */}
                    {/* </div>
                  ))}
                </div>
              </details>
            </div>  */}
          </div>
        </div>
      </div>
    </div>
  );
}
