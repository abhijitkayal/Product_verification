


import React, { useState, useEffect, useRef } from 'react';
import Android from './assets/download.png';
import Apple from './assets/download (1).png'
import Logo from './assets/Alpha - Pharma Logo.png'
import Blackberry from './assets/download (2).png'
// --- PLACE TO IMPLEMENT CODES ---
const PRODUCT_DATABASE = [
  {
    serial: "SN1001",
    code: "ALPHA123",
    mfg: "02/2022 or before",
    name: "Astralean 40mcg - 50 tablets"
  },
  {
    serial: "SN1002",
    code: "BETA456",
    mfg: "03/2022 or after",
    name: "Alphabol 10mg - 50 tablets"
  },
];
// --------------------------------

const App = () => {
  const [serial, setSerial] = useState('');
  const [code, setCode] = useState('');
  const [mfgDate, setMfgDate] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, fail, duplicate
  const [prevDetails, setPrevDetails] = useState(null);
  const [productName, setProductName] = useState('');
  // const isSerialAllowed = mfgDate === "02/2022 or before";
  const isSerialAllowed = mfgDate !== "03/2022 or after";



  // Dropdown States
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const options = ["02/2022 or before", "03/2022 or after"];

  // Click outside listener
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleVerify = (e) => {
    e.preventDefault();
    setStatus('loading');

    setTimeout(() => {
      const cleanCode = code.trim().toUpperCase();
      const cleanSerial = serial.trim().toUpperCase();

      // const product = PRODUCT_DATABASE.find(p =>
      //   p.code.toUpperCase() === cleanCode &&
        // (isSerialAllowed ? p.serial.toUpperCase() === cleanSerial : true) &&
       const product = PRODUCT_DATABASE.find(p =>
  p.code.toUpperCase() === cleanCode &&
  p.mfg === mfgDate &&
  (
    isSerialAllowed
      ? p.serial.toUpperCase() === cleanSerial
      : true
  )
);

      // );

      if (!product) {
        setStatus('fail');
        return;
      }

      setProductName(product.name);
      const cachedData = localStorage.getItem(`auth_${cleanCode}`);

      if (cachedData) {
        setPrevDetails(JSON.parse(cachedData));
        setStatus('duplicate');
      } else {
        const now = new Date();
        const verificationInfo = {
          fullDate: now.toLocaleDateString('en-GB', {
            day: '2-digit', month: 'long', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
          }) + " IST",
        };
        localStorage.setItem(`auth_${cleanCode}`, JSON.stringify(verificationInfo));
        setStatus('success');
      }
    }, 1000);
  };
useEffect(() => {
  if (!isSerialAllowed) {
    setSerial('');
  }
}, [isSerialAllowed]);

  const reset = () => {
    setStatus('idle');
    setSerial('');
    setCode('');
    setMfgDate('');
  };

  return (
    <div className="min-h-screen w-full  font-sans text-slate-900">
      
      <div className="flex items-center justify-center px-4 py-6">
        <div className='rounded-xl p-0'>
          <div className="w-full max-w-lg bg-white rounded-xl shadow-2xl overflow-hidden  transition-all duration-500">

        {/* Product Verification Header */}
        <div className=" bg-cyan-700 text-white py-4 text-center rounded-t-[2.5rem]">
          <h1 className="text-2xl font-bold tracking-wide uppercase whitespace-nowrap px-4">PRODUCT AUTHENTICATION</h1>
        </div>
           <div className='bg-cyan-700 w-100 h-165'> 
          <div className='bg-white px-3 pb-3 h-160 w-92 ml-4 rounded-xl'>
              <div className=''>
        {/* Modern Brand Header */}
        <div className="flex justify-center  border-slate-800">
          {/* <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">Verify Product</h1> */}
          <img src={Logo} height={170} width={170} className='font-bold'/>
          {/* <p className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">Product Authenticity Check</p> */}
        </div>

        <div className="pt-0 pb-2 px-2 ">
          {status === 'idle' || status === 'loading' ? (
            <form onSubmit={handleVerify} className="space-y-1 border px-3 py-2  rounded-xl w-92 h-130 -ml-5 bg-gray-100">

              {/* 1. MFG DATE DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-[10px] font-black uppercase text-slate-900 mb-2 ml-8 tracking-widest">Mfg. Date</label>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className={`w-60 px-5 ml-8 py-1 rounded border-2 border-black cursor-pointer flex justify-between items-center transition-all duration-300 ${isOpen ? 'border-indigo-600 bg-white ring-4 ring-indigo-50' : 'border-black bg-white'}`}
                >
                  <span className={`font-bold ${mfgDate ? 'text-slate-900' : 'text-slate-700'}`}>
                    {mfgDate || "Select Period"}
                  </span>
                  <svg className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                {/* Slide down animation */}
                <div className={`absolute z-20 w-60 ml-8 mt-2 bg-white border-2 border-indigo-600 rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                  {options.map((opt) => (
                    <div key={opt} onClick={() => { setMfgDate(opt); setIsOpen(false); }} className="px-5 py-4 font-bold text-slate-700 bg-slate-300 hover:bg-indigo-600 hover:text-white cursor-pointer transition-colors border-b last:border-0 border-slate-50">
                      {opt}
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. SERIAL NUMBER */}
             {isSerialAllowed && (
  <div>
    <label className="block text-[10px] font-black uppercase text-slate-900 mb-1 ml-8 tracking-widest">
      Serial Number
    </label>
    <input
      type="text"
      placeholder=""
      required
      className="
        w-60 ml-8 px-5 py-1 rounded border-2
        border-black bg-white
        focus:border-indigo-600 focus:bg-white
        focus:ring-4 focus:ring-indigo-50
        outline-none font-bold text-lg transition-all
      "
      value={serial}
      onChange={(e) => setSerial(e.target.value)}
    />
  </div>
)}



              {/* 3. AUTHENTICATION CODE */}
              <div>
                <label className="block text-[10px] ml-8  font-black uppercase text-slate-900 mb-1 tracking-widest">Authentication Code</label>
                <input
                  type="text" required placeholder="" disabled={status === 'loading'}
                  className="w-60 ml-8 px-5 py-1 rounded border-2 border-black  outline-none bg-white font-bold text-lg transition-all"
                  value={code} onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <button
                type="submit" disabled={status === 'loading'}
                className="w-40  ml-18 -mt-5 bg-[#111827] hover:bg-indigo-600 text-white font-black py-1 rounded-2xl transition-all active:scale-[0.98] shadow-xl text-lg mt-4 uppercase tracking-tight flex items-center justify-center gap-3"
              >
                {status === 'loading' ? <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Submit'}
              </button>

              <strong>Note:</strong>
              <p className='text-sm'>Each product can only be authenticated once.All fields are case sensitive.</p>
              <strong>Warning:</strong>
              <p className='text-sm text-justify'>We strongly discourage anyone from purchasing our products are loose ampoules/trays or blisters/strips without cartons.All genuine alpha products are always aupplied in a tamper proof carton with intact silver scratch field except for Oral Strips which has no authentication features.</p>
              <div className='flex gap-3'>
                <strong>Download App:</strong>
                <div className="flex gap-4">
  <a
    href="https://play.google.com/store/apps/details?id=prjct.liji.codeauth.app"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={Android} width={30} height={30} alt="Android App" />
  </a>

  <a
    href="https://apps.apple.com/us/app/check-alpha/id1140042313"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={Apple} width={30} height={30} alt="Apple App" />
  </a>

  <a
    href="https://play.google.com/store/apps/details?id=prjct.liji.codeauth.app"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={Blackberry} width={30} height={30} alt="BlackBerry App" />
  </a>
</div>

              </div>
              
            </form>
          ) : null}



          {/* SUCCESS SCREEN */}
          {status === 'success' && (
            <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 rotate-3">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <p className="text-slate-500 font-medium tracking-tight">Your <span className="text-emerald-600 font-bold underline">{productName}</span></p>
              <h2 className="text-2xl font-black text-slate-900 mt-2">Has been successfully authenticated.</h2>
              <button onClick={reset} className="mt-10 px-8 py-3 bg-slate-100 rounded-xl text-slate-500 font-bold hover:bg-indigo-600 hover:text-white transition-all">Verify Another</button>
            </div>
          )}

          {/* DUPLICATE SCREEN */}
          {status === 'duplicate' && (
            <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-3xl flex items-center justify-center mx-auto mb-6 -rotate-3 border-2 border-rose-100">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">Your product was Successfully Authenticated on:</h2>
              <div className="mt-6 p-6 bg-rose-50 rounded-3xl border border-rose-100 text-rose-600 font-black text-lg">
                {prevDetails?.fullDate}
              </div>
              <button onClick={reset} className="mt-8 w-full py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Go Back</button>
            </div>
          )}

          {/* FAILED SCREEN */}
          {status === 'fail' && (
            <div className="text-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="w-20 h-20 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900">Invalid Credentials</h2>
              <p className="text-slate-500 mt-2 px-6">The details entered do not match any product in our authentication database.</p>
              <button onClick={reset} className="mt-10 w-full py-4 bg-rose-600 text-white rounded-2xl font-black hover:bg-rose-700 shadow-xl transition-all">Try Again</button>
            </div>
          )}
        </div>
      </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default App;