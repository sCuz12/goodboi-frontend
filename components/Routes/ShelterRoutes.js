import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axiosInstance from "../../helpers/axios";
import ShelterSideNav from "../Nav/shelter/ShelterSideNav";
import Spin from "../Decos/Spin";

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
          <Spin />
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
