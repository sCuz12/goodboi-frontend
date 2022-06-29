import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../helpers/axios";
import ShelterSideNav from "../Nav/shelter/ShelterSideNav";
import { SyncOutlined } from "@ant-design/icons";

const ShelterRoute = ({ children }) => {
  const [ok, setOk] = useState();

  const router = useRouter();

  useEffect(() => {
    fetchShelter();
  }, []);

  const fetchShelter = async () => {
    try {
      const token = window.localStorage.getItem("token");
      axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
      const data = await axiosInstance.get("/api/current-shelter", {
        headers: { "Content-Type": "application/json" },
      });
      if (data.status === 200) setOk(true);
    } catch (err) {
      console.log(err);
      setOk(false);
      router.push("/");
    }
  };

  return (
    <>
      {!ok ? (
        <div className="flex justify-center pt-40">
          <SyncOutlined spin className="text-2xl" />
        </div>
      ) : (
        <div className="flex min-h-screen ">
          <ShelterSideNav />
          <div className="w-full m-25">{children}</div>
        </div>
      )}
    </>
  );
};

export default ShelterRoute;
