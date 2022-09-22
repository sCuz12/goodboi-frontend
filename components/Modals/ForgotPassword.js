import React from "react";

function ForgotPassword({ onclose, onsubmit, resetemail, setresetemail }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative p-6 mx-auto my-6 w-4/4 lg:w-1/4 max-w-7xl">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-center p-5 border-b border-solid rounded-t border-slate-200">
              <h3 className="text-3xl font-semibold">Reset password</h3>
            </div>
            {/*body*/}
            <div className="relative items-center justify-center flex-auto w-full p-6 text-center">
              <div className="flex flex-col items-center">
                <p className="text-sm leading-relaxed text-slate-500">
                  Insert your email to reset your password
                </p>
                <div className="items-center p-2 mb-3 text-center border rounded-lg shadow-2xl bg-roz w-80 ">
                  <input
                    type="email"
                    name="email"
                    className="text-sm outline-none bg-roz"
                    placeholder="Enter your Email"
                    onChange={(e) => {
                      setresetemail(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="pt-10">
                {/*footer*/}
                <div className="flex items-center justify-center p-6 space-x-4 rounded-b border-slate-200">
                  <button
                    className="inline-block px-12 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full bg-red border-green"
                    type="button"
                    onClick={onclose}
                  >
                    Close
                  </button>
                  <button
                    disabled={!resetemail}
                    onClick={onsubmit}
                    className="inline-block px-12 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full disabled:opacity-50 bg-basicPurple border-green"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-70"></div>
    </>
  );
}

export default ForgotPassword;
