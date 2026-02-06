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
    <div className="min-h-screen w-full bg-gray-50 font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Blue Gradient Border Container */}
        <div className="bg-gradient-to-br from-[#0087CC] to-[#0066AA] rounded-t-[2rem] rounded-b-[1rem] px-4 pb-2 shadow-2xl">
          <div className="">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0066AA] to-[#0066AA] text-white py-3 text-center -ml-4 w-112 -mt-4 rounded-t-[2rem]
">
              <h1 className="text-[19px] font-bold tracking-wider uppercase">PRODUCT AUTHENTICATION</h1>
            </div>
            <div className=' bg-white rounded-xl overflow-hidden'>
            {/* Logo and Brand Name */}
            <div className="flex flex-col items-center  rounded-2xl pt-4 pb-2 px-4">
              <img src={Logo} alt="Alpha Pharma Logo" className="w-50 h-50 object-contain -mt-10"/>
              <div className="text-center -mt-1">
                {/* <h2 className="text-[22px] font-bold tracking-tight">
                  <span className="text-gray-800">Alpha</span>
                  <span className="text-gray-800">·</span>
                  <span className="text-gray-800">Pharma</span>
                </h2> */}
                {/* <p className="text-[#7CB342] text-[15px] font-semibold -mt-1">healthcare</p> */}
              </div>
            </div>

            {/* Form Container */}
            <div className='bg-red'>
            <div className="px-6 pb-4 -mt-10">
              {status === 'idle' || status === 'loading' ? (
                <form onSubmit={handleVerify} className="space-y-3 border rounded-xl grid justify-center bg-gray-200">

                  {/* 1. MFG DATE DROPDOWN */}
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-[13px] ml-10 font-semibold text-gray-800 mb-1.5">Mfg. Date:</label>
                    <div
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-60 flex justify-center ml-10 border border-gray-400 cursor-pointer items-center bg-white hover:border-gray-600 transition-colors"
                    >
                      <span className="text-[20px] text-gray-800">
                        {mfgDate || "02 / 2022 or before"}
                      </span>
                      <svg className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {isOpen && (
                      <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg overflow-hidden">
                        {options.map((opt) => (
                          <div 
                            key={opt} 
                            onClick={() => { setMfgDate(opt); setIsOpen(false); }} 
                            className="px-3 py-2 text-[14px] text-gray-800 hover:bg-gray-100 cursor-pointer transition-colors"
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 2. SERIAL NUMBER */}
                  {isSerialAllowed && (
                    <div>
                      <label className="block text-[13px] ml-10 font-semibold text-gray-800 mb-1.5">Serial Number:</label>
                      <input
                        type="text"
                        placeholder=""
                        required
                        className="w-70 ml-10 px-2 py-1 border border-gray-400 bg-white focus:border-gray-600 focus:outline-none text-[14px] text-gray-800 transition-colors"
                        value={serial}
                        onChange={(e) => setSerial(e.target.value)}
                      />
                    </div>
                  )}

                  {/* 3. AUTHENTICATION CODE */}
                  <div>
                    <label className="block text-[13px] ml-10 font-semibold text-gray-800 mb-1.5">Authentication Code:</label>
                    <input
                      type="text" 
                      required 
                      placeholder="" 
                      disabled={status === 'loading'}
                      className="w-70 px-2 py-1 ml-10 border border-gray-400 bg-white focus:border-gray-600 focus:outline-none text-[14px] text-gray-800 transition-colors disabled:bg-gray-100"
                      value={code} 
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit" 
                      disabled={status === 'loading'}
                      className="px-5 py-2 bg-[#0087CC] hover:bg-[#0066AA] text-white font-bold text-[15px] rounded shadow-md transition-all active:scale-95 disabled:opacity-70 uppercase tracking-wide"
                    >
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        'SUBMIT'
                      )}
                    </button>
                  </div>

                  {/* NOTE */}
                  <div className="mt-1 text-[11px] px-4  text-gray-700 leading-tight">
                    <p><strong>Note:</strong></p>
                    <p className="mt-0.5">Each product can only be authenticated once. All fields are case sensitive.</p>
                  </div>

                  {/* WARNING */}
                  <div className="-mt-2 text-[11px] px-4 text-gray-700 leading-tight">
                    <p><strong>Warning:</strong></p>
                    <p className="mt-0.5 text-justify">
                      We strongly discourage anyone from purchasing our products as loose ampoules/trays or blisters/strips without cartons. 
                      All genuine Alpha-Pharma products are always supplied in a tamper proof carton with intact silver scratch field except for Oral Strips which has no authentication features.
                    </p>
                  </div>

                  {/* DOWNLOAD APP */}
                  <div className="-mt-2 mb-1 px-4 flex items-center gap-3 text-[11px]">
                    <strong className="text-gray-800">Download App:</strong>
                    <div className="flex gap-2">
                      <a
                        href="https://play.google.com/store/apps/details?id=prjct.liji.codeauth.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img src={Android} width={28} height={28} alt="Android App" />
                      </a>
                      <a
                        href="https://apps.apple.com/us/app/check-alpha/id1140042313"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img src={Apple} width={28} height={28} alt="Apple App" />
                      </a>
                      <a
                        href="https://play.google.com/store/apps/details?id=prjct.liji.codeauth.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        <img src={Blackberry} width={28} height={28} alt="BlackBerry App" />
                      </a>
                    </div>
                  </div>
                  
                </form>
              ) : null}

              {/* SUCCESS SCREEN */}
              {status === 'success' && (
                <div className="text-center py-6 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium">Your <span className="text-emerald-600 font-bold">{productName}</span></p>
                  <h2 className="text-xl font-bold text-gray-900 mt-2">Has been successfully authenticated.</h2>
                  <button 
                    onClick={reset} 
                    className="mt-6 px-6 py-2 bg-gray-100 rounded-lg text-gray-600 font-semibold hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    Verify Another
                  </button>
                </div>
              )}

              {/* DUPLICATE SCREEN */}
              {status === 'duplicate' && (
                <div className="text-center py-6 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="text-lg font-bold text-gray-900 leading-tight">Your product was Successfully Authenticated on:</h2>
                  <div className="mt-4 p-4 bg-rose-50 rounded-lg border border-rose-100 text-rose-600 font-bold text-sm">
                    {prevDetails?.fullDate}
                  </div>
                  <button 
                    onClick={reset} 
                    className="mt-6 w-full py-3 border-2 border-gray-200 rounded-lg font-semibold text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Go Back
                  </button>
                </div>
              )}

              {/* FAILED SCREEN */}
              {status === 'fail' && (
                <div className="text-center py-6 animate-in fade-in duration-500">
                  <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Invalid Credentials</h2>
                  <p className="text-gray-600 mt-2 px-6 text-sm">The details entered do not match any product in our authentication database.</p>
                  <button 
                    onClick={reset} 
                    className="mt-6 w-full py-3 bg-rose-600 text-white rounded-lg font-bold hover:bg-rose-700 transition-all"
                  >
                    Try Again
                  </button>
                </div>
              )}
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


