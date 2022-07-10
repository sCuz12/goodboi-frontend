import React, { useContext } from "react";
import { Context } from "../../../../context";
import { AiOutlineLogout } from "react-icons/ai";
import axiosInstance from "../../../../helpers/axios";
import { useRouter } from "next/router";

function Logout() {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();

  const logoutHandler = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    const { data } = await axiosInstance.post("/api/logout");
    router.push("/login");
  };

  return (
    <li className="relative">
      <a
        className="flex items-center h-12 px-6 py-4 overflow-hidden text-sm text-gray-700 transition duration-300 ease-in-out rounded text-ellipsis whitespace-nowrap hover:text-gray-900 hover:bg-gray-100"
        onClick={logoutHandler}
      >
        <AiOutlineLogout className="block float-left mr-2 text-xl text-black cursor-pointer" />
        <span className="text-black text">Logout </span>
      </a>
    </li>
  );
}

export default Logout;
