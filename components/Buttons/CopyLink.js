import React from "react";
import { BsShare } from "react-icons/bs";
function CopyLink({ onclick, copiedText }) {
  return (
    <div className="flex items-center w-4/5 px-2 border rounded-3xl border-1 bg-lightPink">
      <div className="flex items-center justify-center w-full h-12 pt-4 space-x-2">
        {copiedText ? (
          <button onClick={onclick}>
            <p className="text-xl text-center text-white cursor-pointer md:inline-flex w-max text-lime-500">
              Copied !
            </p>
          </button>
        ) : (
          <>
            <p className="text-center ">
              <BsShare size={20} color="white" />
            </p>
            <button onClick={onclick}>
              <p className="text-xl text-center text-white cursor-pointer md:inline-flex w-max text-green">
                Share Dog
              </p>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default CopyLink;
