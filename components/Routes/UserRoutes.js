import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../helpers/axios";
import { IoSyncOutline } from "react-icons/io5";
import UserSideNav from "../Nav/user/UserSideNav";
import Spin from "../Decos/Spin";

const UserRoute = ({ children, showSide = false }) => {
  const [ok, setOk] = useState();

  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token = window.localStorage.getItem("token");
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      const data = await axiosInstance.get("/api/current-user", {
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === 200) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/login");
    }
  };

  return (
    <>
      {!ok ? (
        <div className="flex justify-center pt-40">
          <Spin />
        </div>
      ) : (
        <div className="flex min-h-screen ">
          {showSide && <UserSideNav />}

          <div className="w-full m-25">{children}</div>
        </div>
      )}
    </>
  );
};

export default UserRoute;
