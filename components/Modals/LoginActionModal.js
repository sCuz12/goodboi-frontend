import Link from "next/link";
import React from "react";
import DogInCircle from "../CustomImages/DogInCircle";
import { CgClose } from "react-icons/cg";

function LoginActionModal({ onClose }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative w-3/4 my-6 lg:w-1/4 max-w-7xl">
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex flex-col items-center justify-center p-5 border-b border-solid rounded-t border-slate-200 bg-roz">
              <div className="flex items-end justify-end w-full">
                <button type="button" onClick={onClose}>
                  <CgClose size={20} />
                </button>
              </div>

              <DogInCircle />
            </div>
            {/*body*/}
            <div className="relative items-center justify-center flex-auto w-full p-6 text-center">
              <h1 className="text-3xl font-cherryBomb">
                Register, and be a hero{" "}
              </h1>
              <div className="pt-10">
                {/*footer*/}
                <div className="flex items-center justify-center p-6 space-x-4 rounded-b border-slate-200">
                  <Link href="/register">
                    <a
                      type="submit"
                      className="inline-block px-8 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full a lg:px-12 bg-basicPurple border-green"
                    >
                      Register
                    </a>
                  </Link>
                  <Link href="/login">
                    <a
                      type="submit"
                      className="inline-block px-8 py-2 mt-5 mb-2 font-semibold text-white border-2 rounded-full a lg:px-12 bg-lightPink border-green"
                    >
                      Login
                    </a>
                  </Link>
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

export default LoginActionModal;
