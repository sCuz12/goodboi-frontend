import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { BsTelephone } from "react-icons/bs";
import { FaPaw } from "react-icons/fa";
import SolidPaw from "../Icons/SolidPaw";
import Heart from "../Icons/Heart";

function Telephone({ phone, email, onclose, address }) {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
        <div className="relative mx-auto my-6 sm:w-full lg:w-1/4 max-w-7xl">
          {/*content*/}
          <div className="relative flex flex-col w-full bg-white border-0 rounded-lg shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-center p-5 border-b border-solid rounded-t border-slate-200 bg-roz">
              <h3 className="text-3xl font-semibold">Contact</h3>

              <Heart />
            </div>
            {/*body*/}
            <div className="relative flex-auto p-6">
              <p className="my-4 text-lg leading-relaxed text-slate-500">
                {/* Information of shelter*/}
                <div className="flex-col pt-4 space-y-4 lg:w-5/5 ">
                  <div className="flex w-full description_text">
                    <div className="flex w-1/5">
                      <AiOutlineMail size={30} />
                    </div>
                    <div className="w-4/5">{email}</div>
                  </div>
                  {address && (
                    <div className="flex w-full description_text">
                      <div className="flex w-1/5">
                        <GoLocation size={30} />
                      </div>
                      <div className="w-4/5">{address}</div>
                    </div>
                  )}
                  <div className="flex w-full description_text">
                    <div className="flex w-1/5">
                      <BsTelephone size={30} />
                    </div>
                    <div className="w-4/5">{phone}</div>
                  </div>
                </div>
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid rounded-b border-slate-200">
              <button
                className="px-6 py-2 mb-1 mr-1 text-sm font-bold text-red-500 uppercase transition-all duration-150 ease-linear outline-none background-transparent focus:outline-none"
                type="button"
                onClick={onclose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  );
}

export default Telephone;
