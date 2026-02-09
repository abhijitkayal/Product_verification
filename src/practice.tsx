    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          Product Authentication (QR Redirect System)
        </h1>

        {/* =================== STATUS UI =================== */}
        {status !== "idle" && (
          <div className="bg-white border rounded-2xl p-6 shadow mb-6 text-center">
            {status === "success" && (
              <>
                <h2 className="text-xl font-bold text-emerald-600">
                  ✅ Successfully Authenticated
                </h2>
                <p className="mt-2 text-gray-700">
                  Product: <b>{productName}</b>
                </p>
              </>
            )}

            {status === "duplicate" && (
              <>
                <h2 className="text-xl font-bold text-orange-600">
                  ⚠️ Already Authenticated
                </h2>
                <p className="mt-2 text-gray-700">
                  Product: <b>{productName}</b>
                </p>
                <p className="mt-3 bg-orange-50 border rounded-xl p-3 text-orange-700 font-bold">
                  Verified on: {prevDetails?.fullDate}
                </p>
              </>
            )}

            {status === "fail" && (
              <>
                <h2 className="text-xl font-bold text-rose-600">
                  ❌ Invalid Product
                </h2>
                <p className="mt-2 text-gray-700">
                  This QR code is not in our database.
                </p>
              </>
            )}

            <button
              onClick={reset}
              className="mt-6 px-6 py-2 rounded-xl bg-gray-900 text-white font-bold"
            >
              Back
            </button>
          </div>
        )}

        {/* =================== QR LIST =================== */}
        {/* <div className="bg-white border rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold mb-4 text-center">
            QR Codes For All Products
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PRODUCT_DATABASE.map((p) => (
              <div
                key={p.qrLink}
                className="border rounded-xl p-4 shadow-sm bg-gray-50"
              >
                <p className="font-bold text-sm">{p.name}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Code: {p.code} <br />
                  Serial: {p.serial} <br />
                  MFG: {p.mfg}
                </p>

                <div className="mt-4 flex justify-center">
                  <QRCodeCanvas value={p.qrLink} size={160} />
                </div>

                <p className="text-[10px] text-center mt-3 break-all text-gray-500">
                  {p.qrLink}
                </p>
              </div>
            ))}
          </div>
        </div> */}


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
        {/* Footer */}
        <p className="text-xs text-gray-500 text-center mt-6">
          Scan QR → it opens website → website verifies product.
        </p>
      </div>
    </div>
